import express from "express";
import JobController from "../controllers/jobController.js";

const jobRoutes = express.Router();

jobRoutes.get("/", JobController.getAllJobs);
jobRoutes.get("/:id", JobController.getJob);
jobRoutes.post('/search', JobController.Semanticsearch);
jobRoutes.post('/update-embeddings', JobController.updateJobEmbeddings);

export default jobRoutes;