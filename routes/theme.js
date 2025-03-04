const path = require('path');
const cors = require('cors');
const express = require('express');

const themesController = require('../controllers/theme');

const router = express.Router();
const { isAuth, isSuperUser } = require('../middleware/is-auth');

router.get(
  '/get-themes',
  cors({ origin: process.env.FRONTEND_URL }),
  themesController.getThemes
);

router.post('/add-theme', isSuperUser, themesController.postAddTheme);

router.post('/delete-theme', isSuperUser, themesController.postDeleteTheme);

module.exports = router;
