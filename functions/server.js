require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencode form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// authenticate by google, facebook, github uses cookies-session
app.set("trust proxy", 1); // trust first proxy
app.use(
  cookieSession({
    name: "session",
    keys: ["This is my small secret"],
    maxAge: Math.floor(Date.now() / 60e3),
  })
);

app.get("/logout", function (req, res, next) {
  req.session = null;
  req.logOut();
  next();
});

// authenticate by google, facebook, github uses passport, passport-google-oauth0, passport-facebook, passport-github
app.use(passport.initialize());
app.use(passport.session());

// serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/submit", require("./routes/submit"));
app.use("/secrets", require("./routes/secrets"));
// social authentication
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`));
});
