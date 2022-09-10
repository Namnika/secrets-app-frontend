const router = require("express").Router();
const bodyParser = require("body-parser");
let User = require("../models/user.model.js");


router.use(bodyParser.urlencoded({extended: true}));
router.route("/").get((req, res) => {
  User.find()
  .then(users = res.json(users))
  .catch(err => res.status(400).json("Error: " + err))

});

router.route("/register").post((req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  console.log(newUser);

  newUser.save()
  .then(()=>res.send("User added!"))
  .catch(err => res.status(400).json("Error: " + err))
});






module.exports = router;
