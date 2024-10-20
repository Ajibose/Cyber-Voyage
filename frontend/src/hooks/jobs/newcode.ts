
import apiClient from "../api/apiClient";
import { JobsApiResponse } from "../../types/types";

interface SemanticSearchParams {
  search: string;
  count?: number;
}

// Enhanced fetchJobs function that handles both regular and semantic search
export const fetchJobs = async (params?: SemanticSearchParams): Promise<JobsApiResponse> => {
  try {
    let response;

    if (params?.search) {
      // Semantic search
      response = await apiClient.post<JobsApiResponse>(
        `/jobs/search`, 
        null, // no body needed as we're using query params
        {
          params: {
            search: params.search,
            count: params.count || 6
          }
        }
      );
    } else {
      // Regular jobs fetch
      response = await apiClient.get<JobsApiResponse>('/jobs');
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching jobs: ${error}`);
    throw error;
  }
}
