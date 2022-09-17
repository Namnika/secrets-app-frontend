require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const port = process.env.PORT || 5000;
const app = express();

/* [CORS] is basically serves the data from yr server via browser of what the user
  accepts or requirements to that domain ex. localhost:3000 .

  Helpful Ref: https://stackoverflow.com/questions/46024363/what-does-app-usecors-do#:~:text=Calling%20use(cors())%20will,request%20options%20the%20server%20accepts.
*/

app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",  // <! -- location of the react app were connecting to ---->
  credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: "This is my little secret.",
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser("This is my little secret."));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(port, () => console.log("Server is running on port 5000")))
.catch((err) => console.log(err.message));


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

/* [app.use("/users", usersRouter);] ==>> ["/users"] is register for usersRouter
as middleware to request data by using it.
*/

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
// ----------------END OF MIDDLEWARE ------------------------
