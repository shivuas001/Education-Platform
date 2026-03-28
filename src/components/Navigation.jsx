import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, User, Menu, X, LogOut } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <BookOpen size={24} />
          </div>
          <span className="brand-name">Edu<span className="text-gradient">Nova</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
           {userInfo ? (
             <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
               <span style={{fontWeight: 600, display: 'none', '@media (min-width: 768px)': {display: 'block'}}}>
                 Hi, {userInfo.name.split(' ')[0]}
               </span>
               <button onClick={handleLogout} className="btn btn-secondary btn-sm profile-btn">
                 <LogOut size={18} />
                 <span>Logout</span>
               </button>
             </div>
           ) : (
             <>
               <Link to="/login" className="btn btn-secondary btn-sm profile-btn" style={{marginRight: '0.5rem'}}>
                 Log In
               </Link>
               <Link to="/register" className="btn btn-primary btn-sm profile-btn">
                 <User size={18} />
                 <span>Sign Up</span>
               </Link>
             </>
           )}
           <button 
             className="mobile-menu-btn"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
