const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");

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
})

app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  console.log(newUser);

  newUser.save()
  .then(()=>res.send("User added!"))
  .catch(err => res.status(400).json("Error: " + err))
});

app.get("/login", (req, res) => {
  res.render("login");
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({email}, function(err, user){
    if (err) {
      console.error(err);
      return res.status(500).json(errors);
    }
    else if (!user) {
      return res.status(401).json(errors);
    }
    else {
      user.isCorrectPassword(password, function(err, same){
        if (err) {
          console.error(err);
          return res.status(500).json(errors);
        }
        else if (!same) {
          return res.status(401).json(errors);
        }
        else{
          res.redirect("/secrets");
        }
      });
    };
  });
});

module.exports = app;
