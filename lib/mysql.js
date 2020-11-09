const mysql = require('mysql');

module.exports = function(){
    const db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '111111',
        database : 'web_board'
    });
    db.query("show databases;", function (error, results, fields) {
        if (error)throw error;
        
        //console.log(results); 
    });
    db.query("show tables;", function (error, results, fields) {
        if (error)throw error;
        
        //console.log(results); 
    });
    db.query("select * from members;", function (error, results, fields) {
        if (error)throw error;
        
        //console.log(results); 
    });
    
    return db;
}