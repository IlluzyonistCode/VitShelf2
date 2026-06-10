'use client';

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import type { Book } from '@/shared/types';
import BookCard from '@/widgets/book-card/BookCard';
import { useTranslations } from 'next-intl';

export const WishlistView: React.FC = observer(() => {
    const { books } = useStore();
    const t = useTranslations('wishlist');

    useEffect(() => { if (books.items.length === 0) books.fetchAll(); }, [books]);

    const wishlist = books.items.filter(b => b.status === 'wishlist');

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', margin: 0 }}>{t('title')}</h1>
        <p style={{ color: 'var(--fg4)', margin: '4px 0 0', fontSize: '0.9rem' }}>
          {wishlist.length} {t('count')}
        </p>
      </div>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--fg5)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔖</div>
          <p style={{ fontSize: '1.1rem' }}>{t('empty')}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 20 }}>
          {wishlist.map(book => (
            <BookCard key={book.id} book={book}
              onEdit={() => {}}
              onDelete={id => { if (window.confirm(t('confirmDelete'))) books.remove(id); }}
              onStatusChange={(id, status: Book['status']) => books.update(id, { status })} />
          ))}
        </div>
      )}
    </div>
    );
});
