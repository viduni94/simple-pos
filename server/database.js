let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'adidas1653',
    database : 'pos'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = connection;