const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  lastname: String,
  age: Number,
});

module.exports = User;
