import { AuthWrapper } from '@/features/auth/AuthWrapper';
import Navbar from '@/widgets/navbar/Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return ( <
        >
        <Navbar /> <
        AuthWrapper guestOnly > { children } < /AuthWrapper> <
        />
    );
}
