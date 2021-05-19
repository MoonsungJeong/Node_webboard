const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");
const hash = require("../lib/hash");
const database = require("../lib/mysql");
const time = require("../lib/time");

const parts_header = require('../parts/header.js');
const parts_screen = require('../parts/screen.js');

const page_board = require("../page/board_template.js");
const page_write = require("../page/write.js");
const page_read = require("../page/read.js");
const page_comment = require("../page/comment.js");
const page_update = require("../page/update.js");
const template = require("../page/template.js");

const db = database();
let header;
let main;
let screen;
let html;
let sql;
let sql_2;
let page;

router.get("/total/:pageId",function(req,res){
    page = req.params.pageId;
    sql = "SELECT * FROM `board` ORDER BY `pcode` DESC;";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_board("total",page,"",results);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"");
        res.writeHead(200);
        res.end(html);
    });
});
router.get("/free/:pageId",function(req,res){
    page = req.params.pageId;
    sql = "SELECT * FROM `board` WHERE `bcode` = 1 ORDER BY `pcode` DESC;";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_board("free",page,"",results);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"");
        res.writeHead(200);
        res.end(html);
    });
});
router.get("/info/:pageId",function(req,res){
    page = req.params.pageId;
    sql = "SELECT * FROM `board` WHERE `bcode` = 2 ORDER BY `pcode` DESC;";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_board("info",page,"",results);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"");
        res.writeHead(200);
        res.end(html);
    });
});
router.get("/comment/:postId/:pageId", function(req,res){
    sql = "SELECT `ccode`, comment.pcode, comment.mcode, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`, `cdlt`, `unickname`, board.mcode AS p_mcode from `comment` LEFT JOIN `members` ON comment.mcode = members.mcode LEFT JOIN `board` ON comment.pcode = board.pcode WHERE comment.pcode ="+`${db.escape(req.params.postId)}`+" ORDER BY `groupnum` DESC, `corder` DESC"; // comment query
    db.query(sql, function (error,results,fields){
        if (error)throw error;
        res.send(page_comment(req,res,results,req.params.pageId));
     })
});
router.get("/:boardId/:pageId/:postId",function(req,res){
    if(!Number.isInteger(parseInt(req.params.postId))){res.redirect("/");return;}
    page = req.params.pageId;
    sql = "UPDATE `board` SET `bcount` = `bcount` + 1 WHERE `pcode` = "+`${db.escape(req.params.postId)};`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        sql = "SELECT * FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)};`;         // post query
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            sql_2 = "SELECT `ccode`, comment.pcode, comment.mcode, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`, `cdlt`, `unickname`, board.mcode AS p_mcode from `comment` LEFT JOIN `members` ON comment.mcode = members.mcode LEFT JOIN `board` ON comment.pcode = board.pcode WHERE comment.pcode ="+`${db.escape(req.params.postId)}`+" ORDER BY `groupnum` DESC, `corder` DESC"; // comment query
            db.query(sql_2, function (error,results_2,fields){
                if (error)throw error;
                main = page_read(results[0], page_comment(req,res,results_2,""), auth.statusReadBtn(req,res,results[0]), auth.statusComment(req,res,results[0]));  // read post
                if(req.params.boardId === 'total')sql = "SELECT * FROM `board` ORDER BY `pcode` DESC;";
                if(req.params.boardId === 'free')sql = "SELECT * FROM `board` WHERE `bcode` = 1 ORDER BY `pcode` DESC;";
                if(req.params.boardId === 'info')sql = "SELECT * FROM `board` WHERE `bcode` = 2 ORDER BY `pcode` DESC;";
                db.query(sql, function (error, results, fields) {
                    if (error)throw error;
                    header = parts_header(auth.statusUI(req,res));
                    main += page_board(req.params.boardId, page, req.params.postId, results);    // attach board bottom
                    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
                    html = template(header,main,screen,
                        "<script src='/js/script_post.js'></script><script src='/js/script_message.js'></script><script src='/js/script_userinfo.js'></script>");
                    res.writeHead(200);
                    res.end(html);
                });
            });
        });
    });
});
router.post("/comment/new",function(req,res){
    const ip = req.connection.remoteAddress;
    const date = time.currentTime();
    sql =   "INSERT INTO `comment` (`pcode`, `mcode`, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`)" 
            +` VALUES (${db.escape(req.body.post)},${req.session.code},${db.escape(req.body.content)},${db.escape(req.body.class)}, 0, -1, ${db.escape(date)}, ${db.escape(ip)});
            SELECT LAST_INSERT_ID();`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        sql = "UPDATE `comment` SET `groupnum` = "+ `${results[1][0]['LAST_INSERT_ID()']} WHERE `+"`ccode` = "+`${results[1][0]['LAST_INSERT_ID()']}`;
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            sql = "SELECT `ccode`, comment.pcode, comment.mcode, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`, `cdlt`, `unickname`, board.mcode AS p_mcode from `comment` LEFT JOIN `members` ON comment.mcode = members.mcode LEFT JOIN `board` ON comment.pcode = board.pcode WHERE comment.pcode ="+`${db.escape(req.body.post)}`+" ORDER BY `groupnum` DESC, `corder` DESC"; // comment query
            db.query(sql, function (error,results,fields){
                if (error)throw error;
                res.send(page_comment(req,res,results,""));
            })
        })
    })
});
router.post("/comment/:ccodeId",function(req,res){
    const ip = req.connection.remoteAddress;
    const date = time.currentTime();
    if(!auth.isUser(req,res)){
        res.send("no");
        return;
    }
    sql = "SELECT `corder` FROM `comment` WHERE `groupnum` =" + `${db.escape(req.params.ccodeId)}` + " ORDER BY `corder` DESC LIMIT 1";
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        sql =   "INSERT INTO `comment` (`pcode`, `mcode`, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`)" 
            +` VALUES (${db.escape(req.body.post)},${req.session.code},${db.escape(req.body.content)},${db.escape(req.body.class)}, ${db.escape(results[0].corder+1)}, ${db.escape(req.params.ccodeId)}, ${db.escape(date)}, ${db.escape(ip)});`;
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            sql = "SELECT `ccode`, comment.pcode, comment.mcode, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`, `cdlt`, `unickname`, board.mcode AS p_mcode from `comment` LEFT JOIN `members` ON comment.mcode = members.mcode LEFT JOIN `board` ON comment.pcode = board.pcode WHERE comment.pcode ="+`${db.escape(req.body.post)}`+" ORDER BY `groupnum` DESC, `corder` DESC"; // comment query
            db.query(sql, function (error,results,fields){
                if (error)throw error;
                res.send(page_comment(req,res,results,""));
            })
        })         
    })
});
router.delete("/comment/:ccodeId",function(req,res){
    let postId;
    if(!auth.isUser(req,res)){
        res.send("no");
        return;
    }
    sql = "SELECT * from `comment` WHERE `ccode` = "+`${db.escape(req.params.ccodeId)};`;
    db.query(sql, function(error, results, fields){
        if(error)throw error;
        postId = results[0]['pcode'];
        if(results[0]['mcode'] != req.session.code){
            res.send("no");
            return;
        }
        sql = "UPDATE `comment` SET `cdlt` = '1' WHERE `ccode` = "+`${db.escape(req.params.ccodeId)};`;
        db.query(sql, function(error, results,fields){
            if(error)throw error;
            sql = "SELECT `ccode`, comment.pcode, comment.mcode, `comment`, `cclass`, `corder`, `groupnum`, `cdate`, `cip`, `cdlt`, `unickname`, board.mcode AS p_mcode from `comment` LEFT JOIN `members` ON comment.mcode = members.mcode LEFT JOIN `board` ON comment.pcode = board.pcode WHERE comment.pcode ="+`${db.escape(postId)}`+" ORDER BY `groupnum` DESC, `corder` DESC"; // comment query
            db.query(sql, function (error,results,fields){
                if (error)throw error;
                res.send(page_comment(req,res,results,""));
            }) 
        })
    })
});
router.get("/new",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_write(auth.statusWrite(req,res));
    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
    html = template(header,main,screen,"<script src='/js/script_write.js'></script>");
    res.writeHead(200);
    res.end(html);
});
router.post("/new",function(req,res){
    const info = req.body;
    let mcode;
    const ip = req.connection.remoteAddress;
    const hashedPW = hash.generate(info.password);
    const date = time.currentTime();
    if(auth.isUser(req,res)){
        sql = "SELECT mcode FROM `members` WHERE `mcode` =" + `${req.session.code};`;
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            mcode = results[0].mcode;
            sql = "INSERT INTO `board` (`bcode`, `mcode`, `btitle`, `bcontent`, `bdate`, `bip`, `author`, `ppwd`)"
                         +` VALUES (${db.escape(info.board)},${db.escape(mcode)},${db.escape(info.title)},${db.escape(info.content)},${db.escape(date)}, ${db.escape(ip)}, '${req.session.nickname}', NULL);`;
            db.query(sql, function (error, results, fields) {
                if (error)throw error;
                res.redirect('/board/total/1');
            });    
        });    
    }else{
        sql = "INSERT INTO `board` (`bcode`, `mcode`, `btitle`, `bcontent`, `bdate`, `bip`, `author`, `ppwd`)"
                         +` VALUES (${db.escape(info.board)},'0',${db.escape(info.title)},${db.escape(info.content)},${db.escape(date)}, ${db.escape(ip)}, ${db.escape(info.author)}, ${db.escape(hashedPW)});`;
        db.query(sql, function (error, results, fields) {
            if (error)throw error;
            res.redirect('/board/total/1');
        });
    }
});
router.post("/review/:postId",function(req,res){
    if(auth.isUser(req,res)){
        sql = "SELECT * FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)}`;
        db.query(sql, function (error, results, fields){
            if(results[0].mcode === req.session.code){
                req.session.post = hash.generate(req.params.postId);
                res.send("ok");
            }else{
                res.send("no");
            }
        })
    }else{
        if(req.body.pw != null){
            sql = "SELECT * FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)}`;
            db.query(sql, function (error, results, fields){
                if(hash.check(req.body.pw,results[0].ppwd)){
                    req.session.post = hash.generate(req.params.postId);
                    res.send("ok");
                }else{
                    res.send("no");
                }
            });
        }else{
            res.send("password");
        }
    }
});
router.get("/review/:postId",function(req,res){
    if(req.session.post == null){   // unexpected access
        res.redirect("/");
        return;
    } 
    if(hash.check(req.params.postId,req.session.post)){
        sql = "SELECT * FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)}`;
        db.query(sql, function (error, results, fields){
            header = parts_header(auth.statusUI(req,res));
            main = page_update(results[0].pcode, results[0].btitle, results[0].bcontent, results[0].bcode);
            screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
            html = template(header,main,screen,"<script src='/js/script_update.js'></script>");
            res.writeHead(200);
            res.end(html);
        });
    }else{  // wrong user access
        delete req.session.post;
        req.session.save();
        res.redirect("/");
    }
});
router.put("/review/:postId",function(req,res){
    if(req.session.post == null){   // unexpected access
        res.redirect("/");
        return;
    }
    if(hash.check(req.params.postId,req.session.post)){
        sql = "UPDATE `board` SET `bcode` = "+`${db.escape(req.body.board)},`+" `btitle` = "+`${db.escape(req.body.title)},`+" `bcontent` = "+`${db.escape(req.body.content)} `+"WHERE `board`.`pcode` = "+`${db.escape(req.params.postId)};`;
        db.query(sql, function (error, results, fields){
            if (error)throw error;
            delete req.session.post;
            req.session.save();
            res.send(true);
        });
    }
});
router.delete("/list/:postId",function(req,res){
    if(auth.isUser(req,res)){
        sql = "SELECT * FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)}`;
        db.query(sql, function (error, results, fields){
            if(results[0].mcode === req.session.code){
                sql = "DELETE FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)}`;
                db.query(sql, function (error, results, fields){
                    res.send("ok");
                })
            }else{
                res.send("no");
            }
        })
    }else{
        if(req.body.pw != null){
            sql = "SELECT * FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)};`;
            db.query(sql, function (error, results, fields){
                if(hash.check(req.body.pw,results[0].ppwd)){
                    sql = "DELETE FROM `board` WHERE `pcode` ="+`${db.escape(req.params.postId)};`;
                    db.query(sql, function (error, results, fields){
                        res.send("ok");
                    })
                }else{
                    res.send("no");
                }
            });
        }else{
            res.send("password");
        }
    }
});
router.get("/cancel",function(req,res){
    delete req.session.post;
    req.session.save();
});
module.exports = router;