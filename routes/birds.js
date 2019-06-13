const express = require("express"),
  router = express.Router(),
  Bird = require("../models/bird"),
  expressSanitizer = require("express-sanitizer"),
  middleware = require("../middleware"),
  NodeGeocoder = require("node-geocoder"),
  options = {
    provider: "google",
    httpAdapter: "https",
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
  },
  geocoder = NodeGeocoder(options);

router.use(expressSanitizer());

// Index page - show all birds
router.get("/", (req, res) => {
  // Grab all birds from the MongoDB
  Bird.find({}, (err, allBirds) => {
    if (err) {
      console.log("Sorry, something went wrong.");
      console.log(err);
    } else {
      // Show all birds
      res.render("birds/index", {
        birds: allBirds,
        page: "birds",
      });
    }
  });
});

// Create - add new bird to the database
//CREATE - add new BIRD to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // get data from form and add to BIRDs array
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  geocoder.geocode(req.body.location, (err, data) => {
    if (err || !data.length) {
      req.flash("error", "Invalid address");
      return res.redirect("back");
    }
    const lat = data[0].latitude;
    const lng = data[0].longitude;
    const location = data[0].formattedAddress;
    const newBird = {
      name,
      image,
      description: desc,
      author,
      location,
      lat,
      lng,
    };
    // Create a new bird and save to DB
    Bird.create(newBird, (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        //redirect back to birds page
        res.redirect("/birds");
        // res.redirect("/birds/req.params.id");
      }
    });
  });
});

// Show form to create add new bird
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("birds/new");
});

// Show info about each bird
router.get("/:id", (req, res) => {
  // Find a bird by its id
  Bird.findById(req.params.id)
    .populate("comments")
    .exec((err, foundBird) => {
      if (err) {
        req.flash("error", "Sorry, something went wrong.");
        res.redirect("back");
      } else {
        // Show bird template
        res.render("birds/show", {
          bird: foundBird
        });
      }
    });
});

// Edit after checking user authentication
router.get("/:id/edit", middleware.checkBirdOwnership, (req, res) => {
  // find bird
  Bird.findById(req.params.id, (err, foundBird) => {
    if (err) {
      req.flash("error", "Sorry, something went wrong");
      res.redirect("back");
    } else {
      // Show the edit bird page
      res.render("birds/edit", {
        bird: foundBird
      });
    }
  });
});

// Update bird from edit form
// UPDATE BIRD ROUTE
router.put("/:id", middleware.checkBirdOwnership, (req, res) => {
  geocoder.geocode(req.body.location, (err, data) => {
    if (err || !data.length) {
      req.flash("error", "Invalid address");
      return res.redirect("back");
    }
    req.body.bird.lat = data[0].latitude;
    req.body.bird.lng = data[0].longitude;
    req.body.bird.location = data[0].formattedAddress;

    Bird.findByIdAndUpdate(req.params.id, req.body.bird, (err, bird) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        req.flash("success", "Successfully Updated!");
        res.redirect(`/birds/${bird._id}`);
      }
    });
  });
});

// Delete bird
router.delete("/:id", middleware.checkBirdOwnership, (req, res) => {
  Bird.findByIdAndRemove(req.params.id, err => {
    if (err) {
      req.flash(
        "error",
        "Sorry, something went wrong. Your bird was not clipped."
      );
      res.redirect("back");
    } else {
      req.flash(
        "success",
        "Bird successfully clipped, for good. Bye bye birdie! :("
      );
      res.redirect("/birds");
    }
  });
});

module.exports = router;