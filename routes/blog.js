const path = require('path');
const config = require('config');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { isAuth, isSuperUser } = require('../middleware/is-auth');
const articlesController = require('../controllers/blog/article');
const commentsController = require('../controllers/blog/comment');

router.get(
  '/',
  cors({ origin: process.env.FRONTEND_URL }),
  articlesController.getArticles
);

router.get(
  '/:id',
  cors({ origin: process.env.FRONTEND_URL }),
  articlesController.getArticle
);

router.post(
  '/post-comment',
  cors({
    origin: process.env.FRONTEND_URL,
  }),
  isAuth,
  commentsController.postAddComment
);

module.exports = router;
