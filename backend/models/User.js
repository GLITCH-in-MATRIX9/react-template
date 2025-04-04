const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  // Blockchain Integration Fields
  walletAddress: {
    type: String,
    validate: {
      validator: v => /^0x[a-fA-F0-9]{40}$/.test(v),
      message: 'Invalid Ethereum address'
    }
  },
  reputationScore: {
    type: Number,
    default: 0,
    min: 0
  },
  nftBadges: [{
    type: String, // Stores IPFS hashes of NFT metadata
    validate: {
      validator: v => /^Qm[1-9A-Za-z]{44}$/.test(v),
      message: 'Invalid IPFS CID'
    }
  }],
  // Existing
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hooks (unchanged)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    if (!this.avatar) {
      this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=random`;
    }
    
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison (unchanged)
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// New: Link wallet address
UserSchema.methods.linkWallet = function(address) {
  if (this.walletAddress) {
    throw new Error('Wallet already linked');
  }
  this.walletAddress = address;
};

// New: Add NFT badge
UserSchema.methods.addBadge = function(ipfsCID) {
  if (!this.nftBadges.includes(ipfsCID)) {
    this.nftBadges.push(ipfsCID);
  }
};

module.exports = mongoose.model('User', UserSchema);