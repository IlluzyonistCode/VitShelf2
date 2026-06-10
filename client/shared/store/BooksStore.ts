import { makeAutoObservable } from 'mobx';
import { booksApi } from '@/shared/api/booksApi';
import type { Book, BookStatus } from '@/shared/types';
import type { SettingsStore } from './SettingsStore';

export class BooksStore {
    items: Book[] = [];
    currentBook: Book | null = null;

    private settings: SettingsStore;

    constructor(settings: SettingsStore) {
        this.settings = settings;

        makeAutoObservable(this);
    }

    async fetchAll(params ? : { status ? : string;genre ? : string;search ? : string }): Promise < void > {
        this.settings.setLoading(true, 'Загрузка книг...');

        try {
            const res = await booksApi.getAll(params);

            this.items = res.data;
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка загрузки книг');
        } finally {
            this.settings.setLoading(false);
        }
    }

    async add(book: Omit < Book, 'id' | 'user_id' | 'added_at' > ): Promise < void > {
        this.settings.setLoading(true, 'Добавление книги...');

        try {
            const res = await booksApi.create(book);

            this.items.unshift(res.data);
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка добавления');
        } finally {
            this.settings.setLoading(false);
        }
    }

    async update(id: number, data: Partial < Book > ): Promise < void > {
        this.settings.setLoading(true, 'Сохранение...');

        try {
            const res = await booksApi.patch(id, data);
            const idx = this.items.findIndex(b => b.id === id);

            if (idx !== -1) this.items[idx] = res.data;

            if (this.currentBook ? .id === id) this.currentBook = res.data;
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка обновления');
        } finally {
            this.settings.setLoading(false);
        }
    }

    async remove(id: number): Promise < void > {
        this.settings.setLoading(true, 'Удаление...');
        try {
            await booksApi.delete(id);
            
            this.items = this.items.filter(b => b.id !== id);
        } catch (err: unknown) {
            this.settings.setError(err instanceof Error ? err.message : 'Ошибка удаления');
        } finally {
            this.settings.setLoading(false);
        }
    }

    clear(): void {
        this.items = [];
        this.currentBook = null;
    }

    getByStatus(status: BookStatus): Book[] {
        return this.items.filter(b => b.status === status);
    }
}
