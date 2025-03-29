import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Box, TextField, Button, Typography } from '@mui/material';

const ApplicationForm = ({ job, onBack }) => {
  const [formData, setFormData] = useState({
    job: job._id,
    candidateName: '',
    candidateEmail: '',
    resumeUrl: '',
    coverLetter: ''
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(config.backendUrl + '/api/applications', formData);
      setSuccessMessage('Application submitted successfully!');
      setFormData({
        ...formData,
        candidateName: '',
        candidateEmail: '',
        resumeUrl: '',
        coverLetter: ''
      });
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Apply for {job.title}
      </Typography>
      {successMessage && <Typography color="success.main">{successMessage}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Name"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="candidateEmail"
          type="email"
          value={formData.candidateEmail}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Resume URL"
          name="resumeUrl"
          type="url"
          value={formData.resumeUrl}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Cover Letter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained">
            Submit Application
          </Button>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplicationForm;
