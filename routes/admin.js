const path = require('path');
const cors = require('cors');
const express = require('express');

const articlesController = require('../controllers/blog/article');
const authController = require('../controllers/auth');
const { isSuperUser } = require('../middleware/is-auth');

const router = express.Router();

router.post('/create-superuser', authController.createSuperUser);

router.post(
  '/submit-article',
  cors({ origin: 'http://localhost:3001' }),

  articlesController.postAddArticle
);

module.exports = router;
