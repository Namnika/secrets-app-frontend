const LocalStrategy   = require('passport-local').Strategy;
let User = require("../models/user.model");
const bcrypt = require("bcryptjs");

module.exports = function(passport){
  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  fun



}
