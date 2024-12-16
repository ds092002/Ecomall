const express = require('express');
const userRoute = express.Router();
const {userVerifyToken} = require('../../helpers/userVerifyToken')
const {registerUser , loginUser, logoutUser, getProfile} = require('../../controllers/user/user.controller')

userRoute.post('/register-User',registerUser)
userRoute.post('/login-User',loginUser)
userRoute.post('/logout-User',logoutUser)
userRoute.get('/get-User', getProfile);

module.exports = userRoute;