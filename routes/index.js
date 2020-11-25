const express = require("express");
const router = express.Router();

const auth = require("../lib/auth");

const parts_header = require('../parts/header.js');

const page_main = require("../page/main.js");
const template = require("../page/template.js");

let header;
let main;
let html;

router.get("/", function(req,res){
    header = parts_header(auth.statusUI(req,res));
    main = page_main();
    html = template(header,main,"");
    res.writeHead(200);
    res.end(html);
});

module.exports = router;