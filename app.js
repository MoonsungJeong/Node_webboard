const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index.js");
const accountRouter = require("./routes/account.js");

const app = express();

const hostname = "192.168.1.223";
const port = 3000;

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

app.listen(port,hostname, function(){
    console.log("Server running at 3000");
})