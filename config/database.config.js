const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect = async () => {
  return await mongoose.connect(`${process.env.MONGODB_URL}`);
};

module.exports = { connect };
