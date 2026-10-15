'use client';

import React, { useEffect, useLayoutEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Code2, Loader2, Printer } from 'lucide-react';
import AuditVisuals, { type Check } from './AuditVisuals';
import { AuditOffer, AuditStickyBar } from './AuditOffer';
import { DEMO, getDemoChecks } from './auditDemo';

type Lang = 'ru' | 'es' | 'en';
const LANGS: Lang[] = ['es', 'en', 'ru'];
const C = { deep: '#0F2744', sea: '#0284C7', ice: '#7DD3FC', mist: '#F0F9FF' };

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Сохраняем поведение страницы; типографика отчёта синхронизирована с первой страницей.
const CSS = `
@keyframes header-drop { 0% { opacity:0; transform:translateY(-18px); filter:blur(7px); } 100% { opacity:1; transform:none; filter:blur(0); } }
@keyframes card-reveal { 0% { opacity:0; transform:translateY(28px); filter:blur(8px); } 100% { opacity:1; transform:none; filter:blur(0); } }
@keyframes text-line-unmask { 0% { transform:translateY(120%); opacity:0; filter:blur(4px); } 100% { transform:translateY(0); opacity:1; filter:blur(0); } }
.anim-header { animation: header-drop 1s cubic-bezier(.22,1,.36,1) both; }
.anim-card { animation: card-reveal 1.1s cubic-bezier(.2,.78,.28,1) .12s both; }
.anim-line-1 { animation: text-line-unmask .78s cubic-bezier(.22,1,.36,1) 40ms both; }
.anim-line-2 { animation: text-line-unmask .78s cubic-bezier(.22,1,.36,1) 140ms both; }
.hero-pending { opacity:0; visibility:hidden; }

/* Shared report typography: match the effective landing-page headline system. */
.audit-report-page {
  font-family: var(--font-geist-sans), Arial, sans-serif !important;
  font-kerning: normal;
  text-rendering: optimizeLegibility;
}
.audit-report-page h1,
.audit-report-page h2,
.audit-report-page h3,
.audit-report-page h4,
.audit-report-page h5,
.audit-report-page h6 {
  font-family: var(--font-geist-sans), Arial, sans-serif !important;
  font-kerning: normal;
  text-wrap: balance;
}
.audit-report-page h2 { letter-spacing: -.045em; line-height: 1.04; }
.audit-report-page h3,
.audit-report-page h4,
.audit-report-page h5,
.audit-report-page h6 { letter-spacing: -.04em; line-height: 1.2; }

/* Same headline proportions as .a2r-app .landing-title on the landing page. */
.audit-report-page .landing-title {
  display: block;
  width: 100%;
  max-width: 15ch;
  margin: 0;
  color: #0F2744;
  font-family: var(--font-geist-sans), Arial, sans-serif !important;
  font-size: clamp(2.6rem, 4.25vw, 3.8rem);
  font-weight: 780;
  line-height: 1.02;
  letter-spacing: -.055em;
  text-wrap: balance;
  overflow-wrap: anywhere;
}
.audit-report-page .landing-title-ink {
  color: #0F2744;
  font: inherit;
  letter-spacing: inherit;
}
.audit-report-page .landing-title-accent {
  color: #0284C7;
  background-image: linear-gradient(105deg, #075985 8%, #0284C7 88%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font: inherit;
  letter-spacing: inherit;
}
/* A domain can be much longer than the short accent word on the landing page. */
.audit-report-page .landing-title .landing-title-accent {
  display: inline-block;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: anywhere;
  vertical-align: baseline;
}
.audit-report-page .report-page-subtitle {
  max-width: 48ch;
  margin: 14px 0 0;
  color: #50677A;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0;
}
.audit-report-page .report-page-heading { max-width: 100%; }
@media (max-width: 900px) {
  .audit-report-page .landing-title { max-width: 100%; font-size: clamp(2.7rem, 7vw, 4rem); }
}
@media (max-width: 680px) {
  .audit-report-page .landing-title { font-size: clamp(2.25rem, 9.2vw, 3.1rem); line-height: 1.04; }
  .audit-report-page .report-page-subtitle { margin-top: 12px; font-size: 14px; line-height: 1.65; }
}
@media (max-width: 380px) {
  .audit-report-page .landing-title { font-size: 2.15rem; }
}
@media (prefers-reduced-motion: reduce) {
  .anim-header, .anim-card, .anim-line-1, .anim-line-2 { animation: none !important; }
}
button:not(:disabled), [role='button'], a[href], summary { cursor: pointer; }
@media print { .no-print { display: none !important; } }
`;

function BusinessIntelligenceReport() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://clinica-mabelle.es';
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const [lang, setLang] = useState<Lang>('ru');
  const [resolvedIssues, setResolvedIssues] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Язык до первого рендера: ?lang → localStorage → cookie → язык браузера
  useIsoLayoutEffect(() => {
    try {
      const ok = (v: string | null | undefined): v is Lang => !!v && ['ru', 'es', 'en'].includes(v);
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      if (ok(fromUrl)) return setLang(fromUrl);
      const saved = localStorage.getItem('a2r_lang');
      if (ok(saved)) return setLang(saved);
      const cookie = document.cookie.match(/(?:^|; )a2r_lang=([^;]*)/)?.[1];
      if (ok(cookie)) return setLang(cookie);
      const nav = navigator.language?.slice(0, 2);
      if (nav === 'es' || nav === 'en') setLang(nav);
    } catch {}
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleLangChange = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem('a2r_lang', next);
      document.cookie = `a2r_lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
      const params = new URLSearchParams(window.location.search);
      params.set('lang', next);
      window.history.replaceState(null, '', `?${params.toString()}`);
    } catch {}
  };

  const toggleResolvedIssue = (id: string) =>
    setResolvedIssues((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const businessData = {
    brandName: 'Clínica & Estética Mabelle Madrid',
    domain,
    titular: 'Dra. Esther González de la Vega',
    monthlyAdSpendEst: '€1,800 – €3,200',
  };

  // Тексты страницы отчёта (только те, что реально используются)
  const dict: Record<Lang, Record<string, string>> = {
    ru: {
      devBadge: 'ПРОТОТИП · Некоммерческая демонстрация (Тестовый режим · Данные смоделированы)',
      printDoc: 'Печать',
      dashboardTitle: `Аудит конверсии: ${domain}`,
      dashboardSubtitle: 'Инспекция по стандартам Испании (LSSI-CE, AEPD) и точкам потери мобильного трафика',
      upsellInstallment: `или 2 платежа по €${DEMO.price / 2}`,
      upsellGuarantee: 'Гарантия окупаемости: возврат средств, если внедрение не увеличит число обращений за 14 дней.',
      upsellWaBtn: 'Обсудить внедрение в WhatsApp',
      upsellCallBtn: 'Забронировать 15-мин звонок',
      bottomBarTitle: 'Демо-режим • Коммерческий приём платежей отключен',
      bottomBarBtn: 'Написать в WhatsApp ➔',
      waMessage: `Здравствуйте! Я изучил аудит по сайту ${targetUrl}. Хочу обсудить устранение найденных ошибок и внедрение WhatsApp-воронки.`,
    },
    es: {
      devBadge: 'PROTOTIPO · Demostración técnica no comercial (Sin actividad mercantil · Datos simulados)',
      printDoc: 'Imprimir',
      dashboardTitle: `Auditoría de conversión: ${domain}`,
      dashboardSubtitle: 'Inspección según normativa española (LSSI-CE, AEPD) y puntos de fuga de tráfico móvil',
      upsellInstallment: `o 2 pagos de ${DEMO.price / 2} €`,
      upsellGuarantee: 'Garantía simulada: devolución del 100% si no genera nuevas reservas en los primeros 14 días.',
      upsellWaBtn: 'Hablar por WhatsApp (prueba)',
      upsellCallBtn: 'Reservar llamada de 15 min',
      bottomBarTitle: 'Modo demostración técnica • Pagos desactivados en este prototipo',
      bottomBarBtn: 'Contactar por WhatsApp ➔',
      waMessage: `¡Hola! He revisado el informe de auditoría de ${targetUrl}. Quiero consultar sobre la resolución de errores y la integración del embudo de WhatsApp.`,
    },
    en: {
      devBadge: 'PROTOTYPE · Non-commercial technical demo (Payments disabled · Mock data)',
      printDoc: 'Print',
      dashboardTitle: `Conversion Audit: ${domain}`,
      dashboardSubtitle: 'Inspected under Spanish regulations (LSSI-CE, AEPD) and mobile traffic conversion bottlenecks',
      upsellInstallment: `or 2 payments of €${DEMO.price / 2}`,
      upsellGuarantee: 'Simulated guarantee: 100% money-back if the system does not generate new bookings within 14 days.',
      upsellWaBtn: 'Discuss on WhatsApp (test)',
      upsellCallBtn: 'Book a 15-min call',
      bottomBarTitle: 'Technical demo mode • Payments disabled in this sandbox',
      bottomBarBtn: 'Contact via WhatsApp ➔',
      waMessage: `Hello! I reviewed the technical audit for ${targetUrl}. I would like to inquire about resolving the bottlenecks and integrating the WhatsApp funnel.`,
    },
  };
  const t = dict[lang];
  const dashboardLead = t.dashboardTitle.slice(0, t.dashboardTitle.length - domain.length).trimEnd();

  // 14 проверок живут в lib/auditDemo.ts: там же их читает тизер лендинга
  const allParameters: Check[] = useMemo(() => getDemoChecks(lang), [lang]);

  const phoneWhatsApp = '34600123456';
  const whatsappUrl = `https://wa.me/${phoneWhatsApp}?text=${encodeURIComponent(t.waMessage ?? '')}`;

  return (
    <div
      suppressHydrationWarning
      className="audit-report-page min-h-screen pb-28 font-sans antialiased selection:bg-[#0284C7]/20"
      style={{ background: C.mist, color: C.deep }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className={`no-print px-3 py-1.5 text-center text-[11px] font-medium flex items-center justify-center gap-2 text-slate-200 ${ready ? 'anim-header' : 'hero-pending'}`} style={{ background: C.deep }}>
        <Code2 className="w-3.5 h-3.5 shrink-0" style={{ color: C.ice }} />
        <span>{t.devBadge}</span>
      </div>

      <header className={`no-print sticky top-0 z-30 h-14 sm:h-16 px-4 sm:px-8 flex items-center bg-white/80 backdrop-blur-xl border-b border-black/5 ${ready ? 'anim-header' : 'hero-pending'}`}>
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4">
          <Link href={`/?lang=${lang}`} className="flex items-center gap-2.5 min-w-0 no-underline">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.deep}, ${C.sea} 60%, ${C.ice})` }}
            >
              A2R
            </div>
            <div className="min-w-0">
              <span className="block font-bold tracking-tight text-sm" style={{ color: C.deep }}>
                Audit<span style={{ color: C.sea }}>2</span>Revenue
              </span>
              <span className="block text-[11px] text-slate-600 font-mono truncate">{domain}</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex p-0.5 rounded-full bg-black/[0.04] border border-black/5">
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => handleLangChange(l)}
                  aria-pressed={lang === l}
                  className={`px-3 py-1 rounded-full uppercase tracking-wider text-[11px] transition-colors ${
                    lang === l ? 'bg-white font-bold shadow-sm' : 'text-slate-600 hover:text-[#0F2744]'
                  }`}
                  style={lang === l ? { color: C.sea } : undefined}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
              style={{ color: C.deep }}
            >
              <Printer className="w-3.5 h-3.5" style={{ color: C.sea }} />
              <span className="hidden sm:inline">{t.printDoc}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-7 py-8 sm:py-12 space-y-8">
        <div className={`report-page-heading ${ready ? 'anim-header' : 'hero-pending'}`}>
          <h1 className="landing-title overflow-visible">
            <span className={`landing-title-ink inline-block pe-1.5 overflow-hidden ${ready ? 'anim-line-1' : ''}`}>
              {dashboardLead}
            </span>{' '}
            <span className={`landing-title-accent inline-block pe-2 -me-2 overflow-visible ${ready ? 'anim-line-2' : ''}`}>
              {domain}
            </span>
          </h1>
          <p className="report-page-subtitle">{t.dashboardSubtitle}</p>
        </div>

        <div className={`space-y-6 ${ready ? 'anim-card' : 'hero-pending'}`}>
          <AuditVisuals
            lang={lang}
            checks={allParameters}
            resolved={resolvedIssues}
            onToggle={toggleResolvedIssue}
          />
        </div>

        <AuditOffer
          lang={lang}
          checks={allParameters}
          includeIds={['whatsapp-funnel', 'lssi-cif', 'phone-bottleneck']}
          price={DEMO.price}
          lossMin={DEMO.adLossMin}
          lossMax={DEMO.adLossMax}
          deliveryDays={5}
          installment={t.upsellInstallment}
          guarantee={t.upsellGuarantee}
          note={t.bottomBarTitle}
          ctaLabel={t.upsellWaBtn}
          ctaHref={whatsappUrl}
          callLabel={t.upsellCallBtn}
          callHref="https://calendly.com"
        />
      </main>

      <div className="no-print">
        <AuditStickyBar
          lang={lang}
          checks={allParameters}
          resolved={resolvedIssues}
          ctaLabel={t.bottomBarBtn}
          ctaHref={whatsappUrl}
        />
      </div>
    </div>
  );
}

export default function AuditReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-slate-600" style={{ background: C.mist }}>
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: C.sea }} />
          <p className="text-sm font-medium">Loading report…</p>
        </div>
      }
    >
      <BusinessIntelligenceReport />
    </Suspense>
  );
}
