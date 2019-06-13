const express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  Bird = require("../models/bird"),
  expressSanitizer = require("express-sanitizer"),
  middleware = require("../middleware");

router.use(expressSanitizer());

// User public profile (Show Page)
router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      req.flash(
        "error",
        "I can't find you in our database. Please try again or create an account."
      );
      return res.redirect("back");
    }
    Bird.find()
      .where("author.id")
      .equals(foundUser._id)
      .exec((err, birds) => {
        if (err) {
          req.flash(
            "error",
            "Something is wrong, please try again!"
          );
          return res.redirect("back");
        }
        res.render("users/show", {
          user: foundUser,
          birds
        });
      });
  });
});

// Edit after checking user authentication
router.get("/:id/edit", middleware.checkUserOwnership, (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("back");
    }
    Bird.find()
      .where("author.id")
      .equals(foundUser._id)
      .exec((err, birds) => {
        if (err) {
          req.flash("error", "Something went Wrong!");
          return res.redirect("back");
        }
        res.render("users/edit", {
          user: foundUser,
          birds
        });
      });
  });
});

// Update user's info
router.put("/:id", middleware.checkUserOwnership, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      req.flash("success", "Successfully Updated!");
      return res.redirect(`/users/${updatedUser._id}`);
    }
  });
});

module.exports = router;