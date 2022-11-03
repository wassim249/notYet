const mongoose = require("mongoose");

//create a user model
const User = mongoose.model("users", {
    username: String,
    password: String,
});

module.exports = User;
