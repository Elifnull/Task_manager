const TaskController = require("../controllers/task.controller");

module.exports = (app) =>{
    app.get('/api/tasks', TaskController.getAllTasks);

    app.post('/api/tasks', TaskController.createTask);

    app.put('/api/tasks/:id', TaskController.updateTask);

    app.delete('/api/tasks/:id', TaskController.deleteTask);
    
    app.get('/api/tasks/:id', TaskController.getOneTask);
}