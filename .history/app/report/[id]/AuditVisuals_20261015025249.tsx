'use client';

import React from 'react';
import { Check as CheckIcon } from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';
type Status = 'critical' | 'warning' | 'ok';
type Pillar = '01' | '02' | '03';

export interface Check {
  id: string;
  pillar: Pillar;
  title: string;
  status: Status;
  metric: string;
  desc: string;
  action: string;
}

interface Props {
  lang: Lang;
  checks: Check[];
  resolved: string[];
  onToggle: (id: string) => void;
}

// Nordic Glacier
const C = { deep: '#0F2744', sea: '#0284C7', ice: '#7DD3FC', mist: '#F0F9FF', track: '#DCEEF9' };
const STATUS_COLOR: Record<Status, string> = { critical: '#E11D48', warning: '#D97706', ok: C.sea };
// Критичная проверка двигает индекс сильнее остальных
const W: Record<Status, number> = { critical: 2, warning: 1, ok: 1 };
const V: Record<Status, number> = { critical: 0, warning: 0.5, ok: 1 };

const L = {
  ru: {
    index: 'Индекс готовности к продажам',
    verdict: ['Критично', 'Нужны правки', 'Хорошо'],
    pillars: { '01': 'Закон и техника', '02': 'WhatsApp и запись', '03': 'Реклама и карты' },
    hint: 'Нажмите на проблему, чтобы увидеть, как вырастет индекс',
    left: (n: number) => (n === 0 ? 'Всё исправлено' : `Осталось исправить: ${n}`),
    fixAll: 'Исправить всё',
    undoAll: 'Вернуть как было',
    ok: (n: number) => `В порядке: ${n}`,
  },
  es: {
    index: 'Índice de preparación comercial',
    verdict: ['Crítico', 'Requiere ajustes', 'Bien'],
    pillars: { '01': 'Legal y técnico', '02': 'WhatsApp y citas', '03': 'Anuncios y mapas' },
    hint: 'Toca un problema para ver cómo sube el índice',
    left: (n: number) => (n === 0 ? 'Todo corregido' : `Por corregir: ${n}`),
    fixAll: 'Corregir todo',
    undoAll: 'Deshacer',
    ok: (n: number) => `Correctos: ${n}`,
  },
  en: {
    index: 'Sales-readiness index',
    verdict: ['Critical', 'Needs work', 'Healthy'],
    pillars: { '01': 'Legal & tech', '02': 'WhatsApp & booking', '03': 'Ads & maps' },
    hint: 'Tap a problem to see how the index grows',
    left: (n: number) => (n === 0 ? 'All fixed' : `${n} left to fix`),
    fixAll: 'Fix everything',
    undoAll: 'Undo all',
    ok: (n: number) => `Healthy: ${n}`,
  },
};

export const score = (items: Check[], statusOf: (c: Check) => Status) => {
  const total = items.reduce((a, c) => a + W[c.status], 0);
  const got = items.reduce((a, c) => a + W[c.status] * V[statusOf(c)], 0);
  return total ? Math.round((100 * got) / total) : 0;
};

export default function AuditVisuals({ lang, checks, resolved, onToggle }: Props) {
  const t = L[lang];

  const now = (c: Check): Status => (resolved.includes(c.id) ? 'ok' : c.status);
  const total = score(checks, now);
  const tone = total < 50 ? 0 : total < 75 ? 1 : 2;
  const toneColor = [STATUS_COLOR.critical, STATUS_COLOR.warning, C.sea][tone];

  const problems = checks.filter((c) => c.status !== 'ok');
  const left = problems.filter((c) => !resolved.includes(c.id)).length;
  const allDone = left === 0;

  // Один клик: исправить всё или вернуть как было
  const toggleAll = () =>
    problems.forEach((c) => {
      if (resolved.includes(c.id) === allDone) onToggle(c.id);
    });

  return (
    <section
      className="rounded-3xl bg-white p-6 sm:p-9 grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] items-start"
      style={{ border: `1px solid ${C.track}`, boxShadow: '0 18px 50px rgba(15,39,68,.08)' }}
    >
      {/* Левая колонка: индекс и одна кнопка «Исправить всё» */}
      <div className="flex flex-col items-center text-center lg:sticky lg:top-24">
        <div className="relative w-full max-w-[260px]">
          <svg viewBox="0 0 120 70" className="w-full" role="img" aria-label={`${t.index}: ${total}%`}>
            <defs>
              <linearGradient id="a2r-gauge" x1="0" x2="1">
                <stop offset="0" stopColor={C.sea} />
                <stop offset="1" stopColor={C.ice} />
              </linearGradient>
            </defs>
            <path d="M10 62A50 50 0 0 1 110 62" pathLength={100} fill="none" stroke={C.track} strokeWidth="9" strokeLinecap="round" />
            <path
              d="M10 62A50 50 0 0 1 110 62"
              pathLength={100}
              fill="none"
              stroke="url(#a2r-gauge)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - total}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)' }}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center leading-none">
            <span className="text-5xl font-black tabular-nums" style={{ color: C.deep }}>
              {total}
              <span className="text-2xl">%</span>
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm font-bold" style={{ color: C.deep }}>{t.index}</p>
        <span
          className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: `${toneColor}14`, color: toneColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: toneColor }} />
          {t.verdict[tone]}
        </span>
        <p className="mt-2 text-xs text-slate-600" aria-live="polite">{t.left(left)}</p>

        <button
          type="button"
          onClick={toggleAll}
          className="mt-4 w-full max-w-[260px] px-4 py-3 rounded-xl text-sm font-bold text-center border-2 transition-colors hover:bg-[#F0F9FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: C.sea, color: C.sea, background: 'white', outlineColor: C.sea }}
        >
          {allDone ? t.undoAll : t.fixAll}
        </button>
      </div>

      {/* Правая колонка: только проблемы, один тап = исправление */}
      <div className="space-y-7 min-w-0">
        <p className="text-sm text-slate-600">{t.hint}</p>

        {(['01', '02', '03'] as Pillar[]).map((p) => {
          const items = checks.filter((c) => c.pillar === p);
          const s = score(items, now);
          const issues = items.filter((c) => c.status !== 'ok');
          const okCount = items.filter((c) => now(c) === 'ok').length;

          return (
            <div key={p}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-bold" style={{ color: C.deep }}>{t.pillars[p]}</h3>
                <span className="text-lg font-black tabular-nums" style={{ color: C.deep }}>{s}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full" style={{ background: C.track }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${s}%`,
                    background: `linear-gradient(90deg, ${C.sea}, ${C.ice})`,
                    transition: 'width .8s cubic-bezier(.16,1,.3,1)',
                  }}
                />
              </div>

              {issues.length > 0 && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {issues.map((c) => {
                    const done = resolved.includes(c.id);
                    const color = STATUS_COLOR[c.status];
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onToggle(c.id)}
                        aria-pressed={done}
                        className="rounded-xl px-4 py-3 min-h-[68px] text-center flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={
                          done
                            ? { background: C.sea, border: `1.5px solid ${C.sea}`, color: 'white', outlineColor: C.sea }
                            : { background: `${color}0D`, border: `1.5px solid ${color}66`, color: C.deep, outlineColor: C.sea }
                        }
                      >
                        <span className="text-sm font-bold leading-snug">{c.title}</span>
                        <span className="text-xs leading-snug" style={{ color: done ? '#E0F2FE' : color }}>
                          {done ? `✓ ${c.action}` : c.metric}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-600">
                <CheckIcon className="w-3.5 h-3.5" style={{ color: C.sea }} />
                {t.ok(okCount)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
