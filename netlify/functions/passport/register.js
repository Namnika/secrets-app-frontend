const LocalStrategy   = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
/* CTRL + SHIFT AND PUT CURSOR WHERE YOU WANT TO EDIT */

module.exports = function(passport){
  passport.use('register', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done){

    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({ 'email': email }, function(err, user){
        // In case of any error, return using the done method
        if (err){
        console.log('Error in SignUp: ' + err);
        return done(err);
        }
        // already exists
        if (user) {
        console.log('User already exists with username: '+email);
        return done(null, false, req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          const newUser = new User();
          // set the user's local credentials
          newUser.email = email;
          newUser.password = password;
          // save the user
          newUser.save(function(err) {
          if (err){
          console.log('Error in Saving user: '+err); throw err;
        }
          console.log('User Registration succesful');
          return done(null, newUser);
        });

        }
      })
    };
    // Delay the execution of findOrCreateUser and execute the method
    // in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }

  ));
  // Generates hash using bCrypt
  const createHash = function(password){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

}
