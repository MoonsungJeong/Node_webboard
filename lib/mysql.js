const mysql = require('mysql');

module.exports = function(){
    const db = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '111111',
        database : 'web_board',
        multipleStatements: true
    });
    return db;
}