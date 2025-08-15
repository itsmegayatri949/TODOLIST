const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

router.use(auth); // protect all routes below
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
