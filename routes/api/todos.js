const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');
const { wrapAsync } = require('../../util');
const AppError = require('../../AppError');

// @route GET api/todos
// @desc gets all todos
// @access Public
router.get(
  '/',
  wrapAsync(async (req, res, next) => {
    const todos = await Todo.find({});
    res.json(todos);
  })
);

// @route POST api/todos
// @desc posts a todo
// @access Public
router.post(
  '/',
  wrapAsync(async (req, res) => {
    const { text } = req.body;
    let newTodo = new Todo({ text, completed: false });
    const savedTodo = await newTodo.save();
    res.send(savedTodo);
  })
);

// @route DELETE api/todos
// @desc deletes a todo
// @access Public
router.delete(
  '/:id',
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (deletedTodo == null)
      return next(new AppError(400, `Todo with id=${id} does not exist.`));
    res.json(deletedTodo);
  })
);

// @route PUT api/todos
// @desc edits a todo
// @access Public
router.put(
  '/:id',
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    if (updatedTodo == null)
      return next(new AppError(400, `Todo with id=${id} does not exist.`));
    res.json(updatedTodo);
  })
);

module.exports = router;
