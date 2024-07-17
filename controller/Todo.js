// core dependencies
const mongoose = require("mongoose");

// model
const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.params.userID }).sort({
      date: -1,
    });
    
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      user: req.params.userID,
    });

    const todo = await newTodo.save();

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.updateTodo = async (req, res) => {
  try {
    let userID = req.params.userID;
    let todoID = req.params.todoID;

    let todo = await Todo.findById(todoID);

    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    if (todo.user.toString() !== userID) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const updatedFields = {};
    if (req.body.text) {
      updatedFields.text = req.body.text;
    }
    if (req.body.completed) {
      updatedFields.completed = req.body.completed;
    }

    todo = await Todo.findByIdAndUpdate(todoID, updatedFields, { new: true });

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let userID = req.params.userID;
    let todoID = req.params.todoID;

    let todo = await Todo.findById(todoID);

    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    if (todo.user.toString() !== userID) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Todo.findByIdAndDelete(todoID);

    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
