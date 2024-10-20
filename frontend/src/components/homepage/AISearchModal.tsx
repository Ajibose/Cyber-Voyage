// components/AISearchModal.tsx

import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Search, X } from 'lucide-react';

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  onSearch: (e: React.FormEvent) => void;
}

const AISearchModal: React.FC<AISearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  isSearching,
  onSearch
}) => {
  const placeholderExamples = [
    "Find me remote React developer positions with competitive salary",
    "Show senior full-stack roles in tech startups",
    "Looking for AI/ML engineering jobs with flexible hours",
    "Entry-level software developer positions in fintech"
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholderExamples[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholder(prev => {
        const currentIndex = placeholderExamples.indexOf(prev);
        return placeholderExamples[(currentIndex + 1) % placeholderExamples.length];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all duration-300 opacity-100 scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-bold text-secondary">AI Job Search Assistant</h2>
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-base-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <form onSubmit={onSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-neutral-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentPlaceholder}
                className="input input-bordered w-full pl-10 py-6 text-lg"
                disabled={isSearching}
                autoFocus
              />
            </div>

            {/* Suggestion Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-neutral-500">Try:</span>
              {[
                "Senior React Developer",
                "Remote Full-Stack",
                "AI Engineer",
                "DevOps Lead"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-base-200 hover:bg-base-300 rounded-full text-sm text-neutral-700 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <button 
              type="submit" 
              className="btn btn-secondary w-full"
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <span className="loading loading-spinner"></span>
                  AI is searching...
                </>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Search with AI
                </span>
              )}
            </button>
          </form>

          {/* AI Capabilities Note */}
          <div className="mt-6 text-center text-sm text-neutral-500">
            <p className="flex items-center justify-center gap-2">
              <Bot className="w-4 h-4" />
              I understand natural language! Try describing your ideal job in detail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearchModal;