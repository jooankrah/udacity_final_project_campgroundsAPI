const Campground = require("../models/campground");

const getAllCampgrounds = (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      return res.send(err);
    } else {
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
    const newlyCreatedCampground = new Campground(req.body.campground);

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

const getCampground = (req, res) => {
  Campground.findById(req.query.id, function (err, foundCampground) {
    if (err) {
      return res.send(err);
    }
    if (!foundCampground) {
      return res.send({ status: 404, error: "Campground not found" });
    } else {
      return res.send({ status: 200, campground: foundCampground });
    }
  });
};

const updateCampground = (req, res) => {
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

const deleteCampground = (req, res) => {
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
  getCampground,
  updateCampground,
  deleteCampground,
};
