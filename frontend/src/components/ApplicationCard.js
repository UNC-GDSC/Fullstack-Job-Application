import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Rating } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ApplicationCard = ({ application, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: application._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ 
        mb: 1, 
        '&:hover': { boxShadow: 3 },
        backgroundColor: 'white'
      }}
      onClick={(e) => {
        if (onClick) onClick(application);
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {application.candidateName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {application.candidateEmail}
        </Typography>
        {application.scorecard?.rating && (
          <Box sx={{ mt: 1 }}>
            <Rating value={application.scorecard.rating} size="small" readOnly />
          </Box>
        )}
        {application.resumeUrl && (
          <Chip 
            label="Resume" 
            size="small" 
            sx={{ mt: 1 }}
            color="primary"
            variant="outlined"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
