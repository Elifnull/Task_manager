const TaskController = require("../controllers/task.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app) =>{
    app.post('/api/create', authenticate, TaskController.createTask);
    app.put('/api/update/:id', TaskController.updateTask);
    app.delete('/api/delete/:id', TaskController.deleteTask);
    app.get('/api/task/:id', TaskController.getOneTask);
    app.get('/api/alltasks', TaskController.getAllTasks);
    app.get('/api/myownedtasks/:username', authenticate, TaskController.getMyOwnedTasks);
    // app.get('/myassignedtasks', TaskController.getMyAssignedTasks);
}
