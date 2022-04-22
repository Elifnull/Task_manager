const Task = require('../models/task.model');
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
    
    createTask: (req, res)=>{
        const newTaskObj = new Task(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete:true
        })
        newTaskObj.createdBy = decodedJWT.payload.id;
        newTaskObj.save()

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
        console.log("0000000")
        if(req.jwtpayload.user._id !== req.params.user._id){
            console.log("not the user");
            console.log("111111111111111");
            User.findOne({id: req.params.user._id})
                .then((userNotLoggedIn)=>{
                    console.log("2222222222");
                    Task.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "firstName lastName")
                        .then((tasksOwnedByUser)=>{
                            console.log("3333333333")
                            console.log(tasksOwnedByUser);
                            res.json(tasksOwnedByUser);
                        })
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }

        else{
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            Workout.find({ createdBy: req.jwtpayload.id })
                .populate("createdBy", "username")
                .then((tasksOwnedByLoggedInUser) => {
                    console.log(tasksOwnedByLoggedInUser);
                    res.json(tasksOwnedByLoggedInUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }

    },

    getAllTasks: (req, res) => {
        Task.find()
            .then((allTasks) => {
                res.json(allTasks);
            })
            .catch((err) => {
                console.log("Find All Tasks failed");
                res.json({ message: "Something went wrong in getAllTasks", error: err })
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