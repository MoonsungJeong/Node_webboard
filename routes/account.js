const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");
const hash = require("../lib/hash");
const database = require("../lib/mysql");
const time = require("../lib/time");
const mailer = require("../lib/mail.js");


const parts_header = require('../parts/header.js');

const page_login = require("../page/login.js");
const page_signup = require("../page/sign-up.js");
const page_lost = require("../page/lost.js");
const template = require("../page/template.js");

const db = database();
let header;
let main;
let html;
let sql;

router.get("/login",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_login();
    html = template(header,main,"<script src='/js/script_login.js'></script>");
    res.writeHead(200);
    res.end(html);
});
router.get("/logout",function(req,res){
    req.session.destroy(function(err){
        res.redirect(req.headers.referer);
    });
});
router.get("/sign-up",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_signup();
    html = template(header,main,"<script src='/js/script_signup.js'></script>");
    res.writeHead(200);
    res.end(html);
});
router.post("/login",function(req,res){
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
                    req.session.code = results[0]['mcode'];
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
router.post("/sign-up",function(req,res){
    const info = req.body;
    const code = Math.floor(Math.random()*100000);
    const ip = req.connection.remoteAddress;
    const hashedPW = hash.generate(info.password);

    let date = time.currentTime();
    
    sql = "INSERT INTO `members` (`mcode`, `uid`, `upwd`, `uname`, `unickname`, `email`, `udate`, `uip`, `birthdate`)"
    +` VALUES ('${code}', '${info.id}', '${hashedPW}', '${info.name}', '${info.nickname}', '${info.email}', '${date}', '${ip}', '${info.birth}');`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        res.send(true);
    });
});
router.post("/form-check",function(req,res){
    sql = "SELECT COUNT(*) FROM `members` WHERE `"+`${req.body.column}`+"` = '"+`${req.body.value}`+"'"; 
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0]['COUNT(*)'])
            res.send(true);
        else
            res.send(false);
    });
})
router.get("/lost",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_lost();
    html = template(header,main,"<script src='/js/script_lost.js'></script>");
    res.writeHead(200);
    res.end(html);
})
router.post("/lost/id",function(req,res){
    sql = "SELECT * FROM `members` WHERE `uname` =" + ` '${req.body.name}'` + " AND `email` =" + ` '${req.body.email}';`
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0] != undefined){
            res.send(`<div class="padding_2">your ID is <span class="f_size_c">${results[0].uid}</span></div>`);
        }else{
            res.send(false)
        }
    });
})
router.post("/lost/pw",function(req,res){
    sql = "SELECT * FROM `members` WHERE `uname` =" + ` '${req.body.name}'` + " AND `uid` =" + ` '${req.body.id}';`
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0] != undefined){
            console.log(results[0].email);
            mailer(results[0].email, 'Kangaroo password reset', '<p>Awsome! nodemailer do the trick!</p>');
            res.send(`<div class="padding_1">Sent reset password page to<span class="f_size_c"> <br> your Email!</span></div>`);
        }else{
            res.send(false)
        }
    })
})
module.exports = router;