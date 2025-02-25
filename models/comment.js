// const getDb = require('../util/database').getDb;

// class Comment {
//   constructor(postId, userId, content, createdAt) {
//     this.postId = postId;
//     this.userId = userId;
//     this.content = content;
//     this.createdAt = createdAt;
//   }

//   save() {
//     const db = getDb();
//     db.collection('comments')
//       .insertOne(this)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }
