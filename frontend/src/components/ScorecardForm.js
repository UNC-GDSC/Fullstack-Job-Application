import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Grid,
  Paper
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const defaultCompetencies = [
  { key: 'Communication', rating: 0, notes: '' },
  { key: 'Problem-Solving', rating: 0, notes: '' },
  { key: 'Technical Skills', rating: 0, notes: '' },
  { key: 'Culture Fit', rating: 0, notes: '' }
];

const ScorecardForm = ({ application, onSave, onCancel }) => {
  const [rating, setRating] = useState(application?.scorecard?.rating || 0);
  const [competencies, setCompetencies] = useState(
    application?.scorecard?.competencies?.length > 0
      ? application.scorecard.competencies
      : defaultCompetencies
  );
  const [summary, setSummary] = useState(application?.scorecard?.summary || '');

  const handleCompetencyChange = (index, field, value) => {
    const updated = [...competencies];
    updated[index][field] = value;
    setCompetencies(updated);
  };

  const handleSave = () => {
    onSave({
      rating,
      competencies,
      summary
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Overall Rating
      </Typography>
      <Rating
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        size="large"
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" />}
      />

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Competencies
      </Typography>
      <Grid container spacing={2}>
        {competencies.map((comp, index) => (
          <Grid item xs={12} key={index}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {comp.key}
              </Typography>
              <Rating
                value={comp.rating}
                onChange={(e, newValue) =>
                  handleCompetencyChange(index, 'rating', newValue)
                }
                size="small"
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Notes"
                value={comp.notes}
                onChange={(e) =>
                  handleCompetencyChange(index, 'notes', e.target.value)
                }
                margin="normal"
                size="small"
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Overall Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        margin="normal"
        sx={{ mt: 3 }}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          Save Scorecard
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ScorecardForm;
