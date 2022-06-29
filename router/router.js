const express = require('express');
const route = express.Router();
const Auth = require('../conntroller/auth');
const User = require('../conntroller/user');
const Project = require('../conntroller/project');
const Task = require('../conntroller/task');
const auth = require('../middleware/auth.middleware');

// Auth
route.post('/register', Auth.register);
route.post('/login', Auth.login);

// User
route.get('/user/all', auth, User.getAll);
route.get('/user/:id', auth, User.getOne);
route.put('/user/edit/:id', auth, User.edit);
route.delete('/user/delete/:id', auth, User.delete);
route.post('/user/:id/checkpass', auth, User.checkPassword);

// passport.authenticate('jwt', {session: false}),
// Project
route.get('/projects/all', auth, Project.getAll);
route.get('/projects/:id', auth, Project.getOne);
route.post('/projects/create', auth, Project.create);
route.delete('/projects/delete/:id', auth, Project.delete);
route.put('/projects/update/:id', auth, Project.update);
route.post('/projects/addUser/:id', auth, Project.addUser)
route.put('/projects/removeUser/:id', auth, Project.removeUser)
route.put('/projects/addPermission/:id', auth, Project.addPermission)

// Task
route.get('/projects/:id/tasks', auth, Task.getAll);
route.get('/projects/:id/tasks/:taskId', auth, Task.getOne);
route.post('/projects/:id/tasks/create', auth, Task.create);
route.delete('/projects/:id/tasks/delete/:id', auth, Task.delete);
route.put('/projects/:id/tasks/update/:id', auth, Task.update);

// subtask


module.exports = route;