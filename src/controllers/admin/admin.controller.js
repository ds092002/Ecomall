const UserServices = require('../../services/user.service');
const adminService = new UserServices();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    try {
        let admin = await adminService.getUser({ email: req.body.email});
        console.log(admin);
        if (admin) {
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
            password: hashPassword,
            isAdmin: true
        });
        res.status(201).json({ admin : admin})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: `Internal Server Error.${console.error()}`})
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        let admin = await adminService.getUser({email: req.body.email, isDelete: false});
        console.log(admin);
        if (!admin) {
            return res.status(404).json({message: `User not found or deleted....Please Check your email address`})
        }
        let checkPassword = await bcryptjs.compare(req.body.password, admin.password);
        if (!checkPassword) {
            return res.status(401).json({message: `Invalid Password....Please Try Again`});
        }
        let token = jwt.sign({ adminId: admin._id},'Admin');
        console.log(token);
         res.status(200).json({token, message: `Login SuccesFully........`});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Internal Server Error.${console.error()}`})
    }
}

exports.getAllAdmin = async (req, res) => {
    try {
        let admin = await adminService.getAllUsers({isDelete: false, isAdmin: true});
        console.log(admin);
        if (!admin) {
            return res.status(404).json({message: `Admin data not found please try again.....!`})
        }
        res.status(200).json({admin})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Internal Server Error.${console.error()}`})
    }
}

exports.getAdmin = async (req, res) => {
    try {
        let admin = await adminService.getUserById(req.query.adminId);
        console.log(admin);
        if (!admin) {
            return res.status(404).json({message:`Admin data not found please try again.....!`})
        }
        admin = await adminService.updateUser(admin._id,{...req.body});
        res.status(201).json({admin, message:`Admin updated successfully`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Internal Server Error.${console.error()}`})        
    }
}
