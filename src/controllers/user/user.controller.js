const UserServices = require('../../services/user.service');
const userService = new UserServices();
const bcryptjs = require('bcryptjs')
// const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        console.log("Body ====>", req.body);
        let user = await userService.getUser({userName: req.body.userName, email: req.body.email});
        // console.log(user);
        if (user) {
            return res.status(400).json({message: `User is Already Registered....👍🏻`});
        }
        // if (req.file) {
        //     console.log(req.file);
        // }
        let hashPassword = await bcryptjs.hash(req.body.password, 7);
        console.log(hashPassword);
        user = await userService.addNewUser({
            ...req.body,
            password: hashPassword
        });
        res.status(201).json({ user: user, message: `New User Is Added SuccesFully....👍🏻`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
}