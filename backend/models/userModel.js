const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Error: Name is empty!"],
    },
    email: {
      type: String,
      required: [true, "Error: Email is empty!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Error: Password is empty!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
