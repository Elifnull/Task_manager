const TaskController = require("../controllers/task.controller");

module.exports = (app) =>{
    app.post('/api/create', TaskController.createTask);
    app.put('/api/update/:id', TaskController.updateTask);
    app.delete('/api/delete/:id', TaskController.deleteTask);
    app.get('/api/task/:id', TaskController.getOneTask);
    app.get('api/alltasks', TaskController.getAllTasks);
    app.get('/api/myownedtasks/:username"', TaskController.getMyOwnedTasks);
    // app.get('/myassignedtasks', TaskController.getMyAssignedTasks);
}