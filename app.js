const express = require("express");
const bodyParser = require("body-parser");
const database = require("./lib/mysql.js");

const page_main = require("./lib/main.js");
const page_login = require("./lib/login.js");
const page_signup = require("./lib/sign-up.js");

const app = express();
const db = database();

const hostname = "192.168.1.223";
const port = 3000;
let html;
let sql = "SELECT host,user from user";

// db test code 
/* db.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results);
}); */

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req,res){
    html = page_main();
    res.writeHead(200);
    res.end(html);
});
app.get("/login",function(req,res){
    html = page_login();
    res.writeHead(200);
    res.end(html);
});
app.post("/login",function(req,res){
    res.writeHead(200);
    res.end("success");
});
app.get("/sign-up",function(req,res){
    html = page_signup();
    res.writeHead(200);
    res.end(html);
});
app.post("/sign-up",function(req,res){
    const info = req.body;
    const code = Math.floor(Math.random()*100000);
    const ip = req.connection.remoteAddress;
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    
    sql = "INSERT INTO `members` (`mcode`, `uid`, `upwd`, `uname`, `unickname`, `email`, `udate`, `uip`, `birthdate`)"
    +` VALUES ('${code}', '${info.id}', '${info.password}', '${info.name}', '${info.nickname}', '${info.email}', '${date}', '${ip}', '${info.birth}');`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        res.redirect(301,'/login');
    });
});
app.post("/form-check",function(req,res){
    sql = "SELECT COUNT(*) FROM `members` WHERE `"+`${req.body.column}`+"` = '"+`${req.body.value}`+"'"; 
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0]['COUNT(*)'])
            res.send(true);
        else
            res.send(false);
    });
})
app.listen(port,hostname, function(){
    console.log("Server running at 3000");
})