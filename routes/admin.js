const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");
const hash = require("../lib/hash");
const database = require("../lib/mysql");
const time = require("../lib/time");
const codec = require("../lib/codec");

const parts_header = require('../parts/header.js');
const parts_screen = require('../parts/screen.js');

const page_board_admin = require("../page/admin_board.js");
const page_member_admin = require("../page/admin_member.js");
const page_member_post = require("../page/admin_member_post.js");
const page_member_comment = require("../page/admin_member_comment.js");
const template = require("../page/template.js");

const init = require("../init.js");

const db = database();
let header;
let main;
let screen;
let html;
let sql;
let sql_2;
let page;

router.get("/member",function(req,res){
    if(!auth.isUser(req,res) || (req.session.code !== init.admin.code)){res.redirect('/');return;}
    sql = "SELECT * FROM `members` WHERE `uid` != 'admin' ORDER BY `udate` DESC;"
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_member_admin(results);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"<script src='/js/script_message.js'></script><script src='/js/script_admin.js'></script>");
        res.writeHead(200);
        res.end(html);
    })
});
router.get("/member/:userId",function(req,res){
    if(!auth.isUser(req,res) || (req.session.code !== init.admin.code)){res.redirect('/');return;}
    let user_code = codec.decode_num(req.params.userId);
    sql = "SELECT `mcode` AS `code`, `unickname` AS nick, `uid` AS id, `uname` AS name, `udate` AS date, `email` AS email, `birthdate` AS birth from `members` WHERE `mcode` = "+`${user_code}`;
    db.query(sql, function(error, results,fields) {
        if (error)throw error;
        results[0].code = codec.code_num(results[0].code);
        results[0].date = time.formatDate_2(results[0].date);
        results[0].birth = time.formatDate_2(results[0].birth);
        const data = JSON.stringify(results[0]);
        res.send(data);
    })
});
router.get("/member/dlt/:userId",function(req,res){
    if(!auth.isUser(req,res) || (req.session.code !== init.admin.code)){res.redirect('/');return;}
    let user_code = codec.decode_num(req.params.userId);
    sql =  "DELETE FROM `comment` using `comment` INNER JOIN `board` ON comment.pcode = board.pcode WHERE board.mcode = "+`'${user_code}';
            DELETE FROM `+"`c1` using `comment` AS c1 INNER JOIN `comment` AS c2 ON c1.groupnum = c2.ccode WHERE c2.mcode = "+`'${user_code}';
            DELETE FROM `+"`comment` WHERE `mcode` = "+`'${user_code}';
            DELETE FROM `+"`board` WHERE `mcode` = "+`'${user_code}';
            DELETE FROM `+"`members` WHERE `mcode` = "+`'${user_code}';
            DELETE FROM `+"`msg` using `message` AS msg LEFT JOIN `members` AS mem1 ON mem1.mcode = msg.recv_code LEFT JOIN `members` AS mem2 ON mem2.mcode = msg.sent_code WHERE mem1.mcode IS NULL and mem2.mcode IS NULL;"
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        res.send(true);
    });
});
router.get("/member/post/:userId",function(req,res){
    if(!auth.isUser(req,res) || (req.session.code !== init.admin.code)){res.redirect('/');return;}
    let user_code = codec.decode_num(req.params.userId);
    sql = "SELECT `pcode`, `btitle`, `bdate`, `bcount` from `board` WHERE mcode = "+`${user_code}`+" ORDER BY `bdate` desc";
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        main = page_member_post(results);
        res.send(main);
    })
});
router.get("/member/comment/:userId",function(req,res){
    if(!auth.isUser(req,res) || (req.session.code !== init.admin.code)){res.redirect('/');return;}
    let user_code = codec.decode_num(req.params.userId);
    sql = "SELECT `c`.`pcode`, `c`.`comment`, `c`.`cdate`, `p`.`btitle` from `comment` AS c INNER JOIN `board` AS p ON c.pcode = p.pcode WHERE c.mcode = "+`${user_code}`+" and cdlt = 0 ORDER BY `cdate` desc";
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        main = page_member_comment(results);
        res.send(main);
    })
});
router.get("/board",function(req,res){
    if(!auth.isUser(req,res) || (req.session.code !== init.admin.code)){res.redirect('/');return;}
    sql = "SELECT `pcode`,`btitle`,`author`,`bdate`,`bcount` FROM `board` ORDER BY `bdate` DESC;"
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_board_admin(results);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"</script><script src='/js/script_admin.js'></script>");
        res.writeHead(200);
        res.end(html);
    })
});
router.get("/board/dlt/:postId",function(req,res){
    if(!auth.isUser(req,res) || (req.session.code !== init.admin.code)){res.redirect('/');return;}
    sql = "DELETE FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
    db.query(sql, function (error, results, fields) {
        res.send(true);
    })            
})
module.exports = router;