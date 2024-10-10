import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job } from '../types/types';
import JobCard from '../components/homepage/JobCard';
import jobsData from '../data/jobs.json';
import { Filter } from 'lucide-react';

interface FilterState {
  jobType: string[];
  experience: string[];
  salary: string[];
  location: string[];
}

const JobListingPage = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    jobType: [],
    experience: [],
    salary: [],
    location: []
  });

  // Filter the jobs based on search query and filters
  useEffect(() => {
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    
    const filteredJobs = jobsData.jobs.filter(job => {
      // Search query matching
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery) ||
        job.description.toLowerCase().includes(searchQuery) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery));

      // Filter matching
      const matchesType = filters.jobType.length === 0 || filters.jobType.includes(job.type);
      const matchesExperience = filters.experience.length === 0 || filters.experience.includes(job.level);
      const matchesSalary = filters.salary.length === 0 || 
        filters.salary.some(range => {
          const [min, max] = range.split('-').map(Number);
          return job.salary.min >= min && job.salary.max <= max;
        });
      const matchesLocation = filters.location.length === 0 || 
        filters.location.includes(job.company.location);

      return matchesSearch && matchesType && matchesExperience && matchesSalary && matchesLocation;
    });

    setJobs(filteredJobs);
  }, [searchParams, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-secondary">
          {jobs.length} Jobs Found
        </h1>
        <button 
          className="btn btn-ghost lg:hidden"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl shadow-memo p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading font-semibold text-secondary">Filters</h2>
              <button 
                className="text-neutral-400 hover:text-secondary"
                onClick={() => setFilters({
                  jobType: [],
                  experience: [],
                  salary: [],
                  location: []
                })}
              >
                Clear all
              </button>
            </div>

            {/* Job Type Filter */}
            <FilterSection
              title="Job Type"
              options={['Full-time', 'Part-time', 'Contract']}
              selected={filters.jobType}
              onChange={(selected) => setFilters(prev => ({...prev, jobType: selected}))}
            />

            {/* Experience Level Filter */}
            <FilterSection
              title="Experience"
              options={['Entry', 'Mid-level', 'Senior', 'Lead']}
              selected={filters.experience}
              onChange={(selected) => setFilters(prev => ({...prev, experience: selected}))}
            />

            {/* Salary Range Filter */}
            <FilterSection
              title="Salary Range"
              options={['0-50000', '50000-100000', '100000-150000', '150000+']}
              selected={filters.salary}
              onChange={(selected) => setFilters(prev => ({...prev, salary: selected}))}
              formatOption={(option) => {
                if (option === '150000+') return '$150k+'
                const [min, max] = option.split('-');
                return `$${parseInt(min)/1000}k - $${parseInt(max)/1000}k`
              }}
            />

            {/* Location Filter */}
            <FilterSection
              title="Location"
              options={Array.from(new Set(jobsData.jobs.map(job => job.company.location)))}
              selected={filters.location}
              onChange={(selected) => setFilters(prev => ({...prev, location: selected}))}
            />
          </div>
        </div>

        {/* Job Cards */}
        <div className="lg:w-3/4">
          {jobs.length > 0 ? (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  link={`/jobs/${job.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-memo">
              <p className="text-neutral">No jobs found matching your criteria.</p>
              <button 
                className="btn btn-ghost mt-4"
                onClick={() => {
                  setFilters({
                    jobType: [],
                    experience: [],
                    salary: [],
                    location: []
                  });
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter Section Component
interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  formatOption?: (option: string) => string;
}

const FilterSection = ({ 
  title, 
  options, 
  selected, 
  onChange,
  formatOption = (opt) => opt 
}: FilterSectionProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium text-secondary mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={selected.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selected, option]);
                } else {
                  onChange(selected.filter(item => item !== option));
                }
              }}
            />
            <span className="text-neutral">{formatOption(option)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;