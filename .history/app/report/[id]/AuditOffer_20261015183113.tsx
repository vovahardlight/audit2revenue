'use client';

import React from 'react';
import { Check as CheckIcon } from 'lucide-react';
import { score, type Check } from './AuditVisuals';

type Lang = 'ru' | 'es' | 'en';

const C = { deep: '#0F2744', sea: '#0284C7', ice: '#7DD3FC', mist: '#F0F9FF', track: '#DCEEF9' };

const L = {
  ru: { title: 'Исправим всё это за вас', sub: 'Вы получаете работающий сайт, а не список задач', result: 'индекс готовности', includes: 'Что входит', idx: 'Индекс', loss: 'Потери рекламного бюджета', mo: 'мес', once: 'разово', payback: 'Окупится за', days: 'дней', term: 'Срок', wd: 'рабочих дней' },
  es: { title: 'Lo corregimos por ti', sub: 'Recibes una web que funciona, no una lista de tareas', result: 'índice de preparación', includes: 'Qué incluye', idx: 'Índice', loss: 'Presupuesto publicitario perdido', mo: 'mes', once: 'pago único', payback: 'Se amortiza en', days: 'días', term: 'Plazo', wd: 'días laborables' },
  en: { title: 'We fix all of this for you', sub: 'You get a working website, not a to-do list', result: 'readiness index', includes: "What's included", idx: 'Index', loss: 'Wasted ad budget', mo: 'mo', once: 'one-off', payback: 'Pays back in', days: 'days', term: 'Turnaround', wd: 'business days' },
};

interface OfferProps {
  lang: Lang;
  checks: Check[];
  includeIds: string[]; // какие проверки закрывает пакет
  price: number;
  lossMin: number; // €/мес, нижняя оценка потерь рекламы
  lossMax: number;
  deliveryDays: number;
  installment?: string;
  guarantee?: string;
  note?: string; // «Демо-режим · платежи отключены»
  ctaLabel: string;
  ctaHref: string;
  callLabel: string;
  callHref: string;
}

export function AuditOffer(p: OfferProps) {
  const t = L[p.lang];

  // «До» считается от исходных статусов, поэтому не зависит от кнопок симуляции выше
  const before = score(p.checks, (c) => c.status);
  const after = score(p.checks, (c) => (p.includeIds.includes(c.id) ? 'ok' : c.status));
  const included = p.includeIds
    .map((id) => p.checks.find((c) => c.id === id))
    .filter((c): c is Check => !!c);

  const fast = Math.ceil((p.price / p.lossMax) * 30);
  const slow = Math.ceil((p.price / p.lossMin) * 30);
  const money = (n: number) => `€${n.toLocaleString(p.lang === 'en' ? 'en-US' : 'es-ES')}`;

  return (
    <section
      className="rounded-3xl bg-white p-6 sm:p-9 grid gap-8 md:grid-cols-[1fr_340px] items-start"
      style={{ border: `1px solid ${C.track}`, boxShadow: '0 18px 50px rgba(15,39,68,.08)' }}
    >
      {/* Результат и состав: что клиент получает, без инструкции «как» */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: C.deep }}>{t.title}</h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-[52ch]">{t.sub}</p>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
          <span className="text-4xl sm:text-5xl font-black" style={{ color: '#E11D48' }}>{before}%</span>
          <span className="text-2xl font-bold text-slate-400" aria-hidden>→</span>
          <span className="text-4xl sm:text-5xl font-black" style={{ color: C.sea }}>{after}%</span>
          <span className="text-sm text-slate-600">{t.result}</span>
        </div>

        <p className="mt-7 text-sm font-bold" style={{ color: C.deep }}>{t.includes}</p>
        <ul className="mt-2.5 space-y-2.5">
          {included.map((c) => (
            <li key={c.id} className="flex items-start gap-2.5 text-sm sm:text-base" style={{ color: C.deep }}>
              <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center" style={{ background: C.mist, border: `1px solid ${C.ice}` }}>
                <CheckIcon className="w-3 h-3" style={{ color: C.sea }} />
              </span>
              <span className="leading-snug">{c.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Цена: сначала потери (якорь), потом сумма, потом срок окупаемости */}
      <aside className="rounded-2xl p-5 sm:p-6" style={{ background: C.mist, border: `1px solid ${C.track}` }}>
        <p className="text-sm text-slate-600">{t.loss}</p>
        <p className="text-lg font-black tabular-nums" style={{ color: '#E11D48' }}>
          {money(p.lossMin)} – {money(p.lossMax)} <span className="text-xs font-semibold text-slate-500">/ {t.mo}</span>
        </p>

        <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${C.track}` }}>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tight tabular-nums" style={{ color: C.deep }}>{money(p.price)}</span>
            <span className="text-sm text-slate-600">{t.once}</span>
          </div>
          {p.installment && <p className="mt-1 text-xs text-slate-600">{p.installment}</p>}

          <p className="mt-4 text-sm" style={{ color: C.deep }}>
            {t.payback} <strong className="tabular-nums">{fast}–{slow} {t.days}</strong>
          </p>
          <p className="text-xs text-slate-600">{t.term}: {p.deliveryDays} {t.wd}</p>
        </div>

        {/* единственная залитая кнопка на экране */}
        <a
          href={p.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full text-center px-5 py-3.5 rounded-xl font-extrabold text-white transition-colors hover:bg-[#0F2744] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ background: C.sea, outlineColor: C.sea }}
        >
          {p.ctaLabel}
        </a>
        <a href={p.callHref} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center text-sm font-semibold underline underline-offset-4" style={{ color: C.sea }}>
          {p.callLabel}
        </a>

        {p.guarantee && <p className="mt-5 text-xs text-slate-600 leading-relaxed">{p.guarantee}</p>}
        {p.note && <p className="mt-2 text-[11px] text-slate-500">{p.note}</p>}
      </aside>
    </section>
  );
}

/* Нижняя панель: только индекс, прирост и действие */
export function AuditStickyBar(p: {
  lang: Lang;
  checks: Check[];
  resolved: string[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const t = L[p.lang];
  const base = score(p.checks, (c) => c.status);
  const total = score(p.checks, (c) => (p.resolved.includes(c.id) ? 'ok' : c.status));
  const delta = total - base;

  return (
    <aside className="fixed bottom-0 inset-x-0 z-50 px-4 py-2.5 backdrop-blur-xl" style={{ background: 'rgba(15,39,68,.95)', borderTop: '1px solid rgba(125,211,252,.25)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2 text-white">
          <span className="text-xs text-slate-300">{t.idx}</span>
          <span className="text-2xl font-black tabular-nums">{total}%</span>
          {delta > 0 && <span className="text-xs font-bold tabular-nums" style={{ color: C.ice }}>+{delta}</span>}
        </div>
        <a
          href={p.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl text-sm font-extrabold whitespace-nowrap transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ background: C.ice, color: C.deep, outlineColor: C.ice }}
        >
          {p.ctaLabel}
        </a>
      </div>
    </aside>
  );
}
