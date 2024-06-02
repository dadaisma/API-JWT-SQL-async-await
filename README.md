User Authentication API:
This API is built with Express.js and uses TypeORM (or SQLITE3 and SQL queries)for data persistence. It provides endpoints for user registration, login, and user management. It uses JSON Web Tokens (JWT) for authentication.

Setup
The application is set up to run on port 3000. It uses JSON middleware for request body parsing.

Endpoints
POST /auth/register
This endpoint is used to register a new user. The route handler for this endpoint is defined in authRouter.

Request Body:

Response:

201 Created: Returns the created user.
500 Internal Server Error: Returns an error message.
POST /auth/login
This endpoint is used to log in a user. The route handler for this endpoint is defined in authRouter.

Request Body:

Response:

200 OK: Returns a JWT.
400 Bad Request: Returns an error message if the email or password is incorrect.
500 Internal Server Error: Returns an error message.
JWT Authentication
The application uses JWT for authentication. When a user logs in, a JWT is generated and returned in the response. This token should be included in the Authorization header of subsequent requests to authenticate the user.

Starting the Server
npm run dev

The server is started by calling the startServer function. This function establishes a connection to the database and starts the Express.js server on the specified port.
The User repository is retrieved from the connection and can be used to interact with the User table in the database.
const startServer = async () => {
    try {
        const connectionOptions = await getConnectionOptions();
        const connection = await createConnection(connectionOptions);
        const userRepository = connection.getRepository(User);
      
        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
    }
};
