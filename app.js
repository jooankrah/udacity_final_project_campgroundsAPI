// included modules
const express = require("express"),
  app = express(),
  expressSanitizer = require("express-sanitizer"),
  cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/mongoose");

// Constant for environment variables and bindings
const PORT = process.env.PORT || 3000;

//set up cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["*"],
  })
);

// reuiring routes
const campgroundRoutes = require("./routes/campgrounds");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// module activation and linking
app.use(expressSanitizer());

app.use("/campgrounds", campgroundRoutes);

// Server start!
app.listen(PORT, () => {
  console.log(
    "The YelpCamp application server has started on port " + PORT + "!"
  );
});
