const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("./model/User");
const passport = require("passport");

// -----USING PASSPORT TO CREATE LOCAL LOGIN----

// serializeUser() means we save the user to the session it means when we call user object so that we can get request.user obj.
passport.serializeUser(function (user, done) {
  return done(null, user);
});

// deserializeUser() is used to get id from cookie and take that cookie and find user from database and put in session.
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    return done(null, user);
  });
});

// -------GOOGLE STRATEGY--------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://secrets-app-frontend.vercel.app/auth/google/callback",
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
      callbackURL: "http://secrets-app-frontend.vercel.app/auth/github/callback",
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
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CLIENT_ID,
  consumerSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: "http://secrets-app-frontend.vercel.app/auth/twitter/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ twitterId: profile.id, username: profile.displayName},
    function (err, user) {
    return cb(err, user);
  });
}
));
