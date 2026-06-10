import { SettingsStore } from './SettingsStore';
import { UserStore } from './UserStore';
import { BooksStore } from './BooksStore';
import { GenresStore } from './GenresStore';

export class RootStore {
    settings: SettingsStore;
    user: UserStore;
    books: BooksStore;
    genres: GenresStore;

    constructor() {
        this.settings = new SettingsStore();
        this.user = new UserStore(this.settings);
        this.books = new BooksStore(this.settings);
        this.genres = new GenresStore(this.settings);
    }
}

let _store: RootStore | null = null;

export function getRootStore(): RootStore {
    if (!_store) _store = new RootStore();
    
    return _store;
}
