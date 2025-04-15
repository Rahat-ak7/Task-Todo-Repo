const express = require('express');
const auth = require('../middlewares/auth');
const todoController = require('../controllers/todoController');

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);


//Get all todos for a user
router.get('/', todoController.getTodos);


//Add new todo
router.post('/', todoController.addTodo);


//Update todo
router.put('/:id', todoController.updateTodo);

//Delete todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;