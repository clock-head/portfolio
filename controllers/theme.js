const Theme = require('../models/theme');

exports.getThemes = (req, res, next) => {
  Theme.find()
    .then((themes) => {
      res.status(200).send(themes);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postAddTheme = async (req, res, next) => {
  const themeName = req.body.themeName;
  const layout = req.body.layout;
  const button = req.body.button;
  const home = req.body.home;
  const postList = req.body.postList;
  const newArticle = req.body.newArticle;
  const mainNav = req.body.mainNav;
  const auth = req.body.auth;

  const theme = new Theme({
    themeName: themeName,
    layout: layout,
    button: button,
    home: home,
    postList: postList,
    newArticle: newArticle,
    mainNav: mainNav,
    auth: auth,
  });
  theme
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postDeleteTheme = (req, res, next) => {
  const themeId = req.body.themeId;
  Theme.findOneAndDelete({ _id: themeId })
    .then(() => {
      console.log('DESTROYED THEME');
      res.status(200).send('DESTROYED THEME');
    })
    .catch((error) => console.log(error));
};
