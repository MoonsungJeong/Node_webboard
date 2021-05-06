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
//let sql_2;
let page;

router.get("/:option/:keyword/:pageId",function(req,res){
    
})
router.get("/:option/:keyword/:pageId/:postId",function(req,res){
   
})
module.exports = router;