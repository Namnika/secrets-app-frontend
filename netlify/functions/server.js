require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const port = process.env.PORT || 5000;
const app = express();


/* [CORS] is basically serves the data from yr server via browser of what the user
  accepts or requirements to that domain ex. localhost:3000 .

  Helpful Ref: https://stackoverflow.com/questions/46024363/what-does-app-usecors-do#:~:text=Calling%20use(cors())%20will,request%20options%20the%20server%20accepts.
*/

app.use(cors());
app.use(cors({
  credentials: true, origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(expressSession({
  secret: "This is my little secret.",
  resave: false,
  saveUninitialized: true
}));


app.use(cookieParser("This is my little secret."));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGODB_URI)
.then(() => app.listen(port, () => console.log("Server is running on port 5000")))
.catch((err) => console.log(err.message));


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
const flash = require('connect-flash');
app.use(flash());

// Initialize Passport
const initPassport = require('./passport/init');
initPassport(passport);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}



/* [app.use("/users", usersRouter);] ==>> ["/users"] is register for usersRouter
as middleware to request data by using it.
*/

const usersRouter = require("./routes/users")(passport);
app.use("/users", usersRouter);
// ----------------END OF MIDDLEWARE ------------------------


module.exports = app;
