const express = require('express');
const Vision = require('../models/Vision');
const { isAuthenticated, isAdmin } = require('./middleware/authMiddleware');
const router = express.Router();

router.post('/vision', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { content } = req.body;
    let { organizationId } = req.body;
    if (!organizationId) {
      return res.status(400).send('Organization ID is required.');
    }
    const vision = await Vision.create({ content, organizationId });
    res.status(201).json(vision);
  } catch (error) {
    console.error(`Error creating vision: ${error.message}`, error.stack);
    res.status(500).send(error.message);
  }
});

router.put('/vision/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { content } = req.body;
    const vision = await Vision.findByIdAndUpdate(req.params.id, { content, updatedAt: Date.now() }, { new: true });
    if (!vision) {
      return res.status(404).send('Vision not found.');
    }
    res.json(vision);
  } catch (error) {
    console.error(`Error updating vision: ${error.message}`, error.stack);
    res.status(500).send(error.message);
  }
});

router.get('/vision/:organizationId', isAuthenticated, async (req, res) => {
  try {
    if (!req.params.organizationId || req.params.organizationId === 'null') {
      console.log('No organization ID provided or ID is null, skipping fetch vision.');
      return res.status(404).send('No vision found for the provided organization ID.');
    }
    const vision = await Vision.findOne({ organizationId: req.params.organizationId });
    if (!vision) {
      console.log('Vision not found for the provided organization ID.');
      return res.status(404).send('Vision not found for the provided organization ID.');
    }
    res.json(vision);
  } catch (error) {
    console.error(`Error fetching vision: ${error.message}`, error.stack);
    if (error.name === 'CastError') {
      console.error(`CastError fetching vision with ID ${req.params.organizationId}: ${error.message}`, error.stack);
      return res.status(400).send('Invalid organization ID format.');
    }
    res.status(500).send(error.message);
  }
});

module.exports = router;