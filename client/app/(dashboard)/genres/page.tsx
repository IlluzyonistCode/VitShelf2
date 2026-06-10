import type { Metadata } from 'next';
import { GenresView } from '@/features/genres/GenresView';

export const metadata: Metadata = { title: 'Жанры' };

export default function GenresPage() { return <GenresView />; }
