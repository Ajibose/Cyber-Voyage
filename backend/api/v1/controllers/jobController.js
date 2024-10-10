import JobManagerService from '../services/jobManager.js';
import JobService from '../services/jobService.js';

class JobController {
  constructor() {
    this.jobManager = new JobManagerService();
  }

  // Endpoint to fetch jobs from all APIs and save them
  async fetchAndSaveJobs(req, res) {
    try {
      await this.jobManager.fetchAndSaveJobsFromAllSources();
      res.status(200).json({ message: 'Jobs fetched and saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch and save jobs' });
    }
  }

    // Endpoint to fetch all jobs from the database
    static async getAllJobs(req, res) {
      try {
        const jobs = await JobService.fetchJobs();
        res.status(200).json({ jobs });
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
      }
    }
}

export default JobController;