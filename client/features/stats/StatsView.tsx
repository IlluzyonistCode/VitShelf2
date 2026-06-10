'use client';

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import { ratingToStars } from '@/shared/utils/formatters';
import { useTranslations } from 'next-intl';

export const StatsView: React.FC = observer(() => {
    const { books } = useStore();
    const t = useTranslations('stats');

    useEffect(() => { if (books.items.length === 0) books.fetchAll(); }, [books]);

    const readBooks = books.items.filter(b => b.status === 'read');
    const totalPages = readBooks.reduce((s, b) => s + b.pages, 0);
    const ratedBooks = readBooks.filter(b => b.rating > 0);
    const avgRating = ratedBooks.length ?
        (ratedBooks.reduce((s, b) => s + b.rating, 0) / ratedBooks.length).toFixed(1) : '—';

    const genreCounts: Record < string, number > = {};
    books.items.forEach(b => { if (b.genre) genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1; });
    const topGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const maxCount = topGenres[0] ? . [1] || 1;
    const topRated = [...readBooks].filter(b => b.rating > 0).sort((a, b) => b.rating - a.rating).slice(0, 5);

    const summary = [
        { icon: '✅', label: t('read'), value: readBooks.length },
        { icon: '📖', label: t('reading'), value: books.items.filter(b => b.status === 'reading').length },
        { icon: '🔖', label: t('wishlist'), value: books.items.filter(b => b.status === 'wishlist').length },
        { icon: '📄', label: t('pages'), value: totalPages.toLocaleString() },
        { icon: '⭐', label: t('avgRating'), value: avgRating },
        { icon: '📚', label: t('total'), value: books.items.length }
    ];

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', marginBottom: 32 }}>{t('title')}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 40 }}>
        {summary.map(s => (
          <div key={s.label} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)',
            borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: 'var(--accent)', fontSize: '1.6rem', fontWeight: 700, fontFamily: 'Georgia, serif' }}>{s.value}</div>
            <div style={{ color: 'var(--fg4)', fontSize: '0.82rem', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {topGenres.length > 0 && (
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: 'var(--accent)', margin: '0 0 20px', fontFamily: 'Georgia, serif' }}>{t('topGenres')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {topGenres.map(([genre, count]) => (
                <div key={genre}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ color: 'var(--fg2)', fontSize: '0.9rem', fontWeight: 600 }}>{genre}</span>
                    <span style={{ color: 'var(--fg4)', fontSize: '0.85rem' }}>{count}</span>
                  </div>
                  <div style={{ background: 'var(--border)', borderRadius: 4, height: 7 }}>
                    <div style={{ background: 'linear-gradient(90deg, var(--accent), #e8c98e)',
                      height: '100%', borderRadius: 4, width: `${(count / maxCount) * 100}%`, transition: 'width 0.6s' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {topRated.length > 0 && (
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: 'var(--accent)', margin: '0 0 20px', fontFamily: 'Georgia, serif' }}>{t('topRated')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {topRated.map((book, i) => (
                <div key={book.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--fg5)', fontWeight: 700, fontSize: '1.1rem', minWidth: 20 }}>#{i+1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: 'var(--fg)', fontSize: '0.9rem', fontWeight: 600,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                    <div style={{ color: 'var(--fg4)', fontSize: '0.8rem' }}>{book.author}</div>
                  </div>
                  <span style={{ color: 'var(--accent)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                    {ratingToStars(book.rating)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    );
});
