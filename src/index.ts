import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import router from './route/userRoutes';
import routersql from "./route/userRouterSql";
import {User} from './entity/User';
import express from 'express';
import routerAuthSql from "./route/authRouterSql";
import routerAuth from "./route/authRouter";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', router);
app.use('/auth', routerAuth);
//app.use('/', routersql);
//app.use('/auth', routerAuthSql);


const startServer = async () => {
    try {
        const connectionOptions = await getConnectionOptions();
        const connection = await createConnection(connectionOptions);
        const userRepository = connection.getRepository(User);
      
        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`);
        
        });
    } catch (error) {
        console.error('Error during initializaion', error);
        
    }
}

startServer()