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
    kicker: 'Помощь с исправлениями',
    title: 'Поможем исправить найденные ошибки за 5 рабочих дней',
    sub: 'Без необходимости разбираться в сложных настройках. Согласуем проблемы и приведём в порядок способы связи, данные компании и другие найденные недочёты.',
    includesTitle: 'Что можно исправить:',
    currentLossLabel: 'Возможная потеря обращений:',
    mo: 'мес',
    once: 'разово',
    termTitle: 'Срок работы',
    daysCount: '5 рабочих дней',
    guaranteeTitle: 'Оценка, а не обещание результата',
    guaranteeText: 'Расчёт возможных потерь основан на допущениях и не гарантирует рост обращений после исправлений.',
    callPrefix: 'или',
    idx: 'Оценка',
    items: {
      'whatsapp-funnel': {
        title: 'Удобный контакт через WhatsApp',
        desc: 'Заметная кнопка позволит посетителю сразу написать вам, не разыскивая контакты.',
      },
      'lssi-cif': {
        title: 'Необходимые данные компании',
        desc: 'Проверим, указана ли на сайте необходимая информация о компании.',
      },
      'phone-bottleneck': {
        title: 'Совпадающие контакты и часы работы',
        desc: 'Проверим телефон и часы работы на сайте и в Google Maps, чтобы клиентам было проще связаться.',
      },
    },
  },
  es: {
    kicker: 'Ayuda para corregir errores',
    title: 'Te ayudamos a corregir los errores detectados en 5 días laborables',
    sub: 'Sin tener que ocuparte de ajustes complicados. Acordamos qué corregir y mejoramos el contacto, los datos de la empresa y otros problemas detectados.',
    includesTitle: 'Qué se puede mejorar:',
    currentLossLabel: 'Posibles consultas perdidas:',
    mo: 'mes',
    once: 'pago único',
    termTitle: 'Plazo de entrega',
    daysCount: '5 días laborables',
    guaranteeTitle: 'Una estimación, no una promesa',
    guaranteeText: 'La estimación de posibles pérdidas se basa en supuestos y no garantiza más consultas tras las mejoras.',
    callPrefix: 'o',
    idx: 'Índice',
    items: {
      'whatsapp-funnel': {
        title: 'Contacto fácil por WhatsApp',
        desc: 'Un botón visible permite escribirte sin tener que buscar tus datos de contacto.',
      },
      'lssi-cif': {
        title: 'Datos necesarios de la empresa',
        desc: 'Revisamos si la web muestra la información necesaria sobre tu empresa.',
      },
      'phone-bottleneck': {
        title: 'Mismos datos en la web y Google Maps',
        desc: 'Comprobamos que el teléfono y el horario coincidan para que los clientes puedan contactar.',
      },
    },
  },
  en: {
    kicker: 'Turnkey Implementation',
    title: 'We help fix the issues found in 5 business days',
    sub: 'No need to deal with complicated settings. We agree on what to fix and improve contact options, business details, and other issues found.',
    includesTitle: 'What can be improved:',
    currentLossLabel: 'Potential lost enquiries:',
    mo: 'mo',
    once: 'one-off',
    termTitle: 'Turnaround',
    daysCount: '5 business days',
    guaranteeTitle: 'An estimate, not a promise',
    guaranteeText: 'Potential losses are estimated using assumptions and do not guarantee more enquiries after changes.',
    callPrefix: 'or',
    idx: 'Index',
    items: {
      'whatsapp-funnel': {
        title: 'Easy contact through WhatsApp',
        desc: 'A visible button lets visitors message you without searching for your contact details.',
      },
      'lssi-cif': {
        title: 'Required business details',
        desc: 'We check whether your website shows the necessary information about your business.',
      },
      'phone-bottleneck': {
        title: 'Matching details on your website and Google Maps',
        desc: 'We check that your phone number and opening hours match so customers can reach you.',
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

            {/* Срок выполнения и оговорка к демонстрационной оценке */}
            <div className="grid grid-cols-1 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-white border" style={{ borderColor: C.track }}>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.termTitle}</span>
                <strong className="text-xs font-black mt-0.5 block" style={{ color: C.deep }}>{t.daysCount}</strong>
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
