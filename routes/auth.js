const cors = require('cors');
const express = require('express');
const isValidRequest = require('../middleware/is-valid-request');
const isValidEmail = require('../middleware/is-valid-email');
const isValidPassword = require('../middleware/is-valid-password');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
  '/sign-up',
  cors({ origin: 'http://localhost:3001' }),
  isValidRequest,
  isValidEmail,
  isValidPassword,
  authController.postSignUp
);

router.post(
  '/sign-in',
  cors({
    origin: 'http://localhost:3001',
  }),
  authController.postSignIn
);

module.exports = router;
