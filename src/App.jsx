import React, { useState } from 'react';
import { ArrowRight, BookOpen, GraduationCap, Shield } from 'lucide-react';
import './theme.css';
import { PrimaryButton, InteractiveCard, InputField } from './components';
import { UserProvider, useUser } from './context';

const Dashboard = () => {
  const { user, logout } = useUser();
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface)', padding: '4rem', color: 'var(--color-on-background)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'var(--font-body)' }}>
      <h1 className="display-title" style={{ fontSize: '2.5rem', margin: 0 }}>Welcome to your Dashboard</h1>
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-container-low)', borderRadius: '1rem', width: '100%', maxWidth: '600px' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: 'var(--color-primary)' }}>Active Session Details:</p>
        <p style={{ margin: '0' }}><strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{user.role}</span></p>
        <p style={{ margin: '0.5rem 0 0 0' }}><strong>Email:</strong> {user.email}</p>
      </div>
      <PrimaryButton onClick={logout} style={{ marginTop: '2rem' }}>Logout</PrimaryButton>
    </div>
  );
};

const LoginScreen = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleSignIn = () => {
    if (!email) {
      alert("Please enter an email to sign in.");
      return;
    }
    // Simulate navigation to dashboard by logging in (which changes global state)
    login({ role, email });
  };

  const RoleOption = ({ value, icon: Icon, label }) => {
    const isSelected = role === value;
    return (
      <button
        type="button"
        className="role-card"
        onClick={() => setRole(value)}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem',
          borderRadius: '1rem',
          backgroundColor: isSelected ? 'var(--color-primary-container)' : 'transparent',
          color: isSelected ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => {
          if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
        }}
        onMouseOut={(e) => {
          if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Icon size={24} />
        <span className="label-text" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{label}</span>
      </button>
    );
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box'
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          maxWidth: '1000px',
          width: '100%',
          gap: '3rem',
          alignItems: 'center'
        }}
      >
        <div style={{ flex: '1 1 300px', color: 'var(--color-on-surface)' }}>
          <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '1.5rem', fontWeight: '500' }}>
            Elevating <span className="impact-label" style={{ color: 'var(--color-primary)', fontWeight: 'normal' }}>Engineering</span> Excellence.
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, lineHeight: '1.6', fontFamily: 'var(--font-body)' }}>
            Join a community where traditional Jesuit values meet cutting-edge technical innovation. Access your personalized academic atelier.
          </p>
        </div>

        <div style={{ flex: '1 1 400px' }}>
          <InteractiveCard 
            padding="2.5rem"
            className="glass-panel"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '2rem', margin: 0, color: 'var(--color-on-surface)' }}>
                Welcome to LICET
              </h2>
              <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-on-surface-variant)', fontFamily: 'var(--font-body)' }}>
                Please select your role and sign in to access your dashboard.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
              <RoleOption value="student" icon={GraduationCap} label="Student" />
              <RoleOption value="teacher" icon={BookOpen} label="Teacher" />
              <RoleOption value="admin" icon={Shield} label="Admin" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <InputField 
                label={`${role.charAt(0).toUpperCase() + role.slice(1)} ID or Email`} 
                id="email" 
                type="text" 
                placeholder={`Enter your ID`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField 
                label="Secure Password" 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
              <a href="#" className="label-text" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600' }}>
                Forgot password?
              </a>
              <PrimaryButton icon={ArrowRight} onClick={handleSignIn}>
                Sign In
              </PrimaryButton>
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p className="label-text" style={{ color: 'var(--color-on-surface-variant)' }}>
                New to LICET? <a href="#" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>Request portal access</a>
              </p>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
};

// Root Component
const MainApp = () => {
  const { user } = useUser();
  // Simple mock navigation: Show Dashboard if logged in, else LoginScreen
  return user ? <Dashboard /> : <LoginScreen />;
};

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
