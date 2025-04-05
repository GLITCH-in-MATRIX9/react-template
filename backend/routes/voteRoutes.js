// routes/voteRoutes.js
const express = require('express');
const {
  getVotes,
  getVote,
  addVote
} = require('../controllers/voteController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, getVotes)
  .post(protect, addVote);

router
  .route('/:id')
  .get(protect, getVote);

module.exports = router;