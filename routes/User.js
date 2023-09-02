const UserController = require('../controller/User.controller');
const Router = require('express').Router();

Router.get('/', UserController.getUser);
Router.get('/:id', UserController.GetUserById);
Router.post('/register', UserController.createUser);
Router.post('/login', UserController.login);
Router.put('/:id', UserController.updateUser);
Router.delete('/:id', UserController.deleteUser);

module.exports = Router;
