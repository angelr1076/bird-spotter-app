const mongoose = require("mongoose");

// Setup bird Schema
const birdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  lat: Number,
  lng: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }, ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

const Bird = mongoose.model("Bird", birdSchema);

module.exports = Bird;