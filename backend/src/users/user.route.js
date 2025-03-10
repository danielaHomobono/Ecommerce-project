const express = require('express');
const User = require('./user.model');
const generateToken = require('../middelware/generateToken');
const router = express.Router();

//Register endpoint
router.post("/register", async (req, res)=> {
    try {
        const {username, email, password} = req.body;
        const user = new User({username, email, password});
        await user.save()
        res.status(201).json({message: "User registered successfully"});
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
    
})

//endpoint for login
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        const token = await generateToken(user._id)
        
        res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
        
});
        res.status(200).send({message: "Logged in succesfully", token, user:{
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
            
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
})
//logout endpoint
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "Logged out successfully"});
})
//delete user endpoint
router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error deleting user"});
    }
})
// get all users endpoint
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({},'id email role').sort({createdAt: -1});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error getting users"});
    }
})
//udate user role endpoint
router.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id, {role}, {new: true});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({message: "User role updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error updating user role"});
    }
})
//update user profile endpoint


router.patch('/edit-profile', async (req, res) => {
    try {        
        const {userId,username, profileImage, bio, profession} = req.body;        
        if (!userId) {
            return res.status(404).json({error: "User not found id required"});
        }
        const user = await User.findById(userId)
        
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        if (username !== undefined)user.username = username; 
        if (profileImage !== undefined)user.profileImage = profileImage;
        if (bio !== undefined)user.bio = bio;
        if (profession!== undefined)user.profession = profession; 
            
        await user.save();        
        res.status(200).json({message: "User profile updated successfully", user:{
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error updating user profile"});
    }
})






module.exports = router;
