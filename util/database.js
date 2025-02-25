// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => {
//   MongoClient.connect(
//     'mongodb+srv://clockhead09:fUpbk8CfSwqa6Qi8@cluster0.95uly.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
//   )
//     .then((client) => {
//       console.log('Connected.');
//       _db = client.db();
//       callback(client);
//     })
//     .catch((error) => {
//       console.log('error', error);
//       throw error;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw new Error('No database found!');
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
