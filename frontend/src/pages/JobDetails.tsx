import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Job } from '../types/types';
import Loader from '../components/common/Loader';

const fetchJob = async (id: string) => {
  const { data } = await axios.get(`https://cyber-voyage-production.up.railway.app/api/v1/jobs/${id}`);
  return data;
};

const JobDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJob(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
     <Loader />
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        <div className="text-red-500 text-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-lg">
          Error! There was an error loading the job details. Please try again later.
        </div>
      </div>
    );
  }

  const job: Job = (data as any).data;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="container mx-auto">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Job info */}
            <div className="lg:w-1/3 p-8 border-r border-gray-200 border-opacity-30">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">{job?.title}</h1>
              <div className="text-2xl text-gray-600 mb-8">{job?.company}</div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center text-gray-700">
                  <MapPin className="mr-3" size={24} />
                  <span className="text-lg">{job?.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="mr-3" size={24} />
                  <span className="text-lg">{job?.jobType}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="mr-3" size={24} />
                  <span className="text-lg">{job?.salary}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Briefcase className="mr-3" size={24} />
                  <span className="text-lg">{job?.category}</span>
                </div>
              </div>
              
              <Link to={job.url} className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg">
                Apply Now
              </Link>
            </div>
            
            {/* Right side - Job description */}
            <div className="lg:w-2/3 p-8">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Job Description</h2>
              <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: job?.description || '' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;