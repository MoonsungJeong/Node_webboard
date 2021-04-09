const express = require("express");
const router = express.Router();

const init = require("../init.js");

const auth = require("../lib/auth");
const hash = require("../lib/hash");
const database = require("../lib/mysql");
const time = require("../lib/time");
const mailer = require("../lib/mail.js");

const parts_header = require('../parts/header.js');
const parts_screen = require('../parts/screen.js');

const page_info = require("../page/info_template.js");

const page_login = require("../page/login.js");
const page_signup = require("../page/sign-up.js");
const page_lost = require("../page/lost.js");
const page_reset = require("../page/lost_reset.js");
const page_wrong = require("../page/lost_wrong.js");
const template = require("../page/template.js");

const db = database();
let header;
let main;
let screen;
let html;
let sql;

router.get("/login",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_login();
    screen = parts_screen(auth.statusScreenBtn(req,res));
    html = template(header,main,screen,"<script src='/js/script_login.js'></script>");
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
    screen = parts_screen(auth.statusScreenBtn(req,res));
    html = template(header,main,screen,"<script src='/js/script_signup.js'></script>");
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
    screen = parts_screen(auth.statusScreenBtn(req,res));
    html = template(header,main,screen,"<script src='/js/script_lost.js'></script>");
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
            const key = hash.generate(`${Math.random()}`).replace('/','');
            const ttl = time.currentTime();
            sql = "UPDATE `members` SET `uauth` = " +`'{"key":"${key}", "ttl":"${ttl}"}'`+ "WHERE `mcode` = "+`'${results[0].mcode}';`;
            db.query(sql, function(error, results_2, fields){
                const link = init.connect.address+'/account/lost/'+key;
                mailer(results[0].email, 'Kangaroo password reset', `<p>Hi! This is Admin of Kangaroo website!</p><br><p>This is your password reset link: <a href="${link}">${link}</a></p><br><p>This link last for 24hours</p>`);
                res.send(`<div class="padding_1">Sent reset password page to<span class="f_size_c"> <br> your Email!</span></div>`);
            })
        }else{
            res.send(false)
        }
    })
})
router.get("/lost/:keyId",function(req,res){
    sql = "SELECT * FROM `members` WHERE "+ `json_extract(uauth, '$."key"') = '${req.params.keyId}'`; // key check
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0] != undefined){
            const ttl = JSON.parse(results[0].uauth)['ttl'];
            if(time.timeDifference(ttl) <= 1){      // ttl check 
                    header = parts_header(auth.statusUI(req,res));
                    main = page_reset(results[0].uid,results[0].mcode,`${req.params.keyId}`);
                    screen = parts_screen(auth.statusScreenBtn(req,res));
                    html = template(header,main,screen,"<script src='/js/script_reset.js'></script>");
                    res.writeHead(200);
                    res.end(html);
            }else{  // timeout
                header = parts_header(auth.statusUI(req,res));
                main = page_wrong("The link is expired");
                screen = parts_screen(auth.statusScreenBtn(req,res));
                html = template(header,main,screen,"");
                res.writeHead(200);
                res.end(html);
            }
        }else{  // wrong link
            header = parts_header(auth.statusUI(req,res));
            main = page_wrong("This is wrong link");
            screen = parts_screen(auth.statusScreenBtn(req,res));
            html = template(header,main,screen,"");
            res.writeHead(200);
            res.end(html);
        }
    })
})
router.post("/lost",function(req,res){
    const hashedPW = hash.generate(req.body.password);
    sql = "SELECT * FROM `members` WHERE `mcode` = "+`'${req.body.code}'`+" AND "+`json_extract(uauth, '$."key"') = '${req.body.key}'`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0] != undefined){
            const ttl = JSON.parse(results[0].uauth)['ttl'];
            if(time.timeDifference(ttl) <= 1){      // ttl check 
                sql = "UPDATE `members` SET `upwd` = "+`'${hashedPW}',`+ " `uauth` = "+`NULL`+
                    " WHERE `mcode` = "+`'${req.body.code}'`+" AND "+`json_extract(uauth, '$."key"') = '${req.body.key}'`;
                db.query(sql,function(error,results_2,fields){
                    if (error)throw error;
                    req.session.destroy(function(err){
                        res.send(true); 
                    });
                })
            }else{  //timeout
                res.send(false);
            }
        }else{  // wrong link
            res.send(false);
        }
    })    
})
router.get("/info/page",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    sql = "SELECT `pcode`, `btitle` from `board` WHERE mcode = "+`${req.session.code}`+" ORDER BY `bdate` desc limit 3";
        db.query(sql, function (error, results, fields) {
        if(error)throw error;
        sql = "SELECT `pcode`, `comment` from `comment` WHERE mcode = "+`${req.session.code}`+" and cdlt = 0 ORDER BY `cdate` desc limit 3";
        db.query(sql, function (error, results_2, fields) {
            if(error)throw error;
            sql = "SELECT `p`.`pcode`, `c`.`comment` from `board` AS p INNER JOIN `comment` AS c ON p.pcode = c.pcode WHERE p.mcode = "+`${req.session.code}`+ " and p.mcode != c.mcode and c.cclass = 0 and c.cdlt = 0 ORDER BY `cdate` desc limit 3";
            db.query(sql, function (error, results_3, fields) {
                if(error)throw error;
                sql = "SELECT `c1`.`pcode`, `c2`.`comment` from `comment` AS c1 INNER JOIN `comment` AS c2 ON c1.ccode = c2.groupnum WHERE c1.mcode = "+`${req.session.code}`+" and c1.mcode != c2.mcode and c1.cdlt = 0 ORDER BY c2.cdate desc limit 3";
                db.query(sql, function (error, results_4, fields) {
                    if(error)throw error;
                    sql = "SELECT `unickname`,`udate` from `members` where mcode="+`${req.session.code}`;
                    db.query(sql, function (error, results_5, fields) {
                        if(error)throw error;
                        header = parts_header(auth.statusUI(req,res));
                        main = page_info("page",results,results_2,results_3,results_4,results_5);
                        screen = parts_screen(auth.statusScreenBtn(req,res));
                        html = template(header,main,screen,"");
                        res.writeHead(200);
                        res.end(html);
                    });
                });
            });
        });
    });
})
router.get("/info/post/:pageNum",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    sql = "SELECT `pcode`, `btitle`, `bdate`, `bcount` from `board` WHERE mcode = "+`${req.session.code}`+" ORDER BY `bdate` desc";
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_info("post",results,req.params.pageNum);
        screen = parts_screen(auth.statusScreenBtn(req,res));
        html = template(header,main,screen,"");
        res.writeHead(200);
        res.end(html);
    })
})
router.get("/info/comment/:pageNum",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    sql = "SELECT `pcode`, `comment`, `cdate` from `comment` WHERE mcode = "+`${req.session.code}`+" and cdlt = 0 ORDER BY `cdate` desc";
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_info("comment",results,req.params.pageNum);
        screen = parts_screen(auth.statusScreenBtn(req,res));
        html = template(header,main,screen,"");
        res.writeHead(200);
        res.end(html);
    })
})
router.get("/info/message",function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_info("message","");
    screen = parts_screen(auth.statusScreenBtn(req,res));
    html = template(header,main,screen,"");
    res.writeHead(200);
    res.end(html);
})
router.get("/info/info",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    sql = "SELECT `mcode`, `uname`, `unickname`, `birthdate`, `email` from `members` WHERE mcode = "+`${req.session.code}`;
    db.query(sql, function (error, results, fields) {
        header = parts_header(auth.statusUI(req,res));
        main = page_info("info",results);
        screen = parts_screen(auth.statusScreenBtn(req,res));
        html = template(header,main,screen,"<script src='/js/script_info.js'></script>");
        res.writeHead(200);
        res.end(html);
    })
})
router.post("/info/info",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    if(req.session.code != req.body.id){res.redirect('/');return;}
    sql = "UPDATE `members` SET `uname` = "+`'${req.body.name}'`+", `unickname` = "+`'${req.body.nickname}'`+", `birthdate` = "+`'${req.body.birth}'`+", `email` = "+`'${req.body.email}'`+" WHERE `mcode` = "+`'${req.body.id}'`;
    db.query(sql, function (error, results, fields) {
        req.session.nickname=req.body.nickname;
        req.session.save(function(){
            res.send(true);
        })
    })
})
router.get("/info/pw",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    header = parts_header(auth.statusUI(req,res));
    main = page_info("pw",req.session.code);
    screen = parts_screen(auth.statusScreenBtn(req,res));
    html = template(header,main,screen,"<script src='/js/script_info.js'></script>");
    res.writeHead(200);
    res.end(html);
})
router.post("/info/pw",function(req,res){
    let hashedPW;
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    if(req.session.code != req.body.id){res.redirect('/');return;}
    sql = "SELECT `upwd` FROM `members` WHERE `mcode` = " + `'${req.body.id}';`
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] !== undefined){
            if(!hash.check(req.body.pw,results[0]['upwd'])){ // incorrect
                res.send(false);
                return;
            }                                             // correct
            hashedPW = hash.generate(req.body.new_pw);
            sql = "UPDATE `members` SET `upwd` = "+`'${hashedPW}'`+" WHERE `mcode` = "+`'${req.body.id}'`;
            db.query(sql, function (error, results, fields) {
                if(error)throw error;
                res.send(true);
                return;   
            })
            return;
        }
        res.send(false);
    })
})
router.get("/info/dlt",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    header = parts_header(auth.statusUI(req,res));
    main = page_info("dlt",req.session.code);
    screen = parts_screen(auth.statusScreenBtn(req,res));
    html = template(header,main,screen,"<script src='/js/script_info.js'></script>");
    res.writeHead(200);
    res.end(html);
})
router.post("/info/dlt",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    if(req.session.code != req.body.id){res.redirect('/');return;}
    sql = "SELECT `upwd` FROM `members` WHERE `mcode` = " + `'${req.body.id}';`
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] !== undefined){
            if(!hash.check(req.body.pw,results[0]['upwd'])){ // incorrect
                res.send(false);
                return;
            }                                             // correct
            sql = "DELETE FROM `comment` using `comment` INNER JOIN `board` ON comment.pcode = board.pcode WHERE board.mcode = "+`'${req.body.id}';
                   DELETE FROM `+"`c1` using `comment` AS c1 INNER JOIN `comment` AS c2 ON c1.groupnum = c2.ccode WHERE c2.mcode = "+`'${req.body.id}';
                   DELETE FROM `+"`comment` WHERE `mcode` = "+`'${req.body.id}';
                   DELETE FROM `+"`board` WHERE `mcode` = "+`'${req.body.id}';
                   DELETE FROM `+"`members` WHERE `mcode` = "+`'${req.body.id}';`
                // DELETE FROM `message` WHERE `mcode` = ${req.body.id};
            db.query(sql, function (error, results, fields) {
                if(error)throw error;
                req.session.destroy(function(err){
                    res.send(true);
                });
            })
            return;
        }
        res.send(false);
    })
})
module.exports = router;