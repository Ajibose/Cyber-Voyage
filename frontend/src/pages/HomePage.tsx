import { Briefcase, MapPin, ArrowRight } from 'lucide-react';
import jobsData from '../data/jobs.json';
import JobCard from '../components/homepage/JobCard';
import SearchBar from '../components/homepage/SearchBar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
            Find Your Next Remote 
            <span className="text-accent"> Tech Career</span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-neutral mb-8 max-w-2xl mx-auto">
            Connect with top companies hiring remote tech talent. Your dream job awaits – no boundaries, no limits.
          </p>

          {/* Search Bar */}
          {/* <div className="bg-white p-4 rounded-xl shadow-memo max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-neutral-400" />
              <input 
                type="text"
                placeholder="Job title, skills, or keywords"
                className="input input-bordered w-full pl-10"
              />
            </div>
            <button className="btn btn-secondary">
              Search Jobs
            </button>
          </div> */}

          <SearchBar />

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/50 p-6 rounded-lg">
              <Briefcase className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-secondary">1000+ Jobs</h3>
              <p className="text-neutral">New opportunities daily</p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-secondary">100% Remote</h3>
              <p className="text-neutral">Work from anywhere</p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg">
              <ArrowRight className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-secondary">Quick Apply</h3>
              <p className="text-neutral">One-click applications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-secondary">
            Featured Jobs
          </h2>
          <button className="btn btn-ghost text-accent">
            View all jobs <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobsData.jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          link={`/jobs/${job.id}`}
        />
      ))}
    </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16 bg-base-100">
        <h2 className="font-heading text-3xl font-bold text-secondary mb-8 text-center">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Frontend Development', 'Backend Development', 'UI/UX Design', 'DevOps', 
            'Data Science', 'Mobile Development', 'Product Management', 'QA Testing'].map((category) => (
            <button 
              key={category}
              className="btn btn-outline btn-secondary hover:text-white"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Job Card Component
// const JobCard = () => {
//   return (
//     <div className="card bg-white shadow-memo hover:shadow-memo-hover transition-all duration-300">
//       <div className="card-body">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="card-title font-heading font-bold text-secondary">
//               Senior Frontend Developer
//             </h3>
//             <span className="badge badge-accent mt-2">Remote</span>
//           </div>
//           <img 
//             src="/api/placeholder/48/48"
//             alt="Company logo" 
//             className="w-12 h-12 rounded-full"
//           />
//         </div>
        
//         <p className="text-neutral mt-4">
//           Join our team to build innovative web applications using modern technologies.
//         </p>
        
//         <div className="flex gap-2 mt-4">
//           <span className="badge badge-outline">React</span>
//           <span className="badge badge-outline">TypeScript</span>
//         </div>
        
//         <div className="card-actions justify-between items-center mt-6">
//           <span className="text-accent font-heading font-semibold">
//             $120k - $150k
//           </span>
//           <button className="btn btn-secondary btn-sm">
//             Apply Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default HomePage;