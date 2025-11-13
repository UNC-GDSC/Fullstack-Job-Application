const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Application = require('../models/Application');

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
 * @route   GET /api/applications
 * @desc    Get all applications with optional filtering and pagination
 * @access  Public (should be protected in production)
 */
router.get('/', async (req, res, next) => {
  try {
    const { job, limit = 50, page = 1 } = req.query;

    const query = {};
    if (job) query.job = job;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const applications = await Application.find(query)
      .populate('job', 'title department location')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Application.countDocuments(query);

    res.json({
      status: 'success',
      results: applications.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: applications,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/applications/:id
 * @desc    Get single application by ID
 * @access  Public (should be protected in production)
 */
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid application ID')],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const application = await Application.findById(req.params.id).populate('job');

      if (!application) {
        return res.status(404).json({
          status: 'error',
          message: 'Application not found',
        });
      }

      res.json({
        status: 'success',
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   POST /api/applications
 * @desc    Submit a new job application
 * @access  Public
 */
router.post(
  '/',
  [
    body('job').isMongoId().withMessage('Valid job ID is required'),
    body('candidateName')
      .trim()
      .notEmpty()
      .withMessage('Candidate name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('candidateEmail')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('resumeUrl')
      .trim()
      .notEmpty()
      .withMessage('Resume URL is required')
      .isURL()
      .withMessage('Please provide a valid URL for your resume'),
    body('coverLetter')
      .optional()
      .trim()
      .isLength({ max: 5000 })
      .withMessage('Cover letter must not exceed 5000 characters'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { job, candidateName, candidateEmail, resumeUrl, coverLetter } = req.body;

      // Check if job exists
      const Job = require('../models/Job');
      const jobExists = await Job.findById(job);
      if (!jobExists) {
        return res.status(404).json({
          status: 'error',
          message: 'Job posting not found',
        });
      }

      const newApplication = new Application({
        job,
        candidateName,
        candidateEmail,
        resumeUrl,
        coverLetter,
      });

      const savedApplication = await newApplication.save();
      const populatedApplication = await savedApplication.populate('job', 'title department');

      res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully',
        data: populatedApplication,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   DELETE /api/applications/:id
 * @desc    Delete an application
 * @access  Public (should be protected in production)
 */
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid application ID')],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const deletedApplication = await Application.findByIdAndDelete(req.params.id);

      if (!deletedApplication) {
        return res.status(404).json({
          status: 'error',
          message: 'Application not found',
        });
      }

      res.json({
        status: 'success',
        message: 'Application deleted successfully',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
