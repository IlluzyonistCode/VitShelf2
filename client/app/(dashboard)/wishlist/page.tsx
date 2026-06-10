import type { Metadata } from 'next';
import { WishlistView } from '@/features/books/WishlistView';

export const metadata: Metadata = { title: 'Вишлист' };

export default function WishlistPage() { return <WishlistView />; }
