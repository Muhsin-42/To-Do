import express from 'express';
import { Router } from 'express';
import todoController from '../controllers/todoController';
const router: Router = express.Router();

router.post('/',todoController.addTodo)
router.get('/',todoController.getTodos)

export default router;