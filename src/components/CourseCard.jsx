import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users } from 'lucide-react';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card glass-panel">
      <div className="course-image-container">
        <img src={course.image} alt={course.title} className="course-image" />
        <span className="course-category">{course.category}</span>
      </div>
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">by {course.instructor}</p>
        
        <div className="course-meta">
          <span className="meta-item"><Clock size={16} /> {course.duration}</span>
          <span className="meta-item"><Users size={16} /> {course.students}</span>
          <span className="meta-item text-yellow"><Star size={16} fill="currentColor" /> {course.rating}</span>
        </div>
        
        <div className="course-footer">
          <span className="course-price">${course.price}</span>
          <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">Enroll Now</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
