import path from 'path';
import express from 'express';
import routeHandler from './routes/index';

const app = express();

// Automatically parse json in requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle all routes after /hello with routeHandler
app.use('/hello', routeHandler);

// Send everything else the generated react js files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

export default app;
