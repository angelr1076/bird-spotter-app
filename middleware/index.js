const Comment = require("../models/comment"),
  Bird = require("../models/bird"),
  User = require("../models/user");

let middlewareObj = {};

// Check if the user is logged in to add or edit comments
middlewareObj.checkCommentOwnership = (req, res, next) => {
  // Is the user logged in?
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || !foundComment) {
        req.flash(
          "error",
          "There was a hiccup while I searched for your comment!"
        );
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          // Display the delete or edit page
          next();
        } else {
          // Else redirect
          req.flash(
            "error",
            "You are not authorized to edit this comment. I am very sorry."
          );
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please login before you try that.");
    res.redirect("back");
  }
};

// Check if the user is logged in to add or edit a bird
middlewareObj.checkBirdOwnership = (req, res, next) => {
  // Is the user logged in?
  if (req.isAuthenticated()) {
    Bird.findById(req.params.id, (err, foundBird) => {
      if (err || !foundBird) {
        req.flash(
          "error",
          "There was a hiccup while I searched for your bird! Tweet, tweet!"
        );
        res.redirect("back");
      } else {
        if (foundBird.author.id.equals(req.user._id)) {
          // Display the edit bird page
          next();
        } else {
          // Else redirect
          req.flash(
            "error",
            "You are not authorized to edit this bird. I am very sorry."
          );
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please login before you try that.");
    res.redirect("login");
  }
};

middlewareObj.checkUserOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.params.id, (err, foundUser) => {
      if (err || !foundUser) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        if (foundUser._id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect(`/users/${foundUser._id}`);
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do this!");
    res.redirect("/birds");
  }
};

// Check to see if the user is logged in or not
middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login!");
  res.redirect("/login");
};

module.exports = middlewareObj;