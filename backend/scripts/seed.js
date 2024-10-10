const axios = require('axios');
const cherio = require('cherio');

axios.get('https://remotive.com/api/remote-jobs?limit=1')
.then(response => {
    const jobs = response.data.jobs;
    jobs.forEach(job => {
        console.log(`Title: ${job.title}`);
        console.log(`Company: ${job.company_name}`);
        console.log(`Salary: ${job.salary}`);
        console.log(`Location: ${job.candidate_required_location}`);
        console.log(`Job URL: ${job.url}`);
        console.log(`Job Category: ${job.category}`);
        console.log(`Job Type: ${job.job_type}`);
        console.log('Published at:', new Date(job.publication_date).toDateString());
        // console.log('Description:', job.description);
        const description = job.description
        const $ = cherio.load(description);
        console.log('Description:', $.text());
        console.log('-----');
    });
}).catch(error => {
    console.error('Error fetching jobs:', error);
});
