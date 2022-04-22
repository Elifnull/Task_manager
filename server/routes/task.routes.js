const TaskController = require("../controllers/task.controller");

module.exports = (app) =>{
    app.get('/alltasks', TaskController.getAllTasks);
    app.get('/myassignedtasks', TaskController.getMyAssignedTasks);
    app.get('/myownedtasks', TaskController.getMyOwnedTasks);
    app.post('/create', TaskController.createTask);
    app.put('/update/:id', TaskController.updateTask);
    app.delete('/delete/:id', TaskController.deleteTask);
    app.get('/task/:id', TaskController.getOneTask);
}