const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({ user: req.user.id, title, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    const updates = req.body;
    Object.assign(todo, updates);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
