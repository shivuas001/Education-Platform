import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Star, Users, CheckCircle, PlayCircle, Lock } from 'lucide-react';

const COURSE_DETAILS = {
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
};

const CourseDetails = () => {
  const { id } = useParams();
  const course = COURSE_DETAILS; // using static for now

  return (
    <div className="course-details-page animate-fade-in">
      {/* Course Header */}
      <div className="course-header-banner" style={{
        position: 'relative',
        padding: '5rem 0',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Overlay */}
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
                <Star size={20} fill="currentColor" /> {course.rating} (450 reviews)
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
          
          {/* Main Content */}
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

          {/* Sidebar */}
          <div className="course-sidebar glass-panel" style={{padding: '2rem', position: 'sticky', top: '100px'}}>
            <img src={course.image} alt="Course Preview" style={{width: '100%', borderRadius: '1rem', marginBottom: '1.5rem', border: '1px solid var(--color-border)'}} />
            <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center'}}>${course.price}</div>
            <Link to="/dashboard" className="btn btn-primary" style={{width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem'}}>Enroll Now</Link>
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
