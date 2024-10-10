import jobModel from "../models/jobModel.js";

class JobService {
    static async fetchJobs() {
        try {
            return await jobModel.findAll();
        } catch (error) {
            throw error;
        }
    }
}

export default JobService;