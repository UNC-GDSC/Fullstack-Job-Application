const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// Get single job by ID
router.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// Create a new job
router.post('/', async (req, res, next) => {
  try {
    const { title, description, location, type, department } = req.body;
    const newJob = new Job({ title, description, location, type, department });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
});

// Update a job
router.put('/:id', async (req, res, next) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
});

// Delete a job
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
