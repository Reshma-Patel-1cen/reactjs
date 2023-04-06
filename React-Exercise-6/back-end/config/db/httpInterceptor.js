import connection from './db';

const generateInsertQuery = (data, tableName) => {
  return new Promise(resolve => {
    let query = `INSERT INTO ${tableName} (
      ${Object.keys(data).join(', ')}
      ) VALUES (
        ${Object.values(data).map(x => `'${x || ''}'`).join(', ')}
        );`;
        console.log(query)
    connection.query(query, function (err, res) {
      err ? resolve({ error: true, message: err.sqlMessage || err }) : resolve(res);
    })
  })
}

const generateUpdateQuery = (data, tableName, clauseKey, clauseValue) => {
  return new Promise(resolve => {
    let updateString = "";
    for (let key in data) {
      updateString += `${key} = '${data[key]}',`;
    }
    updateString = updateString.slice(0, -1);
    const query = `UPDATE ${tableName} SET ${updateString} WHERE ${clauseKey} = "${clauseValue}";`;
    connection.query(query, function (err, res) {
      err ? resolve({ error: true, message: err.sqlMessage || err }) : resolve(res);
    })
  })
}

const generateSelectQuery = (tableName, clauseKey = "", clauseValue = "",clauseKey1 = "", clauseValue1 = "") => {
  return new Promise(resolve => {
    const where = clauseKey !== "" ? ` WHERE ${clauseKey} = ${clauseValue}` : "";
    const con = clauseKey1 !== "" ? ` AND ${clauseKey1} = ${clauseValue1}` : "";
    const query = `SELECT * from ${tableName} ${where} ${con}`;
    connection.query(query, function (err, res) {
      err ? resolve({ error: true, message: err.sqlMessage || err }) : resolve(res);
    })
  })
}
const generateCountQuery = (tableName, clauseKey = "", clauseValue = "") => {
  return new Promise(resolve => {
    const query =`SELECT COUNT(*) AS total, COUNT(CASE WHEN ${clauseKey} = ${clauseValue} THEN 1 END) AS count FROM  ${tableName}`
    connection.query(query, function (err, res) {
      err ? resolve({ error: true, message: err.sqlMessage || err }) : resolve(res);
    })
  })
}

const generateDeleteQuery = (tableName, clauseKey, clauseValue) => {
  return new Promise(resolve => {
    const query = `DELETE from ${tableName} WHERE ${clauseKey} = ${clauseValue};`;
    console.log(query)
    connection.query(query, function (err, res) {
      err ? resolve({ error: true, message: err.sqlMessage || err }) : resolve(res);
    })
  })
}

const checkUserpwd = (user, pwd, tableName) => {
  return new Promise(resolve => {
    const query = `SELECT * from ${tableName} WHERE user_name= "${user}" and password = sha1("${pwd}")`;
    connection.query(query, function (err, res) {
      err ? resolve({ error: true, message: err.sqlMessage || err }) : resolve(res);
    })
  })
}

const getPatternData = (pattern) => {
  const string = pattern.map((a) => `product LIKE "%${a.replace(/[^a-zA-Z ]/g, "")}%"`).join(' OR ');
  return new Promise(resolve => {
    const query = "SELECT * FROM products WHERE " + string;
    connection.query(query, function (err, res) {
      err ? resolve({ error: true, message: err.sqlMessage || err }) : resolve(res);
    })
  })
}

export {
  generateInsertQuery,
  generateUpdateQuery,
  generateSelectQuery,
  generateDeleteQuery,
  checkUserpwd,
  getPatternData,
  generateCountQuery
}
