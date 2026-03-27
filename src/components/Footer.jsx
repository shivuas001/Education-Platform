import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, Code, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(15, 23, 42, 0.95)',
      borderTop: '1px solid var(--color-border)',
      padding: '4rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem'
      }}>
        {/* Brand */}
        <div>
          <Link to="/" className="brand" style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 700}}>
            <div className="brand-icon" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white'
            }}>
              <BookOpen size={24} />
            </div>
            <span className="brand-name">Edu<span className="text-gradient">Nova</span></span>
          </Link>
          <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
            Empowering students worldwide to learn the skills of tomorrow, today.
          </p>
          <div style={{display: 'flex', gap: '1rem'}}>
            <a href="#" style={{color: 'var(--color-text-muted)'}}><MessageCircle size={20} /></a>
            <a href="#" style={{color: 'var(--color-text-muted)'}}><Code size={20} /></a>
            <a href="#" style={{color: 'var(--color-text-muted)'}}><Briefcase size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{marginBottom: '1rem', color: 'white'}}>Platform</h4>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li><Link to="/courses" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Browse Courses</Link></li>
            <li><Link to="/dashboard" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Student Dashboard</Link></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Mentorship</a></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{marginBottom: '1rem', color: 'white'}}>Resources</h4>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Community Forum</a></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Help Center</a></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>API Documentation</a></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{marginBottom: '1rem', color: 'white'}}>Company</h4>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>About Us</a></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Careers</a></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Privacy Policy</a></li>
            <li><a href="#" style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{borderTop: '1px solid var(--color-border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem'}}>
        &copy; {new Date().getFullYear()} EduNova Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
