const router = require('express').Router();
const UserRouter = require('./User');
const TodoRouter = require('./Todo');

router.use('/users', UserRouter);
router.use('/todo', TodoRouter);

module.exports = router;
