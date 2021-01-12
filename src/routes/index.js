import express from 'express';
import AuthRoute from './auth.route';
import UserRoute from './user.route';

const app = express();

app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);

export default app;
