import React, { useState, useEffect } from 'react';
import { Plus, Users, BookOpen, Trash2, UploadCloud } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [modules, setModules] = useState([{ title: '', duration: '', file: null }]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchCourses();
  }, [activeTab]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'enrollments' ? '/api/courses/admin/all' : '/api/courses';
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${endpoint}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      const data = await res.json();
      if (res.ok) setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddModule = () => {
    setModules([...modules, { title: '', duration: '', file: null }]);
  };

  const handleRemoveModule = (index) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  const handleModuleChange = (index, field, value) => {
    const newModules = [...modules];
    newModules[index][field] = value;
    setModules(newModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    // Extract module metadata and files separately
    const modulesMetadata = modules.map(m => ({ title: m.title, duration: m.duration }));
    formData.append('modules', JSON.stringify(modulesMetadata));

    modules.forEach(m => {
      if (m.file) {
        formData.append('moduleVideos', m.file);
      }
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/courses`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userInfo.token}`
          // Don't set Content-Type, browser will set multipart/form-data boundary automatically
        },
        body: formData
      });

      if (res.ok) {
        setMessage('Course successfully created!');
        setTitle('');
        setDescription('');
        setPrice(0);
        setThumbnail(null);
        setModules([{ title: '', duration: '', file: null }]);
        fetchCourses();
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error while creating course');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1rem', minHeight: '80vh' }}>
      <h1 className="section-title text-center">Admin <span className="text-gradient">Dashboard</span></h1>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
        <button 
          className={`btn ${activeTab === 'courses' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('courses')}
        >
          <BookOpen size={18} /> Manage Courses
        </button>
        <button 
          className={`btn ${activeTab === 'enrollments' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('enrollments')}
        >
          <Users size={18} /> View Enrollments
        </button>
      </div>

      {activeTab === 'courses' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          {/* Create Course Form */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={20} className="text-gradient" /> Create New Course
            </h2>
            {message && <div style={{ padding: '1rem', background: message.includes('Error') ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: message.includes('Error') ? '#EF4444' : '#10B981', borderRadius: '0.5rem', marginBottom: '1rem' }}>{message}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Course Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
              <div className="form-group">
                <label>Thumbnail Image</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
              </div>
              
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  Modules
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddModule}>+ Add</button>
                </h3>
                
                {modules.map((mod, index) => (
                  <div key={index} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: index < modules.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600 }}>Module {index + 1}</span>
                      {modules.length > 1 && (
                        <button type="button" style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }} onClick={() => handleRemoveModule(index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                      <input type="text" className="form-control" placeholder="Module Title" value={mod.title} onChange={(e) => handleModuleChange(index, 'title', e.target.value)} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                      <input type="text" className="form-control" placeholder="Duration (e.g. 10:45)" value={mod.duration} onChange={(e) => handleModuleChange(index, 'duration', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.85rem' }}><UploadCloud size={14} /> Video File</label>
                      <input type="file" className="form-control" accept="video/*" onChange={(e) => handleModuleChange(index, 'file', e.target.files[0])} required />
                    </div>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', marginTop: '1rem' }}>
                {submitting ? 'Uploading Course...' : 'Create Course'}
              </button>
            </form>
          </div>

          {/* List Existing Courses */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Existing Courses</h2>
            {loading ? <p>Loading...</p> : courses.length === 0 ? <p>No courses uploaded yet.</p> : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {courses.map(course => (
                  <div key={course._id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {course.thumbnailUrl && <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${course.thumbnailUrl}`} alt={course.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.25rem' }} />}
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0' }}>{course.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{course.modules.length} Modules</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'enrollments' && (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Course Enrollments</h2>
          {loading ? <p>Loading data...</p> : courses.length === 0 ? <p>No courses found.</p> : (
            <div style={{ display: 'grid', gap: '2rem' }}>
              {courses.map(course => (
                <div key={course._id} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                    {course.title}
                    <span className="badge" style={{ background: 'var(--color-primary)', fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>{course.enrolledUsers?.length || 0} Students</span>
                  </h3>
                  
                  {(!course.enrolledUsers || course.enrolledUsers.length === 0) ? (
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>No students enrolled yet.</p>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                          <th style={{ padding: '0.5rem 0' }}>Student Name</th>
                          <th style={{ padding: '0.5rem 0' }}>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.enrolledUsers.map(user => (
                          <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '0.75rem 0' }}>{user.name}</td>
                            <td style={{ padding: '0.75rem 0', color: 'var(--color-text-muted)' }}>{user.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
