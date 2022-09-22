require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const passport = require("./passport/passportConfig");

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(console.log("Mongodb database connected successfully"))
.catch(err => console.log(err))

app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

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
app.use("/api/auth", authRouter);
// app.get("/", (req, res) => res.send("Good Morning sunshine!"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`))
