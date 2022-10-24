const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "https://secrets-app-five.vercel.app/secrets";

router.get("/auth/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Authentication Failed!",
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/failed",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/failed",
  })
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/failed",
  })
);

module.exports = router;
