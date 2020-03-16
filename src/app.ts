import express from 'express';
import routeHandler from './routes/index';

const app = express();

// Automatically parse json in requests
app.use(express.json());

// Handle all routes after / with routeHandler
app.use('/', routeHandler);

export default app;
