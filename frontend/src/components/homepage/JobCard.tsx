import React from 'react';
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters"; // Ensure this is defined

interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  salary: string;
  location: string;
  jobType: string;
  url: string;        // Add this
  description: string; // Add this
}

interface AdaptedJobCardProps {
  job: Job;
  link?: string;
}

// Combined salary parsing and formatting function
const parseAndFormatSalary = (salaryString: string): string => {
  if (!salaryString || typeof salaryString !== 'string') {
    return "Salary not provided";
  }

  const [range, period] = salaryString.split('/').map(part => part.trim());
  
  if (!range) {
    return "Salary not provided";
  }

  const [min, max] = range.replace(/\$/g, '').split('-').map(s => parseInt(s.trim(), 10));

  if (isNaN(min) || isNaN(max)) {
    return salaryString; // Return original string if parsing fails
  }

  return `$${min.toLocaleString()} - $${max.toLocaleString()} per ${period || 'hour'}`;
};

const AdaptedJobCard: React.FC<AdaptedJobCardProps> = ({ job, link = "/" }) => {
  const { 
    title, 
    company, 
    category, 
    salary: salaryString, 
    location, 
    jobType, 
    description 
  } = job;

  // Use the new combined function
  const formattedSalary = parseAndFormatSalary(salaryString);

  // Mocking some data that wasn't in the original structure
  const mode = "Remote";
  const tags: string[] = [category, jobType, location];
  const postedDate = new Date().toISOString(); // Using current date as a placeholder

  return (
    <div className="card bg-white shadow-memo hover:shadow-memo-hover transition-all duration-300">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title font-heading font-bold text-secondary">
              {title}
            </h3>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-accent">{jobType}</span>
              <span className="badge badge-ghost">{mode}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-bold">{company.charAt(0)}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-neutral text-sm mb-2">
            {company} • {location}
          </p>
          <p className="text-neutral line-clamp-2">
            {description.replace(/<[^>]*>/g, '').slice(0, 150)}...
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge badge-outline">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="badge badge-ghost">
              +{tags.length - 3} more
            </span>
          )}
        </div>
        
        <div className="card-actions justify-between items-center mt-6">
          <div className="flex flex-col">
            <span className="text-accent font-heading font-semibold">
              {formattedSalary}
            </span>
            <span className="text-neutral-400 text-sm">
              Posted {formatDate(postedDate)}
            </span>
          </div>
          <Link 
            to={link} 
            className="btn btn-secondary btn-sm hover:scale-105 transition-transform"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdaptedJobCard;
