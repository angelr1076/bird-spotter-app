// require dotenv to loads environment variables
require("dotenv").config();

const express = require("express"),
  app = express(),
  bodyparser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  mongoose = require('mongoose'),
  methodOverride = require("method-override"),
  flash = require("connect-flash"),

  //requiring routes
  commentRoutes = require("./routes/comments"),
  birdRoutes = require("./routes/birds"),
  //Testing user routes
  userRoutes = require("./routes/users"),
  indexRoutes = require("./routes/index");

const url = process.env.MONGODB_URL || "mongodb://localhost:27017/bird-spotter-app";

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); //needs to come before passport configuration
app.locals.moment = require("moment");

//configure passport
app.use(
  require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create middleware to pass in to every route, this way we dont have to pass a user object to every route
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//tell our app to use these three routes. This needs to come after previous app.use();
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/birds", birdRoutes);
app.use("/birds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Bird Spotter is now running`);
});