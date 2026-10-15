'use client';

import React from 'react';
import {
  Calendar,
  Check as CheckIcon,
  Cookie,
  ListChecks,
  Lock,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';

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
// Градиент появляется только у исправленных карточек: это награда, а не декор
const FIXED_GRADIENT = `linear-gradient(135deg, ${C.deep} 0%, ${C.sea} 120%)`;

// Критичная проверка двигает индекс сильнее остальных
const W: Record<Status, number> = { critical: 2, warning: 1, ok: 1 };
const V: Record<Status, number> = { critical: 0, warning: 0.5, ok: 1 };

const CHECK_ICON: Record<string, LucideIcon> = {
  'lssi-cif': ShieldAlert,
  'mixed-content': Lock,
  'cookie-banner': Cookie,
  'whatsapp-funnel': MessageCircle,
  'phone-bottleneck': PhoneCall,
  'booking-widget': Calendar,
  'form-friction': ListChecks,
  'schema-local': MapPin,
};
const PILLAR_ICON: Record<Pillar, LucideIcon> = { '01': ShieldCheck, '02': MessageCircle, '03': Target };

const L = {
  ru: {
    index: 'Индекс готовности к продажам',
    verdict: ['Критично', 'Нужны правки', 'Хорошо'],
    pillars: { '01': 'Закон и техника', '02': 'WhatsApp и запись', '03': 'Реклама и карты' },
    hint: 'Нажмите на проблему, чтобы увидеть, как вырастет индекс',
    left: (n: number) => (n === 0 ? 'Сайт готов приносить заявки' : `Осталось исправить: ${n}`),
    fixAll: 'Исправить всё',
    undoAll: 'Вернуть как было',
    ok: (n: number) => `В порядке: ${n}`,
  },
  es: {
    index: 'Índice de preparación comercial',
    verdict: ['Crítico', 'Requiere ajustes', 'Bien'],
    pillars: { '01': 'Legal y técnico', '02': 'WhatsApp y citas', '03': 'Anuncios y mapas' },
    hint: 'Toca un problema para ver cómo sube el índice',
    left: (n: number) => (n === 0 ? 'La web está lista para captar clientes' : `Por corregir: ${n}`),
    fixAll: 'Corregir todo',
    undoAll: 'Deshacer',
    ok: (n: number) => `Correctos: ${n}`,
  },
  en: {
    index: 'Sales-readiness index',
    verdict: ['Critical', 'Needs work', 'Healthy'],
    pillars: { '01': 'Legal & tech', '02': 'WhatsApp & booking', '03': 'Ads & maps' },
    hint: 'Tap a problem to see how the index grows',
    left: (n: number) => (n === 0 ? 'Your site is ready to win customers' : `${n} left to fix`),
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
      className="relative overflow-hidden rounded-3xl p-6 sm:p-9 grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] items-start"
      style={{
        border: `1px solid ${C.track}`,
        boxShadow: '0 18px 50px rgba(15,39,68,.08)',
        // ледяная дымка сверху: тот же приём, что и на лендинге
        background: `radial-gradient(80% 50% at 18% 0%, ${C.track} 0%, rgba(255,255,255,0) 70%), #fff`,
      }}
    >
      <style>{`
        @keyframes a2r-pop { 0% { transform: scale(.4) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.25) rotate(8deg); opacity: 1; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .a2r-pop { animation: none !important; } }
      `}</style>
      <span className="absolute inset-x-10 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.ice}, transparent)` }} aria-hidden />

      {/* Левая колонка: индекс и одна кнопка «Исправить всё» */}
      <div className="flex flex-col items-center text-center lg:sticky lg:top-24">
        <div className="relative w-full max-w-[260px]">
          <svg viewBox="0 0 120 70" className="w-full overflow-visible" role="img" aria-label={`${t.index}: ${total}%`}>
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
            {/* Бегунок: «капелька», которая едет по дуге вслед за индексом */}
            <circle
              cx="10"
              cy="62"
              r="5.4"
              fill="white"
              stroke={C.sea}
              strokeWidth="2.4"
              style={{
                transformOrigin: '60px 62px',
                transform: `rotate(${1.8 * total}deg)`,
                transition: 'transform 1s cubic-bezier(.16,1,.3,1)',
                filter: 'drop-shadow(0 2px 3px rgba(2,132,199,.35))',
              }}
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
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-600" aria-live="polite">
          {allDone && <Sparkles className="w-3.5 h-3.5" style={{ color: C.sea }} />}
          {t.left(left)}
        </p>

        <button
          type="button"
          onClick={toggleAll}
          className="mt-4 w-full max-w-[260px] px-4 py-3 rounded-xl text-sm font-bold text-center border-2 transition-all hover:bg-[#F0F9FF] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
          const PillarIcon = PILLAR_ICON[p];

          return (
            <div key={p}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${C.mist}, ${C.track})`, border: `1px solid ${C.track}` }}
                  >
                    <PillarIcon className="w-[18px] h-[18px]" style={{ color: C.sea }} />
                  </span>
                  <h3 className="text-sm sm:text-base font-bold leading-tight" style={{ color: C.deep }}>{t.pillars[p]}</h3>
                </div>
                <span className="text-lg font-black tabular-nums" style={{ color: C.deep }}>{s}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full" style={{ background: C.track }}>
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
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {issues.map((c) => {
                    const done = resolved.includes(c.id);
                    const color = STATUS_COLOR[c.status];
                    const Icon = CHECK_ICON[c.id] ?? PILLAR_ICON[c.pillar];
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onToggle(c.id)}
                        aria-pressed={done}
                        className="group relative overflow-hidden rounded-2xl px-4 py-4 min-h-[112px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,39,68,.12)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{
                          background: `${color}0D`,
                          border: `1.5px solid ${done ? C.sea : `${color}59`}`,
                          outlineColor: C.sea,
                        }}
                      >
                        {/* слой-градиент «зажигается» при исправлении */}
                        <span
                          aria-hidden
                          className="absolute inset-0 transition-opacity duration-500"
                          style={{ background: FIXED_GRADIENT, opacity: done ? 1 : 0 }}
                        />
                        {done && (
                          <Sparkles
                            className="a2r-pop absolute top-2.5 right-2.5 w-4 h-4"
                            style={{ color: C.ice, animation: 'a2r-pop .55s cubic-bezier(.2,.9,.3,1.2) both' }}
                          />
                        )}
                        <span className="relative z-10 flex flex-col items-center gap-1.5 text-center">
                          <span
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-500"
                            style={{ background: done ? 'rgba(125,211,252,.22)' : `${color}1A` }}
                          >
                            {done ? (
                              <CheckIcon className="w-[18px] h-[18px]" style={{ color: C.ice }} />
                            ) : (
                              <Icon className="w-[18px] h-[18px]" style={{ color }} />
                            )}
                          </span>
                          <span className="text-sm font-bold leading-snug transition-colors duration-500" style={{ color: done ? '#fff' : C.deep }}>
                            {c.title}
                          </span>
                          <span className="text-xs leading-snug transition-colors duration-500" style={{ color: done ? '#E0F2FE' : color }}>
                            {done ? c.action : c.metric}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <p className="mt-2.5 inline-flex items-center gap-1 text-xs text-slate-600">
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
