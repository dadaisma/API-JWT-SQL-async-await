import { Router } from "express";
import { getUsers, getUserById, addUser,updateUser,deleteUser } from "../controller/UserController";
import { authenticateToken } from "../middleware/authMiddleware";
import { register, login} from '../controller/authController';

const routerAuth = Router();

routerAuth.get('/users',authenticateToken, getUsers);
routerAuth.get('/users/:id',authenticateToken, getUserById);
routerAuth.post('/users',authenticateToken, addUser);
routerAuth.put('/users/:id',authenticateToken, updateUser);
routerAuth.delete('/users/:id',authenticateToken, deleteUser);

routerAuth.post('/register', register);
routerAuth.post('/login', login);

export default routerAuth;