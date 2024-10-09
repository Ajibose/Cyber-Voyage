import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white p-4 rounded-xl shadow-memo flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-neutral-400" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, skills, or keywords"
            className="input input-bordered w-full pl-10"
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Search Jobs
        </button>
      </div>
    </form>
  );
};

export default SearchBar;