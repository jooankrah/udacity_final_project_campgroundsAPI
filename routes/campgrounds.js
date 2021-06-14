const express = require("express"),
  router = express.Router();

// const Campground = require("../models/campground"); // Campground model
const auth = require("../middleware/auth"); // Require Auth middleware
const {
  getAllCampgrounds,
  createNewCampground,
  getCampground,
  updateCampground,
  deleteCampground,
} = require("../controllers/campground");
/*
Campground Routes
*/

//get all campgrounds
router.get("/", getAllCampgrounds);

// CREATE campgrounds
router.post("/new", auth, createNewCampground);

//Get a single campground
router.get("/getCampground", getCampground);

// update campground
router.put("/updateCampground", auth, updateCampground);

// delete campground
router.delete("/delete", auth, deleteCampground);

module.exports = router;
