const express = require('express');
const mssqlConnection = require('./mssqlConnection');
const mongodbConnection = require('./mongodbConnection');
const mssql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use(cors());
app.use(express.json());


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
