const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");

const init = require("./init.js");

const indexRouter = require("./routes/index.js");
const accountRouter = require("./routes/account.js");
const boardRouter = require("./routes/board.js");
const searchRouter = require("./routes/search.js");

const app = express();

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

app.listen(init.connect.port, init.connect.hostname, function(){
    console.log("Server running at 3000");
})