const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: {
    type: String,
    required: true
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  coverLetter: {
    type: String,
    default: ''
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['applied', 'phone_screen', 'onsite', 'offer', 'hired', 'rejected'],
    default: 'applied'
  },
  scorecard: {
    rating: { type: Number, min: 1, max: 5 },
    competencies: [{
      key: String,
      rating: { type: Number, min: 1, max: 5 },
      notes: String
    }],
    summary: String,
    updatedAt: Date,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  stageHistory: [{
    from: String,
    to: String,
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: String
  }]
});

module.exports = mongoose.model('Application', ApplicationSchema);
