export const setTokenCookie = (token: string): void => {
    if (typeof document !== 'undefined')
        document.cookie = `token=${token};path=/;max-age=604800;SameSite=Lax`;
};

export const removeTokenCookie = (): void => {
    if (typeof document !== 'undefined')
        document.cookie = 'token=;path=/;max-age=0';
};
