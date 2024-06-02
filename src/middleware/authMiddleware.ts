import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "secretkey";

export const authenticateToken = (req: Request, res: Response, next:NextFunction) :  void  =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null){
        res.status(401).send('no token received');
        return;
    }
    jwt.verify(token, JWT_SECRET,(err:any, user:any) =>{
        if(err){
            res.status(403).send('Invalid token');
        }

        (req as any).user = user;
        next();
    });

}