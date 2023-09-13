// routes/taskRoutes.ts

import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/TaskController';

const router = express.Router();

router.post('/create-task', createTask);
router.get('/tasks', getTasks);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

export default router;
