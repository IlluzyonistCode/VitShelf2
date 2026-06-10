import Link from 'next/link';

export default function NotFound() {
    return <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--fg4)' }}>
    Страница не найдена. <Link href='/wishlist' style={{ color: 'var(--accent)' }}>← Назад</Link>
  </div>;
}
