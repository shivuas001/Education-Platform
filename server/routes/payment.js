const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Hardcoded course prices mapped to course IDs for security (prices are in INR)
const COURSE_PRICES = {
  '1': 8999,
  '2': 9999,
  '3': 12999,
  '4': 6999,
  '5': 4999,
  '6': 7999,
};

// @route   POST /api/payment/orders
// @desc    Create a Razorpay order
// @access  Private
router.post('/orders', protect, async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Check if the course ID is valid and retrieve its price
    const price = COURSE_PRICES[courseId];
    if (!price) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay Order options
    const options = {
      amount: price * 100, // Amount is in currency subunits (paise for INR)
      currency: 'INR',
      receipt: `receipt_order_${courseId}_${req.user.id}`,
    };

    // Instantiate order with Razorpay
    const order = await instance.orders.create(options);
    
    if (!order) return res.status(500).json({ message: 'Error generating Razorpay order' });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating payment order' });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId
    } = req.body;

    // Generating expected signature using built-in Node crypto 
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is completely verified! Enroll the user into the course.
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if already enrolled to prevent duplicates
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      return res.status(200).json({ message: 'Payment verified successfully and user enrolled' });
    } else {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error during verification' });
  }
});

module.exports = router;
