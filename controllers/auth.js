const User = require('../models/user.js');
const { save, saveSuperUser, passwordMatches } = require('./authService');

exports.postSignUp = async (req, res, next) => {
  const userDoc = await User.findOne({ email: req.body.email });
  if (userDoc) {
    return res.status(300).json({
      validationErrors: {
        email: 'this email exists',
      },
    });
  }

  await save(req.body);

  res.redirect('/sign-in');
};

exports.createSuperuser = async (req, res, next) => {
  const userDoc = await User.findOne({ email: req.email });

  if (userDoc) {
    return res.status(400).json({
      message: 'user exists',
    });
  }

  await saveSuperUser(req.body);
};

exports.postSignIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(req.body);
  console.log(email);

  const userDoc = await User.findOne({
    email: email,
  });

  console.log(userDoc);

  if (!userDoc) {
    return res.status(401).json({
      validationErrors: {
        email: 'wrong email and password combination',
      },
    });
  }

  passwordMatches(password, userDoc.password)
    .then((doMatch) => {
      // 400 => bad request error
      if (!doMatch) {
        return res.status(401).json({
          validationErrors: {
            email: 'please try again.',
          },
        });
      }
      req.session.isLoggedIn = true;
      req.session.user = userDoc;

      req.session.save((error) => {
        if (!error) {
          res.status(200).json({
            authenticationSuccess: {
              firstName: userDoc.firstName,
              lastName: userDoc.lastName,
            },
          });
        }
      });
    })
    .catch((error) => {
      // 500 >= server error
      return res.status(501).json({
        validationErrors: {
          email: error.message,
        },
      });
    });
  // send MFA email
  // redirect to MFA page.
  // if code matches, sign and send JWT token to client.
};

exports.postLogout = async (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.status(500).json({
      serverError: {
        message: 'log out error',
      },
    });
  });
};

exports.postSendOTP = async (req, res, next) => {
  const { email } = req.body;
  //generate OTP

  const otp = crypto.randomInt(100000, 999999).toString();
  //store OTP in session

  req.session.otp = otp;
  req.session.otpExpires = Date.now() + 5 * 60 * 1000;
  await req.session.save();

  //send email

  await sendOTPByEmail(email, otp);

  return res.status(200).json({
    message: 'OTP sent',
  });
};

exports.postVerifyOTP = async (req, res, next) => {
  //receive OTP entry in request body
  //check OTP entry against OTP saved in session
  //send 400 response if OTP does not match
  //send 200 response if OTP matches
};

exports.resetPassword = async (req, res, next) => {
  //receive new password and confirm password in request body
  // verify password validity on middleware level
};

// const loadedUser = userDoc;

// const token = jwt.sign(
//   {
//     email: loadedUser.email,
//     userId: loadedUser._id.toString(),
//   },
//   serverConfig.jwtSecret,
//   { expiresIn: '1h' }
// );

// res.status(200).json({ token: token, userId: loadedUser._id.toString() });
