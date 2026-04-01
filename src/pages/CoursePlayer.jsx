import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, PlayCircle, Lock, ArrowLeft, Award } from 'lucide-react';

const MODULES = [
  { id: 1, title: 'Introduction & Setup', time: '10:45', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 2, title: 'Deep Dive into Concepts', time: '14:20', video: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
  { id: 3, title: 'Building the Final Project', time: '21:15', video: 'https://media.w3.org/2010/05/bunny/trailer.mp4' }
];

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeModule, setActiveModule] = useState(1);
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    // Reset the video state whenever they click a new module
    setVideoFinished(false);
  }, [activeModule]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        const data = await res.json();
        
        if (res.ok) {
          // Find this specific course
          const course = data.enrolledCourses?.find(c => 
            (typeof c === 'string' ? c === id : c.courseId === id)
          );
          
          if (!course) {
            navigate('/dashboard'); // Not enrolled!
            return;
          }

          const completed = typeof course === 'string' ? [] : (course.completedModules || []);
          setCompletedModules(completed);
          
          // Auto-select the first uncompleted module
          const firstUncompleted = MODULES.find(m => !completed.includes(m.id));
          if (firstUncompleted) {
            setActiveModule(firstUncompleted.id);
          } else {
            setActiveModule(MODULES[0].id); // All done, just show first
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [id, navigate]);

  const markComplete = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ courseId: id, moduleId: activeModule })
      });

      const data = await res.json();
      if (res.ok) {
        setCompletedModules(data.completedModules || []);
        
        // Auto-advance to next if not the last
        if (activeModule < MODULES.length) {
          setActiveModule(activeModule + 1);
        }
      }
    } catch (err) {
      console.error('Failed to update progress', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="section-padding container" style={{textAlign: 'center', paddingTop: '10rem'}}>Loading player classroom...</div>;

  const currentVideo = MODULES.find(m => m.id === activeModule);

  return (
    <div className="course-player-page animate-fade-in section-padding" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <div className="container" style={{maxWidth: '1600px', flex: 1}}>
        
        <div style={{marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Link to="/dashboard" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)'}}>
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <div className="badge glass-panel" style={{display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '2rem', background: 'var(--color-primary)', color: '#fff', fontSize: '0.85rem', fontWeight: 600}}>
            Course Classroom
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1fr)', gap: '2rem'}} className="player-layout-grid">
          
          {/* Main Video Area */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div className="glass-panel" style={{overflow: 'hidden', padding: '1rem', background: '#000'}}>
              <video 
                key={currentVideo.video}
                src={currentVideo.video} 
                controls 
                playsInline
                onEnded={() => setVideoFinished(true)}
                style={{width: '100%', borderRadius: '0.5rem', maxHeight: '70vh', background: '#000'}} 
              />
            </div>
            
            <div className="glass-panel" style={{padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
              <div>
                <h1 style={{fontSize: '2rem', margin: '0 0 0.5rem 0'}}>Module {activeModule}: {currentVideo.title}</h1>
                <p style={{color: 'var(--color-text-muted)', margin: 0}}>Take notes! Your progress is automatically saved to your profile.</p>
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={markComplete}
                disabled={submitting || completedModules.includes(activeModule) || !videoFinished}
                style={{
                  background: completedModules.includes(activeModule) ? 'rgba(16, 185, 129, 0.2)' : (!videoFinished ? 'rgba(255,255,255,0.1)' : 'var(--color-primary)'),
                  color: completedModules.includes(activeModule) ? '#10B981' : (!videoFinished ? 'var(--color-text-muted)' : 'white'),
                  cursor: (submitting || completedModules.includes(activeModule) || !videoFinished) ? 'not-allowed' : 'pointer',
                  padding: '1rem 2rem'
                }}
              >
                {completedModules.includes(activeModule) ? (
                  <><CheckCircle size={20} /> Completed</>
                ) : !videoFinished ? (
                  <><PlayCircle size={20} /> Watch Video to Complete</>
                ) : (
                  <>{submitting ? 'Saving...' : 'Mark as Complete'}</>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar Playlist */}
          <div className="course-sidebar glass-panel" style={{padding: '1.5rem', alignSelf: 'start', position: 'sticky', top: '100px'}}>
            <h3 style={{marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem'}}>Course Modules</h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              {MODULES.map(mod => {
                const isCompleted = completedModules.includes(mod.id);
                const isActive = activeModule === mod.id;

                return (
                  <div 
                    key={mod.id} 
                    onClick={() => setActiveModule(mod.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isActive ? 'rgba(79, 70, 229, 0.15)' : 'transparent',
                      border: isActive ? '1px solid var(--color-primary-light)' : '1px solid transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      {isCompleted ? (
                        <CheckCircle size={20} style={{color: '#10B981'}} />
                      ) : isActive ? (
                        <PlayCircle size={20} style={{color: 'var(--color-primary-light)'}} />
                      ) : (
                        <Lock size={20} style={{color: 'var(--color-text-muted)'}} />
                      )}
                      
                      <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span style={{fontWeight: isActive ? 600 : 400, color: isActive ? 'white' : 'var(--color-text-muted)'}}>
                          {mod.id}. {mod.title}
                        </span>
                        <span style={{fontSize: '0.8rem', color: 'var(--color-text-muted)'}}>{mod.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {completedModules.length === MODULES.length && (
              <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.3)'}}>
                <Award size={32} style={{color: '#10B981', marginBottom: '0.5rem'}} />
                <h4 style={{margin: '0 0 0.5rem 0', color: '#10B981'}}>Course Finished!</h4>
                <p style={{fontSize: '0.85rem', margin: 0, color: 'var(--color-text-muted)'}}>You have successfully earned your certificate!</p>
              </div>
            )}
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .player-layout-grid {
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

export default CoursePlayer;
