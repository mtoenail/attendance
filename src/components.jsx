import React, { useState } from 'react';
import { ChevronRight, ArrowRight, User } from 'lucide-react';
import './theme.css'; // Ensure theme is imported for CSS properties

/**
 * 1. Primary Button
 * Incorporates the gradient sheen, glass effect, and 1.5rem (xl) rounding.
 */
export const PrimaryButton = ({ children, icon: Icon = ChevronRight, onClick, ...props }) => {
  return (
    <button
      className="gradient-cta"
      style={{
        borderRadius: '1.5rem', // From "xl" rounding rule card/button rule
        padding: '0.75rem 1.75rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-body)',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 2px 0px rgba(0,0,0,0.1)', // Subtle 2px bottom "press" shadow
        transition: 'transform 0.1s ease, filter 0.2s ease',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(2px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onClick={onClick}
      {...props}
    >
      {children}
      {Icon && <Icon size={18} />}
    </button>
  );
};

/**
 * 2. Interactive Card
 * Uses tonal layering. Sits as surface-container-lowest. 
 * Expected to be placed on a surface-container-low background.
 */
export const InteractiveCard = ({ children, padding = '1.5rem', className = '', style = {}, ...props }) => {
  return (
    <div
      className={`elevation-float ${className}`}
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderRadius: '1.5rem', // xl rounding with no border
        padding: padding,
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * 3. Input Field
 * Removes borders, uses a 2px primary bottom-bar that animates on focus. 
 * Uses Manrope for the label.
 */
export const InputField = ({ label, id, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <label
        htmlFor={id}
        className="label-text" // Sets Manrope font via theme.css
        style={{
          color: 'var(--color-on-surface-variant)',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '0.25rem'
        }}
      >
        {label}
      </label>
      
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            backgroundColor: 'var(--color-surface-container-high)', // "Technical drafting" base
            border: 'none',
            outline: 'none',
            padding: '0.875rem 1rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-on-surface)',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            boxSizing: 'border-box'
          }}
          {...props}
        />
        {/* Animated 2px Bottom Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '2px',
            backgroundColor: 'var(--color-primary)',
            width: isFocused ? '100%' : '0%',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
};

/**
 * Showcase Demo Container
 * Use this to see how tonal layering looks in practice.
 */
export default function ComponentShowcase() {
  return (
    <div 
      style={{ 
        backgroundColor: 'var(--color-surface-container-low)', // The sectioning background
        minHeight: '100vh', 
        padding: '4rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <h2 
           className="display-title" 
           style={{ color: 'var(--color-on-background)', marginBottom: '2rem', textAlign: 'center' }}
        >
          Welcome Scholar
        </h2>
        
        <InteractiveCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
             <div style={{ 
               width: '48px', height: '48px', 
               backgroundColor: 'var(--color-primary-container)', 
               borderRadius: '50%', 
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               color: 'var(--color-on-primary-container)'
             }}>
                <User size={24} />
             </div>
             <div>
               <h3 className="impact-label" style={{ margin: 0, color: 'var(--color-on-surface)', fontSize: '1.25rem' }}>
                 Authentication
               </h3>
               <p style={{ margin: 0, color: 'var(--color-on-surface-variant)', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
                 Enter your credentials
               </p>
             </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <InputField label="University Email" id="email" type="email" placeholder="student@example.edu" />
            <InputField label="Secure Password" id="password" type="password" placeholder="••••••••" />
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton icon={ArrowRight}>
              Login securely
            </PrimaryButton>
          </div>
        </InteractiveCard>
      </div>
    </div>
  );
}
