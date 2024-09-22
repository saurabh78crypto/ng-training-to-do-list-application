import Task from '../models/Task.js';

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new task
const addTask = async (req, res) => {
  try {
    const { assignedTo, description, dueDate, priority, status } = req.body;
    const newTask = new Task({ assignedTo, description, dueDate, priority, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error in addTask:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { assignedTo, description, dueDate, priority, status } = req.body;

    if (!assignedTo || !description || !dueDate || !priority || !status) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    task.assignedTo = assignedTo;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.status = status;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error('Error in updateTask:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Task not found' });

    res.status(204).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};

export default { getTasks, addTask, updateTask, deleteTask };