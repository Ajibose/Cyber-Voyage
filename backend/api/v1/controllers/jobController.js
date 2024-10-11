import APIResponse from '../../../utils/APIResponse.js';
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
        const sanitizedJobs = jobs.map(JobController.sanitizeJobData);
        APIResponse.success(res, "Jobs retrieved successsfully", sanitizedJobs);
      } catch (error) {
        APIResponse.error(res, 'Failed to fetch jobs', 500);
      }
    }

    // Sanitize the job data before giving it to the client
    static sanitizeJobData(job) {
      return {
        title: job.title,
        company: job.company,
        category: job.category,
        salary: job.salary,
        location: job.location,
        url: job.jobUrl,
        jobType: job.jobType,
        publishedAt: job.publishedAt,
        description: job.description,
        experience: job.experience,
      };
    }
}

export default JobController;