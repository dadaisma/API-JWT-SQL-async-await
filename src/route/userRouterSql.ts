import { Router } from "express";
import { 
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
 } from '../controller/UserController'

 const routersql = Router();

    routersql.get('/users', getUsers);
    routersql.get('/users/:id', getUserById);
    routersql.post('/users', addUser);
    routersql.put('/users/:id', updateUser);
    routersql.delete('/users/:id', deleteUser);

    export default routersql;