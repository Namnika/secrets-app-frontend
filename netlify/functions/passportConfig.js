// authenticate a user using passport
const User = require("./models/user.model.js");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function(passport){
  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({email: email}, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false) //null is the err and false is the user ===
        // if we've no error there's no user.
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true){
            return done(null, user);
          }else{
            return done(null, false);
          }
        });
      });
    }
  ));

  /* passport require serializeUser & deserializeUser
     serializeUser() stores a cookie by using user's id,
     inside of the browser and when
     user is created using localStrategy . */
  passport.serializeUser((user, cb) => {
    cd(null, user.id);
  });



  /* deserializeUser() takes a user's cookie & unravels/clear up & returns a
  user from it. */
  passport.deserializeUser((id, cb) => {
    /* it will take id as 1st parameter deserializing the cookie, user's id matching
    with the cookie id */
    User.findOne({_id: id}, (err, user) => {
      cb(err, user);
    })
  })
};
