import { makeAutoObservable } from 'mobx';
import { genresApi } from '@/shared/api/genresApi';
import type { Genre } from '@/shared/types';
import type { SettingsStore } from './SettingsStore';

export class GenresStore {
    items: Genre[] = [];

    private settings: SettingsStore;

    constructor(settings: SettingsStore) {
        this.settings = settings;
        
        makeAutoObservable(this);
    }

    async fetchAll(): Promise < void > {
        this.settings.setLoading(true, 'Загрузка жанров...');
        try {
            const res = await genresApi.getAll();

            this.items = res.data;
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка загрузки жанров');
        } finally {
            this.settings.setLoading(false);
        }
    }

    async add(genre: Omit < Genre, 'id' > ): Promise < void > {
        this.settings.setLoading(true, 'Добавление жанра...');
        try {
            const res = await genresApi.create(genre);

            this.items.push(res.data);
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка добавления жанра');
        } finally {
            this.settings.setLoading(false);
        }
    }

    async remove(id: number): Promise < void > {
        this.settings.setLoading(true, 'Удаление жанра...');
        try {
            await genresApi.delete(id);

            this.items = this.items.filter(g => g.id !== id);
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка удаления жанра');
        } finally {
            this.settings.setLoading(false);
        }
    }
}
