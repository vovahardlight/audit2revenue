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

// Единственный «выход на сцену»: шапка падает сверху, затем главный блок поднимается
const CSS = `
@keyframes header-drop { 0% { opacity:0; transform:translateY(-18px); filter:blur(7px); } 100% { opacity:1; transform:none; filter:blur(0); } }
@keyframes card-reveal { 0% { opacity:0; transform:translateY(28px); filter:blur(8px); } 100% { opacity:1; transform:none; filter:blur(0); } }
.anim-header { animation: header-drop 1s cubic-bezier(.22,1,.36,1) both; }
.anim-card { animation: card-reveal 1.1s cubic-bezier(.2,.78,.28,1) .12s both; }
.hero-pending { opacity:0; visibility:hidden; }
@media (prefers-reduced-motion: reduce) { .anim-header, .anim-card { animation: none; } }
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

  // 14 проверок живут в lib/auditDemo.ts: там же их читает тизер лендинга
  const allParameters: Check[] = useMemo(() => getDemoChecks(lang), [lang]);

  const phoneWhatsApp = '34600123456';
  const whatsappUrl = `https://wa.me/${phoneWhatsApp}?text=${encodeURIComponent(t.waMessage ?? '')}`;

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen pb-28 font-sans antialiased selection:bg-[#0284C7]/20"
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
        <div className={ready ? 'anim-header' : 'hero-pending'}>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: C.deep }}>
            {t.dashboardTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-[70ch] leading-relaxed">{t.dashboardSubtitle}</p>
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
