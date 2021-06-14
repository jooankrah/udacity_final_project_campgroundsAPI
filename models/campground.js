const mongoose = require("mongoose");

let campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    username: String,
  },
});

const Campground = mongoose.model("Campground", campgroundSchema); // This "returns" the Campground model to be imported.

module.exports = Campground;
