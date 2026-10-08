'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Sparkles,
  ShieldAlert,
  Lock,
  Loader2,
  AlertTriangle,
  XCircle,
  UserRound,
  Target,
  MessageCircle,
  Activity,
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

export default function AppleNordicGlacierPureLanding() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');
  const [stage, setStage] = useState<
    'idle' | 'scanning' | 'teaser'
  >('idle');

  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // PRELOADER / INITIAL REVEAL
  const [pageLoading, setPageLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealStep, setRevealStep] = useState(0);

  // COOKIE MODAL
  const [showCookieModal, setShowCookieModal] =
    useState(false);

  const hasUrl = useMemo(
    () => url.trim().length > 3,
    [url]
  );

  const t = {
    ru: {
      h1_1: 'Найдите проблемы на сайте,',
      h1_2: 'которые мешают вам зарабатывать.',
      btn: 'Проверить сайт',
      placeholder:
        'https://vash-salon-ili-klinika.es',
      scanningTitle:
        'Интеллектуальная диагностика',

      previewLabel: 'LIVE AI AUDIT',
      previewStatus: 'ANALYSIS PREVIEW',
      exampleBusiness: 'Example Business',
      scoreLabel: 'AUDIT SCORE',
      decisionMaker: 'ЛПР',
      decisionMakerValue:
        'Найден в открытых источниках',
      ads: 'Реклама',
      adsValue:
        'Meta + Google · обнаружено',
      commercialLeak: 'Точка потери',
      commercialLeakValue: 'НЕТ WHATSAPP',
      pitch: 'Сгенерировать WhatsApp-питч',
      pitchLocked: 'Разблокируется после анализа',

      heroMicro:
        'Получите такой же аудит любого сайта за несколько секунд.',

      footer:
        '© 2026 Audit2Revenue.es — Сервис аудита и роста выручки сайтов в Испании.',

      cookieTitle: 'Мы используем cookies',
      cookieText:
        'Мы используем необходимые cookies для работы сайта и, с вашего согласия, дополнительные cookies для аналитики и улучшения сервиса.',
      cookieAccept: 'Принять все',
      cookieNecessary: 'Только необходимые',
    },

    es: {
      h1_1: 'Encuentra los fallos en tu web,',
      h1_2: 'que te hacen perder clientes.',
      btn: 'Analizar web',
      placeholder:
        'https://tu-clinica-o-salon.es',
      scanningTitle:
        'Diagnóstico inteligente',

      previewLabel: 'LIVE AI AUDIT',
      previewStatus: 'ANÁLISIS EN VIVO',
      exampleBusiness: 'Example Business',
      scoreLabel: 'PUNTUACIÓN',
      decisionMaker: 'Responsable',
      decisionMakerValue:
        'Identificado en fuentes públicas',
      ads: 'Publicidad',
      adsValue:
        'Meta + Google · detectado',
      commercialLeak: 'Fuga comercial',
      commercialLeakValue: 'SIN WHATSAPP',
      pitch: 'Generar pitch de WhatsApp',
      pitchLocked: 'Se desbloquea después del análisis',

      heroMicro:
        'Obtén una auditoría como esta para cualquier web en pocos segundos.',

      footer:
        '© 2026 Audit2Revenue.es — Servicio de auditoría y crecimiento de webs en España.',

      cookieTitle: 'Utilizamos cookies',
      cookieText:
        'Utilizamos cookies necesarias para el funcionamiento del sitio y, con tu consentimiento, cookies adicionales para analizar y mejorar el servicio.',
      cookieAccept: 'Aceptar todas',
      cookieNecessary: 'Solo necesarias',
    },

    en: {
      h1_1: 'Find the website issues,',
      h1_2: 'that cost you customers.',
      btn: 'Analyze Website',
      placeholder:
        'https://your-business.es',
      scanningTitle:
        'Intelligent Website Audit',

      previewLabel: 'LIVE AI AUDIT',
      previewStatus: 'ANALYSIS PREVIEW',
      exampleBusiness: 'Example Business',
      scoreLabel: 'AUDIT SCORE',
      decisionMaker: 'Decision Maker',
      decisionMakerValue:
        'Identified from public sources',
      ads: 'Advertising',
      adsValue:
        'Meta + Google · detected',
      commercialLeak: 'Commercial Leak',
      commercialLeakValue: 'NO WHATSAPP',
      pitch: 'Generate WhatsApp Pitch',
      pitchLocked: 'Unlocks after website analysis',

      heroMicro:
        'Get an audit like this for any website in just a few seconds.',

      footer:
        '© 2026 Audit2Revenue.es — Website audit and revenue growth service in Spain.',

      cookieTitle: 'We use cookies',
      cookieText:
        'We use necessary cookies to operate the website and, with your consent, additional cookies to analyze and improve the service.',
      cookieAccept: 'Accept all',
      cookieNecessary: 'Necessary only',
    },
  }[lang];

  // =========================================================
  // PRELOADER + INITIAL REVEAL
  // =========================================================

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1100;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const p = Math.min(
        Math.round((elapsed / duration) * 100),
        100
      );

      setLoadProgress(p);

      if (elapsed >= duration) {
        clearInterval(interval);

        setTimeout(() => {
          setPageLoading(false);

          // Header
          setTimeout(
            () => setRevealStep(1),
            120
          );

          // Audit card
          setTimeout(
            () => setRevealStep(2),
            300
          );

          // H1 line 1
          setTimeout(
            () => setRevealStep(3),
            480
          );

          // H1 line 2
          setTimeout(
            () => setRevealStep(4),
            660
          );

          // Input
          setTimeout(
            () => setRevealStep(5),
            840
          );

          // Footer
          setTimeout(
            () => setRevealStep(6),
            1020
          );
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // =========================================================
  // SCANNING
  // =========================================================

  const handleStartScan = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!url.trim()) return;

    let formatted = url.trim();

    if (
      !formatted.startsWith('http://') &&
      !formatted.startsWith('https://')
    ) {
      formatted = `https://${formatted}`;
      setUrl(formatted);
    }

    setStage('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (stage !== 'scanning') return;

    const startTime = Date.now();
    const duration = 6500;

    const timer = setInterval(() => {
      const elapsed =
        Date.now() - startTime;

      const currentP = Math.min(
        Math.round(
          (elapsed / duration) * 100
        ),
        100
      );

      setProgress(currentP);

      if (elapsed >= duration) {
        clearInterval(timer);

        setTimeout(() => {
          setStage('teaser');
        }, 600);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [stage]);

  // =========================================================
  // COOKIE MODAL
  // =========================================================

  useEffect(() => {
    if (
      revealStep !== 6 ||
      pageLoading
    ) {
      return;
    }

    const consent = localStorage.getItem(
      'a2r_cookie_consent'
    );

    if (consent) return;

    const timer = window.setTimeout(() => {
      setShowCookieModal(true);
    }, 800);

    return () =>
      window.clearTimeout(timer);
  }, [revealStep, pageLoading]);

  const handleCookieChoice = (
    choice: 'all' | 'necessary'
  ) => {
    localStorage.setItem(
      'a2r_cookie_consent',
      choice
    );

    setShowCookieModal(false);
  };

  // =========================================================
  // STRIPE
  // =========================================================

  const handleStripeCheckout =
    async () => {
      setIsRedirecting(true);

      try {
        const res = await fetch(
          '/api/checkout',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              targetUrl: url,
              country: 'ES',
            }),
          }
        );

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          router.push(
            `/report/demo-audit?url=${encodeURIComponent(
              url
            )}`
          );
        }
      } catch {
        router.push(
          `/report/demo-audit?url=${encodeURIComponent(
            url
          )}`
        );
      } finally {
        setIsRedirecting(false);
      }
    };

  // =========================================================
  // CHECKLIST
  // =========================================================

  const scanChecklist = [
    {
      title:
        'Доступность и мобильная скорость',
      discovered:
        '✓ Сервер отвечает за 160ms, SSL TLS 1.3 активен',
      type: 'ok',
    },
    {
      title:
        'Рекламные трекеры и пиксели',
      discovered:
        '✓ Активны Meta Pixel (Instagram) и Google Ads Tag',
      type: 'ok',
    },
    {
      title:
        'Конверсия мобильного трафика',
      discovered:
        '⚠️ Найдено: нет кнопки WhatsApp, потеря до 40% переходов',
      type: 'warn',
    },
    {
      title:
        'Репутация и отзывы в картах Google',
      discovered:
        '✓ Рейтинг 4.8★ (384 отзыва), найдены жалобы на недозвон',
      type: 'warn',
    },
    {
      title:
        'Юридический аудит LSSI-CE (Испания)',
      discovered:
        '⚠️ Критично: тестовая заглушка вместо налогового NIF/CIF',
      type: 'error',
    },
  ];

  return (
    <div className="relative min-h-[100dvh] bg-[#FBFBFD] text-[#1D1D1F] flex flex-col justify-between overflow-x-hidden selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">

      {/* =====================================================
          PRELOADER
      ====================================================== */}

      <div
        className={`fixed inset-0 z-50 bg-[#FBFBFD] flex flex-col items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
          pageLoading
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-[1.04] blur-md invisible'
        }`}
      >
        <div className="w-64 space-y-4 text-center">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-white text-sm shadow-md mx-auto animate-pulse">
            A2R
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#0284C7] font-semibold block font-mono">
              INITIALIZING AI CORE
            </span>

            <div className="flex items-baseline justify-center gap-1 font-mono text-3xl font-extrabold text-[#0F2744]">
              <span>
                {loadProgress}
              </span>

              <span className="text-xs text-[#0284C7] font-bold">
                %
              </span>
            </div>
          </div>

          <div className="w-full bg-black/[0.04] h-[2px] rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-100 ease-out"
              style={{
                width: `${loadProgress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          GLOBAL ANIMATIONS
      ====================================================== */}

      <style jsx global>{`
        @keyframes header-drop {
          0% {
            opacity: 0;
            transform: translateY(-24px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .anim-header {
          animation:
            header-drop
            0.8s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        @keyframes card-reveal {
          0% {
            opacity: 0;
            transform:
              translateY(34px)
              scale(0.94)
              rotateX(8deg);
            filter: blur(10px);
          }

          60% {
            opacity: 1;
            transform:
              translateY(-4px)
              scale(1.015)
              rotateX(-1deg);
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1)
              rotateX(0);
            filter: blur(0);
          }
        }

        .anim-card {
          animation:
            card-reveal
            1s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        @keyframes text-line-unmask {
          0% {
            transform:
              translateY(125%)
              rotateX(-16deg);
            opacity: 0;
            filter: blur(6px);
          }

          100% {
            transform:
              translateY(0%)
              rotateX(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }

        .anim-line-1 {
          animation:
            text-line-unmask
            0.9s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .anim-line-2 {
          animation:
            text-line-unmask
            0.9s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        @keyframes bar-ignition {
          0% {
            opacity: 0;
            transform:
              translateY(28px)
              scale(0.94);
            filter: blur(10px);
          }

          65% {
            transform:
              translateY(-2px)
              scale(1.01);
            filter: blur(0px);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            filter: blur(0px);
          }
        }

        .anim-bar {
          animation:
            bar-ignition
            0.95s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        @keyframes footer-fade {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .anim-footer {
          animation:
            footer-fade
            0.7s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        @keyframes audit-float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        .audit-float {
          animation:
            audit-float
            5s
            ease-in-out
            infinite;
        }

        @keyframes dot-pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        .dot-pulse {
          animation:
            dot-pulse
            2.2s
            ease-in-out
            infinite;
        }

        @keyframes beam-drift {
          0% {
            transform:
              translate3d(-8%, -2%, 0)
              rotate(-8deg);
          }

          50% {
            transform:
              translate3d(8%, 4%, 0)
              rotate(8deg);
          }

          100% {
            transform:
              translate3d(-8%, -2%, 0)
              rotate(-8deg);
          }
        }

        .beam-drift {
          animation:
            beam-drift
            9s
            ease-in-out
            infinite;
        }

        .audit-card-perspective {
          perspective: 1000px;
        }

        @keyframes cookie-backdrop-in {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes cookie-modal-in {
          0% {
            opacity: 0;
            transform:
              translateY(24px)
              scale(0.96);
            filter: blur(8px);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            filter: blur(0);
          }
        }

        .anim-cookie-backdrop {
          animation:
            cookie-backdrop-in
            0.45s
            ease-out
            forwards;
        }

        .anim-cookie-modal {
          animation:
            cookie-modal-in
            0.65s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }
      `}</style>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className={`relative z-20 h-15 sm:h-16 border-b border-black/[0.05] backdrop-blur-xl bg-white/80 px-6 sm:px-8 flex items-center shrink-0 ${
          revealStep >= 1
            ? 'anim-header'
            : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-[#0284C7]/30">
              A2R
            </div>

            <span className="font-semibold tracking-tight text-[#1D1D1F] text-[15px]">
              Audit
              <span className="text-[#0284C7]">
                2
              </span>
              Revenue
            </span>
          </div>

          <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05] text-xs font-semibold">
            {(
              ['es', 'en', 'ru'] as Lang[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setLang(item)
                }
                className={`px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[11px] ${
                  lang === item
                    ? 'bg-white text-[#0284C7] shadow-sm font-bold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 sm:px-6 py-7 sm:py-10 w-full">

        {/* ===================================================
            IDLE
        ==================================================== */}

        {stage === 'idle' && (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center">

            {/* =================================================
                LIVE AUDIT PREVIEW CARD
            ================================================== */}

            <div className="audit-card-perspective w-full flex justify-center mb-5 sm:mb-7">

              <div
                className={`relative w-full max-w-[520px] ${
                  revealStep >= 2
                    ? 'anim-card'
                    : 'opacity-0'
                }`}
              >

                {/* Ambient glow */}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[70%] rounded-full bg-[#0284C7]/15 blur-[70px] pointer-events-none" />

                <div className="absolute -top-10 -left-8 w-28 h-28 rounded-full bg-[#7DD3FC]/20 blur-3xl pointer-events-none beam-drift" />

                <div className="absolute -bottom-10 -right-8 w-32 h-32 rounded-full bg-[#0284C7]/15 blur-3xl pointer-events-none" />

                {/* Decorative dots */}

                <div className="absolute -top-2 left-[12%] w-1.5 h-1.5 rounded-full bg-[#0284C7] dot-pulse pointer-events-none" />

                <div
                  className="absolute top-[18%] -right-2 w-1 h-1 rounded-full bg-[#7DD3FC] dot-pulse pointer-events-none"
                  style={{
                    animationDelay:
                      '0.7s',
                  }}
                />

                <div
                  className="absolute bottom-[13%] -left-2 w-1 h-1 rounded-full bg-[#0284C7] dot-pulse pointer-events-none"
                  style={{
                    animationDelay:
                      '1.2s',
                  }}
                />

                {/* Card */}

                <div className="relative audit-float rounded-[28px] border border-white/10 bg-[#0D1826]/95 shadow-[0_24px_80px_rgba(15,39,68,0.24)] overflow-hidden">

                  {/* Top glow */}

                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent opacity-70" />

                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0284C7]/10 to-transparent pointer-events-none" />

                  <div className="relative p-4 sm:p-5">

                    {/* HEADER */}

                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="relative w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center shadow-[0_0_24px_rgba(2,132,199,0.25)]">
                          <Activity className="w-5 h-5 text-white" />

                          <span className="absolute -right-0.5 -top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0D1826] dot-pulse" />
                        </div>

                        <div className="text-left min-w-0">

                          <div className="flex items-center gap-2">
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#7DD3FC] font-bold">
                              {t.previewLabel}
                            </span>

                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-[8px] text-emerald-300 font-bold uppercase tracking-wider">
                              LIVE
                            </span>
                          </div>

                          <div className="text-sm sm:text-[15px] font-bold text-white truncate mt-1">
                            {t.exampleBusiness}
                          </div>
                        </div>
                      </div>

                      {/* SCORE */}

                      <div className="shrink-0 text-right">
                        <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                          {t.scoreLabel}
                        </div>

                        <div className="flex items-baseline gap-0.5">
                          <span className="text-2xl sm:text-3xl leading-none font-black text-rose-400 tracking-tight">
                            85
                          </span>

                          <span className="text-[10px] text-slate-500 font-semibold">
                            /100
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DIVIDER */}

                    <div className="h-px bg-white/[0.07] my-4" />

                    {/* INSIGHTS */}

                    <div className="space-y-2.5">

                      {/* Decision maker */}

                      <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.035] border border-white/[0.055] px-3 py-2.5">

                        <div className="flex items-center gap-2 min-w-0">

                          <UserRound className="w-3.5 h-3.5 text-slate-400 shrink-0" />

                          <span className="text-[11px] sm:text-xs text-slate-400 shrink-0">
                            {t.decisionMaker}
                          </span>
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200 text-right truncate">
                          {t.decisionMakerValue}
                        </span>
                      </div>

                      {/* Advertising */}

                      <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.035] border border-white/[0.055] px-3 py-2.5">

                        <div className="flex items-center gap-2 min-w-0">

                          <Target className="w-3.5 h-3.5 text-[#7DD3FC] shrink-0" />

                          <span className="text-[11px] sm:text-xs text-slate-400 shrink-0">
                            {t.ads}
                          </span>
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#7DD3FC] text-right truncate">
                          {t.adsValue}
                        </span>
                      </div>

                      {/* Commercial leak */}

                      <div className="flex items-center justify-between gap-3 rounded-xl bg-rose-500/[0.07] border border-rose-400/[0.16] px-3 py-2.5 shadow-[inset_0_0_30px_rgba(244,63,94,0.025)]">

                        <div className="flex items-center gap-2 min-w-0">

                          <span className="flex items-center justify-center w-3.5 h-3.5 shrink-0">
                            <span className="w-2 h-2 rounded-full bg-rose-400 dot-pulse" />
                          </span>

                          <span className="text-[11px] sm:text-xs text-rose-200/80 shrink-0">
                            {t.commercialLeak}
                          </span>
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-black tracking-wide text-rose-400 text-right">
                          {t.commercialLeakValue}
                        </span>
                      </div>
                    </div>

                    {/* CTA PREVIEW */}

                    <div className="mt-4">

                      <div className="relative rounded-xl border border-[#0284C7]/20 bg-[#0284C7]/[0.07] px-3.5 py-3 overflow-hidden">

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0284C7]/[0.07] to-transparent -translate-x-full animate-[shimmer_3s_linear_infinite]" />

                        <div className="relative flex items-center justify-between gap-3">

                          <div className="flex items-center gap-2 min-w-0">

                            <div className="w-7 h-7 rounded-lg bg-[#0284C7]/15 border border-[#0284C7]/20 flex items-center justify-center shrink-0">
                              <MessageCircle className="w-3.5 h-3.5 text-[#7DD3FC]" />
                            </div>

                            <div className="min-w-0 text-left">
                              <div className="text-[10px] sm:text-[11px] font-bold text-slate-200 truncate">
                                {t.pitch}
                              </div>

                              <div className="text-[8px] sm:text-[9px] text-slate-500 mt-0.5 truncate">
                                {t.pitchLocked}
                              </div>
                            </div>
                          </div>

                          <Lock className="w-3.5 h-3.5 text-[#7DD3FC]/60 shrink-0" />
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM STATUS */}

                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />

                      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.13em] text-slate-500 font-semibold">
                        {t.previewStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                HEADLINE
            ================================================== */}

            <div className="w-full space-y-1 mb-3">

              <div className="overflow-hidden py-1">
                <span
                  className={`block text-[31px] sm:text-[45px] lg:text-[50px] font-black tracking-[-0.035em] leading-[1.08] text-[#1D1D1F] will-change-transform ${
                    revealStep >= 3
                      ? 'anim-line-1'
                      : 'opacity-0'
                  }`}
                >
                  {t.h1_1}
                </span>
              </div>

              <div className="overflow-hidden py-1">
                <span
                  className={`block text-[31px] sm:text-[45px] lg:text-[50px] font-black tracking-[-0.035em] leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] will-change-transform ${
                    revealStep >= 4
                      ? 'anim-line-2'
                      : 'opacity-0'
                  }`}
                >
                  {t.h1_2}
                </span>
              </div>
            </div>

            {/* MICRO COPY */}

            <p
              className={`text-[11px] sm:text-xs text-[#6E6E73] mb-5 sm:mb-6 transition-all duration-700 ${
                revealStep >= 4
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              {t.heroMicro}
            </p>

            {/* =================================================
                INPUT
            ================================================== */}

            <form
              onSubmit={handleStartScan}
              className={`w-full max-w-[540px] relative will-change-transform ${
                revealStep >= 5
                  ? 'anim-bar'
                  : 'opacity-0'
              }`}
            >
              {/* glow */}

              <div
                className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] blur-xl transition-all duration-700 pointer-events-none ${
                  hasUrl
                    ? 'opacity-60 scale-[1.02] shadow-[0_0_50px_rgba(2,132,199,0.35)]'
                    : isInputFocused
                      ? 'opacity-25 scale-[1.01]'
                      : 'opacity-0 scale-95'
                }`}
              />

              <div className="relative z-10 p-[1px] rounded-2xl bg-gradient-to-r from-black/[0.08] via-[#0284C7]/30 to-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">

                <div
                  className={`relative flex flex-col sm:flex-row items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${
                    hasUrl
                      ? 'shadow-[0_0_0_2px_#0284C7]'
                      : 'shadow-none'
                  }`}
                >

                  <div className="flex-1 w-full flex items-center gap-3 px-3.5 h-11 sm:h-12">

                    <div className="relative flex items-center justify-center shrink-0">

                      <div
                        className={`absolute inset-0 rounded-full bg-[#0284C7] blur-md transition-all duration-500 ${
                          hasUrl
                            ? 'scale-150 opacity-90 animate-pulse'
                            : 'scale-50 opacity-0'
                        }`}
                      />

                      <Globe
                        className={`relative z-10 w-5 h-5 transition-all duration-500 ${
                          hasUrl
                            ? 'text-[#0284C7] drop-shadow-[0_0_12px_rgba(2,132,199,0.95)] scale-110 rotate-12'
                            : 'text-[#86868B]'
                        }`}
                      />
                    </div>

                    <input
                      type="text"
                      required
                      placeholder={
                        t.placeholder
                      }
                      value={url}
                      onFocus={() =>
                        setIsInputFocused(
                          true
                        )
                      }
                      onBlur={() =>
                        setIsInputFocused(
                          false
                        )
                      }
                      onChange={(e) =>
                        setUrl(
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#1D1D1F] placeholder-[#86868B] focus:outline-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto h-11 px-5 sm:px-6 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>
                      {t.btn}
                    </span>

                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ===================================================
            SCANNING
        ==================================================== */}

        {stage === 'scanning' && (
          <div className="w-full max-w-[500px] p-6 sm:p-7 rounded-3xl bg-white/95 border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl space-y-5 text-center animate-fade-in">

            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3.5">

              <div className="text-left">
                <h3 className="text-base font-bold text-[#1D1D1F]">
                  {t.scanningTitle}
                </h3>

                <p className="text-xs text-[#0284C7] font-medium truncate max-w-[260px] mt-0.5 font-mono">
                  {url}
                </p>
              </div>

              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-black text-[#0284C7] tracking-tight">
                  {progress}
                </span>

                <span className="text-xs font-bold text-[#7DD3FC]">
                  %
                </span>
              </div>
            </div>

            <div className="w-full bg-black/[0.04] h-2 rounded-full overflow-hidden p-[1px]">
              <div
                className="bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="space-y-2.5 text-left pt-1">

              {scanChecklist.map(
                (item, idx) => {
                  const stepThreshold =
                    (idx + 1) * 20;

                  const isPassed =
                    progress >=
                    stepThreshold;

                  const isCurrent =
                    progress <
                      stepThreshold &&
                    progress >=
                      stepThreshold -
                        20;

                  return (
                    <div
                      key={idx}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-400 ${
                        isPassed
                          ? item.type ===
                            'error'
                            ? 'bg-rose-50/60 border-rose-200'
                            : item.type ===
                                'warn'
                              ? 'bg-amber-50/60 border-amber-200'
                              : 'bg-emerald-50/60 border-emerald-200'
                          : isCurrent
                            ? 'bg-white border-[#0284C7]/40 shadow-xs'
                            : 'bg-transparent border-transparent opacity-35'
                      }`}
                    >
                      <div className="flex items-center gap-2">

                        {isPassed ? (
                          item.type ===
                          'error' ? (
                            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          ) : item.type ===
                            'warn' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          )
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 text-[#0284C7] animate-spin shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                        )}

                        <span
                          className={`text-[12px] font-semibold ${
                            isPassed
                              ? 'text-[#1D1D1F]'
                              : 'text-[#86868B]'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>

                      {isPassed && (
                        <div className="pl-5.5 mt-1 text-[11px] leading-snug animate-fade-in font-medium">
                          <span
                            className={
                              item.type ===
                              'error'
                                ? 'text-rose-700'
                                : item.type ===
                                    'warn'
                                  ? 'text-amber-800'
                                  : 'text-emerald-700'
                            }
                          >
                            {
                              item.discovered
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* ===================================================
            TEASER
        ==================================================== */}

        {stage === 'teaser' && (
          <div className="w-full max-w-4xl space-y-6 text-left my-auto animate-fade-in">

            <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-rose-200 shadow-lg backdrop-blur-xl">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/[0.05] pb-4">

                <div className="flex items-center gap-3">

                  <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>

                  <div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                      Экспресс-скан завершен
                    </span>

                    <h2 className="text-lg sm:text-xl font-bold text-[#1D1D1F]">
                      Обнаружено 3 критические зоны потери выручки
                    </h2>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
                  Упущенная выручка: ~€1,800/мес
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>
                      Штрафы в Испании
                    </span>

                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>

                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    Риск проверки регулятором
                  </h4>

                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    Отсутствует обязательный NIF/CIF в футере...
                  </p>

                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">
                      Штраф до €30,000
                    </span>

                    <span className="text-rose-600 font-medium">
                      Скрыто 🔒
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>
                      Слив рекламы
                    </span>

                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>

                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    Потеря ~35% заявок
                  </h4>

                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    Клиенты уходят без быстрой связи в WhatsApp...
                  </p>

                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">
                      Рекламный бюджет
                    </span>

                    <span className="text-rose-600 font-medium">
                      Скрыто 🔒
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>
                      Карты Google
                    </span>

                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>

                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    Жалобы на недозвон
                  </h4>

                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    Потеря клиентов в часы пиковых обращений...
                  </p>

                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">
                      Подробности
                    </span>

                    <span className="text-rose-600 font-medium">
                      Скрыто 🔒
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.06] shadow-xl">

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

                <div className="md:col-span-3 space-y-3">

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />

                    <span>
                      Полный 12-страничный аудит
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
                    Откройте полный отчет с готовыми решениями
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                    Простой документ с пошаговым планом исправления всех ошибок для вашего программиста или юриста.
                  </p>
                </div>

                <div className="md:col-span-2 p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] text-center space-y-3">

                  <div>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#1D1D1F]">
                        €19
                      </span>

                      <span className="text-sm text-[#86868B] line-through">
                        €150
                      </span>
                    </div>

                    <span className="text-xs text-[#0284C7] font-medium block mt-0.5">
                      Мгновенный доступ + PDF копия
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={
                      handleStripeCheckout
                    }
                    disabled={
                      isRedirecting
                    }
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-bold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />

                        <span>
                          Подключение Stripe...
                        </span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-current" />

                        <span>
                          Открыть отчет за €19
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        className={`relative z-20 min-h-13 sm:min-h-14 border-t border-black/[0.05] bg-white/70 backdrop-blur-xl px-6 sm:px-8 py-2.5 flex items-center shrink-0 ${
          revealStep >= 6
            ? 'anim-footer'
            : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86868B] gap-2 text-center sm:text-left">

          <p>
            {t.footer}
          </p>

          <div className="flex items-center gap-4">
            <span>
              Comunidad de Madrid
            </span>

            <span>•</span>

            <span>
              Stripe 256-bit Encrypted
            </span>
          </div>
        </div>
      </footer>

      {/* =====================================================
          COOKIE MODAL
      ====================================================== */}

      {showCookieModal && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
        >

          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-[#0F2744]/30 backdrop-blur-md anim-cookie-backdrop"
            onClick={() =>
              handleCookieChoice(
                'necessary'
              )
            }
          />

          {/* MODAL */}

          <div className="relative z-10 w-full max-w-[520px] rounded-3xl bg-white border border-black/[0.06] shadow-[0_24px_80px_rgba(15,39,68,0.22)] p-5 sm:p-6 anim-cookie-modal">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center shadow-sm">
                <Lock className="w-5 h-5 text-white" />
              </div>

              <div className="min-w-0">

                <h3
                  id="cookie-title"
                  className="text-base sm:text-lg font-bold tracking-tight text-[#1D1D1F]"
                >
                  {t.cookieTitle}
                </h3>

                <p className="mt-2 text-[12px] sm:text-[13px] leading-relaxed text-[#6E6E73]">
                  {t.cookieText}
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2.5 mt-5">

              <button
                type="button"
                onClick={() =>
                  handleCookieChoice(
                    'necessary'
                  )
                }
                className="flex-1 h-11 rounded-xl border border-black/[0.08] bg-[#F5F5F7] hover:bg-black/[0.06] text-[#1D1D1F] text-[13px] font-semibold transition"
              >
                {
                  t.cookieNecessary
                }
              </button>

              <button
                type="button"
                onClick={() =>
                  handleCookieChoice(
                    'all'
                  )
                }
                className="flex-1 h-11 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white text-[13px] font-bold transition shadow-sm hover:scale-[1.01] active:scale-[0.98]"
              >
                {
                  t.cookieAccept
                }
              </button>
            </div>

            <div className="mt-3 text-[10px] text-[#86868B] text-center">
              Audit2Revenue.es
            </div>
          </div>
        </div>
      )}
    </div>
  );
}