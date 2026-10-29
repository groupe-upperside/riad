import {render, type RenderOptions} from '@testing-library/react';
import type {ReactElement, ReactNode} from 'react';

import CustomNextIntlClientProvider from '@/lib/i18n/custom-next-intl-client-provider';
import messages from '@/translations/fr.json';
import {toIntlMessages} from '@/lib/i18n/messages';

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
    function Wrapper({children}: {children: ReactNode}) {
        return (
            <CustomNextIntlClientProvider locale="fr" messages={toIntlMessages(messages)} timeZone="Europe/Paris">
                {children}
            </CustomNextIntlClientProvider>
        );
    }
    return render(ui, {wrapper: Wrapper, ...options});
}
