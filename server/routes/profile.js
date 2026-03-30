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

    // Check if already enrolled (handle both old string and new obj schema)
    const isEnrolled = user.enrolledCourses.find(c => c.courseId === courseId || c === courseId);
    if (isEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push({
      courseId: courseId,
      completedModules: []
    });
    await user.save();

    res.json({ message: 'Successfully enrolled', enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
});

// @route   POST /api/profile/progress
// @desc    Update course module progress
// @access  Private
router.post('/progress', protect, async (req, res) => {
  try {
    const { courseId, moduleId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let courseIndex = user.enrolledCourses.findIndex(c => c.courseId === courseId || c === courseId);
    if (courseIndex === -1) return res.status(404).json({ message: 'Not enrolled in this course' });

    // Safely migrate old string arrays to objects if they exist from prior tests
    if (typeof user.enrolledCourses[courseIndex] === 'string') {
      user.enrolledCourses[courseIndex] = { courseId: courseId, completedModules: [] };
    }

    const courseObj = user.enrolledCourses[courseIndex];

    if (!courseObj.completedModules.includes(moduleId)) {
      courseObj.completedModules.push(moduleId);
      user.markModified('enrolledCourses'); // CRITICAL: Tell Mongoose we changed a Mixed array element!
      await user.save();
    }
    
    res.json(courseObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating progress' });
  }
});

module.exports = router;
