const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  website: {
    type: String,
    required: [true, 'Please add a website URL'],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  harasser: {
    type: String,
    required: [true, 'Please add a harasser username'],
    trim: true
  },
  submittedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  screenshot: {
    type: String,
    default: 'no-photo.jpg'
  },
  upVotes: {
    type: Number,
    default: 0
  },
  downVotes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Under Review'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
ReportSchema.virtual('votes', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'report',
  justOne: false
});

module.exports = mongoose.model('Report', ReportSchema);