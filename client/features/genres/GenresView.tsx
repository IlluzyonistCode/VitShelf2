'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useTranslations } from 'next-intl';

const PRESET_COLORS = ['#c8a96e', '#4169E1', '#6A0DAD', '#8B0000', '#2F4F4F', '#3CB371', '#DC143C', '#DAA520', '#20B2AA', '#8B4513'];

export const GenresView: React.FC = observer(() => {
    const { genres, books } = useStore();
    const t = useTranslations('genres');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [color, setColor] = useState('#c8a96e');

    useEffect(() => { genres.fetchAll(); }, [genres]);

    const handleAdd = () => {
        if (!name.trim()) return;

        genres.add({ name: name.trim(), description: desc.trim(), color });

        setName('');
        setDesc('');
        setColor('#c8a96e');
    };

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', marginBottom: 32 }}>{t('title')}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
        {genres.items.map(g => {
          const count = books.items.filter(b => b.genre === g.name).length;
          
          return (
            <div key={g.id} style={{ background: 'var(--card-bg)', border: `1px solid ${g.color}50`,
              borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: g.color }} />
                  <span style={{ color: 'var(--fg)', fontWeight: 700 }}>{g.name}</span>
                </div>
                <span style={{ background: `${g.color}25`, color: g.color, borderRadius: 12,
                  padding: '2px 10px', fontSize: '0.78rem', fontWeight: 600 }}>
                  {count} {t('bookCount')}
                </span>
              </div>
              {g.description && <p style={{ color: 'var(--fg4)', fontSize: '0.85rem', margin: 0 }}>{g.description}</p>}
              <Button variant='danger' style={{ fontSize: '0.75rem', padding: '4px 10px', alignSelf: 'flex-end', marginTop: 4 }}
                onClick={() => genres.remove(g.id)} title='Удалить жанр'>
                Удалить
              </Button>
            </div>
          );
        })}
      </div>
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
        <h3 style={{ color: 'var(--accent)', margin: '0 0 18px', fontFamily: 'Georgia, serif' }}>{t('addTitle')}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label='Название' value={name} onChange={e => setName(e.target.value)} placeholder={t('namePlaceholder')} />
          <Input label='Описание' value={desc} onChange={e => setDesc(e.target.value)} placeholder={t('descPlaceholder')} />
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--fg3)', fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              {t('colorLabel')}
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PRESET_COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)} title={c}
                  style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: 'none',
                    cursor: 'pointer', outline: color === c ? `3px solid ${c}` : 'none', outlineOffset: 2 }} />
              ))}
            </div>
          </div>
          <Button onClick={handleAdd} style={{ alignSelf: 'flex-start' }}>{t('addTitle')}</Button>
        </div>
      </div>
    </div>
    );
});
