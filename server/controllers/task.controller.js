const Task = require('../models/task.model');

module.exports = {
    
    createTask: (req, res)=>{
        Task.create(req.body)
            .then((newTask)=>{
                res.json(newTask);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getOneTask: (req, res)=>{
        Task.findById({_id: req.params.id})
            .then((oneTask)=>{
                res.json(oneTask);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getMyAssignedTasks: (req, res)=>{
        Task.find({taskAssignment:req.user._id}).sort({TaskName:1})
            .then((assignedTasks)=>{
                res.json(assignedTasks);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getMyOwnedTasks: (req, res)=>{
        Task.find({createdBy:req.user._id}).sort({TaskName:1})
            .then((ownedTasks)=>{
                res.json(ownedTasks);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    getAllTasks: (res)=>{
        Task.find({}).sort({TaskName:1})
        .then((allTasks)=>{
            res.json(allTasks);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    deleteTask: (req, res)=>{
        Task.deleteOne({_id: req.params.id})

        .then((deletedTask)=>{
            res.json(deletedTask);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    updateTask: (req, res)=>{
        Task.findByIdAndUpdate({_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then((updatedTask)=>{
                res.json(updatedTask);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    }
}