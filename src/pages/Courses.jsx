import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import CourseCard from '../components/CourseCard';

const ALL_COURSES = [
  {
    id: '1',
    title: 'Complete Web Design: from Figma to Webflow',
    instructor: 'Sarah Jenkins',
    category: 'Design',
    duration: '12h 30m',
    students: '1,234',
    rating: '4.9',
    price: '89.99',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Advanced React patterns and Performance',
    instructor: 'David Chen',
    category: 'Development',
    duration: '15h 45m',
    students: '3,450',
    rating: '4.8',
    price: '99.99',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Data Science Bootcamp 2024',
    instructor: 'Michael Ross',
    category: 'Data',
    duration: '42h 10m',
    students: '5,600',
    rating: '4.9',
    price: '129.99',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    instructor: 'Emma Stone',
    category: 'Marketing',
    duration: '8h 15m',
    students: '8,900',
    rating: '4.7',
    price: '69.99',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Python for Beginners',
    instructor: 'James Wilson',
    category: 'Development',
    duration: '22h 40m',
    students: '12,400',
    rating: '4.9',
    price: '49.99',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'UI/UX Fundamentals via Figma',
    instructor: 'Sarah Jenkins',
    category: 'Design',
    duration: '10h 20m',
    students: '4,100',
    rating: '4.8',
    price: '79.99',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const CATEGORIES = ['All', 'Design', 'Development', 'Data', 'Marketing'];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = ALL_COURSES.filter(course => {
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
        {filteredCourses.length > 0 ? (
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
