const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const TaskSchema = new mongoose.Schema({
    taskName:{
        type: String,
        required: [true, "You must provide a task name"],
        minLength: [3, "Task name should be at least 3 characters long"]
    },

    taskDesc:{
        type: String,
        required: [true, "You must provide a task description"],
        minLength: [3, "Task description should be at least 3 characters long"]
    },

    taskDueDate:{
        type: Date,
        required: [true, "You must provide a due date for this task"],
    },

    taskFinished: {
        type: Boolean,
        default: false
    },

    taskAssignment:{
        type:ObjectId,
        ref:"User"
    },

    createdBy:{
        type:ObjectId,
        ref:"User"
    }

}, {timestamps: true})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;