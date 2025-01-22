import Gym from '../Models/gym.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { name, email, phone, password, gymName } = req.body;
        if (!name || !email || !phone || !password || !gymName) {
            return res.status(400).json({
                error: "Please fill all the fields"
            });
        }
        const userExist = await Gym.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newGym = new Gym({ name, email, phone, password:hashedPassword, gymName });
        await newGym.save();
        res.status(200).json({
            message: "User registered successfully", success: true, data: newGym
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
        console.log(error);
    }
}

const cookieOptions = {
    httponly: true,
    secure:true,   //set true in production
    sameste:"Lax"
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Please fill all the fields"
            });
        }
        const userExist = await Gym.findOne({ email: email });
        if (!userExist) {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (isMatch) {
            const token = jwt.sign({ gym_id: userExist._id }, process.env.JWT_SecretKey);
            res.cookie('cookie_token', token, cookieOptions);
            res.status(200).json({
                message: "logged in successfully", success: true, data: userExist,token
            });
        } else {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('cookie_token', cookieOptions);
        res.status(200).json({
            message: "User logged out successfully", success: true
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
        console.log(error);
    }
}
