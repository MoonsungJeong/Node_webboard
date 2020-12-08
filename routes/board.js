const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");
const hash = require("../lib/hash");
const database = require("../lib/mysql");
const time = require("../lib/time");

const parts_header = require('../parts/header.js');

const page_board = require("../page/board_template.js");
const page_write = require("../page/write.js");
const page_read = require("../page/read.js");
const template = require("../page/template.js");

const db = database();
let header;
let main;
let html;
let sql;
let page;

router.get("/total/:pageId",function(req,res){
    page = req.params.pageId;
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
router.get("/free/:pageId",function(req,res){
    page = req.params.pageId;
    sql = "SELECT * FROM `board` WHERE `bcode` = 1 ORDER BY `pcode` DESC;";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_board("free",results,page);
        html = template(header,main,"");
        res.writeHead(200);
        res.end(html);
    });
})
router.get("/info/:pageId",function(req,res){
    page = req.params.pageId;
    sql = "SELECT * FROM `board` WHERE `bcode` = 2 ORDER BY `pcode` DESC;";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_board("info",results,page);
        html = template(header,main,"");
        res.writeHead(200);
        res.end(html);
    });
})
router.get("/:boardId/:pageId/:postId",function(req,res){
    let data = req.params;
    sql = "SELECT * FROM `board` WHERE `pcode` ="+`'${data.pageId}'`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        main = page_read(results,data);  // read post
        if(data.boardId === 'total')
            sql = "SELECT * FROM `board` ORDER BY `pcode` DESC;";
        if(data.boardId === 'free')
            sql = "SELECT * FROM `board` WHERE `bcode` = 1 ORDER BY `pcode` DESC;";
        if(data.boardId === 'info')
            sql = "SELECT * FROM `board` WHERE `bcode` = 2 ORDER BY `pcode` DESC;";
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            header = parts_header(auth.statusUI(req,res));
            main += page_board(data.boardId,results,data.pageId);    // attach board bottom
            html = template(header,main,"");
            res.writeHead(200);
            res.end(html);
        });
    });
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
        sql = "INSERT INTO `board` (`bcode`, `mcode`, `btitle`, `bcontent`, `bdate`, `bip`, `author`, `ppwd`)"
                         +` VALUES ('${info.board}','0','${info.title}','${info.content}','${date}', '${ip}', '${info.author}', '${hashedPW}');`;
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            res.redirect('/board/total/1');
        });
    }
})

module.exports = router;