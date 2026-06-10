import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: 'http://localhost:3000', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        { url: 'http://localhost:3000/login', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
        { url: 'http://localhost:3000/register', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
        { url: 'http://localhost:3000/books', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: 'http://localhost:3000/wishlist', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: 'http://localhost:3000/genres', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: 'http://localhost:3000/stats', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: 'http://localhost:3000/profile', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 }
    ];
}
