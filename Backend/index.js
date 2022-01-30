const SubscriptionsDBPath = './DBconfig/SubsctiptionsDatabaseConfig';
const SubscriptionRouterPath = './routers/SubscriptiosRouter';

// const UsersDBPath = './DBconfig/UsersDatabaseConfig';
// const UsersRouterPath = './routers/UsersRouter';
const PORT = 8000;

const express = require('express');
const cors = require('cors');

const SubscriptionsDB = require(SubscriptionsDBPath);
const SubscriptionsRouter = require(SubscriptionRouterPath);

// const UsersDB = require(UsersDBPath);
// const UsersRouter = require(UsersRouterPath);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/subscriptions', SubscriptionsRouter);
// app.use('/api/users', UsersRouter);

SubscriptionsDB.ConnectSubscriptionsDB();
// UsersDB.ConnectUsersDB();

app.listen(PORT, () => console.log(`Server is runing on port: ${PORT}`));