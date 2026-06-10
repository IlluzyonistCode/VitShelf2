import Navbar from '@/widgets/navbar/Navbar';
import { AuthWrapper } from '@/features/auth/AuthWrapper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return ( <
        >
        <Navbar /> <
        AuthWrapper > { children } < /AuthWrapper> <
        />
    );
}
