import { Request, Response }from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({ 
    filename:'./database.sqlite',
    driver: sqlite3.Database
});


const getUsers = async (req: Request, res: Response): Promise<void> =>{
    try {
        const db = await dbPromise;
        const users = await db.all('SELECT * FROM users');
        res.json(users);
    } catch (error) {
       res.status(500).json({message:(error as Error).message});
    }
}

const getUserById = async (req:Request, res:Response): Promise<void> => {
    try {
        const db = await dbPromise;
       
        const user =  await  db.get('SELECT * FROM users WHERE id = ?', [req.params.id] );
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
        const {name, email, password} = req.body;
        const db = await dbPromise;
        
        
        const result = await db.run('INSERT INTO user (name, email, password) VALUES (?,?,?)', [name, email, password]);
        const newUser = {id: result.lastID, name, email, password};
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({message:(error as Error).message}); 
    }
}

const updateUser = async (req:Request, res:Response): Promise<void> =>{
    try {
        const {name, email, password} = req.body;
        const db = await dbPromise;
        const result = await db.run('UPDATE users SET name=?, email=?, password=? WHERE id=?',[name, email, password, req.params.id])
        if (result && result.changes && result.changes > 0) {
           
            res.json({id: req.params.id, name, email, password});
        }
        else{
            res.status(404).send('User not found')
        }
        
    } catch (error) {
        res.status(500).json({message:(error as Error).message}); 
    }
}

const deleteUser =  async (req:Request, res:Response): Promise<void> => {
    const db = await dbPromise;
    
     
    const result =  await db.run('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result && result.changes && result.changes > 0) {
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