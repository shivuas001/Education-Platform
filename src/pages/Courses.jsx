import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import CourseCard from '../components/CourseCard';

const CATEGORIES = ['All', 'Design', 'Development', 'Data', 'Marketing'];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/courses`);
      const data = await res.json();
      if (res.ok) {
        // Map database fields to what CourseCard expects
        const formatted = data.map(c => ({
          id: c._id,
          title: c.title,
          instructor: 'EduNova Instructor', // Default since DB doesn't have instructor yet
          category: 'Development', // Default category
          duration: c.modules ? `${c.modules.length} modules` : 'N/A',
          students: c.enrolledUsers ? c.enrolledUsers.length : 0,
          rating: '4.9',
          price: c.price,
          image: c.thumbnailUrl ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${c.thumbnailUrl}` : 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
        }));
        setCourses(formatted);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="courses-page animate-fade-in section-padding">
      <div className="container">
        <div className="courses-header" style={{marginBottom: '3rem', textAlign: 'center'}}>
          <h1 className="text-gradient" style={{fontSize: '3rem', marginBottom: '1rem'}}>Explore Courses</h1>
          <p style={{color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto'}}>
            Discover thousands of courses from top instructors around the world.
          </p>
        </div>

        <div className="courses-controls glass-panel" style={{
          padding: '1.5rem', 
          marginBottom: '3rem', 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search Bar */}
          <div className="search-bar" style={{
            position: 'relative',
            flex: '1',
            minWidth: '250px'
          }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)'
            }}/>
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--color-border)',
                background: 'rgba(15, 23, 42, 0.5)',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Categories */}
          <div className="categories-filter" style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}>
            {CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-secondary'}`}
                style={{padding: '0.5rem 1rem', borderRadius: '2rem', whiteSpace: 'nowrap'}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading courses...</div>
        ) : filteredCourses.length > 0 ? (
          <div className="courses-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="no-courses glass-panel" style={{padding: '4rem', textAlign: 'center'}}>
            <h3 style={{marginBottom: '1rem'}}>No courses found</h3>
            <p style={{color: 'var(--color-text-muted)', marginBottom: '1.5rem'}}>Try adjusting your search or filters to find what you're looking for.</p>
            <button className="btn btn-primary" onClick={() => {setSearchQuery(''); setActiveCategory('All');}}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
