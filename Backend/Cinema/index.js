const UsersDBPath = './DBconfig/UsersDatabaseConfig';
const UsersRouterPath = './routers/UsersRouter';

const PORT = 8500;

const express = require('express');
const cors = require('cors');

const UsersDB = require(UsersDBPath);
const UsersRouter = require(UsersRouterPath);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', UsersRouter);

UsersDB.ConnectUsersDB();

app.listen(PORT, () => console.log(`Server is runing on port: ${PORT}`));