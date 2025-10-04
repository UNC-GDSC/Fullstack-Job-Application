import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  Typography,
  Chip,
  Divider
} from '@mui/material';
import ScorecardForm from './ScorecardForm';
import TimelineList from './TimelineList';

const ApplicationDetailDialog = ({ application, open, onClose, onUpdateScorecard }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!application) return null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveScorecard = async (scorecardData) => {
    await onUpdateScorecard(application._id, scorecardData);
    setActiveTab(0); // Switch back to overview
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {application.candidateName}
        <Chip
          label={application.status.replace('_', ' ').toUpperCase()}
          size="small"
          color="primary"
          sx={{ ml: 2 }}
        />
      </DialogTitle>
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Overview" />
          <Tab label="Scorecard" />
          <Tab label="Timeline" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <Box>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {application.candidateEmail}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Job:</strong> {application.job?.title || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Applied:</strong>{' '}
                {new Date(application.appliedAt).toLocaleDateString()}
              </Typography>
              {application.resumeUrl && (
                <Typography variant="body1" gutterBottom>
                  <strong>Resume:</strong>{' '}
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </Typography>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Cover Letter
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {application.coverLetter || 'No cover letter provided.'}
              </Typography>
              {application.scorecard?.summary && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Scorecard Summary
                  </Typography>
                  <Typography variant="body2">
                    {application.scorecard.summary}
                  </Typography>
                </>
              )}
            </Box>
          )}
          {activeTab === 1 && (
            <ScorecardForm
              application={application}
              onSave={handleSaveScorecard}
              onCancel={() => setActiveTab(0)}
            />
          )}
          {activeTab === 2 && (
            <TimelineList stageHistory={application.stageHistory} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationDetailDialog;
