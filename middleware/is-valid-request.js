const missingFields = (body) => {
  if (
    !body.email ||
    !body.password ||
    !body.confirmPassword ||
    !body.firstName ||
    !body.lastName ||
    body.acquisitionChannel.length === 0
  ) {
    return true;
  }
  return false;
};

const containsWhiteSpace = (body) => {
  if (body.email.match(/[a-z]*\s[a-z]*/i)) {
    return true;
  }
  return false;
};

module.exports = (req, res, next) => {
  if (missingFields(req.body)) {
    return res.status(400).send({
      validationErrors: {
        email: !req.body.email ? 'email field cannot be empty.' : null,
        password: !req.body.password ? 'password field cannot be empty.' : null,
        confirmPassword: !req.body.confirmPassword
          ? 'please confirm password.'
          : null,
        firstName: !req.body.firstName ? 'first name cannot be empty.' : null,
        lastName: !req.body.lastName ? 'last name cannot be empty.' : null,
        acquisitionChannel:
          req.body.acquisitionChannel.length === 0
            ? 'please select at least one.'
            : null,
      },
    });
  }

  if (containsWhiteSpace(req.body)) {
    return res.status(400).send({
      validationErrors: {
        email: 'email cannot contain white spaces',
      },
    });
  }
  next();
};
