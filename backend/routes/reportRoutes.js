// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/auth');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });

// // Submit report (protected route)
// router.post('/', auth, upload.single('screenshot'), async (req, res) => {
//   try {
//     const { description, website, username } = req.body;
    
//     // Verify user has connected wallet
//     if (!req.user.walletAddress) {
//       return res.status(400).json({ 
//         message: 'Please connect your wallet in profile settings' 
//       });
//     }

//     // Upload to IPFS and create DAO proposal
//     const ipfsHash = await uploadToIPFS({
//       userId: req.user.id,
//       description,
//       screenshot: req.file.buffer
//     });

//     const txHash = await createDAOProposal(
//       ipfsHash, 
//       req.user.walletAddress // Submit from user's wallet
//     );

//     // Save to database
//     const report = new Report({
//       submittedBy: req.user.id,
//       description,
//       ipfsHash,
//       txHash,
//       walletAddress: req.user.walletAddress // Track submitter's wallet
//     });

//     await report.save();
//     res.status(201).json(report);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });