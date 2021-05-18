const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");
const database = require("../lib/mysql");

const parts_header = require('../parts/header.js');
const parts_screen = require('../parts/screen.js');

const page_search = require("../page/search_template.js");
const page_read = require("../page/read.js");
const page_comment = require("../page/comment.js");
const template = require("../page/template.js");

const db = database();
let header;
let main;
let screen;
let html;
let sql;

router.get("/:option/:keyword/:pageId",function(req,res){
    const info = req.params; 
    if(info.option === "title") sql = "SELECT * FROM `board` WHERE `btitle` LIKE "+`${db.escape('%'+info.keyword+'%')}`+" ORDER BY `pcode` DESC;";
    if(info.option === "content") sql = "SELECT * FROM `board` WHERE `bcontent` LIKE "+`${db.escape('%'+info.keyword+'%')}`+" ORDER BY `pcode` DESC;";
    if(info.option === "author") sql = "SELECT * FROM `board` WHERE `author` LIKE "+`${db.escape('%'+info.keyword+'%')}`+" ORDER BY `pcode` DESC;";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_search(info.option,info.keyword,info.pageId,"",results);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"");
        res.writeHead(200);
        res.end(html);
    });
})
router.get("/:option/:keyword/:pageId/:postId",function(req,res){       // /:boardId/:pageId/:postId
    const info = req.params;
    sql = "UPDATE `board` SET `bcount` = `bcount` + 1 WHERE `pcode` = "+`${db.escape(info.postId)};`+
            "SELECT * FROM `board` WHERE `pcode` ="+`${db.escape(info.postId)};`;         // post query
    db.query(sql, function (error, results, fields) {      
        if (error)throw error;
        sql_2 = "SELECT `ccode`, comment.pcode, comment.mcode, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`, `cdlt`, `unickname`, board.mcode AS p_mcode from `comment` LEFT JOIN `members` ON comment.mcode = members.mcode LEFT JOIN `board` ON comment.pcode = board.pcode WHERE comment.pcode ="+`${db.escape(info.postId)}`+" ORDER BY `groupnum` DESC, `corder` DESC"; // comment query
        db.query(sql_2, function (error,results_2,fields){
            if (error)throw error;
            main = page_read(results[1][0], page_comment(req,res,results_2,""), auth.statusReadBtn(req,res,results[1][0]), auth.statusComment(req,res,results[1][0]));  // read post
            if(info.option === "title") sql = "SELECT * FROM `board` WHERE `btitle` LIKE "+`${db.escape('%'+info.keyword+'%')}`+" ORDER BY `pcode` DESC;";
            if(info.option === "content") sql = "SELECT * FROM `board` WHERE `bcontent` LIKE "+`${db.escape('%'+info.keyword+'%')}`+" ORDER BY `pcode` DESC;";
            if(info.option === "author") sql = "SELECT * FROM `board` WHERE `author` LIKE "+`${db.escape('%'+info.keyword+'%')}`+" ORDER BY `pcode` DESC;";
            db.query(sql, function (error, results, fields) {
                if (error)throw error;
                header = parts_header(auth.statusUI(req,res));
                main += main = page_search(info.option,info.keyword,info.pageId,info.postId,results);
                screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
                html = template(header,main,screen,
                    "<script src='/js/script_post.js'></script><script src='/js/script_message.js'></script><script src='/js/script_userinfo.js'></script>");
                res.writeHead(200);
                res.end(html);
            })
        })
    })
})
module.exports = router;