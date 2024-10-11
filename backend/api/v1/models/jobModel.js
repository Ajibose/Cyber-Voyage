import BaseModel from "./baseModel.js";

class JobModel extends BaseModel {
    constructor() {
        const schemaDefinition = {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            companyLogo: {
                type: String,
            },
            category: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            salary: {
                type: String,
            },
            location: {
                type: String,
                required: true
            },
            jobType: {
                type: String,
                required: true
            },
            jobUrl: {
                type: String,
                required: true
            },
            publishedAt: {
                type: Date,
            },
            experience: {
                type: String,
            },
        };
        super('job', schemaDefinition);
    }
}

export default new JobModel();