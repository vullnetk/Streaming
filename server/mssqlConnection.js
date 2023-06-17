const sql = require('msnodesqlv8');

const connectionString = 'Driver={SQL Server Native Client 11.0};Server=DESKTOP-8VA91VV;Database=eStreaming1;Trusted_Connection=Yes;';

const executeQuery = async (query) => {
  return new Promise((resolve, reject) => {
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        console.error('Failed to execute query:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

sql.query(connectionString, 'SELECT 1', (err) => {
  if (err) {
    console.error('Failed to connect to the SQL database:', err);
  } else {
    console.log('SQL Database connection established');
  }
});

module.exports = {
  executeQuery,
};