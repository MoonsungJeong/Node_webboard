const mysql = require('mysql');

module.exports = function(){
    const db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '111111',
        database : 'web_board'
    });
    return db;
}