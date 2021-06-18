const express = require("express"),
  router = express.Router();

// const Campground = require("../models/campground"); // Campground model
const auth = require("../middleware/auth"); // Require Auth middleware
const {
  getAllCampgrounds,
  createNewCampground,
  getUsersCampground,
  getCampground,
  updateCampground,
  deleteCampground,
  newGetPutsignedUrl,
} = require("../controllers/campground");
/*
Campground Routes
*/

//get all campgrounds
router.get("/", getAllCampgrounds);

// CREATE campgrounds
router.post("/new", auth, createNewCampground);

//Get a new S3 signed put URL
router.get("/signed-url", auth, newGetPutsignedUrl);

//Get a single campground
router.get("/getCampground", getCampground);

//Get all user campgrounds
router.get("/alluserscampground", auth, getUsersCampground);

// update campground
router.put("/updateCampground", auth, updateCampground);

// delete campground
router.delete("/delete", auth, deleteCampground);

module.exports = router;
