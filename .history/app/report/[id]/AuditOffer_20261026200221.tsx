'use client';

import React from 'react';
import { CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { score, type Check } from './AuditVisuals';

type Lang = 'ru' | 'es' | 'en';

const C = {
  deep: '#0F2744',
  sea: '#0284C7',
  ice: '#7DD3FC',
  mist: '#F0F9FF',
  track: '#DCEEF9',
};

const L = {
  ru: {
    kicker: 'Внедрение под ключ',
    title: 'Исправим все ошибки за вас за 5 рабочих дней',
    sub: 'Вам не нужно нанимать программистов или разбираться в коде. Вы получаете полностью настроенный сайт, который защищен от штрафов и конвертирует клики в реальные записи.',
    resultLabel: 'Готовность к продажам',
    badgeResult: '✓ Устранение всех критических утечек',
    includesTitle: 'Что конкретно мы сделаем под ключ:',
    currentLossLabel: 'Потери бизнеса прямо сейчас:',
    mo: 'мес',
    once: 'разово',
    termTitle: 'Срок работы',
    daysCount: '5 рабочих дней',
    paybackTitle: 'Окупаемость',
    paybackPrefix: 'за',
    daysWord: 'дней',
    guaranteeTitle: '100% гарантия результата',
    guaranteeText: 'Полный возврат средств, если после внедрения число обращений не увеличится в течение 14 дней.',
    callPrefix: 'или',
    idx: 'Индекс',
    items: {
      'whatsapp-funnel': {
        title: 'Быстрая запись клиентов через WhatsApp',
        desc: 'Заметная кнопка чата в 1 клик с готовым приветствием — клиенты с мобильных не уходят, а сразу пишут вам.',
      },
      'lssi-cif': {
        title: 'Полная защита от штрафов в Испании',
        desc: 'Оформление обязательных реквизитов компании и юридических страниц по стандартам законодательства Испании.',
      },
      'phone-bottleneck': {
        title: 'Ни одного потерянного звонка и клиента',
        desc: 'Звонок в одно касание и синхронизация с Google Maps, чтобы клиенты дозванивались и не уходили к конкурентам.',
      },
    },
  },
  es: {
    kicker: 'Solución llave en mano',
    title: 'Corregimos todos los fallos por ti en 5 días',
    sub: 'Olvídate de contratar programadores o descifrar código. Dejamos tu web lista para convertir visitas en citas y totalmente protegida ante sanciones.',
    resultLabel: 'Preparación comercial',
    badgeResult: '✓ Eliminación de fugas críticas',
    includesTitle: 'Qué incluye la puesta a punto:',
    currentLossLabel: 'Pérdidas estimadas ahora:',
    mo: 'mes',
    once: 'pago único',
    termTitle: 'Plazo de entrega',
    daysCount: '5 días laborables',
    paybackTitle: 'Amortización',
    paybackPrefix: 'en',
    daysWord: 'días',
    guaranteeTitle: '100% garantía de resultado',
    guaranteeText: 'Devolución íntegra si tras la puesta a punto no aumentan las reservas y consultas en los primeros 14 días.',
    callPrefix: 'o',
    idx: 'Índice',
    items: {
      'whatsapp-funnel': {
        title: 'Contacto y reservas directas por WhatsApp',
        desc: 'Botón flotante visible con mensaje inicial listo para pedir cita en 1 toque desde el móvil.',
      },
      'lssi-cif': {
        title: 'Protección legal frente a sanciones en España',
        desc: 'Inclusión de todos los datos fiscales obligatorios y páginas legales reglamentarias.',
      },
      'phone-bottleneck': {
        title: 'Cero llamadas perdidas y sincronización con Maps',
        desc: 'Llamada directa en un clic y horarios alineados con Google Maps para no perder ni un paciente.',
      },
    },
  },
  en: {
    kicker: 'Turnkey Implementation',
    title: 'We fix all errors for you in 5 business days',
    sub: 'No need to hire developers or worry about code. You get a fully compliant website optimized to convert visitors into paying clients from day one.',
    resultLabel: 'Sales readiness',
    badgeResult: '✓ Zero critical client leaks',
    includesTitle: 'What we deliver:',
    currentLossLabel: 'Estimated business loss now:',
    mo: 'mo',
    once: 'one-off',
    termTitle: 'Turnaround',
    daysCount: '5 business days',
    paybackTitle: 'Payback',
    paybackPrefix: 'in',
    daysWord: 'days',
    guaranteeTitle: '100% money-back guarantee',
    guaranteeText: 'Full refund if enquiries and bookings do not increase within 14 days after implementation.',
    callPrefix: 'or',
    idx: 'Index',
    items: {
      'whatsapp-funnel': {
        title: 'Instant 1-tap WhatsApp booking',
        desc: 'High-visibility floating chat button with auto-filled message — mobile visitors book instantly.',
      },
      'lssi-cif': {
        title: 'Full regulatory fine protection in Spain',
        desc: 'Proper company registration and tax details in compliance with Spanish internet regulations.',
      },
      'phone-bottleneck': {
        title: 'Zero missed phone leads & Google Maps sync',
        desc: 'Click-to-call dialling and synced working hours with Google Maps so callers always reach you.',
      },
    },
  },
};

interface OfferProps {
  lang: Lang;
  checks: Check[];
  includeIds: string[];
  price: number;
  lossMin: number;
  lossMax: number;
  deliveryDays: number;
  installment?: string;
  guarantee?: string;
  note?: string;
  ctaLabel: string;
  ctaHref: string;
  callLabel: string;
  callHref: string;
}

export function AuditOffer(p: OfferProps) {
  const t = L[p.lang];

  const before = score(p.checks, (c) => c.status);
  const fast = Math.ceil((p.price / p.lossMax) * 30);
  const slow = Math.ceil((p.price / p.lossMin) * 30);
  const money = (n: number) => `€${n.toLocaleString(p.lang === 'en' ? 'en-US' : 'es-ES')}`;

  const included = p.includeIds
    .map((id) => {
      const check = p.checks.find((c) => c.id === id);
      const customCopy = t.items[id as keyof typeof t.items];
      return {
        id,
        title: customCopy?.title || check?.title || id,
        desc: customCopy?.desc || check?.action || check?.desc || '',
      };
    });

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-10 shadow-[0_20px_60px_rgba(15,39,68,.08)] transition-all font-sans antialiased"
      style={{ border: `1px solid ${C.track}` }}
    >
      {/* Верхняя акцентная ледяная полоска */}
      <div
        className="absolute inset-x-12 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${C.sea}, transparent)` }}
        aria-hidden
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ЛЕВАЯ КОЛОНКА (7 колонок на десктопе): Состав работ и трансформация */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3"
              style={{ background: 'rgba(2,132,199,0.1)', color: C.sea }}
            >
              {t.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black tracking-tight leading-tight" style={{ color: C.deep }}>
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed max-w-[56ch]">
              {t.sub}
            </p>
          </div>

          {/* Наглядная шкала трансформации: Было ➔ Станет */}
          <div
            className="p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3"
            style={{ background: '#F8FAFC', border: `1px solid ${C.track}` }}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                {t.resultLabel}
              </span>
              <div className="flex items-center gap-2 mt-0.5 tabular-nums">
                <span className="text-2xl sm:text-3xl font-black text-rose-600">{before}%</span>
                <span className="text-slate-400 font-bold text-lg" aria-hidden>→</span>
                <span className="text-2xl sm:text-3xl font-black" style={{ color: C.sea }}>95%+</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              {t.badgeResult}
            </span>
          </div>

          {/* Список внедряемых решений на понятном языке бизнеса */}
          <div className="space-y-4 pt-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {t.includesTitle}
            </p>

            <div className="space-y-3.5">
              {included.map((item) => (
                <div key={item.id} className="flex items-start gap-3.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: C.mist, border: `1px solid ${C.ice}`, color: C.sea }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-[15px] font-bold leading-snug" style={{ color: C.deep }}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА (5 колонок на десктопе): Финансовый модуль и действие */}
        <aside className="lg:col-span-5">
          <div
            className="rounded-3xl p-6 sm:p-7 space-y-5 text-left"
            style={{ background: C.mist, border: `1px solid ${C.ice}` }}
          >
            {/* Якорь текущих финансовых потерь */}
            <div className="rounded-2xl bg-white border border-rose-100 p-3.5 flex items-center justify-between shadow-xs">
              <span className="text-xs font-bold" style={{ color: C.deep }}>{t.currentLossLabel}</span>
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 tabular-nums">
                {money(p.lossMin)} – {money(p.lossMax)} / {t.mo}
              </span>
            </div>

            {/* Стоимость услуги */}
            <div className="text-center pt-1">
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums" style={{ color: C.deep }}>
                  {money(p.price)}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.once}</span>
              </div>
              {p.installment && (
                <p className="text-xs font-semibold mt-1" style={{ color: C.sea }}>
                  {p.installment}
                </p>
              )}
            </div>

            {/* Сроки и окупаемость */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-white border" style={{ borderColor: C.track }}>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.termTitle}</span>
                <strong className="text-xs font-black mt-0.5 block" style={{ color: C.deep }}>{t.daysCount}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-white border" style={{ borderColor: C.track }}>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.paybackTitle}</span>
                <strong className="text-xs font-black text-emerald-700 mt-0.5 block tabular-nums">
                  {t.paybackPrefix} {fast}–{slow} {t.daysWord}
                </strong>
              </div>
            </div>

            {/* Кнопка WhatsApp и ссылка звонка */}
            <div className="space-y-2.5 pt-1">
              <a
                href={p.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: `linear-gradient(135deg, ${C.sea}, ${C.deep})` }}
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{p.ctaLabel}</span>
              </a>

              <a
                href={p.callHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-xs font-bold transition py-1 hover:underline"
                style={{ color: C.sea }}
              >
                {t.callPrefix} {p.callLabel} →
              </a>
            </div>

            {/* Зеленая плашка 100% гарантии */}
            <div className="rounded-2xl p-3.5 bg-emerald-50/90 border border-emerald-200 flex items-start gap-2.5 text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11.5px] leading-snug">
                <strong className="text-emerald-950 font-bold block mb-0.5">{t.guaranteeTitle}</strong>
                <span className="text-emerald-800">{p.guarantee || t.guaranteeText}</span>
              </div>
            </div>

            {p.note && (
              <p className="text-[10px] text-center text-slate-400 leading-tight pt-0.5">
                {p.note}
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

/* Нижняя панель */
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
    <aside
      className="fixed bottom-0 inset-x-0 z-50 px-4 py-2.5 backdrop-blur-xl"
      style={{ background: 'rgba(15,39,68,.95)', borderTop: '1px solid rgba(125,211,252,.25)' }}
    >
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