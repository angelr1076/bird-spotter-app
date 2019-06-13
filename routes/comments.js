const express = require("express"),
  router = express.Router({
    /* mergerParams will merge parameters from the birds and comments together. */
    mergeParams: true,
  }),
  Comment = require("../models/comment"),
  Bird = require("../models/bird"),
  middleware = require("../middleware");

//New route
router.get("/new", middleware.isLoggedIn, (req, res) => {
  //find the specific bird by id
  Bird.findById(req.params.id, (err, foundBird) => {
    if (err) {
      req.flash(
        "error",
        "Sorry, something went wrong trying to retrieve your bird."
      );
      res.redirect("back");
    } else {
      //show add new comment for the found bird
      res.render("comments/new", {
        bird: foundBird
      });
    }
  });
});

//CREATE route
router.post("/", middleware.isLoggedIn, (req, res) => {
  //find the bird by its id
  Bird.findById(req.params.id, (err, foundBird) => {
    if (err) {
      req.flash(
        "error",
        "Sorry, something went wrong trying to retrieve your bird."
      );
      res.redirect(`/birds/${foundBird._id}`);
    } else {
      //create a comment and add to the bird retrieved
      Comment.create(req.body.comment, (err, createdComment) => {
        if (err) {
          req.flash(
            "error",
            "Sorry, something went wrong trying to retrieve your comment."
          );
          res.redirect(`/birds/${foundBird._id}`);
        } else {
          //add username and id to comment
          createdComment.author.id = req.user._id;
          createdComment.author.username = req.user.username;
          //save comment
          createdComment.save();
          //add comments to the campground
          foundBird.comments.push(createdComment);
          //save the bird
          foundBird.save();
          req.flash(
            "success",
            `Comment added success fully to ${foundBird.name}`
          );
          res.redirect(`/birds/${foundBird._id}`);
        }
      });
    }
  });
});

//Edit route
router.get(
  "/:comment_id/edit",
  middleware.checkCommentOwnership,
  (req, res) => {
    //find the bird for this comment
    Bird.findById(req.params.id, (err, foundBird) => {
      if (err) {
        req.flash(
          "error",
          "Sorry, something went wrong trying to retrieve your bird."
        );
        res.redirect("back");
      } else {
        //find the comment
        Comment.findById(req.params.comment_id, (err, foundComment) => {
          if (err) {
            req.flash(
              "error",
              "Sorry, something went wrong trying to retrieve your comment."
            );
            res.redirect("back");
          } else {
            res.render("comments/edit", {
              bird: foundBird,
              comment: foundComment,
            });
          }
        });
      }
    });
  }
);

//Update route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  //find the comment and update
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      if (err) {
        req.flash(
          "error",
          "Sorry, something went wrong trying to retrieve your comment."
        );
        res.redirect("back");
      } else {
        req.flash("success", "Comment updated successfully");
        res.redirect(`/birds/${req.params.id}`);
      }
    }
  );
});

//Delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  //find the specific comment and delete
  Comment.findByIdAndDelete(req.params.comment_id, err => {
    if (err) {
      req.flash(
        "error",
        "Sorry, something went wrong trying to retrieve your comment."
      );
      res.redirect("back");
    } else {
      req.flash("success", "Comment successfully deleted");
      res.redirect("back");
    }
  });
});

module.exports = router;