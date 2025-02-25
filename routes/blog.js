const path = require('path');
const config = require('config');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const isAuth = require('../middleware/is-auth');
const articlesController = require('../controllers/blog/article');
const commentsController = require('../controllers/blog/comment');

router.get(
  '/',
  cors({ origin: 'http://localhost:3001' }),
  articlesController.getArticles
);

router.post(
  '/post-comment',
  cors({
    origin: 'http://localhost:3001',
  }),
  isAuth,
  commentsController.postAddComment
);

module.exports = router;
