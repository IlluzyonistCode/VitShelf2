'use client';

import React, { createContext, useContext } from 'react';
import { getRootStore, type RootStore } from './RootStore';

const StoreContext = createContext < RootStore | null > (null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const store = getRootStore();

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): RootStore {
    const ctx = useContext(StoreContext);

    if (!ctx) throw new Error('useStore must be used inside StoreProvider');
    
    return ctx;
}
