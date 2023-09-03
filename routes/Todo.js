const TodoController = require('../controller/Todolist.controller');
const Router = require('express').Router();

Router.get('/', TodoController.getTodo);
Router.get('/:user_id', TodoController.GetTodoById);
Router.post('/add', TodoController.createTodo);
Router.put('/:user_id/:id', TodoController.updateTodo);
Router.delete('/:user_id/:id', TodoController.deleteTodo);

module.exports = Router;
