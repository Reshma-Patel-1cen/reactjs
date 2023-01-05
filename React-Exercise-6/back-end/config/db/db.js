import mysql from 'mysql';

const db_config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs-db',
  connectTimeout: 10000
};
const pool = mysql.createPool(db_config);

pool.getConnection(function (err, connection) {
  console.log("connected")
  // connected! (unless `err` is set)
});

pool.on('error', function (err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR' 
  // https://www.npmjs.com/package/mysql#error-handling
});

export default pool;
