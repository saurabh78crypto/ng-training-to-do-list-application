import express from 'express';
const router = express.Router();
import taskController from '../controllers/taskController.js';

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.addTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);


export default router;
