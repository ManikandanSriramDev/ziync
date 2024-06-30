const crypto = require('crypto');
const Token = require('../models/Token');

// Generate a new token
exports.generateToken = async (userId, purpose) => {
  try {
    const newToken = new Token({
      userId,
      token: crypto.randomBytes(16).toString('hex'),
      purpose
    });
    await newToken.save();
    console.log(`Token generated for user ${userId} with purpose ${purpose}`);
    return newToken.token;
  } catch (error) {
    console.error('Error generating token:', error.message, error.stack);
    throw error;
  }
};

// Validate a token
exports.validateToken = async (token, userId, purpose) => {
  try {
    const tokenDoc = await Token.findOne({ token, userId, purpose });
    console.log(`Token validation for user ${userId} with purpose ${purpose}: ${!!tokenDoc}`);
    return !!tokenDoc;
  } catch (error) {
    console.error('Error validating token:', error.message, error.stack);
    throw error;
  }
};

// Invalidate a token
exports.invalidateToken = async (token, userId) => {
  try {
    await Token.deleteOne({ token, userId });
    console.log(`Token invalidated for user ${userId}`);
  } catch (error) {
    console.error('Error invalidating token:', error.message, error.stack);
    throw error;
  }
};