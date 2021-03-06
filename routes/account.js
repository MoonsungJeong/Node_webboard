const express = require("express");
const router = express.Router();

const init = require("../init.js");

const auth = require("../lib/auth");
const hash = require("../lib/hash");
const database = require("../lib/mysql");
const time = require("../lib/time");
const codec = require("../lib/codec");
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
    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
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
    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
    html = template(header,main,screen,"<script src='/js/script_signup.js'></script>");
    res.writeHead(200);
    res.end(html);
});
router.post("/login",function(req,res){
    const info = req.body;
    sql = "SELECT * FROM `members` WHERE `uid` = " + `${db.escape(info.id)};`;
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] !== undefined){
            sql = "SELECT * FROM `members` WHERE `uid` = " + `${db.escape(info.id)};`;
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
    +` VALUES (${db.escape(code)}, ${db.escape(info.id)}, ${db.escape(hashedPW)}, ${db.escape(info.name)}, ${db.escape(info.nickname)}, ${db.escape(info.email)}, ${db.escape(date)}, ${db.escape(ip)}, ${db.escape(info.birth)});`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        res.send(true);
    });
});
router.post("/form-check",function(req,res){
    sql = "SELECT COUNT(*) FROM `members` WHERE `"+`${req.body.column}`+"` = "+`${db.escape(req.body.value)};`; 
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
    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
    html = template(header,main,screen,"<script src='/js/script_lost.js'></script>");
    res.writeHead(200);
    res.end(html);
})
router.post("/lost/id",function(req,res){
    sql = "SELECT * FROM `members` WHERE `uname` = " + `${db.escape(req.body.name)}` + " AND `email` = " + `${db.escape(req.body.email)};`
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
    sql = "SELECT * FROM `members` WHERE `uname` = " + `${db.escape(req.body.name)}` + " AND `uid` = " + `${db.escape(req.body.id)};`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0] != undefined){
            const key = hash.generate(`${Math.random()}`).replace('/','');
            const ttl = time.currentTime();
            sql = "UPDATE `members` SET `uauth` = " +`'{"key":"${key}", "ttl":"${ttl}"}'`+ " WHERE `mcode` = "+`${db.escape(results[0].mcode)};`;
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
    sql = "SELECT * FROM `members` WHERE "+ `json_extract(uauth, '$."key"') = ${db.escape(req.params.keyId)}`; // key check
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0] != undefined){
            const ttl = JSON.parse(results[0].uauth)['ttl'];
            if(time.timeDifference(ttl) <= 1){      // ttl check 
                    header = parts_header(auth.statusUI(req,res));
                    main = page_reset(results[0].uid,codec.code_num(results[0].mcode),`${req.params.keyId}`);
                    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
                    html = template(header,main,screen,"<script src='/js/script_reset.js'></script>");
                    res.writeHead(200);
                    res.end(html);
            }else{  // timeout
                header = parts_header(auth.statusUI(req,res));
                main = page_wrong("The link is expired");
                screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
                html = template(header,main,screen,"");
                res.writeHead(200);
                res.end(html);
            }
        }else{  // wrong link
            header = parts_header(auth.statusUI(req,res));
            main = page_wrong("This is wrong link");
            screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
            html = template(header,main,screen,"");
            res.writeHead(200);
            res.end(html);
        }
    })
})
router.post("/lost",function(req,res){
    const hashedPW = hash.generate(req.body.password);
    const user_code = codec.decode_num(req.body.code);
    sql = "SELECT * FROM `members` WHERE `mcode` = "+`${db.escape(user_code)}`+" AND "+`json_extract(uauth, '$."key"') = ${db.escape(req.body.key)}`;
    db.query(sql, function (error, results, fields) {
        if (error)throw error;
        if(results[0] != undefined){
            const ttl = JSON.parse(results[0].uauth)['ttl'];
            if(time.timeDifference(ttl) <= 1){      // ttl check 
                sql = "UPDATE `members` SET `upwd` = "+`'${hashedPW}',`+ " `uauth` = "+`NULL`+
                    " WHERE `mcode` = "+`${db.escape(user_code)}`+" AND "+`json_extract(uauth, '$."key"') = ${db.escape(req.body.key)}`;
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
                        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
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
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
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
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"");
        res.writeHead(200);
        res.end(html);
    })
})
router.get("/info/message/:Status/:pageNum",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    if(req.params.Status  === "recv"){sql = "SELECT message.*, members.unickname, members.mcode from  `message` LEFT JOIN `members` ON `sent_code` = `mcode` WHERE `recv_code` = "+`'${req.session.code}'`+"and `recv_del` = '0' ORDER BY `ndate` DESC";}
    if(req.params.Status  === "sent"){sql = "SELECT message.*, members.unickname, members.mcode from  `message` LEFT JOIN `members` ON `recv_code` = `mcode` WHERE `sent_code` = "+`'${req.session.code}'`+"and `recv_del` = '0' ORDER BY `ndate` DESC";}
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        header = parts_header(auth.statusUI(req,res));
        main = page_info("message",results,req.params.Status,req.params.pageNum);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"<script src='/js/script_message.js'></script>");
        res.writeHead(200);
        res.end(html);
    })
})
router.post("/info/message",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    let date = time.currentTime();
    if(req.body.hidden_id === ""){sql = "SELECT `mcode` from  `members` WHERE `uid` = "+`${db.escape(req.body.id)}`;}
    if(req.body.hidden_id !== ""){sql = "SELECT `mcode` from  `members` WHERE `mcode` = "+`${db.escape(codec.decode_num(req.body.hidden_id))}`;}
    
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] !== undefined){
            sql = "INSERT INTO `message` (`recv_code`, `sent_code`, `ncontent`, `ndate`)"
                         +` VALUES ('${results[0].mcode}','${req.session.code}',${db.escape(req.body.content)}, '${date}');`;
            db.query(sql, function (error, results, fields) {
                if(error)throw error;
                res.send(true);
            })
            return;
        }
        res.send(false);
    })
})
router.delete("/info/message/delete",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    let i;
    let item = Object.values(req.body).map(x => Number(x));
    sql="";
    for(i=0; i< item.length; i++){
        sql += ("UPDATE `message` SET `recv_del` = '1' WHERE `ncode` = "+`${db.escape(item[i])};`);
    } 
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        res.send(true);
    })
})
router.post("/info/message/user",function(req,res){
    if(!auth.isUser(req,res)){res.send(false);return;}
    let user_code = codec.decode_num(req.body.code);
    sql = "SELECT `unickname` from  `members` WHERE `mcode` = "+`${db.escape(user_code)}`;
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] === undefined || results[0].unickname ==='guest'){res.send({0:`Deleted User`, 1:``}); return;}
        res.send({0:`${results[0].unickname}`, 1:`${codec.code_num(user_code)}`});
    })
})
router.get("/info/info",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    sql = "SELECT `mcode`, `uname`, `unickname`, `birthdate`, `email` from `members` WHERE mcode = "+`${req.session.code}`;
    db.query(sql, function (error, results, fields) {
        header = parts_header(auth.statusUI(req,res));
        main = page_info("info",results);
        screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
        html = template(header,main,screen,"<script src='/js/script_info.js'></script>");
        res.writeHead(200);
        res.end(html);
    })
})
router.post("/info/info",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;};
    const user_code = codec.decode_num(req.body.id);
    if(req.session.code != user_code){res.redirect('/');return;};
    sql = "UPDATE `members` SET `uname` = "+`${db.escape(req.body.name)}`+", `unickname` = "+`${db.escape(req.body.nickname)}`+", `birthdate` = "+`${db.escape(req.body.birth)}`+", `email` = "+`${db.escape(req.body.email)}`+" WHERE `mcode` = "+`${db.escape(user_code)};`;
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
    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
    html = template(header,main,screen,"<script src='/js/script_info.js'></script>");
    res.writeHead(200);
    res.end(html);
})
router.post("/info/pw",function(req,res){
    let hashedPW;
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    const user_code = codec.decode_num(req.body.id);
    if(req.session.code != user_code){res.redirect('/');return;}
    sql = "SELECT `upwd` FROM `members` WHERE `mcode` = " + `${db.escape(user_code)};`
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] !== undefined){
            if(!hash.check(req.body.pw,results[0]['upwd'])){ // incorrect
                res.send(false);
                return;
            }                                             // correct
            hashedPW = hash.generate(req.body.new_pw);
            sql = "UPDATE `members` SET `upwd` = "+`'${hashedPW}'`+" WHERE `mcode` = "+`${db.escape(user_code)}`;
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
    screen = parts_screen(auth.statusScreenBtn(req,res),auth.statusAdminBtn(req,res),auth.statusAdminPanel(req,res));
    html = template(header,main,screen,"<script src='/js/script_info.js'></script>");
    res.writeHead(200);
    res.end(html);
})
router.post("/info/dlt",function(req,res){
    if(!auth.isUser(req,res)){res.redirect('/');return;}
    const user_code = codec.decode_num(req.body.id);
    if(req.session.code != user_code){res.redirect('/');return;}
    sql = "SELECT `upwd` FROM `members` WHERE `mcode` = " + `${db.escape(user_code)};`
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        if(results[0] !== undefined){
            if(!hash.check(req.body.pw,results[0]['upwd'])){ // incorrect
                res.send(false);
                return;
            }                                             // correct
            sql = "DELETE FROM `comment` using `comment` INNER JOIN `board` ON comment.pcode = board.pcode WHERE board.mcode = "+`${db.escape(user_code)};
                   DELETE FROM `+"`c1` using `comment` AS c1 INNER JOIN `comment` AS c2 ON c1.groupnum = c2.ccode WHERE c2.mcode = "+`${db.escape(user_code)};
                   DELETE FROM `+"`comment` WHERE `mcode` = "+`${db.escape(user_code)};
                   DELETE FROM `+"`board` WHERE `mcode` = "+`${db.escape(user_code)};
                   DELETE FROM `+"`members` WHERE `mcode` = "+`${db.escape(user_code)};
                   DELETE FROM `+"`msg` using `message` AS msg LEFT JOIN `members` AS mem1 ON mem1.mcode = msg.recv_code LEFT JOIN `members` AS mem2 ON mem2.mcode = msg.sent_code WHERE mem1.mcode IS NULL and mem2.mcode IS NULL;";
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
router.post("/user/info",function(req,res){
    let user_code = codec.decode_num(req.body.code);
    sql = "SELECT `mcode` AS `code`, `unickname` AS `nick`, `udate` AS `date` FROM `members` WHERE `mcode` = "+`${db.escape(user_code)};`+
          "SELECT `pcode` AS `code`, `btitle` AS `title` FROM `board` WHERE `mcode` = "+`${db.escape(user_code)}`+" ORDER BY `bdate` desc limit 3;"+
          "SELECT `pcode` AS `code`, `comment` FROM `comment` WHERE `mcode` = "+`${db.escape(user_code)}`+" ORDER BY `cdate` desc limit 3;";
    db.query(sql, function (error, results, fields) {
        if(error)throw error;
        results[0][0].code = codec.code_num(results[0][0].code);
        results[0][0].date = time.formatDate_3(results[0][0].date);
        const data = JSON.stringify(results);
        res.send(data); 
    })
})
module.exports = router;