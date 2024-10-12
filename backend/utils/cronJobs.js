// cronJobs.js
import cron from 'node-cron';
import JobManagerService from '../api/v1/services/jobManager.js';
// Initialize the job manager service
const jobManagerService = new JobManagerService();

// Schedule a cron job to fetch jobs from APIs every 3 hours
//cron.schedule('*/30 * * * * *', async () => {
cron.schedule('0 */1 * * *', async () => {
  console.log('Fetching jobs from APIs...');
  try {
    await jobManagerService.fetchAndSaveJobsFromAllSources();
    console.log('Jobs fetched and saved successfully');
  } catch (error) {
    console.error('Error while fetching and saving jobs:', error);
  }
});

export default cron;