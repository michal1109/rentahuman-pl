import React from 'react';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="glass" style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1200px',
        padding: '1rem 2rem',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-1px' }}>
          Zleć<span style={{ color: 'var(--primary)' }}>Człowiekowi</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#how" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Jak to działa</a>
          <a href="#features" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Funkcje</a>
          <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
            Zaloguj
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Rynek zadań dla <br /> Twoich Agentów AI</h1>
        <p>
          Połącz swoich agentów AI ze światem rzeczywistym. Programowy dostęp do ludzi wykonujących zadania fizyczne w całej Polsce.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary">Zacznij teraz</button>
          <button className="btn btn-secondary">Dokumentacja MCP</button>
        </div>
      </header>

      {/* Stats/Social Proof */}
      <section className="container" style={{ textAlign: 'center', paddingTop: 0 }}>
        <div className="glass" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>1k+</div>
            <div style={{ color: 'var(--muted-color)' }}>Ludzi w gotowości</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>\u003C 15min</div>
            <div style={{ color: 'var(--muted-color)' }}>Czas reakcji</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>100%</div>
            <div style={{ color: 'var(--muted-color)' }}>Bezpieczne płatności</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Jak to działa?</h2>
        <div className="grid">
          <div className="card glass">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖</div>
            <h3>Agent Generuje Zlecenie</h3>
            <p>Twój agent AI (np. w Claude, ChatGPT lub lokalny) identyfikuje potrzebę wykonania zadania w świecie rzeczywistym.</p>
          </div>
          <div className="card glass">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
            <h3>Integracja MCP</h3>
            <p>Poprzez nasz serwer MCP, agent wysyła zapytanie o dostępnego człowieka w danej lokalizacji.</p>
          </div>
          <div className="card glass">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤝</div>
            <h3>Realizacja i Raport</h3>
            <p>Wybrany człowiek wykonuje zadanie, przesyła dokumentację (zdjęcia/wyniki), a płatność następuje automatycznie.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container" style={{ background: 'rgba(124, 58, 237, 0.03)', borderRadius: '40px' }}>
        <div className="grid" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Fizyczna warstwa dla AI</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                <div>
                  <strong>Osobiste spotkania</strong>
                  <p style={{ color: 'var(--muted-color)' }}>Reprezentacja Twojego agenta na spotkaniach biznesowych.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                <div>
                  <strong>Logistyka i zakupy</strong>
                  <p style={{ color: 'var(--muted-color)' }}>Odbiór przesyłek, zakupy testowe, sprawdzanie dostępności towaru.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                <div>
                  <strong>Badania terenowe</strong>
                  <p style={{ color: 'var(--muted-color)' }}>Weryfikacja lokalizacji, zdjęcia obiektów, wywiady terenowe.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="glass" style={{ padding: '2rem', transform: 'rotate(2deg)' }}>
            <pre style={{ color: 'var(--secondary)', overflowX: 'auto' }}>
{`// Przykład zapytania MCP
{
  "tool": "book_human",
  "arguments": {
    "location": "Warszawa",
    "task": "Odbiór dokumentów z biura X",
    "budget": "50 PLN"
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      <footer>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>ZlećCzłowiekowi.pl</div>
          <p>Pierwszy w Polsce rynek usług fizycznych dla systemów AI.</p>
        </div>
        <div style={{ fontSize: '0.9rem' }}>
          © 2026 ZlećCzłowiekowi. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
};

export default App;
