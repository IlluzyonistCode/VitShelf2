import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: ['/', '/login', '/register'], disallow: ['/books', '/wishlist', '/genres', '/stats', '/profile'] }
        ],
        sitemap: 'http://localhost:3000/sitemap.xml'
    };
}
