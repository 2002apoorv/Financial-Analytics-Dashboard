import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import HomeNavbar from '../components/HomeNavbar';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful signup and redirect to the dashboard
    if (formData.fullName && formData.email && formData.password) {
      navigate('/app');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px 16px 50px',
    backgroundColor: 'rgba(28, 31, 38, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  };

  const iconStyle = {
    position: 'absolute',
    left: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--tv-text-muted)'
  };

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <HomeNavbar />

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '100px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(30, 75, 216, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0
        }} />

        <div style={{
          backgroundColor: 'rgba(28, 31, 38, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '50px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          zIndex: 1,
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>Join TradeX</h1>
            <p style={{ color: 'var(--tv-text-muted)', fontSize: '16px', margin: 0 }}>Start analyzing the market like a pro.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div style={{ position: 'relative' }}>
              <User size={20} style={iconStyle} />
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                value={formData.fullName}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--tv-blue)'; e.target.style.backgroundColor = 'rgba(28, 31, 38, 0.9)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.backgroundColor = 'rgba(28, 31, 38, 0.6)'; }}
                required
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Mail size={20} style={iconStyle} />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--tv-blue)'; e.target.style.backgroundColor = 'rgba(28, 31, 38, 0.9)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.backgroundColor = 'rgba(28, 31, 38, 0.6)'; }}
                required
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={20} style={iconStyle} />
              <input 
                type="password" 
                name="password"
                placeholder="Create Password" 
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--tv-blue)'; e.target.style.backgroundColor = 'rgba(28, 31, 38, 0.9)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.backgroundColor = 'rgba(28, 31, 38, 0.6)'; }}
                required
              />
            </div>

            <button 
              type="submit"
              style={{
                backgroundColor: 'var(--tv-blue)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginTop: '10px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(30, 75, 216, 0.4)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 75, 216, 0.6)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 75, 216, 0.4)'; }}
            >
              Create Account
              <ArrowRight size={20} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ color: 'var(--tv-text-muted)', fontSize: '14px' }}>
              Already have an account? <Link to="/" style={{ color: 'var(--tv-blue)', textDecoration: 'none', fontWeight: 'bold' }}>Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
