import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Box, TextField, Button, Typography } from '@mui/material';

const JobForm = ({ onJobPosted, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    department: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(config.backendUrl + '/api/jobs', formData);
      onJobPosted(res.data);
    } catch (err) {
      setError('Failed to post job. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Post a New Job
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          margin="normal"
          placeholder="Full-time, Part-time, etc."
        />
        <TextField
          fullWidth
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          margin="normal"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained">
            Post Job
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JobForm;
