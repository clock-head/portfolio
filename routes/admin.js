const path = require('path');
const cors = require('cors');
const express = require('express');

const themesController = require('../controllers/theme');
const articlesController = require('../controllers/blog/article');
const { isSuperUser } = require('../middleware/is-auth');

const router = express.Router();

router.post(
  '/submit-article',
  cors({ origin: 'http://localhost:3001' }),
  isSuperUser,
  articlesController.postAddArticle
);

module.exports = router;
