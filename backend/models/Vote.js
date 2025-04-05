const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  report: {
    type: mongoose.Schema.ObjectId,
    ref: 'Report',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  voteType: {
    type: String,
    enum: ['upvote', 'downvote'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vote', VoteSchema);
