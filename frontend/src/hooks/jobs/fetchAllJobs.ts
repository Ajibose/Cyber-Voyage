import apiClient from "../api/apiClient";
import { JobsApiResponse } from "../../types/types";

// Fetch all jobs with typed response
export const fetchAllJobs = async (): Promise<JobsApiResponse> => {
    try {
        const response = await apiClient.get<JobsApiResponse>('/jobs');
        
        // Return the job data with type safety
        return response.data;
    } catch (error) {
        console.error(`Error fetching jobs: ${error}`);
        throw error; // Rethrow error for further handling if needed
    }
}
