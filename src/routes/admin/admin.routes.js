const express = require('express');
const adminRoutes = express.Router();
const { adminVerifyToken} = require('../../helpers/userVerifyToken');
const {
    registerAdmin,
    loginAdmin,
    getAdmin,
    getAllAdmin,
    updateAdmin,
    deleteAdmin,
    upadetPassword
} = require('../../controllers/admin/admin.controller');
const { upload } = require('../../helpers/imageUpload');

adminRoutes.post('/register-Admin', upload.single('profileImage'), registerAdmin);
adminRoutes.post('/login-Admin',loginAdmin);
adminRoutes.get('/get-Admin',adminVerifyToken, getAdmin);
adminRoutes.get('/get-All-Admin', adminVerifyToken,getAllAdmin);
adminRoutes.put('/update-Admin', adminVerifyToken, updateAdmin);
adminRoutes.delete('/delete-Admin', adminVerifyToken, deleteAdmin);
adminRoutes.put('/upadate-Password',adminVerifyToken, upadetPassword);

module.exports = adminRoutes;