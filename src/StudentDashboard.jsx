import React from 'react';
import { Home, Book, FileText, User as UserIcon, ChevronRight } from 'lucide-react';
import { InteractiveCard } from './components';
import { useUser } from './context';
import './theme.css';

export default function StudentDashboard() {
  const { user, logout } = useUser();

  const NavItem = ({ icon: Icon, label, active }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', cursor: 'pointer', flex: 1 }}>
      <Icon size={24} strokeWidth={active ? 2.5 : 1.5} />
      <span className="label-text" style={{ fontSize: '0.75rem', fontWeight: active ? '700' : '500' }}>{label}</span>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface)', fontFamily: 'var(--font-body)', position: 'relative', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)', padding: '3rem 2rem 6rem 2rem', borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
           <div>
             <h1 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-headline)' }}>Alex Xavier</h1>
             <p style={{ margin: '0.25rem 0 0 0', opacity: 0.8, fontSize: '0.875rem' }}>BE Mechanical Engineering</p>
           </div>
           <button onClick={logout} style={{ border: 'none', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer', fontFamily: 'var(--font-label)', fontSize: '0.75rem', fontWeight: 'bold' }}>Logout</button>
        </div>
        
        <h2 className="display-title" style={{ fontSize: '2.25rem', margin: 0, lineHeight: 1.1 }}>Welcome back, Scholar.</h2>
        <p style={{ marginTop: '0.5rem', opacity: 0.9, fontSize: '0.875rem', maxWidth: '280px' }}>
          Your academic trajectory is looking exceptional this semester.
        </p>
      </div>

      {/* KPI Cards (Floating over header) */}
      <div style={{ padding: '0 1.5rem', marginTop: '-4rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
         <InteractiveCard padding="1.25rem" style={{ minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <p className="label-text" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>Attendance</p>
            <p className="impact-label" style={{ margin: '0.5rem 0 0 0', fontSize: '1.75rem', color: 'var(--color-primary)' }}>85.4%</p>
         </InteractiveCard>
         <InteractiveCard padding="1.25rem" style={{ minWidth: '160px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <p className="label-text" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>Next Class <span style={{fontSize: '0.75rem', opacity: 0.7}}>• 10:30 AM</span></p>
            <p style={{ fontFamily: 'var(--font-headline)', margin: '0.5rem 0 0 0', fontSize: '1.125rem', color: 'var(--color-on-surface)', lineHeight: 1.2 }}>Engineering Graphics</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>Hall B2</p>
         </InteractiveCard>
         <InteractiveCard padding="1.25rem" style={{ backgroundColor: 'var(--color-primary)', minWidth: '140px', boxShadow: '0 8px 32px rgba(17,13,113,0.2)' }}>
            <p className="label-text" style={{ margin: 0, color: 'var(--color-on-primary)', opacity: 0.8 }}>Action Required</p>
            <p className="impact-label" style={{ margin: '0.5rem 0 0 0', fontSize: '2.25rem', color: 'var(--color-secondary-fixed-dim, #f9bd00)' }}>02</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-on-primary)', opacity: 0.9 }}>Pending submissions</p>
         </InteractiveCard>
      </div>

      {/* Academic Core List */}
      <div style={{ padding: '1rem 1.5rem', flex: 1 }}>
         <h3 className="display-title" style={{ fontSize: '1.25rem', color: 'var(--color-on-surface)', marginBottom: '1rem' }}>Academic Core</h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { subject: 'Thermodynamics', prof: 'Prof. M. S. Kumar' },
              { subject: 'Strength of Materials', prof: 'Dr. Arul John' },
              { subject: 'Kinematics', prof: 'Prof. R. Vijay' }
            ].map((item, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', border: '1px solid var(--color-surface-variant)', borderRadius: '1rem', backgroundColor: 'var(--color-surface-container-lowest)' }}>
                 <div>
                   <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-on-surface)', fontFamily: 'var(--font-headline)' }}>{item.subject}</h4>
                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>{item.prof}</p>
                 </div>
                 <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-surface-container-low)', borderRadius: '50%' }}>
                   <ChevronRight size={16} color="var(--color-outline)" />
                 </div>
               </div>
            ))}
         </div>
      </div>

      {/* Bottom Nav Bar */}
      <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-surface-variant)' }}>
         <NavItem icon={Home} label="Home" active={true} />
         <NavItem icon={Book} label="Academic" />
         <NavItem icon={FileText} label="Requests" />
         <NavItem icon={UserIcon} label="Profile" />
      </div>
    </div>
  );
}
