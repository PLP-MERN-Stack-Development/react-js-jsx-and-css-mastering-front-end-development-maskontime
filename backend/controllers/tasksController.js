const Task = require('../models/Task');

// GET /api/tasks
// supports ?filter=all|active|completed, ?q=search, ?page, ?limit
const getTasks = async (req, res, next) => {
  try {
    const { filter = 'all', q = '', page = 1, limit = 20 } = req.query;
    const query = {};
    if (filter === 'active') query.completed = false;
    if (filter === 'completed') query.completed = true;
    if (q) query.title = { $regex: q, $options: 'i' };

    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const tasks = await Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Task.countDocuments(query);
    res.json({ data: tasks, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks/:id
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
