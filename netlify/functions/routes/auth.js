const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json("Error: " + err))
});

// router.route("/register").get((req, res) => {
//   User.find()
//   .then(users => res.json(users))
//   .catch(err => res.status(400).json("Error: " + err));
// });


// router.get("/login", (req, res) => {
//   User.find()
//   .then(users => res.json(users))
//   .catch(err => res.status(400).json("Error: " + err));
// });

//
// router.get("/secrets", (req, res) => {
//   console.log(res.data);
// })

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


module.exports = router;
