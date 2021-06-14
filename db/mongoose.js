const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jooankrah:Jonathan10@cluster0.qyjzk.mongodb.net/campground?retryWrites=true&w=majority&ssl=true",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
