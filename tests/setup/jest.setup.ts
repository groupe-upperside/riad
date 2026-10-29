import '@testing-library/jest-dom';

jest.mock('next/navigation', () => {
    const router = {push: jest.fn(), replace: jest.fn(), refresh: jest.fn(), back: jest.fn(), prefetch: jest.fn()};
    return {
        __esModule: true,
        useRouter: () => router,
        usePathname: () => '/fr',
        useSearchParams: () => new URLSearchParams(),
        useParams: () => ({locale: 'fr'}),
        redirect: jest.fn(),
        notFound: jest.fn(),
        __mockRouter: router,
    };
});
