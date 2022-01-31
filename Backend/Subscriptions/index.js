const SubscriptionsDBPath = './DBconfig/SubsctiptionsDatabaseConfig';
const SubscriptiosRouterPath = './routers/SubscriptiosRouter';
const MoviesRouterPath = './routers/MoviesRouter';
const MembersRouterPath = './routers/MembersRouter';

const PORT = 8000;

const express = require('express');
const cors = require('cors');

const SubscriptionsDB = require(SubscriptionsDBPath);
const SubscriptionsRouter = require(SubscriptiosRouterPath);
const MoviesRouter = require(MoviesRouterPath);
const MembersRouter = require(MembersRouterPath);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/subscriptions', SubscriptionsRouter);
app.use('/api/movies', MoviesRouter);
app.use('/api/members', MembersRouter);

SubscriptionsDB.ConnectSubscriptionsDB();

app.listen(PORT, () => console.log(`Server is runing on port: ${PORT}`));