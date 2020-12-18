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
const page_update = require("../page/update.js");
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
        main = page_board("total",page,results);
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
        main = page_board("free",page,results);
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
        main = page_board("info",page,results);
        html = template(header,main,"");
        res.writeHead(200);
        res.end(html);
    });
})
router.get("/:boardId/:pageId/:postId",function(req,res){
    sql = "SELECT * FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
    db.query(sql, function (error, results, fields) {      
        if (error)throw error;
        main = page_read(results[0],auth.statusReadBtn(req,res,results[0]));  // read post
        if(req.params.boardId === 'total')
            sql = "SELECT * FROM `board` ORDER BY `pcode` DESC;";
        if(req.params.boardId === 'free')
            sql = "SELECT * FROM `board` WHERE `bcode` = 1 ORDER BY `pcode` DESC;";
        if(req.params.boardId === 'info')
            sql = "SELECT * FROM `board` WHERE `bcode` = 2 ORDER BY `pcode` DESC;";    
        db.query(sql, function (error, results, fields) {
            if (error)throw error;    
            header = parts_header(auth.statusUI(req,res));
            main += page_board(req.params.boardId, req.params.pageId, results);    // attach board bottom
            html = template(header,main,"<script src='/js/script_post.js'></script>");
            res.writeHead(200);
            res.end(html);
        })
    })
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
router.post("/review/:postId",function(req,res){
    if(auth.isUser(req,res)){
        sql = "SELECT * FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
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
            sql = "SELECT * FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
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
    if(req.session.post == null){
        console.log("unexpected access");
        res.redirect("/");
        return;
    } 
    if(hash.check(req.params.postId,req.session.post)){
        sql = "SELECT * FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
        db.query(sql, function (error, results, fields){
            header = parts_header(auth.statusUI(req,res));
            main = page_update(results[0].pcode, results[0].btitle, results[0].bcontent, results[0].bcode);
            html = template(header,main,"<script src='/js/script_update.js'></script>");
            res.writeHead(200);
            res.end(html);
        });
    }else{
        console.log("wrong user access");
        delete req.session.post;
        req.session.save();
        res.redirect("/");
    }
});
router.put("/review/:postId",function(req,res){
    if(req.session.post == null){
        console.log("unexpected access");
        res.redirect("/");
        return;
    }
    if(hash.check(req.params.postId,req.session.post)){
        sql = "UPDATE `board` SET `bcode` = "+`'${req.body.board}',`+" `btitle` = "+`'${req.body.title}',`+" `bcontent` = "+`'${req.body.content}' `+"WHERE `board`.`pcode` = "+`${req.params.postId};`;
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
        sql = "SELECT * FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
        db.query(sql, function (error, results, fields){
            if(results[0].mcode === req.session.code){
                sql = "DELETE FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
                db.query(sql, function (error, results, fields){
                    res.send("ok");
                })
            }else{
                res.send("no");
            }
        })
    }else{
        if(req.body.pw != null){
            sql = "SELECT * FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
            db.query(sql, function (error, results, fields){
                if(hash.check(req.body.pw,results[0].ppwd)){
                    sql = "DELETE FROM `board` WHERE `pcode` ="+`'${req.params.postId}'`;
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
})
router.get("/cancel",function(req,res){
    delete req.session.post;
    req.session.save();
});
module.exports = router;