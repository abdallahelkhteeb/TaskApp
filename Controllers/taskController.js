import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const {userId} = req.user;

        const tasks = await Task.find( {
            userId
        });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const {userId} = req.user;
        const {taskId} = req.params;

        const task = await Task.findOne({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, description } = req.body;

        const newTask = new Task({
            title,
            description,
            status: "pending",
            userId
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, description, status } = req.body;
        const { id } = req.params;

        const update = {};
        if (title !== undefined) update.title = title;
        if (description !== undefined) update.description = description;
        if (status !== undefined) update.status = status;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId },
            update,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteTask = async(req, res) => {
    try{
        const { userId } = req.user;
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({ _id: id, userId });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

