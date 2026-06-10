'use client';

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/store/StoreContext';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import Modal from '@/shared/ui/Modal';

export const CommonWrapper: React.FC<{ children: React.ReactNode }> = observer(({ children }) => {
    const { settings, user } = useStore();

    useEffect(() => {
        document.body.classList.toggle('light', user.theme === 'light');
    }, [user.theme]);

    return (
        <>
            {settings.isLoading && <LoadingSpinner message={settings.loadingMessage} />}
            {settings.showErrorModal && (
                <Modal
                    title='Ошибка'
                    message={settings.error ?? ''}
                    onClose={() => settings.closeErrorModal()}
                    isError
                />
            )}
            {children}
        </>
    );
});
