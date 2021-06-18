const { getGetSignedUrl, getPutSignedUrl } = require("../aws");
const Campground = require("../models/campground");

const getAllCampgrounds = async (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      return res.send(err);
    } else {
      allCampgrounds.map((item) => {
        if (item.image) {
          item.image = getGetSignedUrl(item.image);
        }
      });
      return res.status(200).send({ allCampgrounds });
    }
  });
};

const createNewCampground = async (req, res) => {
  // req.body.campground = req.sanitize(req.body.campground);
  req.username = "jooankrah";
  let author = {
    id: req.id,
    username: req.username,
  };

  try {
    console.log(req.body);
    const newlyCreatedCampground = new Campground(req.body.Campground);

    newlyCreatedCampground.author = author;

    await newlyCreatedCampground.save();

    return res.status(201).send({
      message: "Campground created successfully",
      campground: newlyCreatedCampground,
    });
  } catch (error) {
    res.send(error);
  }
};

const newGetPutsignedUrl = async (req, res) => {
  const fileId = req.query.fileId;
  console.log(fileId);
  const url = getPutSignedUrl(fileId);
  return res.send({ url });
};

const getCampground = async (req, res) => {
  Campground.findById(req.query.id, function (err, foundCampground) {
    if (err) {
      return res.send(err);
    }
    if (!foundCampground) {
      return res.send({ status: 404, error: "Campground not found" });
    } else {
      foundCampground.image = getGetSignedUrl(foundCampground.image);
      return res.send({ status: 200, campground: foundCampground });
    }
  });
};

const getUsersCampground = async (req, res) => {
  Campground.find({ "author.id": req.id }, (err, campgrounds) => {
    if (err) {
      return res.send(err);
    }
    campgrounds.map((item) => {
      if (item.image) {
        item.image = getGetSignedUrl(item.image);
      }
    });
    res.send({ status: 200, campgrounds });
  });
};

const updateCampground = async (req, res) => {
  const { name, price, image, description } = req.body.campground;
  console.log(req.body.campground);
  console.log(name, price, image, description);
  Campground.findByIdAndUpdate(
    req.body.id,
    { name, price, image, description },
    { new: true },
    (err, updatedCampground) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "Campground updated successfully",
          campground: updatedCampground,
        });
      }
    }
  );
};

const deleteCampground = async (req, res) => {
  Campground.findByIdAndDelete(req.query.id, (err) => {
    if (err) {
      req.send(err);
    } else {
      res.send({ status: 200, message: "Campground deleted successfully" });
    }
  });
};

module.exports = {
  getAllCampgrounds,
  createNewCampground,
  getUsersCampground,
  getCampground,
  updateCampground,
  deleteCampground,
  newGetPutsignedUrl,
};
