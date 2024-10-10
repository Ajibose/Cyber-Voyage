interface jobProps{ 
    jobRole: string;
    jobType: string;
    image?: string;
    salary: number;
    link?: string;
}
 interface Company {
    id: string;
    name: string;
    logo: string;
    location: string;
    employeeCount: string;
    industry: string;
  }
  
 interface Salary {
    min: number;
    max: number;
    currency: string;
    period: string;
  }
  
  export interface Job {
    id: string;
    title: string;
    company: Company;
    type: string;
    mode: string;
    level: string;
    salary: Salary;
    tags: string[];
    description: string;
    requirements: string[];
    benefits: string[];
    postedDate: string;
    applicationDeadline: string;
    status: string;
  }
  
 interface JobProps {
    job: Job;
    link?: string;
  }
export type { jobProps, JobProps, Salary };   // This is the preferred way to an interface