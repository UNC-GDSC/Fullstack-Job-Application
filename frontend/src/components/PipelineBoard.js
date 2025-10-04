import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import axios from 'axios';
import config from '../config';
import ApplicationCard from './ApplicationCard';
import ApplicationDetailDialog from './ApplicationDetailDialog';
import DroppableStage from './DroppableStage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PipelineBoard = ({ jobId, onBack }) => {
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchData();
  }, [jobId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [jobRes, appsRes] = await Promise.all([
        axios.get(`${config.backendUrl}/api/jobs/${jobId}`),
        axios.get(`${config.backendUrl}/api/applications?jobId=${jobId}`)
      ]);
      setJob(jobRes.data);
      setApplications(appsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load pipeline data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const applicationId = active.id;
    const newStage = over.id;

    const application = applications.find((app) => app._id === applicationId);
    if (!application || application.status === newStage) return;

    // Optimistic update
    const oldStatus = application.status;
    setApplications((apps) =>
      apps.map((app) =>
        app._id === applicationId ? { ...app, status: newStage } : app
      )
    );

    try {
      await axios.patch(
        `${config.backendUrl}/api/applications/${applicationId}/status`,
        { to: newStage }
      );
      // Refresh to get updated stage history
      fetchData();
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update application status');
      // Revert on error
      setApplications((apps) =>
        apps.map((app) =>
          app._id === applicationId ? { ...app, status: oldStatus } : app
        )
      );
    }
  };

  const handleUpdateScorecard = async (applicationId, scorecardData) => {
    try {
      await axios.patch(
        `${config.backendUrl}/api/applications/${applicationId}/scorecard`,
        scorecardData
      );
      fetchData();
      setDialogOpen(false);
    } catch (err) {
      console.error('Error updating scorecard:', err);
      setError('Failed to update scorecard');
    }
  };

  const handleCardClick = (application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getApplicationsByStage = (stage) => {
    return filteredApplications.filter((app) => app.status === stage);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return <Alert severity="error">Job not found</Alert>;
  }

  const stages = job.stages || [
    'applied',
    'phone_screen',
    'onsite',
    'offer',
    'hired',
    'rejected'
  ];

  const formatStage = (stage) => {
    return stage
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack}>
          Back
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Pipeline: {job.title}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search candidates"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={2}>
          {stages.map((stage) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={stage}>
              <DroppableStage
                stage={stage}
                applications={getApplicationsByStage(stage)}
                formatStage={formatStage}
                onCardClick={handleCardClick}
              />
            </Grid>
          ))}
        </Grid>
        <DragOverlay>
          {activeId ? (
            <ApplicationCard
              application={applications.find((app) => app._id === activeId)}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <ApplicationDetailDialog
        application={selectedApplication}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onUpdateScorecard={handleUpdateScorecard}
      />
    </Box>
  );
};

export default PipelineBoard;
