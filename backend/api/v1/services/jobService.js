import cherio from "cherio";
import jobModel from "../models/jobModel.js";
import EmbeddingService from "./embeddingService.js";
import { cosineSimilarity } from "../../../utils/similarity.js";
import { Jobs } from "openai/resources/fine-tuning/index.mjs";

class JobService {
    static async fetchJobs() {
        try {
            return await jobModel.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async fetchJobById(id) {
        try {
            return await jobModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    static async SemanticSearchJobs(query, count = 6) {
        try {
            const queryEmbedding = await EmbeddingService.generateEmbedding(query);

            const jobs = await jobModel.findAll();
            const jobObjects = jobs.map(job => job.toObject());
            
            const results = jobObjects.map(job => {
                const similarity = cosineSimilarity(queryEmbedding, job.embedding);
                return { ...job, similarity };
            }).sort((a, b) => b.similarity - a.similarity).map(job => {
                const { embedding: _, ...jobWithoutEmbedding } = job;
                return jobWithoutEmbedding;
            })

            return results.slice(0, count);
        } catch (error) {
            console.log("Error during semantic search:", error)
            throw new Error(error.message);
        }
    }

    static async updateEmbeddingsForAllJobs() {
        try {
            // Fetch all jobs
            const jobs = await jobModel.findAll();

            const updatedJobs = [];

            for (const job of jobs) {
                // Check if the job already has an embedding
                if (job.embedding.length == 0) {
                    const description = cherio.load(job.description).text();
                    const { company, category, location, jobType } = job;
                    
                    // Generate the embedding
                    searchText = `${description} ${company} ${category} ${location} ${jobType}`;
                    const embedding = await EmbeddingService.generateEmbedding(searchText);

                    // Update the job with the new embedding
                    const updatedJob = await jobModel.update(job._id, { embedding });
                    
                    updatedJobs.push(updatedJob);
                }
            }

            return updatedJobs;
        } catch (error) {
            console.log("Error updating job embeddings:", error);
            throw new Error(`Error updating product embeddings: ${error.message}`);
        }
    }
}

export default JobService;