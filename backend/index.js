import express from 'express';
import cron from './utils/cronJobs.js';    
import dbClient from './config/dbConfig.js';

const app = express();

// Other express configurations and middleware setup
app.use(express.json());

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

