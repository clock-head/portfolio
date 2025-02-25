const Comment = require('../../models/comment');

exports.getAddComment = (req, res, next) => {};

exports.postAddComment = (req, res, next) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const content = req.body.content;
  const createdAt = req.body.createdAt;
  const comment = new Comment({
    postId: postId,
    userId: userId,
    content: content,
    createdAt: createdAt,
  });

  comment
    .save()
    .then((result) => {
      console.log('Created Comment');
      res.redirect('/member/articles');
    })
    .catch((error) => {
      console.log(error);
    });
};
