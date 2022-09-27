const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const session = require("express-session");


router.route("/").get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json("Error: " + err))
});

router.get("/secrets", (req, res) => {
  console.log(res.data);
})

router.post("/register", function(req, res, next){
  passport.authenticate("local", function(err, user, info){
      if (err) {
        return res.status(400).json({ errors: err.response });
      }
      if (!user) {
        return res.status(400).json({ errors: "No user found" });
      }
      console.log("REGISTERED");
    })(req, res, next);
});


router.post("/login", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  passport.authenticate("local", (err, newUser, info) => {
    if (err) throw err;
    if(!newUser) res.send("No NewUser Exists");
    else{
      req.logIn(newUser, err =>{
        if (err) throw err;
        res.send(`logged in ${newUser._id}`);
        console.log("successfully logged in");
        console.log(res.newUser);
      });
    }
  })(req, res, next);

  console.log(newUser);
  console.log(req.body);
});


router.post("/logout", (req, res) => {
  req.logOut(err => {
    if (err) throw err;
    res.status(200).clearCookie('connect.sid', {
      secure: true,
      httpOnly: false,
      sameSite: "none",
      expires: new Date(1)
    });
    req.session.destroy((err) => res.redirect("/"));
    console.log("LOGGED OUT");
  });
});

module.exports = router;
