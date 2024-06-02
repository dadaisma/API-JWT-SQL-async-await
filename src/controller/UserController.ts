import { Request, Response }from 'express';
import { getRepository } from 'typeorm';
import {User} from '../entity/User';




const getUsers = async (req: Request, res: Response): Promise<void> =>{
    try {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    } catch (error) {
       res.status(500).json({message:(error as Error).message});
    }
}

const getUserById = async (req:Request, res:Response): Promise<void> => {
    try {
        const userRepository = getRepository(User);
        const id = Number(req.params.id);
        const user =  await  userRepository.findOne({where: {id: id}});
        if(user){
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }  
        
    } catch (error) {
        res.status(500).json({message:(error as Error).message});
    }
}

const addUser = async (req:Request, res:Response): Promise<void> =>{
    try {
        const userRepository = getRepository(User);
        const newUser = userRepository.create(req.body);
        const result = await userRepository.save(newUser);
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({message:(error as Error).message}); 
    }
}

const updateUser = async (req:Request, res:Response): Promise<void> =>{
    try {
        const userRepository = getRepository(User);
        const id = Number(req.params.id);
               
        const user =  await userRepository.findOne({where:{id: id}})
        if(user){
            userRepository.merge(user, req.body);
            const result = await userRepository.save(user);
            res.json(result);
        }
        else{
            res.status(404).send('User not found')
        }
        
    } catch (error) {
        res.status(500).json({message:(error as Error).message}); 
    }
}

const deleteUser =  async (req:Request, res:Response): Promise<void> => {
    const userRepository = getRepository(User);
    const id = Number(req.params.id);
     
    const result =  await userRepository.delete({id: id})
    if (result.affected) {
        res.status(204).send();
    }  else {
        res.status(404).send('User not found');
    }
}


export {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}