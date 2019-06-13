const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose"),
  validator = require('validator')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: String,
  avatar: Buffer,
  description: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);