import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
        unoptimized: false,
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

export default nextConfig;
