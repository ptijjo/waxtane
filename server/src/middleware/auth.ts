import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';


export const auth = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken: any = jwt.verify(token, `${process.env.CODE_TOKEN}`);
        const userId = decodedToken.userId;
        const userLastName = decodedToken.userLastName;
        const userFirstName = decodedToken.userFirstName;
        const userEmail = decodedToken.userEmail;
        const userPicture = decodedToken.userPicture;
        req.auth = {
            userId,
            userLastName,
            userFirstName,
            userPicture,
            userEmail,
        };
        next();
    }

    catch (error) {
        res.status(401).json({ error });
    }
}