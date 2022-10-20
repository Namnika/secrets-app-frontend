const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./model/User");
const passport = require("passport");

// -----USING PASSPORT TO CREATE LOCAL LOGIN----

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(null, user);
  });
});

// -------GOOGLE STRATEGY--------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://auth-blond.vercel.app/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

// -------GITHUB STRATEGY--------
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://auth-blond.vercel.app/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { githubId: profile.id, username: profile.displayName },
        function (err, user) {
          console.log(user);
          return cb(err, user);
        }
      );
    }
  )
);

// -------FACEBOOK STRATEGY--------
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "https://auth-blond.vercel.app/auth/facebook/callback",
  enableProof: true
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id, username: profile.displayName},
    function (err, user) {
    return cb(err, user);
  });
}
));
