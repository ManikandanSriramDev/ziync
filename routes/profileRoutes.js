const express = require('express');
const User = require('../models/User');
const { isAuthenticated } = require('./middleware/authMiddleware');
const router = express.Router();

// Get user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('profile', { user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send(error.message);
  }
});

// Update user profile
router.post('/profile', isAuthenticated, async (req, res) => {
  try {
    const { fullName, bio } = req.body;
    await User.findByIdAndUpdate(req.session.userId, { fullName, bio });
    res.redirect('/profile');
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;