'use client';

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useStore } from '@/shared/store/StoreContext';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';

export const ProfileView: React.FC = observer(() => {
    const { user, books, settings } = useStore();
    const router = useRouter();
    const t = useTranslations('profile');
    const ta = useTranslations('auth');
    const [name, setName] = useState(user.currentUser ? .name ?? '');
    const [password, setPassword] = useState('');
    const [saved, setSaved] = useState(false);

    if (!user.currentUser) return;

    const readCount = books.items.filter(b => b.status === 'read').length;
    const readingCount = books.items.filter(b => b.status === 'reading').length;
    const pagesRead = books.items.filter(b => b.status === 'read').reduce((s, b) => s + b.pages, 0);

    const handleSave = async () => {
        const data: { name ? : string;password ? : string } = {};

        if (name !== user.currentUser!.name) data.name = name;
        if (password.length >= 6) data.password = password;
        if (!Object.keys(data).length) return;

        await user.updateProfile(user.currentUser!.id, data);

        setSaved(true);
        setPassword('');

        setTimeout(() => setSaved(false), 2500);
    };

    const handleLogout = () => {
        user.logout();
        books.clear();
        router.push('/');
    };

    const stats = [
        { icon: '✅', label: t('read'), value: readCount },
        { icon: '📖', label: t('reading'), value: readingCount },
        { icon: '📚', label: t('total'), value: books.items.length },
        { icon: '📄', label: t('pages'), value: pagesRead.toLocaleString() }
    ];

    return (
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', marginBottom: 32 }}>{t('title')}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 36 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)',
            borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Georgia, serif' }}>{s.value}</div>
            <div style={{ color: 'var(--fg4)', fontSize: '0.82rem', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h2 style={{ color: 'var(--accent)', margin: 0, fontFamily: 'Georgia, serif' }}>{t('settings')}</h2>
        <Input label={ta('name')} value={name} onChange={e => setName(e.target.value)} />
        <Input label={ta('email')} value={user.currentUser.email} disabled style={{ opacity: 0.45 }} />
        <Input label={ta('newPassword')} type='password' value={password}
          onChange={e => setPassword(e.target.value)} placeholder={ta('passwordHint')} />
        <Input label={ta('registrationDate')} value={user.currentUser.created_at} disabled style={{ opacity: 0.45 }} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button onClick={handleSave} loading={settings.isLoading}>
            {saved ? ta('saved') : 'Сохранить'}
          </Button>
          <Button variant='danger' onClick={handleLogout} title={t('logoutBtn')}>{t('logoutBtn')}</Button>
        </div>
      </div>
    </div>
    );
});
