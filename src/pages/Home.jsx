import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Users, TrendingUp } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import './Home.css';

const MOCK_COURSES = [
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
  }
];

const FEATURES = [
  { icon: <BookOpen size={24} />, title: '8,000+ Courses', desc: 'Explore a wide range of skills.' },
  { icon: <Award size={24} />, title: 'Expert Instructors', desc: 'Learn from industry professionals.' },
  { icon: <TrendingUp size={24} />, title: 'Lifetime Access', desc: 'Learn on your schedule.' },
  { icon: <Users size={24} />, title: 'Active Community', desc: 'Collaborate with peers worldwide.' },
];

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content animate-slide-up">
            <div className="badge glass-panel">🔥 Ranked #1 Education Platform</div>
            <h1 className="hero-title">
              Unlock Your Potential with <span className="text-gradient">World-Class</span> Learning
            </h1>
            <p className="hero-subtitle">
              Join millions of students upgrading their skills with expert-led courses 
              in programming, design, business, and more.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>
                Explore Courses <ArrowRight size={20} />
              </Link>
              <Link to="/dashboard" className="btn btn-secondary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>
                View Dashboard
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">2M+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="divider"></div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="divider"></div>
              <div className="stat">
                <span className="stat-number">5k+</span>
                <span className="stat-label">Expert Tutors</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image-wrapper animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="hero-image-glow"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Students learning together" 
              className="hero-image glass-panel"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="features-grid">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="feature-card glass-panel animate-slide-up" style={{animationDelay: `${0.1 * idx}s`}}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses section-padding" style={{backgroundColor: 'rgba(15, 23, 42, 0.4)'}}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{marginBottom: 0}}>Popular <span className="text-gradient">Courses</span></h2>
            <Link to="/courses" className="btn btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>
          
          <div className="courses-grid" style={{marginTop: '3rem'}}>
            {MOCK_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section section-padding">
        <div className="container">
          <div className="cta-box glass-panel">
            <h2>Ready to start your learning journey?</h2>
            <p>Join millions of learners worldwide and take the next step in your career.</p>
            <Link to="/dashboard" className="btn btn-primary" style={{marginTop: '1.5rem'}}>Get Started for Free</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
