const express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  passport = require("passport"),
  validator = require('validator')

router.get("/", (req, res) => {
  res.render("landing");
});

// Auth routes
// register GET route
router.get("/register", (req, res) => {
  res.render("register", {
    page: "register"
  });
});

// register POST route
router.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    avatar: req.body.avatar,
    description: req.body.description,
    location: req.body.location
  });
  // After user is registered, redirect to birds page
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.render("register", {
        error: err.message
      });
    }
    passport.authenticate("local")(req, res, () => {
      req.flash(
        "success",
        `You have successfully joined Bird Spotter ${user.username}`
      );
      res.redirect("/birds");
    });
  });
});

// login route
router.get("/login", (req, res) => {
  res.render("login", {
    page: "login"
  });
});

// login POST route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/birds",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

// logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Thanks for stopping by. Come back soon!");
  res.redirect("/birds");
});

module.exports = router;