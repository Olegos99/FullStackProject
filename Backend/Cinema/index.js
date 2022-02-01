const UsersDBPath = './DBconfig/UsersDatabaseConfig';

const UsersRouterPath = './routers/UsersRouter';
const MoviesRouterPath = './routers/MoviesRouter';
const MembersRouterPath = './routers/MembersRouter';
const SubscriptionsRouterPath = './routers/SubscriptionsRouter';

const PORT = 8500;

const express = require('express');
const cors = require('cors');

const UsersDB = require(UsersDBPath);
const UsersRouter = require(UsersRouterPath);
const MoviesRouter = require(MoviesRouterPath);
const MembersRouter = require(MembersRouterPath);
const SubscriptionsRouter = require(SubscriptionsRouterPath);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', UsersRouter);
app.use('/api/movies', MoviesRouter);
app.use('/api/members', MembersRouter);
app.use('/api/subscriptions', SubscriptionsRouter);

UsersDB.ConnectUsersDB();

app.listen(PORT, () => console.log(`Server is runing on port: ${PORT}`));