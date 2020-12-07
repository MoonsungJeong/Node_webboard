const express = require("express");
const router = express.Router();
const url = require('url');

const auth = require("../lib/auth");
const hash = require("../lib/hash");
const database = require("../lib/mysql");
const time = require("../lib/time");

const parts_header = require('../parts/header.js');

const page_board = require("../page/board_template.js");
const page_write = require("../page/write.js");
const template = require("../page/template.js");

const db = database();
let header;
let main;
let html;
let sql;

router.get("/total/:pageId",function(req,res){
    let page = req.params.pageId;

    sql = "SELECT * FROM `board` ORDER BY `pcode` DESC;";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_board("total",results,page);
        html = template(header,main,"");
        res.writeHead(200);
        res.end(html);
    });
})
router.get("/free",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_board();
    html = template(header,main,"");
    res.writeHead(200);
    res.end(html);
})
router.get("/info",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_board();
    html = template(header,main,"");
    res.writeHead(200);
    res.end(html);
})
router.get("/new",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_write(auth.statusWrite(req,res));
    html = template(header,main,"<script src='/js/script_write.js'></script>");
    res.writeHead(200);
    res.end(html);
})
router.post("/new",function(req,res){
    const info = req.body;
    let mcode;
    const ip = req.connection.remoteAddress;
    const hashedPW = hash.generate(info.password);
    const date = time.currentTime();
    
    if(auth.isUser(req,res)){
        sql = "SELECT mcode FROM `members` WHERE `unickname` =" + `'${req.session.nickname}';`
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            mcode = results[0].mcode;
            sql = "INSERT INTO `board` (`bcode`, `mcode`, `btitle`, `bcontent`, `bdate`, `bip`, `author`, `ppwd`)"
                         +` VALUES ('${info.board}','${mcode}','${info.title}','${info.content}','${date}', '${ip}', '${req.session.nickname}', NULL);`;
            db.query(sql, function (error, results, fields) {
                if (error)throw error;
                res.redirect('/board/total/1');
            });    
        });    
    }else{
        sql = "INSERT INTO `board` (`bcode`, `mcode`, `btitle`, `bcontent`, `bdate`, `bip`, `guest`, `ppwd`)"
                         +` VALUES ('${info.board}','0','${info.title}','${info.content}','${date}', '${ip}', '${info.author}', '${hashedPW}');`;
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            res.redirect('/board/total/1');
        });
    }
})




module.exports = router;