import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from './components/Header';
import Footer from './components/Footer';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import ApplicationForm from './components/ApplicationForm';
import config from './config';

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [view, setView] = useState('list'); // 'list' | 'jobDetail' | 'apply' | 'postJob'

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
    <>
      <Header companyName={config.companyName} logoUrl={config.companyLogoUrl} />
      <Container sx={{ mt: 4, mb: 4 }}>
        {view === 'list' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="contained" onClick={handlePostJobClick}>
                Post a New Job
              </Button>
            </Box>
            <JobList jobs={jobs} onJobSelect={handleJobSelect} onApplyClick={handleApplyClick} />
          </>
        )}
        {view === 'jobDetail' && selectedJob && (
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedJob.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedJob.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Location:</strong> {selectedJob.location}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Type:</strong> {selectedJob.type}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Department:</strong> {selectedJob.department}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" onClick={() => setView('list')} sx={{ mr: 2 }}>
                Back to Job Listings
              </Button>
              <Button variant="contained" onClick={() => handleApplyClick(selectedJob)}>
                Apply
              </Button>
            </Box>
          </Box>
        )}
        {view === 'apply' && selectedJob && (
          <ApplicationForm job={selectedJob} onBack={() => setView('list')} />
        )}
        {view === 'postJob' && (
          <JobForm onJobPosted={handleJobPosted} onCancel={() => setView('list')} />
        )}
      </Container>
      <Footer companyName={config.companyName} />
    </>
  );
}

export default App;
