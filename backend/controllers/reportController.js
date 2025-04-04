// const Report = require('../models/Report');
// const { uploadToIPFS } = require('../utils/ipfs');
// const { createDAOProposal } = require('../utils/blockchain');

// exports.submitReport = async (req, res) => {
//   try {
//     const { description, website, username } = req.body;
//     const screenshot = req.file; // From multer middleware

//     // 1. Upload to IPFS
//     const ipfsHash = await uploadToIPFS({
//       description,
//       website,
//       username,
//       screenshot: screenshot.buffer
//     });

//     // 2. Create on-chain proposal
//     const txHash = await createDAOProposal(ipfsHash);

//     // 3. Save to DB
//     const report = new Report({
//       submittedBy: req.user.id, // From JWT/auth middleware
//       description,
//       website,
//       username,
//       ipfsHash,
//       txHash
//     });
//     await report.save();

//     res.status(201).json(report);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getReports = async (req, res) => {
//   try {
//     const reports = await Report.find({ status: 'open' })
//       .populate('submittedBy', 'name avatar')
//       .sort({ createdAt: -1 });
//     res.json(reports);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };