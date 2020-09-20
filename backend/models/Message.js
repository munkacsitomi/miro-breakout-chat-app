const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  author: String,
  authorId: String,
  timestamp: Date,
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
