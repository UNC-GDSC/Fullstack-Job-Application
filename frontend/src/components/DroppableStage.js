import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Paper, Typography, Box } from '@mui/material';
import ApplicationCard from './ApplicationCard';

const DroppableStage = ({ stage, applications, formatStage, onCardClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stage
  });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        p: 2,
        minHeight: 400,
        backgroundColor: isOver ? '#e3f2fd' : '#f5f5f5',
        transition: 'background-color 0.2s'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {formatStage(stage)}
        <Typography component="span" variant="caption" sx={{ ml: 1 }}>
          ({applications.length})
        </Typography>
      </Typography>
      <SortableContext
        items={applications.map((app) => app._id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ mt: 2 }}>
          {applications.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onClick={onCardClick}
            />
          ))}
        </Box>
      </SortableContext>
    </Paper>
  );
};

export default DroppableStage;
