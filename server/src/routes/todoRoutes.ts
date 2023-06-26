import express from 'express';
import { Router } from 'express';
import todoController from '../controllers/todoController';
const router: Router = express.Router();

router.post('/',todoController.addTodo)
router.get('/',todoController.getTodos)
router.delete('/:id',todoController.deleteTodo)
router.get('/search/:query?',todoController.searchTasks)

export default router;