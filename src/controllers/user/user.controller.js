const UserServices = require('../../services/user.service');
const userService = new UserServices();
const bcryptjs = require('bcryptjs')
// const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        let user = await UserService.getUser({user: req.body.userName, email: req.body.email});
        console.log(user);
        if (user) {
            return res.status(400).json({message: `User is Already Registered....👍🏻`});
        }
        console.log(user);
        if (req.file) {
            console.log(req.file);
        }
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

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists
        const user = await userService.getUser({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please register first.' });
        }

        // Compare the entered password with the stored hash
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret', // Use a secure secret in production
            { expiresIn: '1h' }
        );

        // Respond with token and user info
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};