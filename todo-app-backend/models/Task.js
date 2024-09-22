import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  assignedTo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


const Task = mongoose.model('TASK', TaskSchema);
export default Task;