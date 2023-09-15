import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';  // make sure to never expose this key

export async function signUp(req, res) {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'User already registered!' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
    });

    await user.save();

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }  // Token validity, adjust as needed
    );

    res.status(201).send({ message: 'User registered successfully!', token });
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid credentials!' });
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.send({ message: 'Logged in successfully!', token });
}

export async function getProfile(req, res) {
    // Assuming that you'll decode the token before this middleware 
    // and attach the decoded payload to req.user
    const user = await User.findById(req.user.userId).select('-password');  // excludes the password
    if (!user) {
        return res.status(404).send({ message: 'User not found!' });
    }

    res.send(user);
}
