import express from "express";
import JobController from "../controllers/jobController.js";

const jobRoutes = express.Router();

jobRoutes.get("/", JobController.getAllJobs);

export default jobRoutes;