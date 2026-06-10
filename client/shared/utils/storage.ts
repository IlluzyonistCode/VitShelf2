export const storage = {
        get: <T>(key: string): T | null => {
    try {
      if (typeof window === 'undefined') return;

      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : null;

    } catch { return; }
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  }
};
