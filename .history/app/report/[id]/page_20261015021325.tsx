'use client';

import React, { useEffect, useLayoutEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Code2, Loader2, Printer } from 'lucide-react';
import AuditVisuals, { type Check } from './AuditVisuals';
import { AuditOffer, AuditStickyBar } from './AuditOffer';

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

  // ───────────── ВСТАВКА 1 ─────────────
  // Замените следующую строку вашим блоком из старого файла, без изменений:
  //   const t = { ru: {...}, es: {...}, en: {...} }[lang];
  const t = {} as Record<string, string>;

  // ───────────── ВСТАВКА 2 ─────────────
  // Замените следующую строку вашим блоком из старого файла, без изменений:
  //   const allParameters = useMemo(() => [ ...14 проверок... ], [lang, businessData.titular]);
  const allParameters: Check[] = useMemo(() => [], []);

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
            leaks={[
              { id: 'whatsapp-funnel', title: t.leak1Title, punch: t.leak1Punch, value: `${t.radarAdSpendVal} ${t.radarAdSpendPerMonth}`, weight: 100, effortH: 2 },
              { id: 'phone-bottleneck', title: t.leak3Title, punch: t.leak3Punch, value: `${t.radarCallVal} ${t.radarCallPerMonth}`, weight: 70, effortH: 4 },
              { id: 'booking-widget', title: t.leak4Title, punch: t.leak4Punch, value: t.leak4Badge, weight: 50, effortH: 8 },
              { id: 'lssi-cif', title: t.leak2Title, punch: t.leak2Punch, value: t.radarFineVal, weight: 0, effortH: 1, kind: 'risk' },
            ]}
          />
        </div>

        <AuditOffer
          lang={lang}
          checks={allParameters}
          resolved={resolvedIssues}
          steps={[
            { id: 'whatsapp-funnel', title: t.devPlan1Title, desc: t.devPlan1Desc, effortH: 2 },
            { id: 'lssi-cif', title: t.devPlan2Title, desc: t.devPlan2Desc, effortH: 1 },
            { id: 'phone-bottleneck', title: t.devPlan3Title, desc: t.devPlan3Desc, effortH: 4 },
          ]}
          price={900}
          lossMin={1200}
          lossMax={1600}
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
