class jobFetcherService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchJobs() {
        throw new Error('fetchJobs() must be implemented by subclass');
    }

    parseJob(job) {
        return {
            title: job.title,
            company: job.company_name,
            salary: job.salary,
            location: job.candidate_required_location,
            jobUrl: job.url,
            category: job.category,
            jobType: job.job_type,
            description: job.description,
            publishedAt: new Date(job.publication_date).toDateString(),
        };
      }
}

export default jobFetcherService;