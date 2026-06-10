'use client';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32 }}>
      <p style={{ color: '#e57373', fontSize: '1.1rem' }}>Не удалось загрузить страницу входа.</p>
      <button onClick={reset} style={{ marginTop: 16, padding: '8px 20px',
        background: 'var(--accent)', border: 'none', borderRadius: 8,
        cursor: 'pointer', fontWeight: 600, color: 'var(--accent-dark)' }}>
        Повторить
      </button>
    </div>
    );
}
