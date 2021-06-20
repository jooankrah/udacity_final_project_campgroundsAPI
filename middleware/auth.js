const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).send({ message: "Failed to Authenticate" });
      } else {
        req.id = decoded._id;
        req.username = decoded.username;
        return next();
      }
    });
  } catch (e) {
    res.send({
      error: "Please authenticate.",
    });
  }
};

module.exports = auth;
