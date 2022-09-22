const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");


router.route("/").get((req, res) => {
  res.redirect("/login");
})

router.route("/register").get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json("Error: " + err));
});

// router.route("/login").get((req, res) => {

// });

router.route("/secrets").get((req, res) => {
  res.render("secrets");
});

router.post("/register", function(req, res, next){
  passport.authenticate("local", function(err, user, info){
      if (err) {
        return res.status(400).json({ errors: err.response });
      }
      if (!user) {
        return res.status(400).json({ errors: "No user found" });
      }
      
      res.sendFile("/secrets");
      console.log("REGISTERED");
    })(req, res, next);
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

// router.post("/login", (req, res, next) => {
  // const user = new User({
  //   email: req.body.email,
  //   password: req.body.password
//   });
// 
//   passport.authenticate("local", function(err, user, info){
//     if (err) {
//       return res.status(400).json({ errors: err });
//     }
//     if (!user) {
//       return res.status(400).json({ errors: "No User Exists" });
//     }
//     req.logIn(user, function(err){
//       if (err) {
//         return res.status(400).json({ errors: err });
//       }
//       // res.send("successfully Logged In");
//       res.redirect("/secrets");
//       console.log(req.user);
//       return res.status(200).json({ success: `logged in ${user.id}` })
//     });
//   })(req, res, next);
// });

module.exports = router;
