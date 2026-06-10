'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/features/auth/LocaleSwitcher';

const Navbar: React.FC = observer(() => {
    const { user, books } = useStore();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('nav');
    const tc = useTranslations('common');

    const handleLogout = () => {
        user.logout();
        books.clear();
        router.push('/');
    };

    const navLink = (href: string, label: string) => (
        <Link href={href} style={{
      color: pathname === href ? 'var(--accent)' : 'var(--fg4)',
      textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
      letterSpacing: '0.05em', transition: 'color 0.2s', textTransform: 'uppercase'
    }}>
      {label}
    </Link>
    );

    return (
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg)',
      backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)',
      padding: '0 32px', height: 60, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.25s' }}>
      <Link href='/' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.5rem' }}>📚</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700 }}>
          BookShelf
        </span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {user.isAuthenticated ? (
          <>
            {navLink('/books', t('library'))}
            {navLink('/wishlist', t('wishlist'))}
            {navLink('/genres', t('genres'))}
            {navLink('/stats', t('stats'))}
            {navLink('/profile', t('profile'))}
            <button onClick={handleLogout} title={tc('logout')}
              style={{ background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--accent)', borderRadius: 6, padding: '5px 14px',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              {tc('logout')}
            </button>
          </>
        ) : (
          <>
            {navLink('/login', t('login'))}
            {navLink('/register', t('register'))}
          </>
        )}
        <button onClick={() => user.toggleTheme()}
          title={user.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: '1.2rem', padding: 4 }}>
          {user.theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <LocaleSwitcher />
      </div>
    </nav>
    );
});

export default Navbar;
