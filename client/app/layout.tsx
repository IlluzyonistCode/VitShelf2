import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { StoreProvider } from '@/shared/store/StoreContext';
import { CommonWrapper } from '@/features/auth/CommonWrapper';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL('http://localhost:3000'),
    title: { default: 'BookShelf — Ваша личная библиотека', template: '%s | BookShelf' },
    description: 'Ведите коллекцию книг, отслеживайте прогресс чтения и управляйте своей личной библиотекой.',
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
    manifest: '/site.webmanifest',
    openGraph: {
        type: 'website',
        url: 'http://localhost:3000',
        siteName: 'BookShelf',
        title: 'BookShelf — Ваша личная библиотека',
        description: 'Ведите коллекцию книг, отслеживайте прогресс чтения и управляйте своей личной библиотекой.',
        images: [{ url: 'http://localhost:3000/og-image.png', width: 1200, height: 630, alt: 'BookShelf' }]
    },
    twitter: { card: 'summary_large_image', title: 'BookShelf', description: 'Ваша личная библиотека' }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <CommonWrapper>{children}</CommonWrapper>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
    );
}
