// services/jobManagerService.js
import RemotiveFetcherService from './remotiveFetcherService.js';
import jobModel from '../models/jobModel.js';
import EmbeddingService from './embeddingService.js';
import cherio from 'cherio';

class JobManagerService {
  constructor() {
    this.remotiveFetcher = new RemotiveFetcherService();
    this.jobModel = jobModel
  }

  // Fetch jobs from all APIs and store them in the database
  async fetchAndSaveJobsFromAllSources() {
    try {
      const remotiveJobs = await this.remotiveFetcher.fetchJobs();
      
      const allJobs = [...remotiveJobs];
      
      for (const job of allJobs) {
        console.log('Saving job:', job);
        job.publishedAt = job.published_at;
        job.jonUrl = job.url;
        delete job.url;
        delete job.published_at;
        const jobEmbedding = await EmbeddingService.generateEmbedding(`${job.title} ${job.category} ${job.jobType} ${cherio.load(job.description).text()}`);
        job.embedding = jobEmbedding;
        await this.jobModel.create(job);
      }
    } catch (error) {
      console.error('Error fetching and saving jobs from all sources:', error);
      throw error;
    }
  }
}

export default JobManagerService;