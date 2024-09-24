const usersRoutes = require('express').Router();
const userRoute = require('./user.routes');

usersRoutes.use('/users', userRoute)

module.exports = usersRoutes;