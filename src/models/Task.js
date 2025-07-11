import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    
}, {timestamps: true})

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema)

export default Task;