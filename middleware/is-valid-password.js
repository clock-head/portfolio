const passwordIsTooSimple = (body) => {
  if (!body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)) {
    return true;
  }
  return false;
};

const passwordIsTooShort = (body) => {
  if (!body.password.length < 6) {
    return true;
  }
  return false;
};

const passwordsDoNotMatch = (body) => {
  if (body.password !== body.confirmPassword) {
    return true;
  }
  return false;
};

module.exports = async (req, res, next) => {
  if (passwordIsTooSimple(req.body)) {
    return res.status(400).send({
      validationErrors: {
        password:
          'password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol character',
      },
    });
  }

  if (passwordsDoNotMatch(req.body)) {
    return res.status(400).send({
      validationErrors: {
        confirmPassword: 'passwords do not match.',
      },
    });
  }

  next();
};
