const Article = require('../../models/article');
const articles = [];

exports.postAddArticle = (req, res, next) => {
  const title = req.body.title;
  const slug = req.body.slug;
  const content = req.body.content;
  // const imageUrl = req.body.imageUrl;
  // const comments = req.body.comments;

  console.log('request', req.body);

  const timeStamp = Date.now();

  const article = new Article({
    title: title,
    slug: slug,
    content: content,
    timeStamp: timeStamp,
    // imageUrl: imageUrl,
    // comments: comments,
  });

  console.log(article);

  const response = article.save();

  res.send(response);

  // .then((result) => {
  //   console.log('Created Article');
  //   res.redirect('/admin/articles');
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};

exports.getArticles = (req, res, next) => {
  //console.log(Article);
  Article.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log('payload', articles);
  // .catch((error) => console.log(error));
};

exports.getArticle = (req, res, next) => {
  Article.fetchOne(req.body.timeStamp, (article) => {
    res.send(article);
  });
};
