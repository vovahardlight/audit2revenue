'use client';

import React, { useState, Suspense, type ReactNode } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export type Lang = 'ru' | 'es' | 'en';

export interface LegalDocumentProps {
  titles: Record<Lang, string>;
  content: Record<Lang, ReactNode>;
}

function LegalDocumentContent({ titles, content }: LegalDocumentProps) {
  const searchParams = useSearchParams();
  const urlLang = searchParams.get('lang') as Lang | null;
  const initialLang: Lang = urlLang && ['ru', 'es', 'en'].includes(urlLang) ? urlLang : 'es';

  const [lang, setLang] = useState<Lang>(initialLang);

  const t = {
    es: {
      backToWeb: 'Volver a la web',
      lastUpdate: 'Última actualización: 9 de octubre de 2026',
      protoBadge: 'Documentación preliminar · prototipo',
      protoNotice:
        'El sitio se encuentra en fase de demostración técnica. Este texto es un borrador de trabajo: los campos destacados deben completarse y el contenido debe verificarse frente a los proveedores y procesos reales antes de activar el servicio comercial.',
      legalNavAria: 'Información legal',
      links: {
        legalNotice: 'Aviso legal',
        privacyPolicy: 'Política de privacidad',
        cookiePolicy: 'Política de cookies',
        terms: 'Condiciones de contratación',
      },
    },
    en: {
      backToWeb: 'Back to website',
      lastUpdate: 'Last updated: October 9, 2026',
      protoBadge: 'Preliminary documentation · prototype',
      protoNotice:
        'This website is currently a technical demonstration prototype. This document is a working draft: highlighted bracketed fields must be completed and verified against actual services and vendors before commercial deployment.',
      legalNavAria: 'Legal information',
      links: {
        legalNotice: 'Legal notice',
        privacyPolicy: 'Privacy policy',
        cookiePolicy: 'Cookie policy',
        terms: 'Terms of service',
      },
    },
    ru: {
      backToWeb: 'Вернуться на сайт',
      lastUpdate: 'Последнее обновление: 9 октября 2026 г.',
      protoBadge: 'Предварительная документация · прототип',
      protoNotice:
        'Сайт находится в стадии технической демонстрации. Данный текст является рабочим проектом документа: выделенные поля должны быть заполнены фактическими данными компании, а процессы согласованы с реальными провайдерами перед запуском коммерческого сервиса.',
      legalNavAria: 'Правовая информация',
      links: {
        legalNotice: 'Правовое уведомление',
        privacyPolicy: 'Политика конфиденциальности',
        cookiePolicy: 'Политика cookies',
        terms: 'Условия обслуживания',
      },
    },
  }[lang];

  return (
    <main className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] antialiased">
      {/* ================= ШАПКА ================= */}
      <header className="border-b border-black/[0.06] bg-white/85 backdrop-blur-xl sticky top-0 z-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href={`/?lang=${lang}`} className="flex items-center gap-2.5 no-underline">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] text-xs font-bold text-white shadow-sm">
              A2R
            </span>
            <span className="text-sm font-semibold tracking-tight text-[#1D1D1F]">
              Audit<span className="text-[#0284C7]">2</span>Revenue
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Языковые кнопки */}
            <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05]">
              {(['es', 'en', 'ru'] as Lang[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLang(item)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] ${
                    lang === item
                      ? 'bg-white text-[#0284C7] shadow-sm font-bold'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <Link
              href={`/?lang=${lang}`}
              className="text-xs font-semibold text-[#0284C7] hover:text-[#0F2744] transition whitespace-nowrap hidden sm:inline"
            >
              {t.backToWeb}
            </Link>
          </div>
        </div>
      </header>

      {/* ================= КОНТЕНТ ================= */}
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0284C7]">
          Audit2Revenue.es
        </p>
        <h1 className="mb-3 text-3xl font-black tracking-[-0.035em] text-[#0F2744] sm:text-4xl">
          {titles[lang]}
        </h1>
        <p className="mb-6 text-xs text-[#86868B]">{t.lastUpdate}</p>

        {/* Дисклеймер прототипа */}
        <aside className="mb-9 rounded-2xl border border-[#CBEAF7] bg-[#EFF9FD] p-4 sm:p-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0284C7]">
            {t.protoBadge}
          </p>
          <p className="mt-2 text-xs sm:text-sm leading-6 text-[#0F2744]">
            {t.protoNotice}
          </p>
        </aside>

        {/* Содержимое документа для выбранного языка */}
        <article className="legal-content space-y-8 text-sm leading-7 text-[#454B54]">
          {content[lang]}
        </article>

        {/* Навигация футера */}
        <nav
          aria-label={t.legalNavAria}
          className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/[0.08] pt-5 text-xs font-medium text-[#0284C7]"
        >
          <Link href={`/aviso-legal?lang=${lang}`}>{t.links.legalNotice}</Link>
          <Link href={`/politica-de-privacidad?lang=${lang}`}>{t.links.privacyPolicy}</Link>
          <Link href={`/politica-de-cookies?lang=${lang}`}>{t.links.cookiePolicy}</Link>
          <Link href={`/condiciones-de-contratacion?lang=${lang}`}>{t.links.terms}</Link>
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .legal-content h2 { color: #0F2744; font-size: 1.05rem; line-height: 1.5; font-weight: 750; letter-spacing: -0.015em; margin-bottom: .6rem; }
        .legal-content h3 { color: #0F2744; font-size: .95rem; font-weight: 700; margin-bottom: .35rem; }
        .legal-content p { margin-top: .45rem; }
        .legal-content ul { list-style: disc; padding-left: 1.35rem; margin-top: .5rem; }
        .legal-content li { margin: .3rem 0; }
        .legal-content a { color: #0284C7; text-decoration: underline; text-underline-offset: 3px; }
        .legal-content strong { color: #1D1D1F; font-weight: 650; }
        .legal-content .placeholder { color: #9A3412; background: #FFF7ED; border-radius: .3rem; padding: .05rem .25rem; font-weight: 700; }
      `}} />
    </main>
  );
}

export default function LegalDocument(props: LegalDocumentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFBFD]" />}>
      <LegalDocumentContent {...props} />
    </Suspense>
  );
}