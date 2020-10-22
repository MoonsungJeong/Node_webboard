const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql      = require('mysql');

const hostname = '127.0.0.1';
const port = 3000;
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'mysql'
});

db.connect();

db.query('SELECT host,user from user', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0]);
});   
db.end();

const mimeType = {
    "": "text/html",
    ".ico": "image/x-icon",
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".eot": "aplication/vnd.ms-fontobject",
    ".ttf": "aplication/font-sfnt",
}


const app = http.createServer(function(req, res){
    const ext = path.parse(req.url).ext;
    const publicPath = path.join(__dirname, "./public")
    let filePath;
    let url = req.url;
    console.log(ext);
    if(req.url == '/'){
        url = '/index.html';
    }
    if(req.url == '/favicon.ico'){
        return res.writeHead(404);
    }
    filePath = publicPath+url;
    
    fs.readFile(filePath, function(err, data){
        if(err){
            res.statusCode = 404;
            res.end('Not found');
        }else{
            res.statusCode = 200;
            res.setHeader("Content-Type", mimeType[ext]);
            res.end(data);
        }
    })
});

app.listen(port,hostname, function(){
    console.log("Server running at 3000");
})