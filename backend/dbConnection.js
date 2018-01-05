var mysql = require('mysql');


// var pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'quotedb'
//   // connectionLimit: 10,
//   // supportBigNumbers: true
// });

var pool = mysql.createPool({
  host: 'eu-cdbr-west-01.cleardb.com',
  user: 'bc13feff4aca4b',
  password: 'a5cb0ac6',
  database: 'heroku_8d07a50dec7a9c9'
  // connectionLimit: 10,
  // supportBigNumbers: true
});

module.exports = pool;
