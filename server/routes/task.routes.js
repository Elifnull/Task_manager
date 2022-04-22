const TaskController = require("../controllers/task.controller");

module.exports = (app) =>{
    app.get('/alltasks', TaskController.getAllTasks);
    app.get('/myassignedtasks', TaskController.getMyAssignedTasks);
    app.get('/api/myownedtasks', TaskController.getMyOwnedTasks);
    app.post('/api/create', TaskController.createTask);
    app.put('/api/update/:id', TaskController.updateTask);
    app.delete('/api/delete/:id', TaskController.deleteTask);
    app.get('/api/task/:id', TaskController.getOneTask);
}