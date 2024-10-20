import React from 'react';
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters";

interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  salary: string;
  location: string;
  jobType: string;
  url: string;
  description: string;
}

interface AdaptedJobCardProps {
  job: Job;
  link?: string;
}

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
    return salaryString;
  }

  return `$${min.toLocaleString()} - $${max.toLocaleString()} per ${period || 'hour'}`;
};

const AdaptedJobCard: React.FC<AdaptedJobCardProps> = ({ job }) => {
  const { 
    title, 
    company, 
    category, 
    salary: salaryString, 
    location, 
    jobType, 
    description 
  } = job;

  const formattedSalary = parseAndFormatSalary(salaryString);
  const mode = "Remote";
  const tags: string[] = [category, jobType, location];
  const postedDate = new Date().toISOString();

  return (
    <div className="w-full sm:w-96 h-[28rem] card bg-white shadow-memo hover:shadow-memo-hover transition-all duration-300">
      <div className="card-body h-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-start shrink-0">
          <div className="min-w-0">
            <h3 className="card-title font-heading font-bold text-secondary truncate">
              {title}
            </h3>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="badge badge-accent">{jobType}</span>
              <span className="badge badge-ghost">{mode}</span>
            </div>
          </div>
          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-bold">{company.charAt(0)}</span>
          </div>
        </div>
        
        <div className="mt-4 overflow-hidden flex-grow">
          <p className="text-neutral text-sm mb-2 truncate">
            {company} • {location}
          </p>
          <p className="text-neutral line-clamp-3">
            {description.replace(/<[^>]*>/g, '').slice(0, 150)}...
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 shrink-0">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge badge-outline">
              {tag.length <= 25 ? tag : `${tag.slice(0, 25)}...` }
            </span>
          ))}
          {tags.length > 3 && (
            <span className="badge badge-ghost">
              +{tags.length - 3} more
            </span>
          )}
        </div>
        
        <div className="card-actions justify-between items-center mt-auto pt-4 shrink-0 border-t">
          <div className="flex flex-col min-w-0">
            <span className="text-accent font-heading font-semibold truncate">
              {formattedSalary}
            </span>
            <span className="text-neutral-400 text-sm">
              Posted {formatDate(postedDate)}
            </span>
          </div>
          <Link 
            to={job.url} 
            className="btn btn-secondary btn-sm hover:scale-105 transition-transform whitespace-nowrap"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdaptedJobCard;