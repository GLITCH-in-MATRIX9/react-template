const express = require('express');
const router = express.Router();
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  uploadReportPhoto,
  voteOnReport,
  closeReport
} = require('../controllers/reportController');
const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const Report = require('../models/Report');

// Include other resource routers
const voteRouter = require('./voteRoutes');

// Re-route into other resource routers
router.use('/:reportId/votes', voteRouter);

router
  .route('/')
  .get(
    advancedResults(Report, {
      path: 'submittedBy',
      select: 'name email'
    }),
    getReports
  )
  .post(protect, createReport);

router
  .route('/:id')
  .get(getReport)
  .put(protect, updateReport)
  .delete(protect, deleteReport);

router.route('/:id/photo').put(protect, uploadReportPhoto);
router.route('/:id/vote').put(protect, voteOnReport);
router.route('/:id/close').put(protect, authorize('admin', 'moderator'), closeReport);

module.exports = router;