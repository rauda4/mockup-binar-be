const TodoController = require('../controller/Todolist.controller');
const Router = require('express').Router();

Router.get('/', TodoController.getTodo);
Router.get('/:id', TodoController.GetTodoById);
Router.post('/add', TodoController.createTodo);
Router.put('/:id', TodoController.updateTodo);
Router.delete('/:id', TodoController.deleteTodo);

module.exports = Router;
