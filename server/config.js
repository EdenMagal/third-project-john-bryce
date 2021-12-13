const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos'
});

connection.connect(err => {
    console.log(err ? err : "connected");
});

const myQuery = q => {
    return new Promise((resolve, reject) => {
        connection.query(q, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
}

module.exports = { myQuery };