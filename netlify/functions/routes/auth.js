const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");

router.get("/", (req, res) => {
  res.render("home");
});


router.post("/register", (req, res, next) => {
  passport.authenticate("local", function(err, user, info){
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    res.redirect("/secrets");
  })(req, res, next);
});

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
      res.send("successfully Logged In");
      res.redirect("/secrets");
      console.log(req.user);
    })
  })
})
