'use client';

import React from 'react';
import { Check as CheckIcon, Clock } from 'lucide-react';
import { score, type Check } from './AuditVisuals';

type Lang = 'ru' | 'es' | 'en';

const C = { deep: '#0F2744', sea: '#0284C7', ice: '#7DD3FC', mist: '#F0F9FF', track: '#DCEEF9' };

const L = {
  ru: { plan: 'План для разработчика', sub: 'Три шага в порядке отдачи. Каждый закрывает конкретную проверку.', idx: 'Индекс', h: 'ч', once: 'разово', loss: 'Потери рекламного бюджета', payback: 'Окупится за', days: 'дней', term: 'Срок внедрения', wd: 'рабочих дней', gain: 'Индекс' },
  es: { plan: 'Plan para tu programador', sub: 'Tres pasos por orden de retorno. Cada uno cierra una prueba concreta.', idx: 'Índice', h: 'h', once: 'pago único', loss: 'Presupuesto publicitario perdido', payback: 'Se amortiza en', days: 'días', term: 'Plazo', wd: 'días laborables', gain: 'Índice' },
  en: { plan: 'Plan for your developer', sub: 'Three steps in order of payoff. Each one closes a specific check.', idx: 'Index', h: 'h', once: 'one-off', loss: 'Wasted ad budget', payback: 'Pays back in', days: 'days', term: 'Turnaround', wd: 'business days', gain: 'Index' },
};

export interface Step { id: string; title: string; desc: string; effortH: number }

interface OfferProps {
  lang: Lang;
  checks: Check[];
  resolved: string[];
  steps: Step[]; // 3 шага, уже по порядку отдачи
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
  const status = (extra: string[]) => (c: Check) =>
    p.resolved.includes(c.id) || extra.includes(c.id) ? 'ok' : c.status;

  // накопительный рост индекса по шагам
  let acc: string[] = [];
  let prev = score(p.checks, status(acc));
  const rows = p.steps.map((s) => {
    acc = [...acc, s.id];
    const to = score(p.checks, status(acc));
    const row = { ...s, from: prev, to };
    prev = to;
    return row;
  });

  const fast = Math.ceil((p.price / p.lossMax) * 30);
  const slow = Math.ceil((p.price / p.lossMin) * 30);
  const money = (n: number) => `€${n.toLocaleString(p.lang === 'en' ? 'en-US' : 'es-ES')}`;

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px] items-start">
      {/* План: здесь последовательность настоящая, поэтому нумерация оправдана */}
      <div className="rounded-3xl bg-white p-6 sm:p-8" style={{ border: `1px solid ${C.track}` }}>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: C.deep }}>{t.plan}</h2>
        <p className="mt-1 text-sm text-slate-600 max-w-[60ch]">{t.sub}</p>

        <ol className="mt-6 relative">
          <span className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: C.track }} aria-hidden />
          {rows.map((r, i) => {
            const done = p.resolved.includes(r.id);
            return (
              <li key={r.id} className="relative pl-12 pb-7 last:pb-0">
                <span
                  className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                  style={done ? { background: C.sea, color: 'white' } : { background: C.mist, color: C.sea, border: `1.5px solid ${C.sea}` }}
                >
                  {done ? <CheckIcon className="w-4 h-4" /> : i + 1}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-bold leading-snug" style={{ color: C.deep, textDecoration: done ? 'line-through' : 'none' }}>{r.title}</h3>
                  <span className="inline-flex items-center gap-3 text-xs text-slate-600 tabular-nums">
                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />~{r.effortH} {t.h}</span>
                    <span className="font-bold" style={{ color: C.sea }}>{t.gain} {r.from}% → {r.to}%</span>
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed max-w-[64ch]">{r.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Цена: сначала потери (якорь), потом сумма, потом срок окупаемости */}
      <aside className="rounded-3xl bg-white p-6 sm:p-7 lg:sticky lg:top-24" style={{ border: `1px solid ${C.track}`, boxShadow: '0 18px 50px rgba(15,39,68,.08)' }}>
        <p className="text-sm text-slate-600">{t.loss}</p>
        <p className="text-lg font-black tabular-nums" style={{ color: '#E11D48' }}>
          {money(p.lossMin)} – {money(p.lossMax)} <span className="text-xs font-semibold text-slate-500">/ {p.lang === 'ru' ? 'мес' : p.lang === 'es' ? 'mes' : 'mo'}</span>
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
