const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URL);
    console.log("Connected to Database");
  } catch (error) {
    throw error;
  }
};
