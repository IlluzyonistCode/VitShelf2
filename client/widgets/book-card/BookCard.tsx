'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import type { Book } from '@/shared/types';
import { ratingToStars, statusColor } from '@/shared/utils/formatters';
import Button from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';

interface Props {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: Book['status']) => void;
}

const BookCard: React.FC < Props > = observer(({ book, onEdit, onDelete, onStatusChange }) => {
            const t = useTranslations('books');

            const statusLabels: Record < string, string> = {
    read: t('statusRead2'), reading: t('statusReading2'), wishlist: t('statusWishlist')
  };

  return (
    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column',
      gap: 10, transition: 'border-color 0.2s, transform 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ color: 'var(--fg)', margin: 0, fontSize: '1rem', fontFamily: 'Georgia, serif' }}>{book.title}</h3>
          <p style={{ color: 'var(--fg3)', margin: '4px 0 0', fontSize: '0.85rem' }}>{book.author}</p>
        </div>
        <span style={{ background: statusColor[book.status] + '30', color: statusColor[book.status],
          border: `1px solid ${statusColor[book.status]}60`, borderRadius: 20,
          padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600,
          whiteSpace: 'nowrap', marginLeft: 8 }}>
          {statusLabels[book.status]}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--fg5)', fontSize: '0.8rem' }}>📖 {book.genre}</span>
        <span style={{ color: 'var(--fg5)', fontSize: '0.8rem' }}>📅 {book.year}</span>
        <span style={{ color: 'var(--fg5)', fontSize: '0.8rem' }}>📄 {book.pages} стр.</span>
      </div>
      {book.status === 'read' && book.rating > 0 && (
        <div style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{ratingToStars(book.rating)}</div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
        {book.status !== 'read' && (
          <Button variant='ghost' style={{ fontSize: '0.8rem', padding: '5px 10px' }}
            onClick={() => onStatusChange(book.id, 'read')} title={t('markRead')}>
            {t('markRead')}
          </Button>
        )}
        {book.status !== 'reading' && (
          <Button variant='ghost' style={{ fontSize: '0.8rem', padding: '5px 10px' }}
            onClick={() => onStatusChange(book.id, 'reading')} title={t('markReading')}>
            {t('markReading')}
          </Button>
        )}
        <Button variant='secondary' style={{ fontSize: '0.8rem', padding: '5px 10px' }}
          onClick={() => onEdit(book)} title={t('statusRead2')}>
          ✎ {t('statusRead2')}
        </Button>
        <Button variant='danger' style={{ fontSize: '0.8rem', padding: '5px 10px' }}
          onClick={() => onDelete(book.id)} title='Удалить'>
          🗑
        </Button>
      </div>
    </div>
  );
});

export default BookCard;
