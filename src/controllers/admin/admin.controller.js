const UserServices = require('../../services/user.service');
const adminService = new UserServices();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    try {
        let user = await adminService.getUser({ email: req.body.email});
        console.log(user);
        if (user) {
            return res.status(400).json({message: `User is already registered....👍🏻`})
        };
        if (req.file) {
            console.log(req.file);
            req.body.profileImage = req.file.path.replace(/\\/g,"/");
        }
        let hashPassword = await bcryptjs.hash(req.body.password, 10);
        console.log(hashPassword);
        admin = await adminService.addNewUser({
            ...req.body,
            password: hashPassword
        });
        res.status(201).json({ admin : admin})
    } catch (error) {
        
    }
}