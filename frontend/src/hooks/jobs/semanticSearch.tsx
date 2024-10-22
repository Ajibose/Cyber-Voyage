import apiClient from "../api/apiClient";
// import { JobsApiResponse } from "../../types/types";

export const semanticSearchJobs = async (query: string, count: number = 6): Promise<any> => {
  try {
    const response = await apiClient.post<any>(
      `/jobs/search`, // Base endpoint
      {}, // Empty body since we're using query params
      {
        params: { // This moves the parameters to the URL as query params
          search: query,
          count
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(`Error performing semantic search: ${error.response?.data || error.message}`);
    throw error;
  }
}