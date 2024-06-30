// routes/subscriptionRoutes.js
const express = require('express');
const stripe = require('../config/stripeConfig');
const Subscription = require('../models/Subscription');
const { isAuthenticated } = require('./middleware/authMiddleware');

const router = express.Router();

// Route to create a Stripe customer and subscribe to a plan
router.post('/subscribe', isAuthenticated, async (req, res) => {
  const { plan, stripeToken } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: req.session.user.email,
      source: stripeToken
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan }]
    });

    await Subscription.create({
      userId: req.session.userId,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      plan
    });

    res.json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;