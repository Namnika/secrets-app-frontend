require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const cookieParser = require('cookie-parser');
const passport = require("./passport/passportConfig");
import react from 'react';
import ReactDomServer from 'react-dom/server';
import App from "../../src/components/App";
// *****babel packages needs to install in client not in server*****
const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGODB_URI).then(console.log("Mongodb database connected successfully")).catch(err => console.log(err));

app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));
// app.set('view engine', 'js');
// app.engine('js', require('express-react-views').createEngine());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('^/$', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDomServer.renderToString(<App />)}</div>`))
  })
})


// Express session
app.use(session({
  secret: "This is my small secret",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}));

app.use(cookieParser("This is my small secret"));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRouter = require("./routes/auth");
app.use("/", authRouter);
// app.get("/", (req, res) => res.send("Good Morning sunshine!"));

let port = PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`));
