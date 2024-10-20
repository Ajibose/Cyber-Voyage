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

  // Endpoint to fetch a single job by its ID
  static async getJob(req, res) {
    const { id } = req.params;
    try {
      const job = await JobService.fetchJobById(id);
      if (!job) {
        return APIResponse.error(res, 'Job not found', 404);
      }
      const sanitizedJob = JobController.sanitizeJobData(job);
      APIResponse.success(res, 'Job retrieved successfully', sanitizedJob);
    } catch (error) {
      APIResponse.error(res, 'Failed to fetch job', 500);
    }
  }

  // Endpoint to search for jobs using semantic search
  static async Semanticsearch(req, res) {
    const searchQuery = req.query.search
    const count = parseInt(req.query.count)
    if (!searchQuery) {
      APIResponse.error(res, 'Search Query Parameter is required', 400);
    }
    try {
        const result = await JobService.SemanticSearchJobs(searchQuery, count);
        const sanitizedResult = result.map(JobController.sanitizeJobData);
        res.status(201).json(sanitizedResult);
    } catch (error) {
        console.log("Semantic search error", error)
        APIResponse.error(res, error.message, 500,);
    }
  }

  // Endpoint to update the embeddings for all existing jobs without embeddings
  static async updateJobEmbeddings(req, res) {
    try {
        const updatedJobs = await JobService.updateEmbeddingsForAllJobs();
        res.json({ message: `${updatedJobs.length} Jobs updated with embeddings` });
    } catch (error) {
      console.log("Error updating job embeddings", error);
      APIResponse.error(res, 'Failed to update job embeddings', 500);
      res.status(500).json({ message: error.message });
    }
  }

  // Sanitize the job data before giving it to the client
  static sanitizeJobData(job) {
    return {
      id: job.id,
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