const router = require("express").Router();
const bodyParser = require("body-parser");
let User = require("../models/user.model.js");


router.use(bodyParser.urlencoded({extended: true}));

/* [router.route("/").get((req, res)] ==>> router.route("/") is equal
 to [app.use("/users", usersRouter);] It means when ("/users") is used then it'll match
 to ("/") & when ("/users/something") is used then it'll match to ("/something").

 Helpful Ref: https://stackoverflow.com/questions/65030892/in-express-how-does-router-get-in-my-routes-directory-handle-requests-othe
 */

 /* [.then(users = res.json(users))] ==>> Here users is a reference name from "App.jsx"
 where all array of users are creating.
 */

router.route("/").get((req, res) => {
  User.find()
  .then(users = res.json(users))
  .catch(err => res.status(400).json("Error: " + err))
});

/* [router.route("/register").post((req, res)] ==>> router.route("/register") is used
to post user's register data to register page.
*/

/* Always try to catch the error [.catch(err => res.status(400).json("Error: " + err))]
*/

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
