const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  acquisitionChannel: {
    type: Array,
    required: true,
  },
  interactions: {
    comments: [
      {
        commentId: {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
          required: true,
        },
        postId: {},
        message: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model('User', userSchema);
