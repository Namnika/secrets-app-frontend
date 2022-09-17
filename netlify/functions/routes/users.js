const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
let User = require("../models/user.model.js");
const passport = require("passport");
require("../passportConfig.js")(passport);

app.use(bodyParser.urlencoded({extended: true}));

/* [app.route("/").get((req, res)] ==>> app.route("/") is equal
 to [app.use("/users", usersRouter);] It means when ("/users") is used then it'll match
 to ("/") & when ("/users/something") is used then it'll match to ("/something").

 Helpful Ref: https://stackoverflow.com/questions/65030892/in-express-how-does-router-get-in-my-routes-directory-handle-requests-othe
 */

 /* [.then(users = res.json(users))] ==>> Here users is a reference name from "App.jsx"
 where all array of users are creating.
 */

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

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err){
      console.log(err);
      res.redirect("/register");
    }
    if (doc){
      res.send("User Already Exists");
      // res.redirect("/register");
    }
    if (!doc){
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
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, err => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      })
    }
  })(req, res, next);
});

module.exports = app;
