const express = require('express');
const { isAuthenticated, isAdmin } = require('./middleware/authMiddleware');
const Invitation = require('../models/Invitation');
const sendEmail = require('../utils/sendEmail');
const router = express.Router();

router.post('/invitations', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { email, organizationId } = req.body;
    const token = Math.random().toString(36).substring(2, 15); // Simple token generation
    const invitation = await Invitation.create({ email, organizationId, token });

    const invitationLink = `${req.protocol}://${req.get('host')}/accept-invitation?token=${token}`;

    await sendEmail(email, 'Invitation to join Ziync', `Please click on the link to join: ${invitationLink}`);

    res.status(201).json({ message: 'Invitation sent successfully.', invitation });
  } catch (error) {
    console.error(`Error sending invitation: ${error.message}`, error);
    res.status(500).send(error.message);
  }
});

module.exports = router;