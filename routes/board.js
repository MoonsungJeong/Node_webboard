const express = require("express");
const router = express.Router();
var path = require('path');

router.get("/total",function(req,res){
    res.end("board");
})
router.get("/free",function(req,res){
    res.end("free board");
})
router.get("/info",function(req,res){
    res.end("info board");
})
router.get("/:postId",function(req,res){
    let postID = path.parse(req.params.postId).base;
    res.end("board list "+postID);
})





module.exports = router;