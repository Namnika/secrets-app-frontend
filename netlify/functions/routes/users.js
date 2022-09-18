const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("../passportConfig.js")(passport);
let User = require("../models/user.model.js");
app.use(bodyParser.urlencoded({extended: true}));

/* [app.route("/").get((req, res)] ==>> app.route("/") is equal
 to [app.use("/users", usersRouter);] It means when ("/users") is used then it'll match
 to ("/") & when ("/users/something") is used then it'll match to ("/something").

 Helpful Ref: https://stackoverflow.com/questions/65030892/in-express-how-does-router-get-in-my-routes-directory-handle-requests-othe
 */

 /* [.then(users = res.json(users))] ==>> Here users is a reference name from "App.jsx"
 where all array of users are creating.
 */

app.use(cors());
app.use(cors({
  credentials: true, origin: 'http://localhost:3000'
}));
app.use(session({
  secret: "This is my little secret.",
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser("This is my little secret."));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json("Error: " + err))
});


/* [router.route("/register").post((req, res)] ==>> router.route("/register") is used
to post user's register data to register page.
*/

/* Always try to catch the error [.catch(err => res.status(400).json("Error: " + err))]
*/
app.get("/register", function(req, res){
  res.render("register");
});




app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err){
      console.log(err);
      res.redirect("/register");
    }
    if (user) res.send("User Already Exists");
    if (!user){
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email: req.body.email,
        password: hashPassword
      });
      newUser.save();
      console.log(newUser);
      res.send("User Created");
    }
  })
});


app.post("/login", (req, res, next) => {
  console.log(req.body);


  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists!");
    else{
      req.logIn(user, err => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(res);
      })
    }
  })(req, res, next);

});

module.exports = app;
