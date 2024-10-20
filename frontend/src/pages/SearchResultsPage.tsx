// pages/SearchResultsPage.tsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Bot, Sparkles, BrainCircuit } from 'lucide-react';
import JobCard from '../components/homepage/JobCard';
import { Job } from '../types/types';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const { results, query } = location.state as { results: Job[], query: string };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/" className="btn btn-ghost gap-2 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        {/* AI Results Header */}
        <div className="bg-white rounded-xl p-6 shadow-memo mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-secondary" />
            <h1 className="font-heading text-2xl font-bold text-secondary">
              AI-Powered Search Results
            </h1>
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          
          <div className="flex items-center gap-2 text-neutral-600">
            <BrainCircuit className="w-5 h-5 text-accent" />
            <p className="text-lg">
              I found {results.length} jobs matching: "{query}"
            </p>
          </div>

          <div className="mt-4 p-4 bg-base-100 rounded-lg">
            <p className="text-sm text-neutral-600">
              <span className="font-semibold">AI Analysis:</span> Based on your search, 
              I've prioritized roles that best match your criteria. The results are 
              ordered by relevance, considering factors like job requirements, company 
              culture, and career growth potential.
            </p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-memo">
            <Bot className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">No matches found</h2>
            <p className="text-neutral mb-4">Let me help you refine your search!</p>
            <div className="flex justify-center gap-4">
              <Link to="/" className="btn btn-secondary">
                Try New Search
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((job) => (
              <Link
                to={`/jobs/${job.id}`}
                key={job.id}
              >
                <JobCard
                  job={job}
                  link={`/jobs/${job.id}`}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;