import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/i18n.ts');

const nextConfig: NextConfig = {
    agentRules: false,
    reactCompiler: true,
    experimental: {
        turbopackFileSystemCacheForDev: true,
        optimizePackageImports: ['react-icons'],
    },
    reactStrictMode: true,
    output: 'standalone',
    serverExternalPackages: ['better-auth'],
    outputFileTracingIncludes: {
        '/api/staff/confirmations/*/preview': ['./email-templates/**/*'],
        '/api/staff/confirmations': ['./email-templates/**/*'],
        '/api/staff/confirmations/*/send': ['./email-templates/**/*'],
    },
    async headers() {
        return [
            {
                source: '/admin/:path*',
                headers: [
                    {key: 'Cache-Control', value: 'private, no-store'},
                    {key: 'X-Robots-Tag', value: 'noindex, nofollow'},
                    {key: 'Referrer-Policy', value: 'same-origin'},
                ],
            },
        ];
    },
    images: {
        qualities: [100],
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '1-files-biotech-dental-clt-cdn.secure4all.xyz',
                port: '',
                pathname: '/data/Riad/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
