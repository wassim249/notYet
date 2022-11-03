const Todo = require("../models/Todo");

const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json({
      success: true,
      todos,
    });
  } catch (err) {
    res.json({
      success: false,
      todos: [],
      message: err.message,
    });
  }
};

const oneUserTodos = async (req, res) => {
  const userId = req.params.user_id;
  try {
    //find todo by userId
    const todos = await Todo.find({ userId: userId });
    res.json({
      success: true,
      todos,
    });
  } catch (error) {
    res.json({
      success: false,
      todos: [],
      message: error.message,
    });
  }
};

const oneTodo = async (req, res) => {
  const id = req.params.id;
  try {
    //find todo by id
    const todo = await Todo.findById(id);
    res.json({
      success: true,
      todo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const addTodo = async (req, res) => {
  const todo = req.body;
  try {
    const newTodo = new Todo(todo);
    await newTodo.save();
    res.status(201).json({
      success: true,
      todo : newTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const todo = req.body;
  try {
    //update todo
    const updatedTodo = await Todo.findByIdAndUpdate(id, todo);
    res.status(201).json({
      success: true,
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      todo: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  allTodos,
  oneUserTodos,
  oneTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
