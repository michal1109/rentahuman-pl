import React, { useState } from 'react';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) setMessage(`Błąd: ${error.message}`);
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(`Błąd: ${error.message}`);
      else { setMessage('Zalogowano!'); setTimeout(onClose, 1000); }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(`Błąd: ${error.message}`);
      else setMessage('Sprawdź email, aby potwierdzić konto!');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      background: 'rgba(0,0,0,0.8)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div className="glass" style={{ 
        padding: '3rem', 
        maxWidth: '450px', 
        width: '90%',
        position: 'relative',
        borderRadius: '24px'
      }}>
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            background: 'transparent', 
            border: 'none', 
            color: '#fff', 
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >×</button>
        
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
        </h2>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn btn-secondary"
          style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Kontynuuj z Google
        </button>

        <div style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--muted-color)' }}>lub</div>
        
        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              padding: '1rem', 
              borderRadius: '12px', 
              border: '1px solid var(--glass-border)', 
              background: 'rgba(255,255,255,0.02)',
              color: '#fff'
            }}
          />
          <input 
            type="password"
            placeholder="Hasło (min. 6 znaków)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ 
              padding: '1rem', 
              borderRadius: '12px', 
              border: '1px solid var(--glass-border)', 
              background: 'rgba(255,255,255,0.02)',
              color: '#fff'
            }}
          />
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
            {isLogin ? 'Zaloguj' : 'Zarejestruj'}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: '1rem', textAlign: 'center', color: message.includes('Błąd') ? '#ef4444' : '#10b981' }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--muted-color)', fontSize: '0.9rem' }}>
          {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}{' '}
          <button 
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
          </button>
        </p>
      </div>
    </div>
  );
};

export const UserMenu: React.FC<{ user: User }> = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setShowMenu(!showMenu)}
        className="btn btn-secondary"
        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
      >
        {user.email?.split('@')[0] || 'Użytkownik'}
      </button>
      {showMenu && (
        <div className="glass" style={{ 
          position: 'absolute', 
          top: '110%', 
          right: 0, 
          padding: '1rem', 
          minWidth: '200px',
          borderRadius: '12px'
        }}>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted-color)' }}>{user.email}</p>
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#ef4444', 
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
};
