'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/shared/ui/Button';

export default function NotFound() {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32 }}>
      <div style={{ fontSize: '5rem', marginBottom: 16 }}>📕</div>
      <h1 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', fontSize: '4rem', margin: '0 0 8px' }}>404</h1>
      <h2 style={{ color: 'var(--fg3)', margin: '0 0 16px' }}>Страница не найдена</h2>
      <p style={{ color: 'var(--fg4)', maxWidth: 360, lineHeight: 1.7, marginBottom: 32 }}>
        Похоже, эта страница пропала, как закладка из книги. Вернитесь на главную.
      </p>
      <Link href='/'><Button>← На главную</Button></Link>
    </div>
    );
}
