import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Filter } from 'lucide-react';
import { fetchAllJobs } from '../hooks/jobs/fetchAllJobs';
import AdaptedJobCard from '../components/homepage/JobCard';
import { JobsApiResponse } from '../types/types';
import Loader from '../components/common/Loader';
import SearchBar from '../components/homepage/SearchBar';

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

interface FilterState {
  jobType: string[];
  category: string[];
}

const JobListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    jobType: [],
    category: []
  });

  const { data, isFetching, error } = useQuery<JobsApiResponse>({
    queryKey: ["jobs"],
    queryFn: fetchAllJobs
  });

  useEffect(() => {
    if (data?.data) {
      const searchQuery = searchParams.get('search')?.toLowerCase() || '';

      const filtered = (data.data as Job[]).filter((job: Job) => {
        if (!job) return false;

        const matchesSearch = !searchQuery ||
          job.title.toLowerCase().includes(searchQuery) ||
          job.company.toLowerCase().includes(searchQuery) ||
          job.category.toLowerCase().includes(searchQuery);

        const matchesType = filters.jobType.length === 0 || filters.jobType.includes(job.jobType.toLowerCase());
        const matchesCategory = filters.category.length === 0 || filters.category.includes(job.category);

        return matchesSearch && matchesType && matchesCategory;
      });

      setFilteredJobs(filtered);
    }
  }, [searchParams, filters, data]);

  const clearFilters = () => {
    setFilters({
      jobType: [],
      category: []
    });
  };

  if (isFetching) {
    return <Loader />
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8"><h1>Error: {(error as Error).message}</h1></div>;
  }


  const allJobs = data?.data as Job[] || [];

  const jobTypes = Array.from(new Set(allJobs.map(job => job.jobType)));
  const categories = Array.from(new Set(allJobs.map(job => job.category)));

  return (
    <div className="container mx-auto px-4 py-8">
     <div className="container mb-4">
     <SearchBar />
     </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-secondary">
          {filteredJobs.length} Jobs Found
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
          <div className="sticky top-20 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="bg-white rounded-xl shadow-memo p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading font-semibold text-secondary">Filters</h2>
              <button
                className="text-neutral-400 hover:text-secondary"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </div>

            <FilterSection
              title="Job Type"
              options={jobTypes}
              selected={filters.jobType}
              onChange={(selected) => setFilters(prev => ({ ...prev, jobType: selected }))}
            />

            <FilterSection
              title="Category"
              options={categories}
              selected={filters.category}
              onChange={(selected) => setFilters(prev => ({ ...prev, category: selected }))}
            />
          </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="lg:w-3/4">
          {filteredJobs.length > 0 ? (
            <div className="flex flex-wrap gap-5">
              {filteredJobs.map((job) => (
                <Link to={`/jobs/${job.id}`} key={job.id}>
                  <AdaptedJobCard
                    job={job}
                    link={`/jobs/${job.id}`}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-memo">
              <p className="text-neutral">No jobs found matching your criteria.</p>
              <button
                className="btn btn-ghost mt-4"
                onClick={clearFilters}
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

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selected,
  onChange
}) => {
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
            <span className="text-neutral">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;