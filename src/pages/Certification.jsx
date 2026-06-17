import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, PlayCircle, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quizData';

const MOCK_COURSE_META = {
  '1': { title: 'Complete Web Design: from Figma to Webflow', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  '2': { title: 'Advanced React patterns and Performance', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  '3': { title: 'Data Science Bootcamp 2024', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  '4': { title: 'Digital Marketing Masterclass', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  '5': { title: 'Python for Beginners', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  '6': { title: 'UI/UX Fundamentals via Figma', image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
};

const Certification = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Quiz Modal State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      const data = await res.json();
      if (res.ok) setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { replace: true });
      return;
    }
    fetchProfile();
  }, [navigate]);

  const handleOpenQuiz = (courseId) => {
    setCurrentCourseId(courseId);
    setAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setQuizModalOpen(true);
  };

  const handleCloseQuiz = () => {
    setQuizModalOpen(false);
    setCurrentCourseId(null);
  };

  const handleAnswerSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const submitQuiz = async () => {
    if (!currentCourseId) return;
    
    const questions = quizData[currentCourseId] || [];
    let correctCount = 0;
    
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizSubmitted(true);

    if (correctCount >= 3) {
      setSubmitting(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/profile/certify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          },
          body: JSON.stringify({ courseId: currentCourseId })
        });
        
        if (res.ok) {
          fetchProfile(); // Refresh profile to update UI
        } else {
          const errorData = await res.json().catch(() => ({}));
          alert(`Error saving certification: ${res.status} ${errorData.message || ''}`);
        }
      } catch (err) {
        console.error('Failed to certify', err);
        alert('Network error while saving certification.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) return <div className="container section-padding" style={{textAlign: 'center', paddingTop: '10rem'}}>Loading certifications...</div>;

  const enrolledCourses = profile?.enrolledCourses || [];
  
  // Categorize courses
  const certifiedCourses = [];
  const eligibleCourses = [];
  const inProgressCourses = [];

  enrolledCourses.forEach(courseObj => {
    const courseId = typeof courseObj === 'string' ? courseObj : courseObj.courseId;
    const completedModules = typeof courseObj === 'string' ? [] : (courseObj.completedModules || []);
    const isCertified = typeof courseObj === 'string' ? false : !!courseObj.certified;
    
    const isCompleted = completedModules.length === 3; // Total modules is 3
    
    if (isCertified) {
      certifiedCourses.push(courseId);
    } else if (isCompleted) {
      eligibleCourses.push(courseId);
    } else {
      inProgressCourses.push({ courseId, progress: completedModules.length });
    }
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1rem', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Award size={48} className="text-gradient" style={{ margin: '0 auto 1rem auto' }} />
        <h1 className="section-title">Professional <span className="text-gradient">Certifications</span></h1>
        <p className="section-subtitle">Earn industry-recognized certificates to boost your career</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Certified Section */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={24} style={{ color: '#10B981' }} /> Your Certificates
          </h2>
          {certifiedCourses.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>You haven't earned any certificates yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {certifiedCourses.map(id => {
                const meta = MOCK_COURSE_META[id] || { title: `Course ${id}` };
                return (
                  <div key={id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderLeft: '4px solid #10B981' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>{meta.title}</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={16} /> Certified</p>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => alert('Certificate PDF generation coming soon!')}>View</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Eligible Section */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={24} style={{ color: 'var(--color-primary-light)' }} /> Ready for Certification
          </h2>
          {eligibleCourses.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>Complete courses to become eligible for certification.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {eligibleCourses.map(id => {
                const meta = MOCK_COURSE_META[id] || { title: `Course ${id}` };
                return (
                  <div key={id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>{meta.title}</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Pass the final quiz to earn your certificate.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleOpenQuiz(id)}>Get Certified</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Quiz Modal */}
      {quizModalOpen && currentCourseId && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative' }}>
            <button onClick={handleCloseQuiz} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Certification Quiz</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Answer at least 3 out of 5 questions correctly to pass.</p>

            {!quizSubmitted ? (
              <div>
                {(quizData[currentCourseId] || []).map((q, qIndex) => (
                  <div key={qIndex} style={{ marginBottom: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{qIndex + 1}. {q.question}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {q.options.map((opt, oIndex) => (
                        <label key={oIndex} style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', 
                          background: answers[qIndex] === opt ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255,255,255,0.05)',
                          border: answers[qIndex] === opt ? '1px solid var(--color-primary)' : '1px solid transparent',
                          borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                          <input 
                            type="radio" 
                            name={`q-${qIndex}`} 
                            value={opt} 
                            checked={answers[qIndex] === opt}
                            onChange={() => handleAnswerSelect(qIndex, opt)}
                            style={{ accentColor: 'var(--color-primary)' }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                  onClick={submitQuiz}
                  disabled={Object.keys(answers).length < 5}
                >
                  Submit Quiz
                </button>
                {Object.keys(answers).length < 5 && <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '1rem', fontSize: '0.9rem' }}>Please answer all questions before submitting.</p>}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                {score >= 3 ? (
                  <>
                    <Award size={64} style={{ color: '#10B981', margin: '0 auto 1rem auto' }} />
                    <h2 style={{ color: '#10B981', marginBottom: '1rem' }}>Congratulations!</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>You scored {score}/5 and passed the quiz.</p>
                    {submitting ? <p>Saving certification...</p> : <p style={{ color: 'var(--color-text-muted)' }}>Your certificate has been added to your profile.</p>}
                  </>
                ) : (
                  <>
                    <X size={64} style={{ color: '#EF4444', margin: '0 auto 1rem auto' }} />
                    <h2 style={{ color: '#EF4444', marginBottom: '1rem' }}>Keep trying!</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>You scored {score}/5. You need at least 3 correct answers to pass.</p>
                    <button className="btn btn-secondary" onClick={() => { setQuizSubmitted(false); setAnswers({}); }}>Retry Quiz</button>
                  </>
                )}
                
                {(!submitting && score >= 3) && (
                  <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={handleCloseQuiz}>Close & View Certificate</button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Certification;
