const express = require("express");
const app = express.Router();
// const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
// const passport = require("passport");
// const cors = require("cors");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const LocalStrategy = require("passport-local").Strategy;
// let User = require("../models/user.model");
// require("../passportConfig")(passport);
// app.use(bodyParser.urlencoded({extended: true}));

/* [app.route("/").get((req, res)] ==>> app.route("/") is equal
 to [app.use("/users", usersRouter);] It means when ("/users") is used then it'll match
 to ("/") & when ("/users/something") is used then it'll match to ("/something").

 Helpful Ref: https://stackoverflow.com/questions/65030892/in-express-how-does-router-get-in-my-routes-directory-handle-requests-othe
 */

 /* [.then(users = res.json(users))] ==>> Here users is a reference name from "App.jsx"
 where all array of users are creating.
 */

// app.use(cors());
// app.use(cors({
//   credentials: true, origin: 'http://localhost:3000'
// }));
// app.use(session({
//   secret: "This is my little secret.",
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(cookieParser("This is my little secret."));
// app.use(passport.initialize());
// app.use(passport.session());



// passport.use(
//   new LocalStrategy((email, password, done) => {
//     User.findOne({email: email}, (err, user) => {
//       if (err) return done(err)
//       if (!user) return done(null, false) //null is the err and false is the user ===
//       // if we've no error there's no user.
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) throw err;
//         if (result === true) {
//           return done(null, user);
//         }else{
//           return done(null, false);
//         }
//       })
//
//     });
//   }
// ));
//
// passport.serializeUser((user, cb) => {
//   cb(null, user.id);
// });
//
// passport.deserializeUser((id, cb) => {
//
//   /* it will take id as 1st parameter deserializing the cookie, user's id matching
//   with the cookie id */
//
//   User.findOne({_id: id}, (err, user) => {
//     const userInfo = {
//       email: user.email,
//     };
//
//     cb(err, user);
//   }
// )
// })

// app.get("/", (req, res) => {
//   User.find()
//   .then(users => res.json(users))
//   .catch(err => res.status(400).json("Error: " + err))
// });


/* [router.route("/register").post((req, res)] ==>> router.route("/register") is used
to post user's register data to register page.
*/

/* Always try to catch the error [.catch(err => res.status(400).json("Error: " + err))]
*/
// app.get("/register", function(req, res){
//   res.render("register");
// });
//
// app.post("/register", (req, res) => {
//   User.findOne({ email: req.body.email }, async (err, user) => {
//     if (err){
//       console.log(err);
//       res.redirect("/register");
//     }
//     if (user) res.send("User Already Exists");
//     if (!user){
//       const hashPassword = await bcrypt.hash(req.body.password, 10);
//       const newUser = new User({
//         email: req.body.email,
//         password: hashPassword
//       });
//       newUser.save();
//       console.log(newUser);
//       res.send("User Created");
//     }
//   })
// });
//
//
// app.post("/login", (req, res, next) => {
//   const user = new User({
//     email: req.body.email,
//     password: req.body.password
//   });
//   next()
//   passport.authenticate("local", (err, user) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists!");
//     else{
//       req.logIn(user, err => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(res);
//       })
//     }
//   })(req, res, next);
//
// });

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}


























module.exports = app;
