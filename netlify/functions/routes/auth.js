const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", function(req, res, next){
  // register() module comes from passport-local-mongoose package
  User.register({email: req.body.email}, req.body.password, function(err, user){
    if (err){
      console.log(err);
      res.redirect("/register");
    }else{
      // SETUP COOKIE WHEN USER REGISTERED AND LOGGED IN--------passport.authenticate() is from passport-local package
      passport.authenticate("local")(function(err, user, info){
        res.redirect("/secrets");
      })(req, res, next);
    }
  });
});


// router.post("/register", (req, res, next) => {
//   passport.authenticate("local", function(err, user, info){
//     if (err) {
//       return res.status(403).json({ errors: err.response });
//     }
//     if (!user) {
//       return res.status(400).json({ errors: "No user found" });
//     }
//     res.send("secrets");
//
//   })(req, res, next);
// });

router.post("/login", (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  passport.authenticate("local", function(err, user, info){
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No User Exists" });
    }
    req.logIn(user, function(err){
      if (err) {
        return res.status(400).json({ errors: err });
      }
      // res.send("successfully Logged In");
      res.redirect("/secrets");
      console.log(req.user);
      return res.status(200).json({ success: `logged in ${user.id}` })
    });
  })(req, res, next);
});

module.exports = router;
