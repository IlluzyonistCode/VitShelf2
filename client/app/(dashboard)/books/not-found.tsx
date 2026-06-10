import Link from 'next/link';

export default function NotFound() {
    return <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--fg4)' }}>
    
    Книга не найдена. <Link href='/books' style={{ color: 'var(--accent)' }}>← Назад</Link>
  </div>;
}
