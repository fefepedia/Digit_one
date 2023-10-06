import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User'; // Import your User model with IUser interface

declare global {
    namespace Express {
      interface Request {
        user?: IUser;
      }
    }
  }
  
const verify = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET as string) as { _id: string };
    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(401).send("User not found");
    }

    // Attach the user to the request
    req.user = user as IUser;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default verify;
