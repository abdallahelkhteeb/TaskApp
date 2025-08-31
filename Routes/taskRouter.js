import { getAllTasks, 
    createTask,
    updateTask,
    deleteTask,
    getTaskById
 } from "../Controllers/taskController.js";
import { Router } from "express";
import authenticateToken from '../middlewares/authinticateToken.js';

const router = Router();

router.get("/tasks", authenticateToken, getAllTasks);
router.post("/tasks/create-task", authenticateToken, createTask);
router.patch("/tasks/:id", authenticateToken, updateTask);
router.delete("/tasks/:id", authenticateToken, deleteTask);
router.get("/tasks/:id", authenticateToken, getTaskById);

export default router;