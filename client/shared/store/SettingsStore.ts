import { makeAutoObservable } from 'mobx';

export class SettingsStore {
    isLoading = false;
    loadingMessage = 'Загрузка...';
    error: string | null = null;
    showErrorModal = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(loading: boolean, message = 'Загрузка...'): void {
        this.isLoading = loading;
        this.loadingMessage = message;
        if (loading) this.error = null;
    }

    setError(message: string): void {
        this.error = message;
        this.showErrorModal = true;
        this.isLoading = false;
    }

    closeErrorModal(): void {
        this.showErrorModal = false;
        this.error = null;
    }
}
