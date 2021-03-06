const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");
const database = require("../lib/mysql");

const parts_header = require('../parts/header.js');
const parts_screen = require('../parts/screen.js');

const page_main = require("../page/main.js");
const template = require("../page/template.js");

const db = database();
let header;
let main;
let screen;
let html;
let sql;

//SELECT * FROM board  WHERE `bcode` = 2 ORDER BY `pcode` DESC LIMIT 3;
router.get("/", function(req,res){
    sql = "SELECT * FROM board  WHERE `bcode` = 1 ORDER BY `pcode` DESC LIMIT 5";
    db.query(sql, function (error, res_1, fields) {
        if (error)throw error;
        sql = "SELECT * FROM board  WHERE `bcode` = 2 ORDER BY `pcode` DESC LIMIT 5"
        db.query(sql, function (error, res_2, fields) {
            if (error)throw error;
            header = parts_header(auth.statusUI(req,res));
            main = page_main(res_1, res_2,auth.statusChatId(req,res));
            screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
            html = template(header,main,screen,"<script src='/socket.io/socket.io.js'></script><script src='/js/script_chat.js'></script>");
            res.writeHead(200);
            res.end(html);
        });
    });
});

module.exports = router;