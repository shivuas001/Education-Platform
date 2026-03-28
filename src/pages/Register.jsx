import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/dashboard');
        window.location.reload();
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server Error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{paddingTop: '6rem', minHeight: 'calc(100vh - 350px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="glass-panel animate-fade-in" style={{padding: '3rem', width: '100%', maxWidth: '450px'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center'}}>Create Account</h2>
        <p style={{color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2rem'}}>
          Join us and start learning today.
        </p>

        {error && <div style={{padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center'}}>{error}</div>}

        <form onSubmit={onSubmit}>
          <div style={{marginBottom: '1.5rem', position: 'relative'}}>
            <User size={20} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--color-text-muted)'}} />
            <input 
              type="text" 
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name" 
              required
              style={{width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'white', outline: 'none', fontFamily: 'inherit'}}
            />
          </div>

          <div style={{marginBottom: '1.5rem', position: 'relative'}}>
            <Mail size={20} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--color-text-muted)'}} />
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address" 
              required
              style={{width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'white', outline: 'none', fontFamily: 'inherit'}}
            />
          </div>

          <div style={{marginBottom: '2rem', position: 'relative'}}>
            <Lock size={20} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--color-text-muted)'}} />
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password (min. 6 characters)" 
              required
              minLength="6"
              style={{width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--color-border)', borderRadius: '0.5rem', color: 'white', outline: 'none', fontFamily: 'inherit'}}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '0.875rem'}} disabled={loading}>
            {loading ? 'Creating...' : <><UserPlus size={20} /> Sign Up</>}
          </button>
        </form>

        <p style={{textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '1.5rem'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--color-primary-light)', fontWeight: 600}}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
