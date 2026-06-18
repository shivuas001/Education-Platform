const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
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
    const isEnrolled = user.enrolledCourses.find(c => String(c.courseId) === String(courseId) || String(c) === String(courseId));
    if (isEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push({
      courseId: courseId,
      completedModules: []
    });
    await user.save();

    // Also add user to the Course's enrolledUsers array
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledUsers: user._id }
    });

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

    let courseIndex = user.enrolledCourses.findIndex(c => String(c.courseId) === String(courseId) || String(c) === String(courseId));
    if (courseIndex === -1) return res.status(404).json({ message: 'Not enrolled in this course' });

    // Safely migrate old string arrays to objects if they exist from prior tests
    const newEnrolled = [...user.enrolledCourses];
    if (typeof newEnrolled[courseIndex] === 'string') {
      newEnrolled[courseIndex] = { courseId: String(courseId), completedModules: [] };
    }

    if (!newEnrolled[courseIndex].completedModules) {
      newEnrolled[courseIndex].completedModules = [];
    }

    if (!newEnrolled[courseIndex].completedModules.includes(moduleId)) {
      newEnrolled[courseIndex].completedModules.push(moduleId);
      user.enrolledCourses = newEnrolled;
      user.markModified('enrolledCourses');
      await user.save();
    }
    
    res.json(newEnrolled[courseIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating progress' });
  }
});

// @route   POST /api/profile/certify
// @desc    Mark a course as certified
// @access  Private
router.post('/certify', protect, async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let courseIndex = user.enrolledCourses.findIndex(c => String(c.courseId) === String(courseId) || String(c) === String(courseId));
    if (courseIndex === -1) return res.status(404).json({ message: 'Not enrolled in this course' });

    // Safely migrate old string arrays to objects if they exist
    const newEnrolled = [...user.enrolledCourses];
    if (typeof newEnrolled[courseIndex] === 'string') {
      newEnrolled[courseIndex] = { courseId: String(courseId), completedModules: [], certified: false };
    }

    if (!newEnrolled[courseIndex].certified) {
      newEnrolled[courseIndex].certified = true;
      user.enrolledCourses = newEnrolled;
      user.markModified('enrolledCourses');
      await user.save();
    }
    
    res.json({ message: 'Successfully certified', course: newEnrolled[courseIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error certifying course' });
  }
});

module.exports = router;
