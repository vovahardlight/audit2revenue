'use client';

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Sparkles,
  ShieldAlert,
  Lock,
  Loader2,
  AlertTriangle,
  XCircle,
  TrendingDown,
  Target,
  MessageCircle,
  Activity,
  Code2,
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

export default function AppleNordicGlacierPureLanding() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');

  const [stage, setStage] = useState<
    'idle' | 'scanning' | 'report'
  >('idle');

  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] =
    useState(false);

  // PRELOADER
  const [pageLoading, setPageLoading] =
    useState(true);
  const [loadProgress, setLoadProgress] =
    useState(0);
  const [revealStep, setRevealStep] =
    useState(0);

  // COOKIE
  const [showCookieModal, setShowCookieModal] =
    useState(false);

  // 3D CARD
  const auditCardRef =
    useRef<HTMLDivElement>(null);

  const hasUrl = useMemo(
    () => url.trim().length > 3,
    [url]
  );

  const t = {
    ru: {
      devBadge:
        'ПРОТОТИП · Некоммерческая разработка в тестовом режиме (Платежи отключены)',
      h1_1:
        'Найдите проблемы на сайте,',
      h1_2:
        'которые мешают вам зарабатывать.',
      btn: 'Проверить сайт',
      placeholder:
        'https://vash-salon-ili-klinika.es',
      scanningTitle:
        'Интеллектуальная диагностика',

      previewLabel:
        'AI AUDIT PREVIEW',
      previewStatus:
        'DEMO · СИСТЕМА ГОТОВА К АНАЛИЗУ',
      demo: 'DEMO',

      exampleBusiness:
        'Example Business',
      scoreLabel:
        'AUDIT SCORE',

      directPhoneFriction:
        'Телефон в Google картах',
      directPhoneFrictionValue:
        'Скрытый мобильный · Нет на сайте',

      ads:
        'Реклама',
      adsValue:
        'Meta + Google · обнаружено',

      commercialLeak:
        'Точка потери',
      commercialLeakValue:
        'НЕТ WHATSAPP',

      pitch:
        'Сгенерировать WhatsApp-питч',
      pitchLocked:
        'Доступ после анализа сайта',

      heroMicro:
        'Интерактивная демонстрация аудита для любого сайта за несколько секунд.',

      reportLabel:
        'DEMO · РЕЗУЛЬТАТЫ ЭКСПРЕСС-СКАНА',
      demoScanNotice:
        'Демонстрация интерфейса: тестовое сканирование структуры сайта и демонстрация аналитики.',
      demoReportNotice:
        'Демонстрационный отчёт. Все данные носят иллюстративный характер и предназначены для тестирования интерфейса разработчиком.',
      demoPriceBadge: 'ПРОТОТИП · ДЕМО-ДОСТУП',
      demoPriceNote: 'Коммерческий приём платежей отключён. Нажмите кнопку ниже, чтобы протестировать просмотр полного отчёта.',
      demoPriceButton: 'Открыть демо-отчёт (Симуляция)',

      footerDisclaimer:
        'Проект находится в стадии некоммерческой разработки и демонстрации функционала. Платежи не принимаются, услуги не оказываются.',
      footer:
        '© 2026 Audit2Revenue.es — Прототип сервиса аудита сайтов в Испании.',

      cookieTitle:
        'Мы используем cookies',
      cookieText:
        'Мы используем базовые технические cookies для работы интерфейса в тестовом режиме.',
      cookieAccept:
        'Принять все',
      cookieNecessary:
        'Только необходимые',
    },

    es: {
      devBadge:
        'PROTOTIPO · Demostración técnica no comercial (Sin actividad económica)',
      h1_1:
        'Encuentra los fallos en tu web,',
      h1_2:
        'que te hacen perder clientes.',
      btn: 'Analizar web',
      placeholder:
        'https://tu-clinica-o-salon.es',
      scanningTitle:
        'Diagnóstico inteligente',

      previewLabel:
        'AI AUDIT PREVIEW',
      previewStatus:
        'DEMO · SISTEMA LISTO PARA ANALIZAR',
      demo: 'DEMO',

      exampleBusiness:
        'Example Business',
      scoreLabel:
        'PUNTUACIÓN',

      directPhoneFriction:
        'Teléfono en Google Maps',
      directPhoneFrictionValue:
        'Móvil directo · Ausente en web',

      ads:
        'Publicidad',
      adsValue:
        'Meta + Google · detectado',

      commercialLeak:
        'Fuga comercial',
      commercialLeakValue:
        'SIN WHATSAPP',

      pitch:
        'Generar pitch de WhatsApp',
      pitchLocked:
        'Disponible después del análisis',

      heroMicro:
        'Demostración interactiva de auditoría para cualquier web en pocos segundos.',

      reportLabel:
        'DEMO · RESULTADOS DEL ESCANEO',
      demoScanNotice:
        'Demostración de interfaz: escaneo de prueba de estructura web y visualización de analítica.',
      demoReportNotice:
        'Informe en modo demostración. Diseñado exclusivamente para pruebas de desarrollo e interfaz técnica.',
      demoPriceBadge: 'PROTOTIPO · MODO DEMO',
      demoPriceNote: 'Pagos comerciales desactivados. Pulsa el botón para probar la navegación al informe completo.',
      demoPriceButton: 'Ver informe demo (Simulación)',

      footerDisclaimer:
        'Entorno de pruebas de desarrollo técnico. No realiza actividad mercantil ni presta servicios remunerados.',
      footer:
        '© 2026 Audit2Revenue.es — Prototipo experimental de auditoría web en España.',

      cookieTitle:
        'Utilizamos cookies',
      cookieText:
        'Utilizamos cookies técnicas básicas necesarias para el funcionamiento del prototipo.',
      cookieAccept:
        'Aceptar todas',
      cookieNecessary:
        'Solo necesarias',
    },

    en: {
      devBadge:
        'PROTOTYPE · Non-commercial technical demo (Payments disabled)',
      h1_1:
        'Find the website issues,',
      h1_2:
        'that cost you customers.',
      btn:
        'Analyze Website',
      placeholder:
        'https://your-business.es',
      scanningTitle:
        'Intelligent Website Audit',

      previewLabel:
        'AI AUDIT PREVIEW',
      previewStatus:
        'DEMO · SYSTEM READY TO ANALYZE',
      demo:
        'DEMO',

      exampleBusiness:
        'Example Business',
      scoreLabel:
        'AUDIT SCORE',

      directPhoneFriction:
        'Google Maps Phone',
      directPhoneFrictionValue:
        'Direct mobile · Not on website',

      ads:
        'Advertising',
      adsValue:
        'Meta + Google · detected',

      commercialLeak:
        'Commercial Leak',
      commercialLeakValue:
        'NO WHATSAPP',

      pitch:
        'Generate WhatsApp Pitch',
      pitchLocked:
        'Available after website analysis',

      heroMicro:
        'Interactive audit preview for any website in just a few seconds.',

      reportLabel:
        'DEMO · SCAN RESULTS',
      demoScanNotice:
        'Interface preview: website layout scan test and analytical visualization.',
      demoReportNotice:
        'Demo report. Exclusively intended for technical development and UI testing purposes.',
      demoPriceBadge: 'PROTOTYPE · DEMO MODE',
      demoPriceNote: 'Commercial payment processing is disabled. Click below to test the full report view.',
      demoPriceButton: 'View demo report (Simulation)',

      footerDisclaimer:
        'Technical prototype and developer sandbox. No commercial services are provided and no payments are accepted.',
      footer:
        '© 2026 Audit2Revenue.es — Website audit prototype in Spain.',

      cookieTitle:
        'We use cookies',
      cookieText:
        'We use essential technical cookies strictly required for testing the prototype.',
      cookieAccept:
        'Accept all',
      cookieNecessary:
        'Necessary only',
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
          setTimeout(() => setRevealStep(1), 120);
          setTimeout(() => setRevealStep(2), 300);
          setTimeout(() => setRevealStep(3), 480);
          setTimeout(() => setRevealStep(4), 660);
          setTimeout(() => setRevealStep(5), 840);
          setTimeout(() => setRevealStep(6), 1020);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // =========================================================
  // 3D CARD — FULL VIEWPORT CURSOR TRACKING
  // =========================================================

  useEffect(() => {
    const card = auditCardRef.current;
    if (!card) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const rotateY = currentX * 28;
      const rotateX = -currentY * 22;

      const lightX = (currentX + 0.5) * 100;
      const lightY = (currentY + 0.5) * 100;

      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
      card.style.setProperty('--light-x', `${lightX}%`);
      card.style.setProperty('--light-y', `${lightY}%`);
      card.style.setProperty('--glow-opacity', '1');

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // =========================================================
  // SCANNING & NAVIGATION
  // =========================================================

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let formatted = url.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
      setUrl(formatted);
    }

    setStage('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (stage !== 'scanning') return;

    const startTime = Date.now();
    const duration = 5000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentP = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentP);

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          setStage('report');
        }, 500);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [stage]);

  // БЕЗОПАСНЫЙ ПЕРЕХОД К ПОЛНОМУ ДЕМО-ОТЧЕТУ (БЕЗ СТРАЙПА И БЕЗ РИСКА ШТРАФОВ)
  const handleOpenDemoReport = () => {
    const target = encodeURIComponent(url || 'https://clinica-mabelle.es');
    router.push(`/report/demo-audit?url=${target}&demo=true`);
  };

  // =========================================================
  // COOKIE MODAL & CONSENT
  // =========================================================

  const handleCookieChoice = (choice: 'all' | 'necessary') => {
    localStorage.setItem('a2r_cookie_consent', choice);
    setShowCookieModal(false);
  };

  useEffect(() => {
    if (revealStep !== 6 || pageLoading) return;
    const consent = localStorage.getItem('a2r_cookie_consent');
    if (consent) return;

    const timer = window.setTimeout(() => {
      setShowCookieModal(true);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [revealStep, pageLoading]);

  // =========================================================
  // CHECKLIST
  // =========================================================

  const scanChecklist = [
    {
      title: 'Доступность и мобильная скорость',
      discovered: '✓ Сервер отвечает за 160ms, SSL TLS 1.3 активен',
      type: 'ok',
    },
    {
      title: 'Рекламные трекеры и пиксели',
      discovered: '✓ Активны Meta Pixel (Instagram) и Google Ads Tag',
      type: 'ok',
    },
    {
      title: 'Конверсия мобильного трафика',
      discovered: '⚠️ Найдено: нет кнопки WhatsApp, потеря до 40% переходов',
      type: 'warn',
    },
    {
      title: 'Репутация и отзывы в картах Google',
      discovered: '✓ Рейтинг 4.8★ (384 отзыва), найдены жалобы на недозвон',
      type: 'warn',
    },
    {
      title: 'Юридический аудит LSSI-CE (Испания)',
      discovered: '⚠️ Демо: демонстрация проверки раздела Aviso Legal',
      type: 'error',
    },
  ];

  return (
    <div className="relative min-h-[100dvh] bg-[#FBFBFD] text-[#1D1D1F] flex flex-col overflow-x-hidden selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">

      {/* =====================================================
          БЕЗОПАСНАЯ ПЛАШКА ТЕСТОВОГО РЕЖИМА (ЗАЩИТА ОТ ШТРАФОВ)
      ====================================================== */}
      <div className="relative z-30 bg-[#0F2744] text-white px-3 py-1.5 text-center text-[10px] sm:text-[11px] font-medium border-b border-[#0284C7]/20 flex items-center justify-center gap-2">
        <Code2 className="w-3.5 h-3.5 text-[#7DD3FC] shrink-0" />
        <span className="tracking-wide text-slate-200">{t.devBadge}</span>
      </div>

      {/* =====================================================
          PRELOADER
      ====================================================== */}
      <div
        className={`fixed inset-0 z-[100] bg-[#FBFBFD] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
          pageLoading
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-[1.04] blur-md invisible'
        }`}
      >
        <div className="w-64 space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-white text-sm shadow-lg mx-auto animate-pulse">
            A2R
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#0284C7] font-semibold block font-mono">
              DEVELOPER PROTOTYPE
            </span>
            <div className="flex items-baseline justify-center gap-1 font-mono text-3xl font-extrabold text-[#0F2744]">
              <span>{loadProgress}</span>
              <span className="text-xs text-[#0284C7] font-bold">%</span>
            </div>
          </div>
          <div className="w-full bg-black/[0.04] h-[2px] rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-100 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header
        className={`relative z-20 h-14 sm:h-16 shrink-0 border-b border-black/[0.05] backdrop-blur-xl bg-white/80 px-4 sm:px-8 flex items-center ${
          revealStep >= 1 ? 'anim-header' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-[#0284C7]/30">
              A2R
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tracking-tight text-[#1D1D1F] text-[14px] sm:text-[15px]">
                Audit<span className="text-[#0284C7]">2</span>Revenue
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#0284C7]/10 text-[#0284C7]">
                DEMO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Быстрая кнопка перехода к дизайну отчета без сканирования */}
            <button
              type="button"
              onClick={handleOpenDemoReport}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#0284C7] hover:underline"
            >
              Смотреть дизайн отчёта ➔
            </button>

            <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05]">
              {(['es', 'en', 'ru'] as Lang[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLang(item)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] ${
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
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className={`relative z-10 flex-1 min-h-0 flex flex-col ${stage === 'idle' ? 'justify-center' : 'justify-start gap-5 sm:gap-6 pt-5 sm:pt-8'} items-center px-4 sm:px-6 py-3 sm:py-4 w-full`}>

        {/* ===================================================
            IDLE (ГЛАВНЫЙ ЭКРАН)
        ==================================================== */}
        {stage === 'idle' && (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center">

            {/* 3D КАРТОЧКА ПРЕДПРОСМОТРА */}
            <div className="audit-card-perspective audit-card-compact w-full flex justify-center mb-2.5 sm:mb-3">
              <div className={`relative w-full max-w-[500px] ${revealStep >= 2 ? 'anim-card' : 'opacity-0'}`}>
                <div ref={auditCardRef} className="audit-card-3d relative">
                  <div className="audit-card-shadow" />
                  <div className="absolute -inset-5 rounded-[34px] bg-[#0284C7]/8 blur-2xl pointer-events-none" />

                  <div className="audit-card-shell relative overflow-hidden rounded-[26px] bg-white border border-[#D5E1E9] shadow-[0_22px_65px_rgba(15,39,68,0.15)]">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent z-[60]" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#EFFAFF] to-transparent pointer-events-none z-[1]" />

                    <div className="audit-card-content px-4 py-3.5 sm:px-5 sm:py-4">
                      {/* HEADER КАРТОЧКИ */}
                      <div className="audit-card-depth flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#EFF9FD] border border-[#C9EAF7] flex items-center justify-center shadow-sm">
                            <Activity className="w-[18px] h-[18px] text-[#0284C7]" />
                            <span className="absolute -right-0.5 -top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dot-pulse" />
                          </div>
                          <div className="text-left min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#0284C7] font-extrabold">
                                {t.previewLabel}
                              </span>
                              <span className="px-1.5 py-[2px] rounded-full bg-slate-100 border border-slate-200 text-[7px] sm:text-[8px] text-slate-500 font-extrabold uppercase tracking-wider">
                                {t.demo}
                              </span>
                            </div>
                            <div className="text-[13px] sm:text-[14px] font-bold text-[#0F2744] truncate mt-0.5">
                              {t.exampleBusiness}
                            </div>
                          </div>
                        </div>

                        {/* SCORE */}
                        <div className="audit-card-depth-strong shrink-0 px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-right shadow-sm">
                          <div className="text-[7px] uppercase tracking-[0.12em] text-rose-500 font-extrabold leading-none mb-1">
                            {t.scoreLabel}
                          </div>
                          <div className="flex items-baseline justify-end gap-0.5">
                            <span className="text-[24px] sm:text-[27px] leading-none font-black text-rose-600 tracking-tight">
                              85
                            </span>
                            <span className="text-[9px] text-rose-400 font-bold">
                              /100
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="audit-card-depth h-px bg-[#E5EDF2] my-2.5 sm:my-3" />

                      {/* ПАРАМЕТРЫ */}
                      <div className="audit-card-depth space-y-1.5">
                        {/* 1. Существенный пункт для продаж (вместо абстрактного ЛПР) */}
                        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F8FAFC] border border-[#E4EBF0] px-2.5 sm:px-3 py-1.5 sm:py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-lg bg-[#EFF9FD] border border-[#D7EDF6] flex items-center justify-center shrink-0">
                              <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#64748B] whitespace-nowrap">
                              {t.directPhoneFriction}
                            </span>
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-amber-700 text-right truncate max-w-[55%]">
                            {t.directPhoneFrictionValue}
                          </span>
                        </div>

                        {/* 2. Рекламный трекинг */}
                        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F8FAFC] border border-[#E4EBF0] px-2.5 sm:px-3 py-1.5 sm:py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-lg bg-[#EFF9FD] border border-[#D7EDF6] flex items-center justify-center shrink-0">
                              <Target className="w-3.5 h-3.5 text-[#0284C7]" />
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#64748B] whitespace-nowrap">
                              {t.ads}
                            </span>
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-[#0284C7] text-right truncate max-w-[55%]">
                            {t.adsValue}
                          </span>
                        </div>

                        {/* 3. Коммерческая потеря */}
                        <div className="flex items-center justify-between gap-3 rounded-xl bg-rose-50 border border-rose-200 px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-sm">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-lg bg-white border border-rose-100 flex items-center justify-center shrink-0">
                              <span className="w-2 h-2 rounded-full bg-rose-500 dot-pulse" />
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-rose-700 whitespace-nowrap">
                              {t.commercialLeak}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-black tracking-wide text-rose-600">
                            {t.commercialLeakValue}
                          </span>
                        </div>
                      </div>

                      {/* ДЕМО CTA */}
                      <div className="audit-card-depth-strong relative mt-2.5 rounded-xl border border-[#BFDEEC] bg-[#F3FAFD] overflow-hidden">
                        <div className="relative flex items-center justify-between gap-3 px-2.5 sm:px-3 py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-white border border-[#CBEAF7] flex items-center justify-center shrink-0 shadow-sm">
                              <MessageCircle className="w-3.5 h-3.5 text-[#0284C7]" />
                            </div>
                            <div className="min-w-0 text-left">
                              <div className="text-[9px] sm:text-[10px] font-extrabold text-[#0F2744] truncate">
                                {t.pitch}
                              </div>
                              <div className="text-[7px] sm:text-[8px] text-[#7C8B99] mt-0.5 truncate">
                                {t.pitchLocked}
                              </div>
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-lg bg-white border border-[#DDEAF1] flex items-center justify-center shrink-0 shadow-sm">
                            <Lock className="w-3 h-3 text-[#0284C7]" />
                          </div>
                        </div>
                      </div>

                      <div className="audit-card-depth flex items-center justify-center gap-1.5 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dot-pulse" />
                        <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.13em] text-[#94A3B8] font-bold">
                          {t.previewStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* H1 */}
            <div className="w-full space-y-0.5 mb-1.5">
              <div className="overflow-hidden py-0.5">
                <span
                  className={`block text-[28px] sm:text-[42px] lg:text-[48px] font-black tracking-[-0.035em] leading-[1.05] text-[#1D1D1F] will-change-transform ${
                    revealStep >= 3 ? 'anim-line-1' : 'opacity-0'
                  }`}
                >
                  {t.h1_1}
                </span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span
                  className={`block text-[28px] sm:text-[42px] lg:text-[48px] font-black tracking-[-0.035em] leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] will-change-transform ${
                    revealStep >= 4 ? 'anim-line-2' : 'opacity-0'
                  }`}
                >
                  {t.h1_2}
                </span>
              </div>
            </div>

            <p
              className={`text-[10px] sm:text-xs text-[#6E6E73] mb-2.5 sm:mb-3 transition-all duration-700 px-3 ${
                revealStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {t.heroMicro}
            </p>

            {/* INPUT */}
            <form
              onSubmit={handleStartScan}
              className={`w-full max-w-[540px] relative will-change-transform ${
                revealStep >= 5 ? 'anim-bar' : 'opacity-0'
              }`}
            >
              <div
                className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] blur-xl transition-all duration-700 pointer-events-none ${
                  hasUrl ? 'opacity-60 scale-[1.02]' : isInputFocused ? 'opacity-25 scale-[1.01]' : 'opacity-0 scale-95'
                }`}
              />

              <div className="animated-input-border relative z-10 p-[1px] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <div
                  className={`relative z-[1] flex flex-col sm:flex-row items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${
                    hasUrl ? 'shadow-[0_0_0_2px_#0284C7]' : ''
                  }`}
                >
                  <div className="flex-1 w-full flex items-center gap-3 px-3.5 h-10 sm:h-12">
                    <div className="relative flex items-center justify-center shrink-0">
                      <div
                        className={`absolute inset-0 rounded-full bg-[#0284C7] blur-md transition-all duration-500 ${
                          hasUrl ? 'scale-150 opacity-90 animate-pulse' : 'scale-50 opacity-0'
                        }`}
                      />
                      <Globe
                        className={`relative z-10 w-5 h-5 transition-all duration-500 ${
                          hasUrl ? 'text-[#0284C7] drop-shadow-[0_0_12px_rgba(2,132,199,0.95)] scale-110 rotate-12' : 'text-[#86868B]'
                        }`}
                      />
                    </div>

                    <input
                      type="text"
                      required
                      placeholder={t.placeholder}
                      value={url}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full min-w-0 bg-transparent text-[13px] sm:text-[15px] text-[#1D1D1F] placeholder-[#86868B] focus:outline-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-semibold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>{t.btn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ===================================================
            SCANNING (ЛОАДЕР)
        ==================================================== */}
        {stage === 'scanning' && (
          <div className="w-full max-w-4xl px-1 sm:px-3 py-5 sm:py-7 space-y-6 text-left animate-fade-in">
            <div className="flex items-start justify-between gap-5 pb-1">
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#0284C7] font-bold mb-1.5">
                  AUDIT2REVENUE · TEST RUN
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F2744]">
                  {t.scanningTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] font-medium truncate mt-1.5 font-mono max-w-[min(72vw,680px)]">
                  {url}
                </p>
                <p className="max-w-2xl mt-2 text-[11px] sm:text-xs leading-relaxed text-[#64748B]">
                  {t.demoScanNotice}
                </p>
              </div>

              <div className="shrink-0 text-right leading-none">
                <div className="flex items-baseline justify-end gap-0.5 tabular-nums">
                  <span className="text-4xl sm:text-5xl font-black tracking-[-0.05em] text-[#0284C7]">
                    {progress}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#7DD3FC]">%</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-[#EAF0F4] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="divide-y divide-[#E8EEF2] pt-1">
              {scanChecklist.map((item, idx) => {
                const stepThreshold = (idx + 1) * 20;
                const isPassed = progress >= stepThreshold;
                const isCurrent = progress < stepThreshold && progress >= stepThreshold - 20;

                return (
                  <div
                    key={idx}
                    className={`py-3.5 sm:py-4 transition-opacity duration-500 ${
                      isPassed ? 'opacity-100' : isCurrent ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 shrink-0 flex items-center justify-center mt-[1px]">
                        {isPassed ? (
                          item.type === 'error' ? (
                            <XCircle className="w-[17px] h-[17px] text-rose-600" />
                          ) : item.type === 'warn' ? (
                            <AlertTriangle className="w-[17px] h-[17px] text-amber-600" />
                          ) : (
                            <CheckCircle2 className="w-[17px] h-[17px] text-emerald-600" />
                          )
                        ) : isCurrent ? (
                          <Loader2 className="w-[17px] h-[17px] text-[#0284C7] animate-spin" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <span className={`text-[13px] sm:text-sm font-semibold ${isPassed || isCurrent ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>
                            {item.title}
                          </span>
                        </div>
                        {isPassed && (
                          <p className={`mt-1.5 text-[11px] sm:text-xs leading-relaxed font-medium animate-fade-in ${
                            item.type === 'error' ? 'text-rose-700' : item.type === 'warn' ? 'text-amber-800' : 'text-[#64748B]'
                          }`}>
                            {item.discovered}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================
            REPORT / TEASER VIEW (БЕЗОПАСНАЯ СИМУЛЯЦИЯ)
        ==================================================== */}
        {stage === 'report' && (
          <div className="w-full max-w-4xl space-y-5 sm:space-y-6 text-left animate-fade-in">
            <div className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-rose-200 shadow-lg backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/[0.05] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                      {t.reportLabel}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-[#1D1D1F]">
                      Результаты тестового аудита
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-[#0284C7] font-mono break-all">
                      {url}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
                  Потери (Пример): ~€1,800/мес
                </div>
              </div>

              <p className="mt-4 rounded-xl border border-[#CBEAF7] bg-[#EFF9FD] px-4 py-3 text-[11px] sm:text-xs leading-relaxed text-[#0F2744]">
                {t.demoReportNotice}
              </p>

              {/* 3 закрытые зоны */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>Штрафы в Испании</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    Риск проверки регулятором
                  </h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    Отсутствует обязательный NIF/CIF в футере...
                  </p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">Пример риска</span>
                    <span className="text-rose-600 font-medium">Демо 🔒</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>Слив рекламы</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    Потеря ~35% заявок
                  </h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    Клиенты уходят без быстрой связи в WhatsApp...
                  </p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">Рекламный бюджет</span>
                    <span className="text-rose-600 font-medium">Демо 🔒</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>Карты Google</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    Жалобы на недозвон
                  </h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    Потеря клиентов в часы пиковых обращений...
                  </p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">Подробности</span>
                    <span className="text-rose-600 font-medium">Демо 🔒</span>
                  </div>
                </div>
              </div>
            </div>

            {/* БЛОК ПЕРЕХОДА (ВМЕСТО СТРАЙПА - БЕЗОПАСНАЯ СИМУЛЯЦИЯ) */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-black/[0.06] shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Интерактивный дашборд</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
                    Посмотреть полный демонстрационный отчёт
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                    Вы можете протестировать весь дашборд, логику светофора и отображение найденных проблем на следующей странице.
                  </p>
                </div>

                <div className="md:col-span-2 p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] text-center space-y-3">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-[#1D1D1F]">
                        €19
                      </span>
                      <span className="px-2 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/15 text-[9px] font-extrabold tracking-[0.12em] text-[#0284C7]">
                        {t.demoPriceBadge}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                      {t.demoPriceNote}
                    </p>
                  </div>

                  {/* КНОПКА ПЕРЕХОДА В РЕЖИМЕ ДЕМОНСТРАЦИИ (БЕЗ ПЛАТЕЖЕЙ) */}
                  <button
                    type="button"
                    onClick={handleOpenDemoReport}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-bold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <span>{t.demoPriceButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================
          FOOTER (С ЮРИДИЧЕСКИМ ДИСКЛЕЙМЕРОМ ДЛЯ ИСПАНИИ)
      ====================================================== */}
      <footer
        className={`relative z-20 min-h-12 sm:min-h-14 shrink-0 border-t border-black/[0.05] bg-white/70 backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center ${
          revealStep >= 6 ? 'anim-footer' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#64748B] gap-2 text-center md:text-left">
          <div>
            <p className="font-medium text-[#1D1D1F]">{t.footer}</p>
            <p className="text-[9px] text-[#86868B] mt-0.5 max-w-xl">{t.footerDisclaimer}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowCookieModal(true)}
              className="text-[#0284C7] font-semibold hover:underline"
            >
              Настройка cookies
            </button>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px] border border-emerald-200">
              NON-COMMERCIAL SANDBOX
            </span>
          </div>
        </div>
      </footer>

      {/* =====================================================
          COOKIE MODAL
      ====================================================== */}
      {showCookieModal && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-[#0F2744]/25 backdrop-blur-md anim-cookie-backdrop"
            onClick={() => handleCookieChoice('necessary')}
          />

          <div className="relative z-10 w-full max-w-[500px] rounded-3xl bg-white border border-black/[0.06] shadow-[0_24px_80px_rgba(15,39,68,0.22)] p-5 sm:p-6 anim-cookie-modal">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center shadow-sm">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold tracking-tight text-[#1D1D1F]">
                  {t.cookieTitle}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#6E6E73]">
                  {t.cookieText}
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 mt-5">
              <button
                type="button"
                onClick={() => handleCookieChoice('necessary')}
                className="flex-1 h-10 rounded-xl border border-black/[0.08] bg-[#F5F5F7] hover:bg-black/[0.06] text-[#1D1D1F] text-[12px] font-semibold transition"
              >
                {t.cookieNecessary}
              </button>
              <button
                type="button"
                onClick={() => handleCookieChoice('all')}
                className="flex-1 h-10 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white text-[12px] font-bold transition shadow-sm"
              >
                {t.cookieAccept}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}