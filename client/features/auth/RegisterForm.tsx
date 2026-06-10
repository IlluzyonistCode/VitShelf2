'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';

export const RegisterForm: React.FC = observer(() => {
    const { user, settings } = useStore();
    const router = useRouter();
    const t = useTranslations('auth');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password) return;

        try {
            await user.register(name, email, password);

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
            margin: '12px 0 4px', fontSize: '1.8rem' }}>{t('registerTitle')}</h2>
          <p style={{ color: 'var(--fg4)', margin: 0 }}>{t('registerSubtitle')}</p>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input label={t('name')} id='name' value={name}
            onChange={e => setName(e.target.value)} placeholder='Ваше имя' />
          <Input label={t('email')} id='email' type='email' value={email}
            onChange={e => setEmail(e.target.value)} placeholder='you@example.com' />
          <Input label={t('password')} id='password' type='password' value={password}
            onChange={e => setPassword(e.target.value)} placeholder={t('passwordHint')} />
          <Button fullWidth loading={settings.isLoading} onClick={handleRegister}>
            {t('registerBtn')}
          </Button>
          <p style={{ textAlign: 'center', color: 'var(--fg4)', margin: 0, fontSize: '0.9rem' }}>
            {t('hasAccount')}{' '}
            <Link href='/login' style={{ color: 'var(--accent)' }}>{t('loginBtn')}</Link>
          </p>
        </div>
      </div>
    </div>
    );
});
