const express = require('express');
const userRoute = express.Router();
// const {userVerifyToken} = require('../../helpers/userVerifyToken')
const {registerUser , loginUser} = require('../../controllers/user/user.controller')

userRoute.post('/register-User',registerUser)
userRoute.post('/login-User',loginUser)

module.exports = userRoute;