'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Stethoscope,
  Calendar,
  WifiOff,
  ShieldCheck,
} from 'lucide-react';
import { crops } from '@/data/crops';
import { diseases } from '@/data/diseases';

export default function HomePage() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const tCrops = useTranslations('crops');
  const locale = useLocale();

  const localizedHref = (href: string) =>
    href === '/' ? `/${locale}` : `/${locale}${href}`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-leaf-pattern opacity-50 pointer-events-none" />
        <div className="container-narrow relative pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              {t('heroBadge')}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-leaf-900 text-balance leading-tight animate-slide-up">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 text-lg text-leaf-700 leading-relaxed text-balance max-w-2xl mx-auto animate-slide-up [animation-delay:80ms]">
              {t('heroSubtitle')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-slide-up [animation-delay:160ms]">
              <Link href={localizedHref('/wizard')} className="btn-primary text-base px-6 py-3">
                <Stethoscope className="w-5 h-5" />
                {t('heroCta')}
              </Link>
              <Link href={localizedHref('/library')} className="btn-secondary text-base px-6 py-3">
                {t('heroSecondary')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-slide-up [animation-delay:240ms]">
              {[
                { value: crops.length, label: t('statsCrops') },
                { value: '30+', label: t('statsDiseases') },
                { value: '3', label: t('statsLanguages') },
                { value: '✓', label: t('statsFree') },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="card-static p-4 text-center"
                >
                  <dt className="text-2xl sm:text-3xl font-display font-bold text-leaf-700">
                    {stat.value}
                  </dt>
                  <dd className="text-xs sm:text-sm text-leaf-600 mt-1">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-narrow py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-leaf-900">
            {t('featuresTitle')}
          </h2>
          <p className="mt-3 text-leaf-700">{t('featuresSubtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Stethoscope,
              title: t('feature1Title'),
              desc: t('feature1Desc'),
            },
            {
              icon: ShieldCheck,
              title: t('feature2Title'),
              desc: t('feature2Desc'),
            },
            {
              icon: Calendar,
              title: t('feature3Title'),
              desc: t('feature3Desc'),
            },
            {
              icon: WifiOff,
              title: t('feature4Title'),
              desc: t('feature4Desc'),
            },
          ].map((feature) => (
            <article key={feature.title} className="card p-6">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-leaf-100 text-leaf-700 mb-4">
                <feature.icon className="w-5 h-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-leaf-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-leaf-700 leading-relaxed">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CROPS */}
      <section className="bg-leaf-50/60 py-16 sm:py-20">
        <div className="container-narrow">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-leaf-900">
                {t('cropsTitle')}
              </h2>
              <p className="mt-2 text-leaf-700">{t('cropsSubtitle')}</p>
            </div>
            <Link
              href={localizedHref('/library')}
              className="btn-ghost text-sm"
            >
              {tNav('library')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {crops.map((crop) => {
              const count = diseases.filter((d) => d.crop === crop.id).length;
              return (
                <Link
                  key={crop.id}
                  href={`${localizedHref('/crops')}/${crop.id}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] ring-1 ring-leaf-100"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${crop.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-leaf-950/85 via-leaf-900/30 to-transparent" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                    <span className="text-4xl">{crop.emoji}</span>
                    <div>
                      <h3 className="font-display text-2xl font-bold">
                        {tCrops(crop.id)}
                      </h3>
                      <p className="text-xs text-leaf-100 mt-1 flex items-center gap-1.5">
                        <Leaf className="w-3 h-3" />
                        {count} {tNav('library').toLowerCase()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-narrow py-16 sm:py-20">
        <div className="rounded-3xl bg-leaf-700 text-white p-8 sm:p-12 text-center shadow-cardHover overflow-hidden relative">
          <div className="absolute inset-0 bg-leaf-pattern opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-balance">
              {t('ctaTitle')}
            </h2>
            <p className="mt-3 text-leaf-100 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <Link
              href={localizedHref('/wizard')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-leaf-700 font-semibold shadow-soft hover:shadow-cardHover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Stethoscope className="w-5 h-5" />
              {t('ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
