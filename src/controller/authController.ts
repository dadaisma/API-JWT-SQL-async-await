import {Request, Response} from 'express';
import { getRepository, getTreeRepository } from 'typeorm';
import {User} from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//const userRepository = getRepository(User);

const JWT_SECRET = 'secretkey';

export const register = async( req:Request, res:Response): Promise<void> =>{
    try {
        const userRepository = getRepository(User);
        const{name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        
        const newUser = userRepository.create({name, email, password:hashedPassword});
        await userRepository.save(newUser);
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: (error as Error).message})
    }
};

export const login = async(req:Request, res:Response): Promise <void> =>{
    try {
        const userRepository = getRepository(User);
        const {email, password} = req.body;
        
        const user = await userRepository.findOneBy({email});

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