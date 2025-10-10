'use client';

import {useTranslations} from 'next-intl';
import {Link} from "@/lib/i18n/navigation";

export default function Error() {
  const t = useTranslations('Error');
  return (
    <section className="flex h-screen items-center bg-secondary-300">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 lg:text-9xl">500</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t('ErrorOops.translation.content')}
          </p>
          <Link
            href="/"
            className="my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-0"
          >
            {t('ErrorHome.translation.content')}
          </Link>
        </div>
      </div>
    </section>
  );
}
