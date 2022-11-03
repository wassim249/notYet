const mongoose = require("mongoose");
const User = require("../models/User");

//create a todo model with mongoose
const Todo = mongoose.model("todos", {
  title: String,
  completed: Boolean,
  userId: String,
});

module.exports = Todo;
