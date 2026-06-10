'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import type { Book } from '@/shared/types';
import BookCard from '@/widgets/book-card/BookCard';
import BookForm from '@/widgets/book-form/BookForm';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useTranslations } from 'next-intl';

export const BooksView: React.FC = observer(() => {
    const { books, genres, settings } = useStore();
    const t = useTranslations('books');
    const [showForm, setShowForm] = useState(false);
    const [editBook, setEditBook] = useState < Book | null > (null);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState < 'all' | 'read' | 'reading' > ('all');
    const [filterGenre, setFilterGenre] = useState('');

    useEffect(() => { books.fetchAll();
        genres.fetchAll(); }, [books, genres]);

    const handleAdd = async (data: Omit < Book, 'id' | 'user_id' | 'added_at' > ) => {
        await books.add(data);

        setShowForm(false);
    };
    const handleEdit = async (data: Omit < Book, 'id' | 'user_id' | 'added_at' > ) => {
        if (editBook) await books.update(editBook.id, data);
        
        setEditBook(null);
    };
    const handleDelete = (id: number) => {
        if (window.confirm(t('confirmDelete'))) books.remove(id);
    };

    const visible = books.items
        .filter(b => b.status !== 'wishlist')
        .filter(b => filterStatus === 'all' || b.status === filterStatus)
        .filter(b => !filterGenre || b.genre === filterGenre)
        .filter(b => !search ||
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', margin: 0 }}>{t('title')}</h1>
          <p style={{ color: 'var(--fg4)', margin: '4px 0 0', fontSize: '0.9rem' }}>
            {books.items.filter(b => b.status !== 'wishlist').length} книг
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} title={t('addBook')}>{t('addBook')}</Button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('searchPlaceholder')} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['all', 'reading', 'read'] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              title={s === 'all' ? t('statusAll') : s === 'reading' ? t('statusReading') : t('statusRead')}
              style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid var(--border)',
                background: filterStatus === s ? 'var(--accent)' : 'transparent',
                color: filterStatus === s ? 'var(--accent-dark)' : 'var(--accent)',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              {s === 'all' ? t('statusAll') : s === 'reading' ? t('statusReading') : t('statusRead')}
            </button>
          ))}
        </div>
        <select value={filterGenre} onChange={e => setFilterGenre(e.target.value)}
          style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px',
            fontSize: '0.9rem', fontFamily: 'inherit', cursor: 'pointer' }}>
          <option value=''>{t('filterGenre')}</option>
          {genres.items.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
        </select>
      </div>

      {visible.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--fg5)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>📭</div>
          <p style={{ fontSize: '1.1rem' }}>{books.items.length === 0 ? t('empty') : t('emptyFilter')}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 20 }}>
          {visible.map(book => (
            <BookCard key={book.id} book={book}
              onEdit={b => setEditBook(b)}
              onDelete={handleDelete}
              onStatusChange={(id, status) => books.update(id, { status })} />
          ))}
        </div>
      )}

      {(showForm || editBook) && (
        <BookForm initial={editBook} onSubmit={editBook ? handleEdit : handleAdd}
          onClose={() => { setShowForm(false); setEditBook(null); }}
          loading={settings.isLoading} />
      )}
    </div>
    );
});
