import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const JobList = ({ jobs, onJobSelect, onApplyClick }) => {
  return (
    <Grid container spacing={2}>
      {jobs.length === 0 ? (
        <Typography variant="body1">No jobs available at the moment.</Typography>
      ) : (
        jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.type}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => onJobSelect(job)}>View Details</Button>
                <Button size="small" variant="contained" onClick={() => onApplyClick(job)}>
                  Apply
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default JobList;
