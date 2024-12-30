const adminRoutes = require('express').Router();
const adminUserRoutes = require('./admin.routes');

adminRoutes.use('/adminAsUser', adminUserRoutes);

module.exports = adminRoutes;