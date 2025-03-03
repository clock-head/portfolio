const emailIsInvalid = (body) => {
  if (!body.email.match(/[a-zA-Z]+(@)[^@#!%$^()*\^][a-z]+.(com|net|tech)/i)) {
    return true;
  }
  return false;
};

module.exports = async (req, res, next) => {
  if (emailIsInvalid(req.body)) {
    return res.status(402).json({
      validationErrors: { email: 'please enter a valid email.' },
    });
  }

  next();
};
