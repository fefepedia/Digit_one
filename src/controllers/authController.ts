import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    await user.save();
    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while registering.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login request received:', req.body);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('User not found for email:', req.body.email);
      return res.status(400).json({ error: 'Incorrect Email-ID' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log('Incorrect password for user:', user.email);
      return res.status(400).json({ error: 'Incorrect Password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!);
    res.header('auth-token', token).json({ token });
  } catch (error) {
    console.error('Error encountered:', error);
    return res.status(500).json({ error: 'An error occurred while logging in.' });
  }
};
