require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const bodyParser = require('body-parser');

const passport = require("./passport/passportConfig");
const auth = require("./routes/auth");
const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(console.log("Mongodb database connected successfully"))
.catch(err => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

// Express session
app.use(session({
  secret: "This is my small secret",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection})
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", auth);
app.get("/", (req, res) => res.send("Good Morning sunshine!"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`))
