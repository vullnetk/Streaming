const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectionString = 'mongodb://127.0.0.1/eStreaming';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
  console.log('Connected');
}).on('error', function (error) {
  console.log('Connection error: ' + error);
});


module.exports = mongoose;
