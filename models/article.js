const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Article', articleSchema);

// const mongoose = require('mongoose');
// const path = require('path');
// const fs = require('fs');
// const Schema = mongoose.Schema;
// const getDb = require('../util/database').getDb;

// const p = path.join(
//   path.dirname(require.main.filename),
//   'data',
//   'article.json'
// );

// const getArticlesFromFile = (callback) => {
//   fs.readFile(p, (error, fileContent) => {
//     if (error) {
//       console.log('read error:', error);
//       return callback([]);
//     }

//     callback(JSON.parse(fileContent));
//   });
// };

// const getArticleFromFile = (timeStamp, callback) => {
//   const p = path.join(
//     path.dirname(require.main.filename),
//     'data',
//     'article.json'
//   );

//   fs.readFile(p, (error, fileContent) => {
//     if (error) {
//       console.log('read error', error);
//       return callback([]);
//     }

//     const files = JSON.parse(fileContent);

//     const article = files.find((post) => post.timeStamp === timeStamp);

//     callback(article);
//   });
// };

// class Article {
//   constructor({ title, slug, content, timeStamp }) {
//     this.title = title;
//     this.slug = slug;
//     this.content = content;
//     this.timeStamp = timeStamp;
//     // this.imageUrl = imageUrl;
//     // this.comments = comments;
//   }

//   static fetchAll(callback) {
//     getArticlesFromFile(callback);
//   }

//   static fetchOne(timeStamp, callback) {
//     getArticleFromFile(timeStamp, callback);
//   }

//   save() {
//     getArticlesFromFile((articles) => {
//       let response = {};
//       articles.push(this);

//       console.log('model ran');

//       fs.writeFile(p, JSON.stringify(articles), (error) => {
//         if (!error) {
//           console.log('write success');
//           response.ok = true;
//         } else {
//           console.log('write error');
//           response.ok = false;
//         }
//       });

//       return response;
//     });
//   }
// }

// module.exports = Article;
