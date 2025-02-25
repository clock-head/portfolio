const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const nodemailerStub = require('nodemailer-stub');

const validUser = {
  email: 'test@test.com',
  password: 'testTestTe99*&',
  confirmPassword: 'testTestTe99*&',
  firstName: 'Elloria',
  lastName: 'Bangers',
  role: 'project-manager',
  acquisitionChannel: 'google',
};

describe('User Registration', () => {
  const postUser = (user = validUser) => {
    return request(app).post('/api/1.0/auth/sign-up').send(user);
  };

  afterEach(async () => {
    await User.deleteOne({
      email: 'test@test.com',
    });
  });

  it('should 302 OK when sign up request is valid', async () => {
    const response = await postUser();

    expect(response.status).toBe(302);
  });

  it('saves the user to the database', async () => {
    const response = await postUser();

    const users = await User.find({
      // userName: 'testName',
      email: 'test@test.com',
    });
    expect(users.length).toBe(1);
  });

  it('hashes the password in the database', async () => {
    const response = await postUser();

    const user = await User.findOne({
      // userName: 'testName',
      email: 'test@test.com',
    });
    expect(user.password).not.toBe(undefined);
    expect(user.password).not.toBe('testTestTe99*&');
  });

  it('returns 400 if email is null', async () => {
    const response = await postUser({
      email: null,
      password: 'P4ssworD&%',
    });

    expect(response.status).toBe(400);
  });

  it('returns validationErrors field in response body when validation error occurs', async () => {
    const response = await postUser({
      email: null,
      password: 'passWord&%',
      confirmPassword: 'passWord&%',
      firstName: 'Elloria',
      lastName: 'Bangers',
      role: 'project-manager',
      acquisitionChannel: 'google',
    });

    const body = response.body;
    expect(body.validationErrors).not.toBeUndefined();
  });

  const email_null = 'email field cannot be empty.';
  const password_strength =
    'password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol character';
  const password_null = 'password field cannot be empty.';
  const confirmPassword_null = 'please confirm password.';
  const firstName_null = 'first name cannot be empty.';
  const lastName_null = 'last name cannot be empty.';
  const acquisition_empty = 'please select at least one.';
  const passwords_not_matching = 'passwords do not match.';

  it.each`
    field                   | value              | expectedMessage
    ${'email'}              | ${null}            | ${email_null}
    ${'password'}           | ${null}            | ${password_null}
    ${'confirmPassword'}    | ${null}            | ${confirmPassword_null}
    ${'firstName'}          | ${null}            | ${firstName_null}
    ${'lastName'}           | ${null}            | ${lastName_null}
    ${'acquisitionChannel'} | ${[]}              | ${acquisition_empty}
    ${'password'}           | ${'alllowercase'}  | ${password_strength}
    ${'password'}           | ${'ALLUPPERCASE'}  | ${password_strength}
    ${'password'}           | ${'lowerandUPPER'} | ${password_strength}
    ${'password'}           | ${'UPPER444444'}   | ${password_strength}
    ${'password'}           | ${'lower4nd5667'}  | ${password_strength}
    ${'confirmPassword'}    | ${'notp$ssworD&%'} | ${passwords_not_matching}
    ${'acquisitionChannel'} | ${[]}              | ${acquisition_empty}
  `(
    'returns $expectedMessage when $field is $value',
    async ({ field, expectedMessage, value }) => {
      const user = {
        email: 'test@test.com',
        password: 'p4ssworD&%',
        confirmPassword: 'p4ssworD&%',
        firstName: 'Eric',
        lastName: 'Bana',
        role: 'project manager',
        acquisitionChannel: 'google',
      };

      user[field] = value;
      const response = await postUser(user);
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);

      (async function () {
        await User.deleteOne({
          ...user,
          [field]: value,
        });
      })();
    }
  );

  it('should not save user into database if email is invalid', async () => {
    await postUser({
      userName: 'Walnut_Ding',
      email: 'marsChocolateMagic',
      password: 'p4ssworD&%',
    });

    const users = await User.find({
      userName: 'Walnut_Ding',
      email: 'marsChocolateMagic',
    });

    expect(users.length).toEqual(0);
  });

  it('should register .tech emails as valid and save user into the database', async () => {
    const exampleUser = {
      email: 'chickenNuggets@joefinnigans.tech',
      password: 'col0nC4nc3r$%',
      confirmPassword: 'col0nC4nc3r$%',
      firstName: 'Eric',
      lastName: 'Bana',
      role: 'project manager',
      acquisitionChannel: 'google',
    };

    const response = await postUser(exampleUser);

    const users = await User.find({
      email: 'chickenNuggets@joefinnigans.tech',
    });

    expect(users.length).toEqual(1);

    if (users.length) {
      (async function () {
        await User.deleteOne({
          email: users[0].email,
        });
      })();
    }
  });
});
