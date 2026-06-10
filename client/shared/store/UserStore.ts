import { makeAutoObservable } from 'mobx';
import { storage } from '@/shared/utils/storage';
import { authApi } from '@/shared/api/authApi';
import { usersApi } from '@/shared/api/usersApi';
import type { User } from '@/shared/types';
import type { SettingsStore } from './SettingsStore';

export class UserStore {
    currentUser: User | null = storage.get < User > ('user');
    isAuthenticated: boolean = !!storage.get < string > ('token');
    theme: 'light' | 'dark' = (storage.get < string > ('theme') as 'light' | 'dark') ?? 'dark';

    private settings: SettingsStore;

    constructor(settings: SettingsStore) {
        this.settings = settings;

        makeAutoObservable(this);
    }

    async login(email: string, password: string): Promise < void > {
        this.settings.setLoading(true, 'Вход...');
        try {
            const res = await authApi.login(email, password);

            this.currentUser = res.data.user;
            this.isAuthenticated = true;

            storage.set('token', res.data.token);
            storage.set('user', res.data.user);
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка входа');
            
            throw err;
        } finally {
            this.settings.setLoading(false);
        }
    }

    async register(name: string, email: string, password: string): Promise < void > {
        this.settings.setLoading(true, 'Регистрация...');
        try {
            const res = await authApi.register(name, email, password);

            this.currentUser = res.data.user;
            this.isAuthenticated = true;

            storage.set('token', res.data.token);
            storage.set('user', res.data.user);
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка регистрации');

            throw err;
        } finally {
            this.settings.setLoading(false);
        }
    }

    async updateProfile(id: number, data: Partial < User & { password: string } > ): Promise < void > {
        this.settings.setLoading(true, 'Сохранение...');
        try {
            const res = await usersApi.patch(id, data);

            this.currentUser = res.data;

            storage.set('user', res.data);
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка обновления');

            throw err;
        } finally {
            this.settings.setLoading(false);
        }
    }

    logout(): void {
        this.currentUser = null;
        this.isAuthenticated = false;

        storage.remove('token');
        storage.remove('user');
    }

    toggleTheme(): void {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';

        storage.set('theme', this.theme);
    }
}
