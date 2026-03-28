import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Star, Users, CheckCircle, PlayCircle, Lock, BookOpen, TrendingUp, Award } from 'lucide-react';

const STATIC_COURSE_DB = {
  '1': {
    id: '1',
    title: 'Complete Web Design: from Figma to Webflow',
    instructor: 'Sarah Jenkins',
    category: 'Design',
    duration: '12h 30m',
    students: '1,234',
    rating: '4.9',
    price: '89.99',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Master web design by learning the theory and practically applying it using Figma and Webflow. This comprehensive course takes you from absolute beginner to professional web designer.',
    what_you_will_learn: [
      'Create beautiful, modern website designs in Figma',
      'Understand typography, color theory, and layout principles',
      'Build responsive websites visually using Webflow',
      'Deploy highly optimized websites ready for production',
      'Client communication and project management'
    ],
    modules: [
      { title: 'Introduction to Web Design', time: '45m', isUnlocked: true },
      { title: 'Figma Basics & Interface', time: '1h 30m', isUnlocked: true },
      { title: 'Color Theory & Typography', time: '2h 15m', isUnlocked: false },
      { title: 'Designing the Landing Page', time: '3h 40m', isUnlocked: false },
      { title: 'Webflow Fundamentals', time: '2h 20m', isUnlocked: false },
      { title: 'Building out the Project', time: '4h 00m', isUnlocked: false }
    ]
  },
  '2': {
    id: '2',
    title: 'Advanced React patterns and Performance',
    instructor: 'David Chen',
    category: 'Development',
    duration: '15h 45m',
    students: '3,450',
    rating: '4.8',
    price: '99.99',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'A deep dive into advanced React patterns, custom hooks, and rendering optimization to scale performance bottlenecks.',
    what_you_will_learn: ['Custom Hooks Mastery', 'Context & Redux', 'Lazy Loading', 'Concurrent Mode', 'Server-Side Rendering'],
    modules: [{ title: 'Intro', time: '15m', isUnlocked: true }, { title: 'Advanced Hooks', time: '2h', isUnlocked: false }]
  },
  '3': {
    id: '3',
    title: 'Data Science Bootcamp 2024',
    instructor: 'Michael Ross',
    category: 'Data',
    duration: '42h 10m',
    students: '5,600',
    rating: '4.9',
    price: '129.99',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Complete pipeline for predictive modeling and massive datasets.',
    what_you_will_learn: ['Python', 'Pandas', 'Scikit-Learn', 'TensorFlow', 'Model Deployment'],
    modules: [{ title: 'Intro to Python', time: '1h', isUnlocked: true }, { title: 'Data Cleaning', time: '3h', isUnlocked: false }]
  },
  '4': {
    id: '4',
    title: 'Digital Marketing Masterclass',
    instructor: 'Emma Stone',
    category: 'Marketing',
    duration: '8h 15m',
    students: '8,900',
    rating: '4.7',
    price: '69.99',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Grow business organically using modern social media funnels.',
    what_you_will_learn: ['SEO Basics', 'Facebook Ads', 'Email Funnels', 'Google Analytics'],
    modules: [{ title: 'SEO intro', time: '1h', isUnlocked: true }, { title: 'FB Ads', time: '2h', isUnlocked: false }]
  },
  '5': {
    id: '5',
    title: 'Python for Beginners',
    instructor: 'James Wilson',
    category: 'Development',
    duration: '22h 40m',
    students: '12,400',
    rating: '4.9',
    price: '49.99',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'From 0 to mastery in Python scripting.',
    what_you_will_learn: ['Variables', 'Loops', 'OOP', 'Data Structs'],
    modules: [{ title: 'Syntax', time: '1h', isUnlocked: true }, { title: 'OOP', time: '3h', isUnlocked: false }]
  },
  '6': {
    id: '6',
    title: 'UI/UX Fundamentals via Figma',
    instructor: 'Sarah Jenkins',
    category: 'Design',
    duration: '10h 20m',
    students: '4,100',
    rating: '4.8',
    price: '79.99',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Creating user flows and high fidelity prototypes.',
    what_you_will_learn: ['Wireframing', 'Prototyping', 'User Research', 'Usability Testing'],
    modules: [{ title: 'Wireframes', time: '1h', isUnlocked: true }, { title: 'Testing', time: '2h', isUnlocked: false }]
  }
};

const CourseDetails = () => {
  const { id } = useParams();
  const course = STATIC_COURSE_DB[id] || STATIC_COURSE_DB['1'];
  
  const [enrolling, setEnrolling] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState('');
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleEnroll = async () => {
    if (!userInfo) {
      window.location.href = '/login';
      return;
    }

    setEnrolling(true);
    setEnrollStatus('');

    try {
      const res = await fetch('http://localhost:5000/api/profile/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ courseId: id })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setEnrollStatus('Success! View your dashboard.');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setEnrollStatus(`Error: ${data.message || 'Failed'}`);
      }
    } catch (err) {
      setEnrollStatus('Error: Server connection failed.');
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="course-details-page animate-fade-in">
      {/* Course Header */}
      <div className="course-header-banner" style={{
        position: 'relative',
        padding: '8rem 0 5rem 0',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${course.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -2
        }}></div>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0.4) 100%)',
          zIndex: -1
        }}></div>

        <div className="container">
          <div style={{maxWidth: '800px', position: 'relative', zIndex: 1}}>
            <span className="badge glass-panel" style={{display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '2rem', background: 'var(--color-primary-light)', color: '#fff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem'}}>{course.category}</span>
            <h1 style={{fontSize: '3rem', margin: '0 0 1rem 0', lineHeight: 1.2}}>{course.title}</h1>
            <p style={{fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2rem'}}>{course.description}</p>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap'}}>
              <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B'}}>
                <Star size={20} fill="currentColor" /> {course.rating}
              </span>
              <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Users size={20} /> {course.students} students
              </span>
              <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Clock size={20} /> {course.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Grid */}
      <div className="container section-padding">
        <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start'}} className="course-layout-grid">
          
          <div>
            <div className="glass-panel" style={{padding: '2.5rem', marginBottom: '3rem'}}>
              <h2 style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>What you'll learn</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                {course.what_you_will_learn.map((item, idx) => (
                  <div key={idx} style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem'}}>
                    <CheckCircle size={20} style={{color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px'}} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>Course Curriculum</h2>
              <div className="glass-panel" style={{padding: '1.5rem'}}>
                {course.modules.map((mod, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.25rem', borderBottom: idx !== course.modules.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'background 0.2s', cursor: mod.isUnlocked ? 'pointer' : 'default', borderRadius: '0.5rem'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: mod.isUnlocked ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: mod.isUnlocked ? 'var(--color-primary-light)' : 'var(--color-text-muted)'
                      }}>
                        {mod.isUnlocked ? <PlayCircle size={20} /> : <Lock size={20} />}
                      </div>
                      <h4 style={{margin: 0, fontSize: '1.1rem', color: mod.isUnlocked ? 'white' : 'var(--color-text-muted)'}}>
                        {idx + 1}. {mod.title}
                      </h4>
                    </div>
                    <span style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>{mod.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="course-sidebar glass-panel" style={{
            padding: '2rem', 
            position: 'sticky', 
            top: '140px',
            marginTop: '-15rem',
            zIndex: 10
          }}>
            <img src={course.image} alt="Course Preview" style={{width: '100%', borderRadius: '1rem', marginBottom: '1.5rem', border: '1px solid var(--color-border)'}} />
            <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center'}}>${course.price}</div>
            
            {enrollStatus && <div style={{width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '0.9rem'}}>{enrollStatus}</div>}
            
            <button onClick={handleEnroll} disabled={enrolling} className="btn btn-primary" style={{width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem'}}>
              {enrolling ? 'Processing...' : 'Enroll Now'}
            </button>
            <p style={{textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem'}}>30-Day Money-Back Guarantee</p>
            <div style={{borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem'}}>
              <h4 style={{marginBottom: '1rem'}}>This course includes:</h4>
              <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-text-muted)'}}>
                <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><PlayCircle size={16}/> {course.duration} on-demand video</li>
                <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><BookOpen size={16}/> 15 downloadable resources</li>
                <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><TrendingUp size={16}/> Full lifetime access</li>
                <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Award size={16}/> Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .course-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .course-sidebar {
            position: static !important;
          }
        }
      `}} />
    </div>
  );
};

export default CourseDetails;
