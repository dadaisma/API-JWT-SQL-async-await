import { Router } from "express";
import { getUsers, getUserById, addUser,updateUser,deleteUser } from "../controller/UserControllerSql";
import { authenticateToken } from "../middleware/authMiddleware";
import { register, login} from '../controller/authControllerSql';

const routerAuthSql = Router();

routerAuthSql.get('/users',authenticateToken, getUsers);
routerAuthSql.get('/users/:id',authenticateToken, getUserById);
routerAuthSql.post('/users',authenticateToken, addUser);
routerAuthSql.put('/users/:id',authenticateToken, updateUser);
routerAuthSql.delete('/users/:id',authenticateToken, deleteUser);

routerAuthSql.post('/register', register);
routerAuthSql.post('/login', login);

export default routerAuthSql;