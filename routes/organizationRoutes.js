const express = require('express');
const Organization = require('../models/Organization');
const { isAuthenticated, isSuperUser } = require('./middleware/authMiddleware'); // Ensure isSuperUser middleware is implemented
const router = express.Router();

// Route to update organization type
router.put('/organization/:id/type', isAuthenticated, isSuperUser, async (req, res) => {
  try {
    const { type } = req.body;
    const organization = await Organization.findByIdAndUpdate(req.params.id, { type }, { new: true });
    if (!organization) {
      return res.status(404).send('Organization not found.');
    }
    res.json(organization);
  } catch (error) {
    console.error(`Error updating organization type: ${error.message}`, error);
    res.status(500).send(error.message);
  }
});

module.exports = router;