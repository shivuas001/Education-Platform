import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, PlayCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_COURSE_META = {
  '1': {
    title: 'Complete Web Design: from Figma to Webflow',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    duration: '12h 30m'
  },
  '2': {
    title: 'Advanced React patterns and Performance',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    duration: '15h 45m'
  },
  '3': {
    title: 'Data Science Bootcamp 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    duration: '42h 10m'
  },
  '4': {
    title: 'Digital Marketing Masterclass',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    duration: '8h 15m'
  },
  '5': {
    title: 'Python for Beginners',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    duration: '22h 40m'
  },
  '6': {
    title: 'UI/UX Fundamentals via Figma',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    duration: '10h 20m'
  }
};

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        });
        const data = await res.json();
        
        if (res.ok) {
          setProfile(data);
        } else {
          console.error('Failed to fetch profile', data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div className="container section-padding" style={{textAlign: 'center', paddingTop: '10rem'}}>Loading your profile...</div>;
  }

  if (!profile) {
    return <div className="container section-padding" style={{textAlign: 'center', paddingTop: '10rem'}}>Error loading profile.</div>;
  }

  return (
    <div className="dashboard-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Welcome Banner */}
        <div className="glass-panel" style={{
          padding: '3rem 2rem', 
          marginBottom: '3rem',
          background: 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.2), transparent 40%), rgba(30, 41, 59, 0.7)'
        }}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>Welcome back, <span className="text-gradient">{profile.name.split(' ')[0]}!</span> 👋</h1>
          <p style={{color: 'var(--color-text-muted)', fontSize: '1.1rem'}}>You have enrolled in {profile.enrolledCourses?.length || 0} courses. Keep it up!</p>
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
              <h3 style={{margin: 0, fontSize: '1.5rem'}}>{profile.enrolledCourses?.length || 0}</h3>
            </div>
          </div>
          <div className="glass-panel" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Clock size={24} />
            </div>
            <div>
              <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Hours Learned</p>
              <h3 style={{margin: 0, fontSize: '1.5rem'}}>0</h3>
            </div>
          </div>
          <div className="glass-panel" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Award size={24} />
            </div>
            <div>
              <p style={{margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Certifications</p>
              <h3 style={{margin: 0, fontSize: '1.5rem'}}>0</h3>
            </div>
          </div>
        </div>

        {/* Active Courses */}
        <h2 style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>Continue Learning</h2>
        
        {(!profile.enrolledCourses || profile.enrolledCourses.length === 0) ? (
          <div className="glass-panel" style={{padding: '3rem', textAlign: 'center'}}>
            <p style={{color: 'var(--color-text-muted)', marginBottom: '1.5rem'}}>You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            {profile.enrolledCourses.map(courseObj => {
              const courseId = typeof courseObj === 'string' ? courseObj : courseObj.courseId;
              const completedModules = typeof courseObj === 'string' ? [] : (courseObj.completedModules || []);
              const totalModules = 3;
              let progressPercentage = Math.round((completedModules.length / totalModules) * 100);
              if (progressPercentage > 100) progressPercentage = 100;
              
              const meta = MOCK_COURSE_META[courseId] || { title: `Course ${courseId}`, image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' };
              
              return (
                <div key={courseId} className="glass-panel" style={{
                  display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center', flexWrap: 'wrap'
                }}>
                  <img src={meta.image} alt={meta.title} style={{
                    width: '160px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem'
                  }} />
                  <div style={{flex: 1, minWidth: '250px'}}>
                    <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>{meta.title}</h3>
                    <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem'}}>
                      {completedModules.length === totalModules ? <span style={{color: '#10B981'}}>🎉 Course Completed!</span> : <span>Next up: <span style={{color: 'white', fontWeight: 500}}>Module {completedModules.length + 1}</span></span>}
                    </p>
                    
                    {/* Dynamic Progress Bar */}
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <div style={{flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden'}}>
                        <div style={{height: '100%', width: `${progressPercentage}%`, background: 'var(--color-primary)', borderRadius: '3px'}}></div>
                      </div>
                      <span style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>{progressPercentage}%</span>
                    </div>
                  </div>
                  <div style={{padding: '0 1rem'}}>
                    <Link to={`/learn/${courseId}`} className="btn btn-primary" style={{borderRadius: '2rem'}}>
                      <PlayCircle size={18} /> {progressPercentage === 0 ? "Start" : progressPercentage === 100 ? "Review" : "Resume"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
