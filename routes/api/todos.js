const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');

// @route GET api/todos
// @desc gets all todos
// @access Public
router.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

// @route POST api/todos
// @desc posts a todo
// @access Public
router.post('/', async (req, res) => {
  const { text } = req.body;
  let newTodo = new Todo({ text });
  const savedTodo = await newTodo.save();
  res.send(savedTodo);
});

// @route DELETE api/todos
// @desc deletes a todo
// @access Public
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  res.json(deletedTodo);
});

// @route PUT api/todos
// @desc edits a todo
// @access Public
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
  res.json(updatedTodo);
});

module.exports = router;
