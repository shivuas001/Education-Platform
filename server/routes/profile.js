const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/profile
// @desc    Get user profile and enrolled courses
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// @route   POST /api/profile/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/enroll', protect, async (req, res) => {
  try {
    const { courseId } = req.body;
    
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: 'Successfully enrolled', enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
});

module.exports = router;
