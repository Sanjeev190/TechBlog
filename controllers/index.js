const router = require('express').Router();



const homeroutes= require('./homeroutes');
const userroutes = require('./api/userroutes.js');
const blogroutes = require('./api/blogroutes.js');

router.use('/', homeroutes);
router.use('/api/users', userroutes);
router.use('/api/blog', blogroutes);

module.exports = router;
