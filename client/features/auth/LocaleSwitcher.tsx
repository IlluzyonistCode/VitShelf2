'use client';

import React from 'react';

export const LocaleSwitcher: React.FC = () => {
    const switchLocale = (locale: string) => {
        document.cookie = `locale=${locale};path=/;max-age=31536000`;
        window.location.reload();
    };

    return (
        <div style={{ display: 'flex', gap: 6 }}>
      {(['ru', 'en'] as const).map(l => (
        <button key={l} onClick={() => switchLocale(l)}
          style={{ background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--accent)', borderRadius: 6, padding: '4px 10px',
            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
          {l}
        </button>
      ))}
    </div>
    );
};
