'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useStore } from '@/shared/store/StoreContext';

interface Props {
    children: React.ReactNode;
    guestOnly ? : boolean;
}

export const AuthWrapper: React.FC < Props > = observer(({ children, guestOnly = false }) => {
    const { user } = useStore();
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (guestOnly && user.isAuthenticated) router.replace('/books');
        
        else if (!guestOnly && !user.isAuthenticated) router.replace('/login');
        
        else setReady(true);
    }, [user.isAuthenticated, guestOnly, router]);

    if (!ready) return;
    
    return < > { children } < />;
});
