import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { Typography, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TimelineList = ({ stageHistory }) => {
  if (!stageHistory || stageHistory.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No stage history available yet.
      </Typography>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatStage = (stage) => {
    return stage
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Timeline position="right">
      {stageHistory.map((entry, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.3 }}>
            <Typography variant="caption">
              {formatDate(entry.changedAt)}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </TimelineDot>
            {index < stageHistory.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                {formatStage(entry.from)} → {formatStage(entry.to)}
              </Typography>
              {entry.note && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {entry.note}
                </Typography>
              )}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineList;
