import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; // Import Request and Response types
import User, { IUser } from '../models/User'; // Import your User model

import * as Joi from '@hapi/joi';

const router = express.Router();

const registerSchema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid('operator', 'admin', 'accountant')
    .default('operator')
});

router.post('/register', async (req: Request, res: Response) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(400).send('Email already exists');
    return;
  }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

  try {
    const { error } = await registerSchema.validateAsync(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      await user.save();
      return res.status(200).send({ message: 'User created successfully' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
});


router.post('/login', async (req: Request, res: Response) => {
  try {
    console.log('Received login request:', req.body);
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect Email-ID' });
    }
    console.log('Received login request:', req.body);
console.log('Request password:', req.body.password);
console.log('Stored hashed password:', user.password);
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log('Password comparison result:', validPassword);   
    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect Password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!);
    console.log('Generated token:', token);
    res.header('auth-token', token).json({ token });
  } catch (error) {
  
    console.error('Error encountered:', error);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});

export default router;
