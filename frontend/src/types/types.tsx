// interface jobProps{ 
//     jobRole: string;
//     jobType: string;
//     image?: string;
//     salary: number;
//     link?: string;
// }
//  interface Company {
//     id: string;
//     name: string;
//     logo: string;
//     location: string;
//     employeeCount: string;
//     industry: string;
//   }
  
//  interface Salary {
//     min: number;
//     max: number;
//     currency: string;
//     period: string;
//   }
  
//   export interface Job {
//     id: string;
//     title: string;
//     company: Company;
//     type: string;
//     mode: string;
//     level: string;
//     salary: Salary;
//     tags: string[];
//     description: string;
//     requirements: string[];
//     benefits: string[];
//     postedDate: string;
//     applicationDeadline: string;
//     status: string;
//   }
  
//  interface JobProps {
//     job: Job;
//     link?: string;
//   }


//   // New data format
  // Define the structure of each job
interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  salary: string;
  location: string;
  url: string;
  jobType: string;
  description: string;
}

// Define the structure of the API response
interface JobsApiResponse {
  status: string;
  message: string;
  data: Job[]; // Array of jobs
}


export type { JobsApiResponse, Job };   // This is the preferred way to an interface