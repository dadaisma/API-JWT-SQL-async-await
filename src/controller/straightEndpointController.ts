 
 import express from 'express';
 import { Request, Response }from 'express';
import { getRepository } from 'typeorm';
import {User} from '../entity/User';

const app = express();

        app.get('/users', async(req, res) => {
            try {
                const userRepository = getRepository(User);
                const users = await userRepository.find();
                res.json(users);
            } catch (error) {
               res.status(500).json({message:(error as Error).message});
            }
        });

        app.get('/users/:id', async (req, res) =>{
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
        })

        app.post('/users', async(req , res) => {
            
            try {
                const userRepository = getRepository(User);
                const newUser = userRepository.create(req.body);
                const result = await userRepository.save(newUser);
                res.status(201).json(result)
            } catch (error) {
                res.status(500).json({message:(error as Error).message});   
            }
        })


        app.put('/users/:id', async(req, res) => {
            try {
                const id = Number(req.params.id);
                const userRepository = getRepository(User);
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
        })

        app.delete('/users/:id', async(req, res) => {
            try {
                const userRepository = getRepository(User);
                const id = Number(req.params.id);
                console.log("this is what comes",id); 
                const result =  await userRepository.delete({id: id})
                if (result.affected) {
                    res.status(204).send();
                }  else {
                    res.status(404).send('User not found');
                }

            } catch (error) {
                res.status(500).json({message:(error as Error).message});   
            }
        })
