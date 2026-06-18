const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer for local uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middleware to check for Admin role
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

// @route   GET /api/courses
// @desc    Get all courses (public view)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({}).select('-enrolledUsers');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching courses' });
  }
});

// @route   GET /api/courses/admin/all
// @desc    Get all courses with enrollments (admin view)
// @access  Private/Admin
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const courses = await Course.find({}).populate('enrolledUsers', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching admin courses' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching course' });
  }
});

// @route   POST /api/courses
// @desc    Create a course with videos
// @access  Private/Admin
router.post('/', protect, admin, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'moduleVideos', maxCount: 20 }
]), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    let modulesData = [];
    if (req.body.modules) {
      modulesData = JSON.parse(req.body.modules); // Array of { title, duration }
    }

    // Process files
    let thumbnailUrl = '';
    if (req.files['thumbnail'] && req.files['thumbnail'].length > 0) {
      thumbnailUrl = `/uploads/${req.files['thumbnail'][0].filename}`;
    }

    const videoFiles = req.files['moduleVideos'] || [];
    
    // Combine module data with uploaded video URLs
    const modules = modulesData.map((mod, index) => {
      let videoUrl = '';
      if (videoFiles[index]) {
        videoUrl = `/uploads/${videoFiles[index].filename}`;
      }
      return {
        title: mod.title,
        duration: mod.duration,
        videoUrl: videoUrl
      };
    });

    const course = new Course({
      title,
      description,
      price: price || 0,
      thumbnailUrl,
      modules,
      enrolledUsers: []
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error creating course' });
  }
});

module.exports = router;
