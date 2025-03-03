const jwt = require('jsonwebtoken');
const config = require('config');
const serverConfig = config.get('server');

const isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(301).send({
      authenticationErrors: {
        message: 'would you like to log in?',
      },
    });
  }

  next();
  // const token = req.get('Authorization').split(' ')[1];
  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, serverConfig.jwtSecret);
  // } catch (error) {
  //   error.statusCode = 500;
  //   throw error;
  // }

  // if (!decodedToken) {
  //   const error = new Error('Not authenticated');
  //   error.statusCode = 401;
  // }
  // req.userId = decodedToken.userId;
  // next();
};

const isSuperUser = (req, res, next) => {
  if (!req.session.isSuperUser) {
    return res.status(301).send({
      authenticationErrors: {
        message: 'restricted access.',
      },
    });
  }
  next();
};

module.exports = { isAuth, isSuperUser };
