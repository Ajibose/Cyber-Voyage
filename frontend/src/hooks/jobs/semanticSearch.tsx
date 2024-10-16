import apiClient from "../api/apiClient";
// import { JobsApiResponse } from "../../types/types";

export const semanticSearchJobs = async (query: string, count: number = 6): Promise<any> => {
  try {
    const response = await apiClient.get<any>(
      `/api/v1/jobs/search`, // Updated endpoint
      {
        params: {
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
