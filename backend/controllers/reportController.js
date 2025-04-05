const Report = require('../models/Report');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const path = require('path');
const multer = require('multer');

// Add these to your existing reportController.js

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Public
exports.getReport = asyncHandler(async (req, res, next) => {
    const report = await Report.findById(req.params.id)
      .populate('submittedBy', 'name email');
  
    if (!report) {
      return next(
        new ErrorResponse(`Report not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({
      success: true,
      data: report
    });
  });
  
  // @desc    Update report
  // @route   PUT /api/reports/:id
  // @access  Private
  exports.updateReport = asyncHandler(async (req, res, next) => {
    let report = await Report.findById(req.params.id);
  
    if (!report) {
      return next(
        new ErrorResponse(`Report not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is report owner or admin
    if (report.submittedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User ${req.user.id} is not authorized to update this report`, 401)
      );
    }
  
    report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: report
    });
  });
  
  // @desc    Delete report
  // @route   DELETE /api/reports/:id
  // @access  Private
  exports.deleteReport = asyncHandler(async (req, res, next) => {
    const report = await Report.findById(req.params.id);
  
    if (!report) {
      return next(
        new ErrorResponse(`Report not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is report owner or admin
    if (report.submittedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User ${req.user.id} is not authorized to delete this report`, 401)
      );
    }
  
    await report.remove();
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });
  
  // @desc    Upload photo for report
  // @route   PUT /api/reports/:id/photo
  // @access  Private
  exports.uploadReportPhoto = asyncHandler(async (req, res, next) => {
    const report = await Report.findById(req.params.id);
  
    if (!report) {
      return next(
        new ErrorResponse(`Report not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is report owner or admin
    if (report.submittedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User ${req.user.id} is not authorized to update this report`, 401)
      );
    }
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`Please upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    // Create custom filename
    file.name = `photo_${report._id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      await Report.findByIdAndUpdate(req.params.id, { photo: file.name });
  
      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  });