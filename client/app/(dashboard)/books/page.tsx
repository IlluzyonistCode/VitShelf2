import type { Metadata } from 'next';
import { BooksView } from '@/features/books/BooksView';

export const metadata: Metadata = { title: 'Библиотека' };

export default function BooksPage() { return <BooksView />; }
