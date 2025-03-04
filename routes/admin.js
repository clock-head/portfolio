const path = require('path');
const cors = require('cors');
const express = require('express');

const articlesController = require('../controllers/blog/article');
const { isSuperUser } = require('../middleware/is-auth');

const router = express.Router();

router.post(
  '/submit-article',
  cors({ origin: process.env.FRONTEND_URL }),

  articlesController.postAddArticle
);

module.exports = router;
