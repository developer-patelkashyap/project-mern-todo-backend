// core dependencies
const express = require("express");
const router = express.Router();

// controller
const todoController = require("../controller/Todo");

router.get("/:userID", todoController.getTodos);
router.post("/:userID", todoController.addTodo);
router.put("/:userID/:todoID", todoController.updateTodo);
router.delete("/:userID/:todoID", todoController.deleteTodo);

module.exports = router;
