import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, MapPin, Briefcase, DollarSign, Building } from 'lucide-react';
import { Job } from '../types/types';


const fetchJob = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/v1/jobs/${id}`);
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
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! There was an error loading the job details. Please try again later.</span>
      </div>
    );
  }

  const job: Job = (data as any).data;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{job?.title}</h1>
          <div className="flex items-center text-base-content mb-4">
            <Building className="mr-2" size={20} />
            <span>{job?.company}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <MapPin className="mr-2 text-info" size={20} />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-2 text-success" size={20} />
              <span className="capitalize">{job?.jobType}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 text-warning" size={20} />
              <span>{job?.salary}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-secondary" size={20} />
              <span>{job?.category}</span>
            </div>
          </div>
          <div className="mb-6">
            <a
              href={job?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              Apply Now
            </a>
          </div>
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div dangerouslySetInnerHTML={{ __html: job?.description || '' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;