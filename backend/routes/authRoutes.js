const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe,
  updateProfile,  // New
  getDashboardData // New
} = require('../controllers/authController');
const auth = require('../middlewares/auth');

// Existing routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);

// routes/authRoutes.js
router.post('/link-wallet', auth, async (req, res) => {
    try {
      const { signedMessage, address } = req.body;
      
      // Verify signature
      const signer = ethers.utils.verifyMessage(
        `Link wallet to ${req.user.email}`,
        signedMessage
      );
      
      if (signer.toLowerCase() !== address.toLowerCase()) {
        return res.status(400).json({ message: 'Invalid signature' });
      }
  
      // Save to user
      req.user.linkWallet(address);
      await req.user.save();
      
      res.json({ message: 'Wallet linked successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;