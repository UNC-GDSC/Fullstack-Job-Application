const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Job = require('../models/Job');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs with optional filtering and pagination
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { type, department, limit = 50, page = 1 } = req.query;

    const query = {};
    if (type) query.type = type;
    if (department) query.department = department;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Job.countDocuments(query);

    res.json({
      status: 'success',
      results: jobs.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/jobs/:id
 * @desc    Get single job by ID
 * @access  Public
 */
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid job ID')],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({
          status: 'error',
          message: 'Job not found',
        });
      }
      res.json({
        status: 'success',
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   POST /api/jobs
 * @desc    Create a new job posting
 * @access  Public (should be protected in production)
 */
router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters'),
    body('location').optional().trim(),
    body('type').optional().trim().isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
      .withMessage('Type must be one of: Full-time, Part-time, Contract, Internship'),
    body('department').optional().trim(),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { title, description, location, type, department } = req.body;
      const newJob = new Job({ title, description, location, type, department });
      const savedJob = await newJob.save();

      res.status(201).json({
        status: 'success',
        message: 'Job created successfully',
        data: savedJob,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job posting
 * @access  Public (should be protected in production)
 */
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid job ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters'),
    body('location').optional().trim(),
    body('type').optional().trim().isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
      .withMessage('Type must be one of: Full-time, Part-time, Contract, Internship'),
    body('department').optional().trim(),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedJob) {
        return res.status(404).json({
          status: 'error',
          message: 'Job not found',
        });
      }

      res.json({
        status: 'success',
        message: 'Job updated successfully',
        data: updatedJob,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job posting
 * @access  Public (should be protected in production)
 */
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid job ID')],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const deletedJob = await Job.findByIdAndDelete(req.params.id);

      if (!deletedJob) {
        return res.status(404).json({
          status: 'error',
          message: 'Job not found',
        });
      }

      res.json({
        status: 'success',
        message: 'Job deleted successfully',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
