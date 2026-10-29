import {act, renderHook} from '@testing-library/react';
import {useMediaQuery} from '@/lib/hooks/use-media-query';

it('subscribes to breakpoint changes and removes subscriptions when the query changes or unmounts', () => {
    const original = window.matchMedia;
    const sources = new Map<string, {matches: boolean; listeners: Set<() => void>}>();
    window.matchMedia = jest.fn((query: string) => {
        if (!sources.has(query)) sources.set(query, {matches: false, listeners: new Set()});
        const source = sources.get(query)!;
        return {
            get matches() {
                return source.matches;
            },
            media: query,
            addEventListener: (_type: string, listener: () => void) => source.listeners.add(listener),
            removeEventListener: (_type: string, listener: () => void) => source.listeners.delete(listener),
        } as unknown as MediaQueryList;
    });
    try {
        const {result, rerender, unmount} = renderHook(({query}) => useMediaQuery(query), {
            initialProps: {query: '(max-width: 767px)'},
        });
        expect(result.current).toBe(false);
        const mobile = sources.get('(max-width: 767px)')!;
        act(() => {
            mobile.matches = true;
            mobile.listeners.forEach((listener) => listener());
        });
        expect(result.current).toBe(true);
        rerender({query: '(max-width: 1023px)'});
        expect(mobile.listeners.size).toBe(0);
        expect(result.current).toBe(false);
        expect(sources.get('(max-width: 1023px)')!.listeners.size).toBe(1);
        unmount();
        expect(sources.get('(max-width: 1023px)')!.listeners.size).toBe(0);
    } finally {
        window.matchMedia = original;
    }
});
