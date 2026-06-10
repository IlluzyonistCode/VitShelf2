import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Script from 'next/script';

export async function generateMetadata(): Promise < Metadata > {
    const t = await getTranslations('landing');

    return {
        title: t('title'),
        description: t('subtitle'),
        openGraph: { title: t('title'), description: t('subtitle') }
    };
}

export default async function LandingPage() {
    const t = await getTranslations('landing');

    const schemaOrg = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'BookShelf',
        url: 'http://localhost:3000',
        description: t('subtitle'),
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' }
    };

    const features = [
        { icon: '📖', title: t('feature1Title'), desc: t('feature1Desc') },
        { icon: '⭐', title: t('feature2Title'), desc: t('feature2Desc') },
        { icon: '📊', title: t('feature3Title'), desc: t('feature3Desc') },
        { icon: '🏷️', title: t('feature4Title'), desc: t('feature4Desc') }
    ];

    return ( <
        >
        <Script id='schema-org' type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} /> <
        div style = { { minHeight: '100vh' } } >
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', marginBottom: 24, filter: 'drop-shadow(0 0 40px rgba(200,169,110,0.4))' }}>📚</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem,5vw,4rem)',
            color: 'var(--accent)', margin: '0 0 16px', lineHeight: 1.2 }}>
            {t('title')}
          </h1>
          <p style={{ color: 'var(--fg4)', fontSize: '1.2rem', maxWidth: 560,
            margin: '0 auto 40px', lineHeight: 1.7 }}>
            {t('subtitle')}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href='/register' style={{ background: 'var(--accent)', color: 'var(--accent-dark)',
              padding: '14px 36px', borderRadius: 8, textDecoration: 'none',
              fontWeight: 700, fontSize: '1rem' }}>
              {t('cta')}
            </Link>
            <Link href='/login' style={{ background: 'transparent', color: 'var(--accent)',
              padding: '14px 36px', borderRadius: 8, textDecoration: 'none',
              fontWeight: 700, fontSize: '1rem', border: '1px solid var(--border)' }}>
              {t('ctaLogin')}
            </Link>
          </div>
        </section> <
        section style = {
            {
                maxWidth: 960,
                margin: '0 auto',
                padding: '0 32px 80px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 24
            }
        } > {
            features.map(f => (
                <div key={f.title} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ color: 'var(--fg4)', margin: 0, lineHeight: 1.6, fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
            ))
        } <
        /section> <
        /div> <
        />
    );
}
