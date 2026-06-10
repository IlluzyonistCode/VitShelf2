import type { Metadata } from 'next';
import { StatsView } from '@/features/stats/StatsView';

export const metadata: Metadata = { title: 'Статистика' };

export default function StatsPage() { return <StatsView />; }
