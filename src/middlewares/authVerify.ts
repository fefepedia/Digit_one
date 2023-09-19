import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try {
        console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
         console.log(verified)
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

export default verify;
