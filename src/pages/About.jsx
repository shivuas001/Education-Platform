import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page container section">
      <div className="about-header text-center">
        <h1 className="section-title">About <span className="text-gradient">EduNova</span></h1>
        <p className="section-subtitle">Empowering learners worldwide with accessible, high-quality education.</p>
      </div>
      
      <div className="about-content grid" style={{ gap: '4rem', marginTop: '3rem' }}>
        <div className="about-text">
          <h2 style={{ marginBottom: '1.5rem' }}>Our Mission</h2>
          <p style={{ marginBottom: '1rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
            At EduNova, we believe that education is a fundamental right, not a privilege. Our mission is to democratize learning by providing top-tier educational resources that are accessible to anyone, anywhere, at any time.
          </p>
          <p style={{ marginBottom: '1rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
            Founded in 2023, our platform connects passionate educators with eager learners, fostering a global community driven by curiosity and the pursuit of excellence. Whether you're looking to advance your career or learn a new hobby, EduNova is your partner in growth.
          </p>
          
          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Why Choose Us?</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
              <span>Expert-led courses tailored for modern skills</span>
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
              <span>Flexible learning at your own pace</span>
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
              <span>Interactive content and community support</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
              <span>Affordable and transparent pricing</span>
            </li>
          </ul>
        </div>
        
        <div className="about-image glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
           <h3 style={{ marginBottom: '1rem' }}>Join Our Community</h3>
           <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Over 100,000 students have transformed their lives through our platform. Start your journey today.</p>
           <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
             <div>
                <h2 className="text-gradient">500+</h2>
                <p>Courses</p>
             </div>
             <div>
                <h2 className="text-gradient">50+</h2>
                <p>Instructors</p>
             </div>
             <div>
                <h2 className="text-gradient">100k+</h2>
                <p>Students</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
