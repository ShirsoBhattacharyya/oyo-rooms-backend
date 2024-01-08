const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
    if (err) {
      res.json({
        status: 401,
        message: "Invalid request. You are not authenticated yet.",
      });
    } else {
      req.body.id = decoded.id;
      next();
    }
  });
};

module.exports = validateToken;
