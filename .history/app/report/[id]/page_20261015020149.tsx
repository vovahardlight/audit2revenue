'use client';

import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, XCircle } from 'lucide-react';

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

export interface Leak {
  id: string; // id проверки, которую закрывает это исправление
  title: string;
  punch: string;
  value: string; // «~€1,200 – €1,600 /мес»
  weight: number; // 0–100, длина полосы потерь
  effortH: number; // оценка времени на исправление, часы
  kind?: 'loss' | 'risk';
}

interface Props {
  lang: Lang;
  checks: Check[];
  leaks: Leak[];
  resolved: string[];
  onToggle: (id: string) => void;
}

// Nordic Glacier
const C = { deep: '#0F2744', sea: '#0284C7', ice: '#7DD3FC', mist: '#F0F9FF', track: '#DCEEF9' };
const STATUS_COLOR: Record<Status, string> = { critical: '#E11D48', warning: '#D97706', ok: C.sea };
// Вес проверки: критичная двигает индекс сильнее
const W: Record<Status, number> = { critical: 2, warning: 1, ok: 1 };
const V: Record<Status, number> = { critical: 0, warning: 0.5, ok: 1 };

const L = {
  ru: {
    index: 'Индекс готовности к продажам',
    verdict: ['Критично', 'Нужны правки', 'Хорошо'],
    potential: 'После исправлений',
    pillars: { '01': 'Закон и техника', '02': 'WhatsApp и запись', '03': 'Реклама и карты' },
    legend: ['Критично', 'Риск', 'В порядке'],
    leaks: 'Где уходят пациенты',
    leaksSub: 'Отсортировано по размеру потерь. Решите верхний пункт — эффект будет максимальным.',
    risk: 'Юридический риск',
    fix: 'Смоделировать решение',
    fixed: 'Решено',
    diag: 'Диагноз',
    rec: 'Что сделать',
    h: 'ч',
    done: (n: number, m: number) => `Решено ${n} из ${m}`,
  },
  es: {
    index: 'Índice de preparación comercial',
    verdict: ['Crítico', 'Requiere ajustes', 'Bien'],
    potential: 'Tras las mejoras',
    pillars: { '01': 'Legal y técnico', '02': 'WhatsApp y citas', '03': 'Anuncios y mapas' },
    legend: ['Crítico', 'Riesgo', 'Correcto'],
    leaks: 'Dónde se pierden pacientes',
    leaksSub: 'Ordenado por tamaño de la fuga. Resolver el primero tiene el mayor efecto.',
    risk: 'Riesgo legal',
    fix: 'Simular solución',
    fixed: 'Resuelto',
    diag: 'Diagnóstico',
    rec: 'Qué hacer',
    h: 'h',
    done: (n: number, m: number) => `Resuelto ${n} de ${m}`,
  },
  en: {
    index: 'Sales-readiness index',
    verdict: ['Critical', 'Needs work', 'Healthy'],
    potential: 'After fixes',
    pillars: { '01': 'Legal & tech', '02': 'WhatsApp & booking', '03': 'Ads & maps' },
    legend: ['Critical', 'At risk', 'Healthy'],
    leaks: 'Where patients drop off',
    leaksSub: 'Sorted by size of the leak. Fixing the top item has the biggest effect.',
    risk: 'Legal risk',
    fix: 'Simulate fix',
    fixed: 'Fixed',
    diag: 'Diagnosis',
    rec: 'What to do',
    h: 'h',
    done: (n: number, m: number) => `Fixed ${n} of ${m}`,
  },
};

const score = (items: Check[], statusOf: (c: Check) => Status) => {
  const total = items.reduce((a, c) => a + W[c.status], 0);
  const got = items.reduce((a, c) => a + W[c.status] * V[statusOf(c)], 0);
  return total ? Math.round((100 * got) / total) : 0;
};

const StatusIcon = ({ s, className }: { s: Status; className?: string }) =>
  s === 'critical' ? (
    <XCircle className={className} style={{ color: STATUS_COLOR.critical }} />
  ) : s === 'warning' ? (
    <AlertTriangle className={className} style={{ color: STATUS_COLOR.warning }} />
  ) : (
    <CheckCircle2 className={className} style={{ color: STATUS_COLOR.ok }} />
  );

export default function AuditVisuals({ lang, checks, leaks, resolved, onToggle }: Props) {
  const t = L[lang];
  const [selId, setSelId] = useState<string | null>(
    () => checks.find((c) => c.status === 'critical')?.id ?? null
  );

  const now = (c: Check): Status => (resolved.includes(c.id) ? 'ok' : c.status);
  const total = score(checks, now);
  const leakIds = leaks.map((l) => l.id);
  const potential = score(checks, (c) => (leakIds.includes(c.id) ? 'ok' : now(c)));

  const tone = total < 50 ? 0 : total < 75 ? 1 : 2;
  const toneColor = [STATUS_COLOR.critical, STATUS_COLOR.warning, C.sea][tone];

  const losses = useMemo(
    () => leaks.filter((l) => l.kind !== 'risk').sort((a, b) => b.weight - a.weight),
    [leaks]
  );
  const risks = leaks.filter((l) => l.kind === 'risk');
  const doneCount = leaks.filter((l) => resolved.includes(l.id)).length;
  const sel = checks.find((c) => c.id === selId) ?? null;

  // точка цели на дуге (R=50, центр 60,62)
  const a = (Math.PI * potential) / 100;
  const tx = 60 - 50 * Math.cos(a);
  const ty = 62 - 50 * Math.sin(a);

  const Fix = ({ id }: { id: string }) => {
    const done = resolved.includes(id);
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
        aria-pressed={done}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          done
            ? 'bg-[#0284C7] border-[#0284C7] text-white'
            : 'bg-white border-[#0284C7] text-[#0284C7] hover:bg-[#F0F9FF]'
        }`}
        style={{ outlineColor: C.sea }}
      >
        {done ? `✓ ${t.fixed}` : t.fix}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* ===== 1. Вердикт: один фокус — индекс и пилларами ===== */}
      <section
        className="rounded-3xl bg-white p-6 sm:p-9 grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] items-center"
        style={{ border: `1px solid ${C.track}`, boxShadow: '0 18px 50px rgba(15,39,68,.08)' }}
      >
        <div className="flex flex-col items-center text-center">
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
              {/* цель после исправлений */}
              <circle cx={tx} cy={ty} r="3.6" fill="white" stroke={C.deep} strokeWidth="1.6" />
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
          <p className="mt-2 text-xs text-slate-600">
            <span className="inline-block w-2.5 h-2.5 rounded-full align-middle mr-1.5 bg-white" style={{ border: `1.6px solid ${C.deep}` }} />
            {t.potential}: <strong style={{ color: C.deep }}>{potential}%</strong>
          </p>
        </div>

        {/* Полосы-сегменты: один сегмент = одна проверка */}
        <div className="space-y-5 min-w-0">
          {(['01', '02', '03'] as Pillar[]).map((p) => {
            const items = checks.filter((c) => c.pillar === p);
            const s = score(items, now);
            return (
              <div key={p}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold" style={{ color: C.deep }}>{t.pillars[p]}</span>
                  <span className="text-lg font-black tabular-nums" style={{ color: C.deep }}>{s}%</span>
                </div>
                <div className="flex gap-1.5" role="group" aria-label={t.pillars[p]}>
                  {items.map((c) => {
                    const st = now(c);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelId(c.id)}
                        aria-label={`${c.title}: ${st}`}
                        aria-pressed={selId === c.id}
                        className="group flex-1 h-8 flex items-center focus-visible:outline-none"
                      >
                        <span
                          className="block w-full h-3 rounded-full transition-all duration-300 group-hover:h-4 group-focus-visible:h-4"
                          style={{
                            background: STATUS_COLOR[st],
                            boxShadow: selId === c.id ? `0 0 0 2px white, 0 0 0 4px ${C.deep}` : 'none',
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Диагноз выбранного сегмента: панель никогда не пустая */}
          {sel && (
            <div className="rounded-xl p-4 text-sm" style={{ background: C.mist, border: `1px solid ${C.track}` }} aria-live="polite">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 min-w-0">
                  <StatusIcon s={now(sel)} className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold leading-snug" style={{ color: C.deep }}>{sel.title}</h4>
                    <span className="text-xs text-slate-600">{sel.metric}</span>
                  </div>
                </div>
                {sel.status !== 'ok' && <Fix id={sel.id} />}
              </div>
              <p className="mt-2.5 text-slate-700 leading-relaxed max-w-[68ch]">
                <strong style={{ color: C.deep }}>{t.diag}. </strong>
                {sel.desc}
              </p>
              <p className="mt-1.5 text-slate-700 leading-relaxed max-w-[68ch]">
                <strong style={{ color: C.deep }}>{t.rec}. </strong>
                {sel.action}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            {(['critical', 'warning', 'ok'] as Status[]).map((s, i) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: STATUS_COLOR[s] }} />
                {t.legend[i]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. Потери: полосы по убыванию, при исправлении полоса «сгорает» ===== */}
      <section className="rounded-3xl p-6 sm:p-8" style={{ background: C.deep, color: 'white' }}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{t.leaks}</h2>
            <p className="mt-1 text-sm max-w-[60ch]" style={{ color: '#B6CBE0' }}>{t.leaksSub}</p>
          </div>
          <span className="text-sm font-bold tabular-nums" style={{ color: C.ice }}>{t.done(doneCount, leaks.length)}</span>
        </div>

        <ul className="mt-6 space-y-6">
          {losses.map((l) => {
            const done = resolved.includes(l.id);
            return (
              <li key={l.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm sm:text-base font-bold leading-snug">{l.title}</h3>
                  <span className="shrink-0 text-sm sm:text-base font-black tabular-nums" style={{ color: done ? '#7A93AD' : C.ice, textDecoration: done ? 'line-through' : 'none' }}>
                    {l.value}
                  </span>
                </div>
                <div className="mt-2 h-3 rounded-full" style={{ background: 'rgba(125,211,252,.12)' }}>
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: done ? '0%' : `${l.weight}%`,
                      background: `linear-gradient(90deg, ${C.sea}, ${C.ice})`,
                      transition: 'width .9s cubic-bezier(.16,1,.3,1)',
                    }}
                  />
                </div>
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs sm:text-sm max-w-[62ch]" style={{ color: '#B6CBE0' }}>{l.punch}</p>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs" style={{ color: '#B6CBE0' }}>
                      <Clock className="w-3.5 h-3.5" /> ~{l.effortH} {t.h}
                    </span>
                    <Fix id={l.id} />
                  </div>
                </div>
              </li>
            );
          })}

          {risks.map((l) => (
            <li key={l.id} className="rounded-xl p-4" style={{ background: 'rgba(225,29,72,.10)', borderLeft: '3px solid #FB7185' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2.5 min-w-0">
                  <ShieldAlert className="w-4 h-4 mt-1 shrink-0" style={{ color: '#FB7185' }} />
                  <div>
                    <span className="text-xs font-bold" style={{ color: '#FDA4AF' }}>{t.risk}</span>
                    <h3 className="text-sm sm:text-base font-bold leading-snug">{l.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm max-w-[62ch]" style={{ color: '#B6CBE0' }}>{l.punch}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right space-y-2">
                  <div className="text-sm sm:text-base font-black tabular-nums" style={{ textDecoration: resolved.includes(l.id) ? 'line-through' : 'none' }}>
                    {l.value}
                  </div>
                  <Fix id={l.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
