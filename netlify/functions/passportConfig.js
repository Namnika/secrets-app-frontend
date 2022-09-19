const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
// authenticate a user using passport




module.exports = function(passport){

  // passport.use(User.createStrategy());
  // passport.serializeUser(function(user, done){
  //   done(null, user);
  // });
  // passport.deserializeUser(function(id, done){
  //   User.findById(id, function(err, user){
  //     done(null, user);
  //   });
  // });





  passport.use(
    new LocalStrategy((email, password, done) => {
      User.findOne({email: email}, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false) //null is the err and false is the user ===
        // if we've no error there's no user.
        // if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        bcrypt.compare(password, user.password, hash, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          }else{
            return done(null, false);
          }
        })

      });
    }
  ));





  /* passport require serializeUser & deserializeUser
     serializeUser() stores a cookie by using user's id,
     inside of the browser and when
     user is created using localStrategy . */
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });



  /* deserializeUser() takes a user's cookie & unravels/clear up & returns a
  user from it. */

  passport.deserializeUser((id, cb) => {

    /* it will take id as 1st parameter deserializing the cookie, user's id matching
    with the cookie id */

    User.findOne({_id: id}, (err, user) => {
      const userInfo = {
        email: user.email,
      };

      cb(err, user);
    }
  )
  })
};
