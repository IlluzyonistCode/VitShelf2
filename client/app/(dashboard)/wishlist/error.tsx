'use client';

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div style={{ padding: '60px 24px', textAlign: 'center' }}>
      <p style={{ color: '#e57373' }}>Не удалось загрузить вишлист.</p>
      <button onClick={reset} style={{ marginTop: 16, padding: '8px 20px',
        background: 'var(--accent)', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
        Повторить
      </button>
    </div>
    );
}
