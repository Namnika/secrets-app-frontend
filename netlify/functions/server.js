require("dotenv").config();
require("./index");
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
const React = require("react");
const ReactDomServer = require("react-dom/server");
// const Secrets = require('../../src/components/secrets.jsx');
const App = require('../../src/components/App.jsx');


// *****babel packages needs to install in client not in server*****
const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGODB_URI).then(console.log("Mongodb database connected successfully")).catch(err => console.log(err));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

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

const renderReact = require('./renderReact.js');
renderReact(app);

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
