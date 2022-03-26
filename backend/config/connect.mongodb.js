const mongoose = require("mongoose");

const connectDB = async (URI) => {
  try {
    const connect = await mongoose.connect(URI);
    console.log("connect to Database success");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = connectDB;
