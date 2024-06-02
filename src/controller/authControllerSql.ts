import {Request, Response} from 'express';
import  sqlite3 from "sqlite3";
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dbPromise = open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});

const JWT_SECRET = 'secretkey';

export const register = async( req:Request, res:Response): Promise<void> =>{
    try {
        const{name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const db = await dbPromise;
        const result = await db.run('INSERT INTO user (name, email, password) VALUES (?,?,?)', [name,email,hashedPassword]);
        const newUser = {id:result.lastID, name, email};
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: (error as Error).message})
    }
};

export const login = async(req:Request, res:Response): Promise <void> =>{
    try {
        const {email, password} = req.body;
        const db = await dbPromise;
        const user = await db.get('SELECT * FROM user WHERE email = ?', [email]);

        if( user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id:user.id, email: user.email}, JWT_SECRET, {expiresIn: '1h'});
            res.json({token});
        }
        else{
            res.status(401).json({message:'Invalid email or password'});
        }
        
    } catch (error) {
       res.status(500).json({message:(error as Error).message})
    }
}