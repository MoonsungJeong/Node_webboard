const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const database = require("./lib/mysql");
const hash = require("./lib/hash");
const auth = require("./lib/auth");

const parts_header = require('./parts/header.js');

const page_main = require("./page/main.js");
const page_login = require("./page/login.js");
const page_signup = require("./page/sign-up.js");
const template = require("./page/template.js");

const app = express();
const db = database();

const hostname = "192.168.1.223";
const port = 3000;
let header;
let main;
let html;
let sql;

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'iwanttogotothemoon',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.get("/", function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_main();
    html = template(header,main,"");
    res.writeHead(200);
    res.end(html);
});
app.get("/login",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_login();
    html = template(header,main,"<script src='/js/script_login.js'></script>");
    res.writeHead(200);
    res.end(html);
});
app.get("/logout",function(req,res){
    req.session.destroy(function(err){
        res.redirect('/');
    });
});
app.get("/sign-up",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_signup();
    html = template(header,main,"<script src='/js/script_signup.js'></script>");
    res.writeHead(200);
    res.end(html);
});
app.post("/login",function(req,res){
    const info = req.body;
    sql = "SELECT * FROM `members` WHERE `uid` =" + ` '${info.id}';`
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] !== undefined){
            sql = "SELECT * FROM `members` WHERE `uid` =" + ` '${info.id}';`
            db.query(sql, function (error, results, fields) {
                if(error)throw error;
                if(!hash.check(info.password,results[0]['upwd'])){ // incorrect
                    res.send(false);
                }else{                                             // correct
                    req.session.is_logined = true;
                    req.session.nickname = results[0]['unickname'];
                    req.session.save(function(){
                        res.send(true);
                    });
                } 
            });
        }else{
            res.send(false);    // incorrect
        }
    });
});
app.post("/sign-up",function(req,res){
    const info = req.body;
    const code = Math.floor(Math.random()*100000);
    const ip = req.connection.remoteAddress;
    const hashedPW = hash.generate(info.password);

    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    
    sql = "INSERT INTO `members` (`mcode`, `uid`, `upwd`, `uname`, `unickname`, `email`, `udate`, `uip`, `birthdate`)"
    +` VALUES ('${code}', '${info.id}', '${hashedPW}', '${info.name}', '${info.nickname}', '${info.email}', '${date}', '${ip}', '${info.birth}');`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        res.send(true);
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