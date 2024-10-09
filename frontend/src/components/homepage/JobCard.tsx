import { JobProps } from "../../types/types";
import { Link } from "react-router-dom";
import { formatSalary, formatDate } from "../../utils/formatters";

const JobCard = ({ job, link = "/" }: JobProps) => {
  const { title, company, type, mode, salary, tags, description, postedDate } = job;

  return (
    <div className="card bg-white shadow-memo hover:shadow-memo-hover transition-all duration-300">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title font-heading font-bold text-secondary">
              {title}
            </h3>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-accent">{type}</span>
              <span className="badge badge-ghost">{mode}</span>
            </div>
          </div>
          <img 
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        
        <div className="mt-4">
          <p className="text-neutral text-sm mb-2">
            {company.name} • {company.location}
          </p>
          <p className="text-neutral line-clamp-2">
            {description}
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
              {formatSalary(salary)}
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

export default JobCard;