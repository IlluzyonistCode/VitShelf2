'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';

export const LoginForm: React.FC = observer(() => {
    const { user, settings } = useStore();
    const router = useRouter();
    const t = useTranslations('auth');
    const tc = useTranslations('common');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await user.login(email, password);
            
            router.push('/books');
        } catch {}
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 32 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: '3rem' }}>📚</span>
          <h2 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif',
            margin: '12px 0 4px', fontSize: '1.8rem' }}>{t('loginTitle')}</h2>
          <p style={{ color: 'var(--fg4)', margin: 0 }}>{t('loginSubtitle')}</p>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input label={t('email')} id='email' type='email' value={email}
            onChange={e => setEmail(e.target.value)} placeholder='you@example.com' />
          <Input label={t('password')} id='password' type='password' value={password}
            onChange={e => setPassword(e.target.value)} placeholder='••••••••'
            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <Button fullWidth loading={settings.isLoading} onClick={handleLogin}>
            {t('loginBtn')}
          </Button>
          <p style={{ textAlign: 'center', color: 'var(--fg4)', margin: 0, fontSize: '0.9rem' }}>
            {t('noAccount')}{' '}
            <Link href='/register' style={{ color: 'var(--accent)' }}>
              {t('registerBtn')}
            </Link>
          </p>
          <p style={{ textAlign: 'center', color: 'var(--fg5)', margin: 0, fontSize: '0.8rem' }}>
            {tc('demo')}
          </p>
        </div>
      </div>
    </div>
    );
});
