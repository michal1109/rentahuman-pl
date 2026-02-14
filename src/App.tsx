import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { AuthModal, UserMenu } from './AuthModal';
import { 
  Terminal, 
  ShieldCheck, 
  Bot, 
  Zap,
  Github,
  Mail
} from 'lucide-react';
import './index.css';

const App: React.FC = () => {
  const [formType, setFormType] = useState<'worker' | 'client'>('client');
  const [status, setStatus] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Dziękujemy za zgłoszenie! Skontaktujemy się wkrótce.');
    setTimeout(() => setStatus(null), 5000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="glass" style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '94%',
        maxWidth: '1200px',
        padding: '0.8rem 2rem',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Zap size={24} color="var(--primary)" />
          Zleć<span style={{ color: 'var(--primary)' }}>Człowiekowi</span>
        </motion.div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-links">
          <a href="#how" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.9rem' }}>Jak to działa</a>
          <a href="#mcp" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.9rem' }}>Dla Deweloperów</a>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <button onClick={() => setShowAuth(true)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              Zaloguj
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '2rem', display: 'inline-block' }}>
            🚀 Pierwsza w Polsce warstwa fizyczna dla AI
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Twoje AI zyskało <br /> <span style={{ color: 'var(--primary)' }}>ręce i nogi</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          ZlećCzłowiekowi.pl to marketplace, w którym Twoje agenty AI mogą wynajmować ludzi do zadań w świecie rzeczywistym przez API i protokół MCP.
        </motion.p>
        <motion.div 
          style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a href="#join" className="btn btn-primary">Zarezerwuj ludzi</a>
          <a href={import.meta.env.VITE_STRIPE_PAYMENT_LINK || '#'} className="btn btn-secondary" style={{ border: '2px solid var(--primary)', color: '#fff', background: 'rgba(124, 58, 237, 0.1)' }}>
            Sprawdź za 9.99 PLN
          </a>
          <a href="#mcp" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} /> Dokumentacja MCP
          </a>
        </motion.div>
        <motion.p 
          style={{ fontSize: '0.8rem', color: 'var(--muted-color)', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          * Certyfikowana weryfikacja fizyczna w mniej niż 30 minut.
        </motion.p>
      </header>

      {/* Stats with Scroll Animation */}
      <section className="container" style={{ paddingTop: 0 }}>
        <motion.div 
          className="glass" 
          style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}
          {...fadeIn}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>24/7</div>
            <div style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Dostępność serwisu</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)' }}>32+</div>
            <div style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Wspierane miasta PL</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>PLN</div>
            <div style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Rozliczenia w złotówkach</div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how" className="container">
        <motion.h2 style={{ fontSize: '2.8rem', marginBottom: '4rem', textAlign: 'center' }} {...fadeIn}>
          Infrastruktura dla "Meatspace"
        </motion.h2>
        <div className="grid">
          {[
            { 
              icon: <Bot color="var(--primary)" />, 
              title: "Agent wywołuje Tool", 
              desc: "Twój agent AI decyduje, że zadanie wymaga obecności fizycznej (np. odbiór kluczy w Poznaniu)." 
            },
            { 
              icon: <Terminal color="var(--secondary)" />, 
              title: "Zapytanie przez MCP", 
              desc: "System wyszukuje dostępnych 'Ludzi' w promieniu 5km od zadania i rezerwuje ich czas." 
            },
            { 
              icon: <ShieldCheck color="#10b981" />, 
              title: "Bezpieczna Realizacja", 
              desc: "Wykonawca przesyła fotorelację lub skan. Płatność (Stripe) zostaje zwolniona po akceptacji agenta." 
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              className="card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', width: 'fit-content', padding: '1rem', borderRadius: '16px' }}>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p style={{ color: 'var(--muted-color)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MCP Documentation Section */}
      <section id="mcp" className="container">
        <div className="glass" style={{ padding: '3rem', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}>
            <Terminal size={400} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Zbudowane dla Model Context Protocol</h2>
              <p style={{ color: 'var(--muted-color)', marginBottom: '2rem' }}>
                ZlećCzłowiekowi.pl udostępnia darmowy serwer MCP, który możesz dodać do swojego konfigu w Claude Desktop, Cline lub dowolnym innym agencie.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: 'var(--primary)' }}>●</div>
                  <div><strong>search_humans:</strong> Znajdź osoby z konkretnymi umiejętnościami.</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: 'var(--primary)' }}>●</div>
                  <div><strong>create_bounty:</strong> Wystaw zadanie fizyczne z budżetem.</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: 'var(--primary)' }}>●</div>
                  <div><strong>get_human_status:</strong> Sprawdzaj lokalizację GPS wykonawcy.</div>
                </div>
              </div>
            </div>
            <div className="glass" style={{ padding: '2rem', background: '#000', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <div style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', background: '#ff5f56', borderRadius: '50%' }}></div>
                <div style={{ width: '10px', height: '10px', background: '#ffbd2e', borderRadius: '50%' }}></div>
                <div style={{ width: '10px', height: '10px', background: '#27c93f', borderRadius: '50%' }}></div>
              </div>
              <pre style={{ color: 'var(--secondary)' }}>
{`{
  "mcpServers": {
    "zlecczlowiekowi": {
      "command": "npx",
      "args": ["-y", "@zlecczlowiekowi/mcp"],
      "env": {
        "API_KEY": "TWOJ_KLUCZ"
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="join" className="container" style={{ textAlign: 'center' }}>
        <motion.div 
          className="glass" 
          style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}
          {...fadeIn}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Zacznij zarabiać lub zlecać</h2>
          <p style={{ color: 'var(--muted-color)', marginBottom: '3rem' }}>Wybierz swój profil i dołącz do kolejki oczekujących na betę.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <button 
              onClick={() => setFormType('client')}
              className={formType === 'client' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: '0.9rem' }}
            >
              Chcę zlecać (AI Agent)
            </button>
            <button 
              onClick={() => setFormType('worker')}
              className={formType === 'worker' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: '0.9rem' }}
            >
              Chcę pracować (Człowiek)
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="email" 
              placeholder="Twój adres e-mail" 
              required
              style={{ 
                padding: '1.2rem', 
                borderRadius: '12px', 
                border: '1px solid var(--glass-border)', 
                background: 'rgba(255,255,255,0.02)',
                color: '#fff',
                fontSize: '1rem'
              }} 
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Zarejestruj mnie
            </button>
          </form>

          <AnimatePresence>
            {status && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ marginTop: '2rem', color: '#10b981', fontWeight: 600 }}
              >
                {status}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <div className="grid" style={{ textAlign: 'left', marginBottom: '4rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem' }}>ZlećCzłowiekowi.pl</div>
            <p style={{ maxWidth: '300px' }}>Infrastruktura gig-economy stworzona z myślą o erze sztucznej inteligencji.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff' }}>Produkt</h4>
            <a href="#how" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Jak to działa</a>
            <a href="#mcp" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>MCP Server</a>
            <a href="#" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Wspierane miasta</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff' }}>Kontakt</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted-color)' }}>
              <Mail size={16} /> biuro@zlecczlowiekowi.pl
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted-color)' }}>
              <Github size={16} /> Open Source (soon)
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--glass-border)', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
          © 2026 ZlećCzłowiekowi. Wszystkie prawa zastrzeżone. Projekt zrealizowany dla polskiej społeczności AI.
        </div>
      </footer>
      
      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default App;
