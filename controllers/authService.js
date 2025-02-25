const bcrypt = require('bcryptjs');
const User = require('../models/user');
const crypto = require('crypto');
const { Resend } = require('resend');

// for activation token.
const generateToken = (length) => {
  return crypto.randomBytes(length).toString('hex').substring(0, length);
};

const save = async (body) => {
  const email = body.email;
  const password = body.password;
  const firstName = body.firstName;
  const lastName = body.lastName;
  const role = body.role;
  const acquisitionChannel = body.acquisitionChannel;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email: email,
    password: hashedPassword,
    status: 2,
    firstName: firstName,
    lastName: lastName,
    role: role,
    acquisitionChannel: acquisitionChannel,
  });

  const newUser = await user.save();

  return newUser;
};

const passwordMatches = async (password, userPassword) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (error) {
    error = new Error('user or password is invalid.');
    error.status = 401;
  }
};

const sendOTPByEmail = async (email, otp) => {};

module.exports = { save, passwordMatches };
