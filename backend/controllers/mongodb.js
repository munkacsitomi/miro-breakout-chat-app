const mongoose = require('mongoose');
const Message = require('../models/Message');
const mongoUrl = 'mongodb://database:27017/chat-mongo-db';

const messageFactory = ({ author, text, authorId, timestamp }) => ({
  author,
  text,
  authorId,
  timestamp,
});

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log('Connection to MongoDB was Successful!');
  } catch (err) {
    console.log(err);
  }
};

const getAllMessages = async () => {
  const messages = await Message.find({});
  const filteredMessages = messages.map((message) => messageFactory(message));

  return filteredMessages;
};

const saveMessage = (msg, name, userId) => {
  const message = new Message({
    text: msg,
    author: name,
    authorId: userId,
    timestamp: new Date(),
  });

  message.save();

  return messageFactory(message);
};

module.exports = {
  connectDB,
  getAllMessages,
  saveMessage,
};
