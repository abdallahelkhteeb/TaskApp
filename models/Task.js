import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [50, "Title must be 50 characters or less"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [200, "Description must be 200 characters or less"],
  },
 
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending",
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
