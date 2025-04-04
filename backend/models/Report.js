// const mongoose = require('mongoose');

// const ReportSchema = new mongoose.Schema({
//   submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   description: { type: String, required: true },
//   website: { type: String, required: true },
//   username: { type: String }, // Harasser's username
//   ipfsHash: { type: String, required: true }, // IPFS CID for evidence
//   txHash: { type: String }, // Blockchain TX hash
//   votesFor: { type: Number, default: 0 },
//   votesAgainst: { type: Number, default: 0 },
//   status: { type: String, enum: ['open', 'closed'], default: 'open' },
// }, { timestamps: true });

// module.exports = mongoose.model('Report', ReportSchema);