'use client';

import React, { useState, useEffect } from 'react';
import type { Book, BookStatus } from '@/shared/types';
import Input from '@/shared/ui/Input';
import Select from '@/shared/ui/Select';
import Button from '@/shared/ui/Button';
import { useStore } from '@/shared/store/StoreContext';
import { observer } from 'mobx-react-lite';

interface Props {
    initial ? : Book | null;
    onSubmit: (data: Omit < Book, 'id' | 'user_id' | 'added_at' > ) => void;
    onClose: () => void;
    loading ? : boolean;
}

const empty = {
    title: '',
    author: '',
    genre: '',
    year: new Date().getFullYear(),
    pages: 0,
    status: 'wishlist'
    as BookStatus,
    rating: 0,
    description: '',
    cover: ''
};

const BookForm: React.FC < Props > = observer(({ initial, onSubmit, onClose, loading }) => {
    const { genres } = useStore();
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState < Partial < Record < keyof typeof empty, string >>> ({});

    useEffect(() => {
        setForm(initial ? {
            title: initial.title,
            author: initial.author,
            genre: initial.genre,
            year: initial.year,
            pages: initial.pages,
            status: initial.status,
            rating: initial.rating,
            description: initial.description,
            cover: initial.cover,
        } : empty);
        setErrors({});
    }, [initial]);

    const set = (key: keyof typeof empty) =>
        (e: React.ChangeEvent < HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > ) => {
            const val = ['year', 'pages', 'rating'].includes(key) ? Number(e.target.value) : e.target.value;

            setForm(prev => ({ ...prev, [key]: val }));
            setErrors(prev => ({ ...prev, [key]: undefined }));
        };

    const handleSubmit = () => {
        const errs: Partial < Record < keyof typeof empty, string >> = {};

        if (!form.title.trim()) errs.title = 'Обязательное поле';
        if (!form.author.trim()) errs.author = 'Обязательное поле';
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        onSubmit(form);
    };

    const genreOptions = [
        { value: '', label: '— Выберите жанр —' },
        ...genres.items.map(g => ({ value: g.name, label: g.name }))
    ];
    const statusOptions = [
        { value: 'wishlist', label: '🔖 Хочу прочитать' },
        { value: 'reading', label: '▶ Читаю' },
        { value: 'read', label: '✓ Прочитано' }
    ];
    const ratingOptions = [
        { value: '0', label: 'Без оценки' },
        ...[1, 2, 3, 4, 5].map(n => ({ value: String(n), label: '★'.repeat(n) + '☆'.repeat(5 - n) }))
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, backdropFilter: 'blur(4px)' }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 14, padding: 32, width: '90%', maxWidth: 520,
        maxHeight: '92vh', overflowY: 'auto' }}>
        <h2 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif',
          margin: '0 0 24px', textAlign: 'center', fontSize: '1.4rem' }}>
          {initial ? '✎ Редактировать книгу' : '+ Добавить книгу'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label='Название *' value={form.title} onChange={set('title')} placeholder='Название книги' error={errors.title} />
          <Input label='Автор *' value={form.author} onChange={set('author')} placeholder='Имя автора' error={errors.author} />
          <Select label='Жанр' value={form.genre} onChange={set('genre')} options={genreOptions} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label='Год издания' type='number' value={form.year} onChange={set('year')} min='0' max='2030' />
            <Input label='Страниц' type='number' value={form.pages} onChange={set('pages')} min='0' />
          </div>
          <Select label='Статус' value={form.status} onChange={set('status')} options={statusOptions} />
          {form.status === 'read' && (
            <Select label='Оценка' value={String(form.rating)} onChange={set('rating')} options={ratingOptions} />
          )}
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--fg3)', fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              Описание
            </label>
            <textarea value={form.description} onChange={set('description')}
              placeholder='Краткое описание или заметки...'
              style={{ width: '100%', minHeight: 80, borderRadius: 8, padding: '10px 14px',
                fontSize: '0.95rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <Button onClick={handleSubmit} loading={loading} fullWidth>
              {initial ? 'Сохранить' : 'Добавить'}
            </Button>
            <Button variant='ghost' onClick={onClose} fullWidth>Отмена</Button>
          </div>
        </div>
      </div>
    </div>
    );
});

export default BookForm;
