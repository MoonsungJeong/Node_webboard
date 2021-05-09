const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");

const init = require("./init.js");

const indexRouter = require("./routes/index.js");
const accountRouter = require("./routes/account.js");
const boardRouter = require("./routes/board.js");
const searchRouter = require("./routes/search.js");

// socket -> chating
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection',function(socket){
    console.log('a user connected');
    socket.on('enter', (msg) => {
        //io.emit('enter', msg);
        console.log(msg);
    });
    socket.on('message', (msg) => {
        //console.log('message: ' + msg);
        //console.log(JSON.parse(msg))
        //console.log(JSON.parse(msg).id)
        //console.log(JSON.parse(msg).msg)
        io.emit('message', msg);
    });
})

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'iwanttogotothemoon',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({
        logFn: function(){}
    })
}))

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/board",boardRouter);
app.use("/search",searchRouter);
app.get('*', (req, res) => {
    res.redirect('/')
})

server.listen(init.connect.port, init.connect.hostname, function(){
    console.log("Server running at 3000");
})