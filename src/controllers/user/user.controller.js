const UserServices = require('../../services/user.service');
const userService = new UserServices();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        console.log("Body ====>", req.body);
        let user = await userService.getUser({userName: req.body.userName, email: req.body.email});
        // console.log(user);
        if (user) {
            return res.status(400).json({message: `User is Already Registered....👍🏻`});
        }
        if(req.file){
            console.log(req.file);
            req.body.profileImage = req.file.path.replace(/\\/g,"/");
        };
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

// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if email exists
//         const user = await userService.getUser({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found. Please register first.' });
//         }

//         // Compare the entered password with the stored hash
//         const isPasswordValid = await bcryptjs.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid email or password.' });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, email: user.email },
//             process.env.JWT_SECRET || 'your_jwt_secret', // Use a secure secret in production
//             { expiresIn: '1h' }
//         );

//         // Respond with token and user info
//         res.status(200).json({
//             message: 'Login successful!',
//             token,
//             user: {
//                 id: user._id,
//                 userName: user.userName,
//                 email: user.email,
//             },
//         });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Internal server error. Please try again later.' });
// };

exports.loginUser = async (req, res) => {
    try {
        console.log("Body =======>", req.body);
        let user = await userService.getUser({email: req.body.email, isDelete: false});
        console.log(user);
        if (!user) {
            return res.status(400).json({message: `Email not found..please check your email address....👍🏻`})
        }
        let checkPassword = await bcryptjs.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: `Password is not match please enter correct password..`})
        }
        let token = jwt.sign({userId: user._id}, 'User');
        console.log(token);
        res.status(200).json({ message: `Login SuccesFully..👍🏻`, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

exports.logoutUser = (req, res) => {
    try {
      // Here, you can add any logic for invalidating tokens or sessions if needed
      // For example, you could store blacklisted tokens or invalidate a session here (optional)
      
      // Respond with success message
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.getProfile = async (req, res) => {
    try {
      // Validate that the userId exists
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      // Fetch user by ID
      const user = await userService.getUserById(userId);
  
      // Handle case where user is not found
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Return user details
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in getProfile:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  };
  

exports.deleteProfile = async (req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if (!user) {
            return res.status(404).json({ message:`This profile not found...`});
        }
        user = await userService.updateUser(user._id, { isDelete:true});
        res.status(200).json({ message:`User profile deleted successfully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error...' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        let { oldPassword, newPassword, confirmPassword } = req.body;

        let user = await userService.getUserById(req.query.userId);
        if (!user) {
            return res.json({ message: 'User Not Found. Please Try Again.' });
        }

        let comparePassword = await bcryptjs.compare(oldPassword, user.password);
        if (!comparePassword) {
            return res.status(404).json({ message: 'Incorrect Current Password.' });
        }

        if (newPassword === oldPassword) {
            return res.json({ message: 'Old Password And New Password Are Same. Please Enter a Different Password.' });
        }

        if (newPassword !== confirmPassword) {
            return res.json({ message: 'New Password And Confirm Password Do Not Match.' });
        }

        let hashPassword = await bcryptjs.hash(newPassword, 10);
        user = await userService.updateUser(user._id, { password: hashPassword });

        res.status(200).json({ user, message: 'Password Update Successful.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};