const express = require('express');
const bodyParser = require('body-parser');
const database = require('./lib/mysql.js');

const page_main = require('./lib/main.js');
const page_login = require('./lib/login.js');
const page_signup = require('./lib/sign-up.js');

const app = express();
const db = database();

const hostname = '192.168.1.223';
const port = 3000;
let html;
let sql = 'SELECT host,user from user';

db.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
    html = page_main();
    res.writeHead(200);
    res.end(html);
});
app.get('/login',function(req,res){
    html = page_login();
    res.writeHead(200);
    res.end(html);
});
app.post('/login',function(req,res){
    res.writeHead(200);
    res.end("success");
});
app.get('/sign-up',function(req,res){
    html = page_signup();
    res.writeHead(200);
    res.end(html);
});
app.post('/sign-up',function(req,res){
    console.log(req.body);
    res.writeHead(200);
    res.end("success");
});
app.listen(port,hostname, function(){
    console.log("Server running at 3000");
})