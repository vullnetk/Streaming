const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectionString = 'mongodb://localhost:27017/eStreaming';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
  console.log('Connected to Mongodb');
}).on('error', function (error) {
  console.log('Mongodb connection error: ' + error);
});


module.exports = mongoose;
