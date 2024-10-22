import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { semanticSearchJobs } from '../../hooks/jobs/semanticSearch';
// import { JobsApiResponse } from '../../types/types';
import AISearchModal from './AISearchModal';

const AIAssistantButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const response = await semanticSearchJobs(searchQuery);
      setIsSearching(false);
      
      //console.log('Search results:', response.data);
     navigate('/search-results', { state: { results: response, query: searchQuery } });
    } catch (err: any) {
      setIsSearching(false);
      setError(err.response?.data?.message || 'An error occurred during the search.');
      console.error('Search error:', err);
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 group z-50"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
          {/* Pulse ring */}
          <div className="absolute -inset-1 rounded-full border-2 border-white opacity-20 animate-pulse" />
        </div>
      </button>

      {/* AI Search Modal */}
      <AISearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        onSearch={handleSearch}
      />

      {/* Optionally render error message */}
      {error && <div className="error mt-4 text-red-500">{error}</div>}
    </>
  );
};

export default AIAssistantButton;
