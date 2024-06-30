const express = require('express');
const { isAuthenticated } = require('./middleware/authMiddleware');
const { generateToken, validateToken, invalidateToken } = require('../utils/tokenUtils');

const router = express.Router();

// Generate a new token
router.post('/token/generate', isAuthenticated, async (req, res) => {
  try {
    const { purpose } = req.body;
    const token = await generateToken(req.session.userId, purpose);
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error.message, error.stack);
    res.status(500).send(error.message);
  }
});

// Validate a token
router.post('/token/validate', isAuthenticated, async (req, res) => {
  try {
    const { token, purpose } = req.body;
    const isValid = await validateToken(token, req.session.userId, purpose);
    res.json({ isValid });
  } catch (error) {
    console.error('Error validating token:', error.message, error.stack);
    res.status(500).send(error.message);
  }
});

// Invalidate a token
router.post('/token/invalidate', isAuthenticated, async (req, res) => {
  try {
    const { token } = req.body;
    await invalidateToken(token, req.session.userId);
    res.json({ message: 'Token invalidated successfully' });
  } catch (error) {
    console.error('Error invalidating token:', error.message, error.stack);
    res.status(500).send(error.message);
  }
});

module.exports = router;