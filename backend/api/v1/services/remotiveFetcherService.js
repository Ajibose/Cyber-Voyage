import axios from 'axios';
import cherio from 'cherio';
import JobFetcherService from './jobFetcherService.js';

const jobFetcher = new JobFetcherService('https://remotive.com/api/remote-jobs');

class RemotiveFetcherService extends JobFetcherService {
  constructor() {
    super('https://remotive.com/api/remote-jobs');
  }

  // Implement the fetchJobs method for Remotive
  async fetchJobs(limit = 10) {
    try {
      const response = await axios.get(`${this.apiUrl}?limit=${limit}`);
      return response.data.jobs.map(this.parseJob); // Parsing jobs using base class method
    } catch (error) {
      console.error('Error fetching Remotive jobs:', error);
      throw error;
    }
  }
}

export default RemotiveFetcherService;