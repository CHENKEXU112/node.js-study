const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'chenkexu',
    database: 'node-test'
})

db.query('select * from table1', (err, result) => {
    if (err) console.log(err);
    console.log(result);
})