const express = require('express');
const userRoute = express.Router();
// const {userVerifyToken} = require('../../helpers/userVerifyToken')
const {registerUser} = require('../../controllers/user/user.controller')

userRoute.post('/register-User',registerUser)

module.exports = userRoute;