import React from 'react';
import { BookOpen, Clock, Award, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_ENROLLED = [
  {
    id: '1',
    title: 'Complete Web Design: from Figma to Webflow',
    progress: 45,
    nextLesson: 'Typography Basics',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2',
    title: 'Advanced React patterns',
    progress: 12,
    nextLesson: 'Custom Hooks',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const Dashboard = () => {
  return (
    <div className="dashboard-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Welcome Banner */}
        <div className="glass-panel" style={{
          padding: '3rem 2rem', 
          marginBottom: '3rem',
          background: 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.2), transparent 40%), rgba(30, 41, 59, 0.7)'
        }}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>Welcome back, <span className="text-gradient">Alex!</span> 👋</h1>
          <p style={{color: 'var(--color-text-muted)', fontSize: '1.1rem'}}>You have learned for 14 hours this week. Keep it up!</p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem'
        }}>
          <div className="glass-panel" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <BookOpen size={24} />
            </div>
            <div>
              <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Enrolled Courses</p>
              <h3 style={{margin: 0, fontSize: '1.5rem'}}>4</h3>
            </div>
          </div>
          <div className="glass-panel" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Clock size={24} />
            </div>
            <div>
              <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Hours Learned</p>
              <h3 style={{margin: 0, fontSize: '1.5rem'}}>128</h3>
            </div>
          </div>
          <div className="glass-panel" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Award size={24} />
            </div>
            <div>
              <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Certifications</p>
              <h3 style={{margin: 0, fontSize: '1.5rem'}}>2</h3>
            </div>
          </div>
        </div>

        {/* Active Courses */}
        <h2 style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>Continue Learning</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          {MOCK_ENROLLED.map(course => (
            <div key={course.id} className="glass-panel" style={{
              display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center', flexWrap: 'wrap'
            }}>
              <img src={course.image} alt={course.title} style={{
                width: '160px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem'
              }} />
              <div style={{flex: 1, minWidth: '250px'}}>
                <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>{course.title}</h3>
                <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem'}}>
                  Next up: <span style={{color: 'white', fontWeight: 500}}>{course.nextLesson}</span>
                </p>
                
                {/* Progress Bar */}
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <div style={{flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden'}}>
                    <div style={{height: '100%', width: `${course.progress}%`, background: 'var(--color-primary)', borderRadius: '3px'}}></div>
                  </div>
                  <span style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>{course.progress}%</span>
                </div>
              </div>
              <div style={{padding: '0 1rem'}}>
                <Link to={`/courses/${course.id}`} className="btn btn-primary" style={{borderRadius: '2rem'}}>
                  <PlayCircle size={18} /> Resume
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
