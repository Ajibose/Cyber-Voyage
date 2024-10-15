import express from 'express';
import cron from './utils/cronJobs.js';    
import dbClient from './config/dbConfig.js';
import jobRoutes from './api/v1/routes/jobRoutes.js';
import cors from "cors";
const app = express();

// Other express configurations and middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/jobs', jobRoutes);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});


export default app