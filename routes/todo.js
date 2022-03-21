var express = require('express');
var router = express.Router();
var controller = require('../controllers/TodoController');

router.post('/', controller.createTask)
router.get('/:id', controller.getTodosByUId)
router.put('/', controller.updateTask)
router.delete('/:id', controller.deleteTask)

module.exports = router;