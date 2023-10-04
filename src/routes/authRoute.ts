import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import User from '../models/User';
import* as Joi from '@hapi/joi';

const router = express.Router();

interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
}

const registerSchema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('operator', 'admin', 'accountant').default('operator'),
});

router.post('/register', async (req: express.Request, res: express.Response) => {
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
    role: req.body.role,
  });

  try {
    const { error } = await registerSchema.validateAsync(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      await user.save();
      return res.status(200).send({message: 'User created successfully'});

    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post('/login', async (req: express.Request, res: express.Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Incorrect Email- ID');

  const validPassword = await bcrypt.compare(req.body.password, (user as IUser).password);
  if (!validPassword) return res.status(400).send('Incorrect Password');

  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      const token = jwt.sign({ _id: (user as IUser)._id }, process.env.TOKEN_SECRET!);
      res.header('auth-token', token).send(token);
    }
  } catch (error) {
    console.error("Error encountered:", error);
    res.status(500).send(error);
  }
});

export default router;
