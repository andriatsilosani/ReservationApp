import express from 'express';
import { registerUser, loginUser } from '../controllers/auth/user.controller.js'
import User from '../models/user.model.js';

const router = express.Router();

// get all
router.get('/users', async (req, res) => {
    try {   
        const users = await User.find()
        res.status(200).json(users);
    } catch(error) {
        console.error(error)
        res.status(500).json({ message: 'something went wrong' })
    }
})

// get by id
router.get('/:id', async (req, res) =>  {
    try {
  
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json(user);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router