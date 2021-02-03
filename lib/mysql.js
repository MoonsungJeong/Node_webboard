const mysql = require('mysql');
const init = require("../init.js");

module.exports = function(){
    const db = mysql.createConnection({
        host     : init.db.host,
        user     : init.db.user,
        password : init.db.password,
        database : init.db.database,
        multipleStatements: true
    });
    return db;
}