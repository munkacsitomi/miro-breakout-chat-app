const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    text: String,
    author: String,
    authorId: String,
  },
  { timestamps: true }
);

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
