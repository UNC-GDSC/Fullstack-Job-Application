const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');

// Get all applications (for admin use) with filtering
router.get('/', async (req, res, next) => {
  try {
    const { jobId, stage, q, minRating } = req.query;
    const filter = {};

    if (jobId) filter.job = jobId;
    if (stage) filter.status = stage;
    if (minRating) filter['scorecard.rating'] = { $gte: Number(minRating) };
    if (q) {
      filter.$or = [
        { candidateName: { $regex: q, $options: 'i' } },
        { coverLetter: { $regex: q, $options: 'i' } }
      ];
    }

    const applications = await Application.find(filter).populate('job');
    res.json(applications);
  } catch (error) {
    next(error);
  }
});

// Get single application by ID
router.get('/:id', async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) return res.status(404).json({ error: 'Application not found' });
    res.json(application);
  } catch (error) {
    next(error);
  }
});

// Create a new application
router.post('/', async (req, res, next) => {
  try {
    const { job, candidateName, candidateEmail, resumeUrl, coverLetter } = req.body;
    const newApplication = new Application({
      job,
      candidateName,
      candidateEmail,
      resumeUrl,
      coverLetter
    });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    next(error);
  }
});

// Update application status (stage change)
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { to, note } = req.body;
    const application = await Application.findById(req.params.id).populate('job');
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const job = application.job;
    if (!job.stages.includes(to)) {
      return res.status(400).json({ error: 'Invalid stage for this job' });
    }

    const historyEntry = {
      from: application.status,
      to: to,
      changedAt: new Date(),
      note: note || ''
    };

    application.status = to;
    application.stageHistory.push(historyEntry);
    
    await application.save();
    res.json(application);
  } catch (error) {
    next(error);
  }
});

// Update application scorecard
router.patch('/:id/scorecard', async (req, res, next) => {
  try {
    const { rating, competencies, summary } = req.body;
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.scorecard = {
      rating,
      competencies: competencies || [],
      summary: summary || '',
      updatedAt: new Date()
    };
    
    await application.save();
    res.json(application);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
