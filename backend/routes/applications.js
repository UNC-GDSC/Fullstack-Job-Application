const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Get all applications (for admin use)
router.get('/', async (req, res, next) => {
  try {
    const applications = await Application.find().populate('job');
    res.json(applications);
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

module.exports = router;
