const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const sendUserResponse = (user, statusCode, res) => {
  res.status(statusCode).json({
    success: true,
    token: createToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  });
};

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    sendUserResponse(user, 201, res);

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    sendUserResponse(user, 200, res);

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name, avatar: req.body.avatar },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Update failed' });
  }
};

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    res.json({ 
      success: true,
      data: {
        projects: 5,
        tasksCompleted: 28,
        lastLogin: new Date()
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};