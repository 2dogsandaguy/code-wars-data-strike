const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const commentsRoutes = require('./commentsRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
