import { Router } from "express";
import { 
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
 } from '../controller/UserController'

 const router = Router();

    router.get('/users', getUsers);
    router.get('/users/:id', getUserById);
    router.post('/users', addUser);
    router.put('/users/:id', updateUser);
    router.delete('/users/:id', deleteUser);

    export default router;