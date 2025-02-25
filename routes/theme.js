const path = require('path');
const cors = require('cors');
const express = require('express');

const themesController = require('../controllers/theme');

const router = express.Router();
const isSuperUser = require('../middleware/is-auth');

router.get(
  '/get-themes',
  cors({ origin: 'http://localhost:3001' }),
  themesController.getThemes
);

router.post('/add-theme', isSuperUser, themesController.postAddTheme);

router.post('/delete-theme', isSuperUser, themesController.postDeleteTheme);

module.exports = router;
