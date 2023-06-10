const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1/eStreaming';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Failed to connect to MongoDB:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

module.exports = db;
