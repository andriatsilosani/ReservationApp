import User from "../../models/user.model.js";
import bcrypt from 'bcryptjs';
import { getUserByEmail } from "../../utils/user.utils.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const registerUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;
        if (!name || !lastname || !email || !password) {
            return res.status(400).json({ message: 'All credentials are required.' })
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({ message: 'Email is already used.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            lastname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Something went wrong.'})
    }
}


export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All credentials are required." });
        }

        const user = await getUserByEmail(email);
        if (!user) {
            res.status(404).json({message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            res.status(401).json({message: 'Invalid Password'})
        }
        const token = jwt.sign(
            {id: user._id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
              id: user._id,
              name: user.name,
              lastname: user.lastname,
              email: user.email,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
}