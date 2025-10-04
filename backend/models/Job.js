const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Not Specified'
  },
  type: {
    type: String,
    default: 'Full-time' // e.g., Full-time, Part-time, Contract
  },
  department: {
    type: String,
    default: 'General'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  stages: {
    type: [String],
    default: ['applied', 'phone_screen', 'onsite', 'offer', 'hired', 'rejected']
  },
  emailTemplates: {
    phone_screen: {
      subject: { type: String, default: '' },
      body: { type: String, default: '' },
      enabled: { type: Boolean, default: false }
    },
    onsite: {
      subject: { type: String, default: '' },
      body: { type: String, default: '' },
      enabled: { type: Boolean, default: false }
    },
    offer: {
      subject: { type: String, default: '' },
      body: { type: String, default: '' },
      enabled: { type: Boolean, default: false }
    },
    rejected: {
      subject: { type: String, default: '' },
      body: { type: String, default: '' },
      enabled: { type: Boolean, default: false }
    }
  }
});

module.exports = mongoose.model('Job', JobSchema);
