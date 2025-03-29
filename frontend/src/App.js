import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import config from './config';

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [view, setView] = useState('list'); // Options: list, jobDetail, apply, postJob

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(config.backendUrl + '/api/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setView('jobDetail');
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setView('apply');
  };

  const handlePostJobClick = () => {
    setView('postJob');
  };

  const handleJobPosted = (newJob) => {
    setJobs([newJob, ...jobs]);
    setView('list');
  };

  return (
    <div className="container">
      <Header companyName={config.companyName} logoUrl={config.companyLogoUrl} />
      <div className="content">
        {view === 'list' && (
          <>
            <button onClick={handlePostJobClick}>Post a New Job</button>
            <JobList jobs={jobs} onJobSelect={handleJobSelect} onApplyClick={handleApplyClick} />
          </>
        )}
        {view === 'jobDetail' && selectedJob && (
          <div>
            <h2>{selectedJob.title}</h2>
            <p>{selectedJob.description}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Type:</strong> {selectedJob.type}</p>
            <p><strong>Department:</strong> {selectedJob.department}</p>
            <button onClick={() => setView('list')}>Back to Job Listings</button>
            <button onClick={() => handleApplyClick(selectedJob)}>Apply</button>
          </div>
        )}
        {view === 'apply' && selectedJob && (
          <ApplicationForm job={selectedJob} onBack={() => setView('list')} />
        )}
        {view === 'postJob' && (
          <JobForm onJobPosted={handleJobPosted} onCancel={() => setView('list')} />
        )}
      </div>
      <Footer companyName={config.companyName} />
    </div>
  );
}

export default App;
