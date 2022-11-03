const express = require("express");
const {
  oneUserTodos,
  allTodos,
  oneTodo,
  addTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todosController");
const router = express.Router();

router.get("/",allTodos);

router.get("/oneuser/:user_id", oneUserTodos);

router.get("/:id", oneTodo);

router.post("/", addTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
