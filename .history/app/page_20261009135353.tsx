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
  Zap,
  Globe,
  Sparkles,
  ShieldAlert,
  Lock,
  Loader2,
  AlertTriangle,
  XCircle,
  Target,
  MessageCircle,
  Activity,
  TrendingDown,
  Code2,
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

export default function AppleNordicGlacierPureLanding() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');

  // Читаем сохраненный язык после загрузки (не ломает гидратацию)
  useEffect(() => {
    const saved = localStorage.getItem('a2r_lang') as Lang;
    if (saved && ['ru', 'es', 'en'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  // Функция переключения с сохранением в память
  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('a2r_lang', newLang);
    document.cookie = `a2r_lang=${newLang}; path=/; max-age=31536000`;
  };

  const [stage, setStage] = useState<'idle' | 'scanning' | 'report'>('idle');

  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // PRELOADER
  const [pageLoading, setPageLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealStep, setRevealStep] = useState(0);

  // COOKIE
  const [showCookieModal, setShowCookieModal] = useState(false);

  // 3D CARD
  const auditCardRef = useRef<HTMLDivElement>(null);

  const hasUrl = useMemo(
    () => url.trim().length > 3,
    [url]
  );

  const t = {
    ru: {
      devBadge:
        'ПРОТОТИП · Некоммерческая разработка (Платежи отключены / Тестовый режим)',
      h1_1: 'Найдите проблемы на сайте,',
      h1_2: 'которые мешают вам зарабатывать.',
      btn: 'Проверить сайт',
      placeholder: 'https://vash-salon-ili-klinika.es',
      scanningTitle: 'Интеллектуальная диагностика',

      previewLabel: 'AI AUDIT PREVIEW',
      previewStatus: 'DEMO · СИСТЕМА ГОТОВА К АНАЛИЗУ',
      demo: 'DEMO',

      exampleBusiness: 'Example Business',
      scoreLabel: 'AUDIT SCORE',

      directPhoneFriction: 'Телефон в картах Google',
      directPhoneFrictionValue: 'Скрытый мобильный · Нет на сайте',

      ads: 'Реклама',
      adsValue: 'Meta + Google · обнаружено',

      commercialLeak: 'Точка потери',
      commercialLeakValue: 'НЕТ WHATSAPP',

      pitch: 'Сгенерировать WhatsApp-питч',
      pitchLocked: 'Доступ после анализа сайта',

      heroMicro:
        'Получите такой же аудит любого сайта за несколько секунд.',

      // SCANNING
      scanningBadge: 'AUDIT2REVENUE · АНАЛИЗ В РЕАЛЬНОМ ВРЕМЕНИ',
      scanProgressCompleted: 'ЗАВЕРШЕНО',
      scanProgressRunning: 'В ПРОЦЕССЕ',
      scanChecksLabel: 'Проверки системы',
      scanVerified: 'Проверено',
      scanScanning: 'Анализируем',
      demoScanNotice:
        'Демонстрация интерфейса: тестовое сканирование структуры сайта и демонстрация аналитики.',

      checklist: [
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
          discovered: '⚠️ Критично: тестовая заглушка вместо налогового NIF/CIF',
          type: 'error',
        },
      ],

      // REPORT
      reportLabel: 'DEMO · РЕЗУЛЬТАТЫ ЭКСПРЕСС-СКАНА',
      reportTitle: 'Результаты анализа сайта',
      reportMissedRevenue: 'Упущенная выручка: ~€1,800/мес',
      demoReportNotice:
        'Демонстрационный отчёт. Цифры, оценки и найденные проблемы носят иллюстративный характер для тестирования интерфейса разработчиком.',

      reportCard1Cat: 'Штрафы в Испании',
      reportCard1Title: 'Риск проверки регулятором',
      reportCard1Desc: 'Отсутствует обязательный NIF/CIF в футере...',
      reportCard1Foot: 'Штраф до €30,000',

      reportCard2Cat: 'Слив рекламы',
      reportCard2Title: 'Потеря ~35% заявок',
      reportCard2Desc: 'Клиенты уходят без быстрой связи в WhatsApp...',
      reportCard2Foot: 'Рекламный бюджет',

      reportCard3Cat: 'Карты Google',
      reportCard3Title: 'Жалобы на недозвон',
      reportCard3Desc: 'Потеря клиентов в часы пиковых обращений...',
      reportCard3Foot: 'Подробности',

      reportLocked: 'Скрыто 🔒',

      reportPurchaseBadge: 'Полный 12-страничный аудит',
      reportPurchaseTitle: 'Откройте полный отчет с готовыми решениями',
      reportPurchaseDesc:
        'Простой документ с пошаговым планом исправления всех ошибок для вашего программиста или юриста.',
      demoPriceBadge: 'DEMO · цена для примера',
      demoPriceNote: 'Показательная цена. Коммерческий приём платежей отключен.',
      demoPriceButton: 'Открыть демо-отчёт (Симуляция)',
      connecting: 'Подключение...',

      // FOOTER
      footerDisclaimer:
        'Проект находится в стадии некоммерческой разработки и демонстрации функционала. Платежи не принимаются, услуги не оказываются.',
      footer:
        '© 2026 Audit2Revenue.es — Сервис аудита и роста выручки сайтов в Испании.',
      footerLegalNav: 'Правовая информация',
      legalNotice: 'Правовое уведомление',
      privacyPolicy: 'Политика конфиденциальности',
      cookiePolicy: 'Политика cookies',
      termsOfService: 'Условия обслуживания',
      cookieSettings: 'Настройки cookies',

      cookieTitle: 'Мы используем cookies',
      cookieText:
        'Мы используем необходимые cookies для работы сайта и, с вашего согласия, дополнительные cookies для аналитики и улучшения сервиса.',
      cookieAccept: 'Принять все',
      cookieNecessary: 'Только необходимые',
    },

    es: {
      devBadge:
        'PROTOTIPO · Demostración técnica no comercial (Sin actividad económica)',
      h1_1: 'Encuentra los fallos en tu web,',
      h1_2: 'que te hacen perder clientes.',
      btn: 'Analizar web',
      placeholder: 'https://tu-clinica-o-salon.es',
      scanningTitle: 'Diagnóstico inteligente',

      previewLabel: 'AI AUDIT PREVIEW',
      previewStatus: 'DEMO · SISTEMA LISTO PARA ANALIZAR',
      demo: 'DEMO',

      exampleBusiness: 'Example Business',
      scoreLabel: 'PUNTUACIÓN',

      directPhoneFriction: 'Teléfono en Google Maps',
      directPhoneFrictionValue: 'Móvil directo · Ausente en web',

      ads: 'Publicidad',
      adsValue: 'Meta + Google · detectado',

      commercialLeak: 'Fuga comercial',
      commercialLeakValue: 'SIN WHATSAPP',

      pitch: 'Generar pitch de WhatsApp',
      pitchLocked: 'Disponible después del análisis',

      heroMicro:
        'Obtén una auditoría como esta para cualquier web en pocos segundos.',

      // SCANNING
      scanningBadge: 'AUDIT2REVENUE · ANÁLISIS EN VIVO',
      scanProgressCompleted: 'COMPLETADO',
      scanProgressRunning: 'EN PROGRESO',
      scanChecksLabel: 'Comprobaciones del sistema',
      scanVerified: 'Verificado',
      scanScanning: 'Analizando',
      demoScanNotice:
        'Demostración de interfaz: escaneo de prueba de estructura web y visualización de analítica.',

      checklist: [
        {
          title: 'Accesibilidad y velocidad móvil',
          discovered: '✓ El servidor responde en 160 ms, SSL TLS 1.3 activo',
          type: 'ok',
        },
        {
          title: 'Píxeles y rastreadores publicitarios',
          discovered: '✓ Meta Pixel (Instagram) y Google Ads Tag activos',
          type: 'ok',
        },
        {
          title: 'Conversión de tráfico móvil',
          discovered: '⚠️ Detectado: sin botón de WhatsApp, fuga de hasta 40% de visitas',
          type: 'warn',
        },
        {
          title: 'Reputación y reseñas en Google Maps',
          discovered: '✓ Nota 4.8★ (384 reseñas), quejas por falta de respuesta telefónica',
          type: 'warn',
        },
        {
          title: 'Auditoría legal LSSI-CE (España)',
          discovered: '⚠️ Crítico: texto de prueba en lugar de NIF/CIF fiscal',
          type: 'error',
        },
      ],

      // REPORT
      reportLabel: 'DEMO · RESULTADOS DEL ESCANEO',
      reportTitle: 'Resultados del análisis web',
      reportMissedRevenue: 'Ingresos perdidos: ~1.800 €/mes',
      demoReportNotice:
        'Informe en modo demostración. Diseñado exclusivamente para pruebas de desarrollo e interfaz técnica.',

      reportCard1Cat: 'Sanciones en España',
      reportCard1Title: 'Riesgo de sanción regulatoria',
      reportCard1Desc: 'Falta el NIF/CIF obligatorio en el pie de página...',
      reportCard1Foot: 'Multa hasta 30.000 €',

      reportCard2Cat: 'Fuga publicitaria',
      reportCard2Title: 'Pérdida de ~35% de leads',
      reportCard2Desc: 'Los usuarios se van sin contacto directo por WhatsApp...',
      reportCard2Foot: 'Presupuesto publicitario',

      reportCard3Cat: 'Google Maps',
      reportCard3Title: 'Quejas por llamadas perdidas',
      reportCard3Desc: 'Pérdida de clientes en horas punta de atención...',
      reportCard3Foot: 'Detalles',

      reportLocked: 'Bloqueado 🔒',

      reportPurchaseBadge: 'Auditoría completa de 12 páginas',
      reportPurchaseTitle: 'Desbloquea el informe completo con soluciones',
      reportPurchaseDesc:
        'Documento claro con el plan paso a paso para resolver todos los fallos con tu programador o asesor legal.',
      demoPriceBadge: 'DEMO · precio ilustrativo',
      demoPriceNote: 'Precio de ejemplo. Los pagos comerciales están desactivados en esta interfaz.',
      demoPriceButton: 'Ver informe demo (Simulación)',
      connecting: 'Conectando...',

      // FOOTER
      footerDisclaimer:
        'Entorno de pruebas de desarrollo técnico. No realiza actividad mercantil ni presta servicios remunerados.',
      footer:
        '© 2026 Audit2Revenue.es — Servicio de auditoría y crecimiento de webs en España.',
      footerLegalNav: 'Información legal',
      legalNotice: 'Aviso Legal',
      privacyPolicy: 'Política de Privacidad',
      cookiePolicy: 'Política de Cookies',
      termsOfService: 'Condiciones de Contratación',
      cookieSettings: 'Configurar cookies',

      cookieTitle: 'Utilizamos cookies',
      cookieText:
        'Utilizamos cookies necesarias para el funcionamiento del sitio y, con tu consentimiento, cookies adicionales para analizar y mejorar el servicio.',
      cookieAccept: 'Aceptar todas',
      cookieNecessary: 'Solo necesarias',
    },

    en: {
      devBadge:
        'PROTOTYPE · Non-commercial technical demo (Payments disabled)',
      h1_1: 'Find the website issues,',
      h1_2: 'that cost you customers.',
      btn: 'Analyze Website',
      placeholder: 'https://your-business.es',
      scanningTitle: 'Intelligent Website Audit',

      previewLabel: 'AI AUDIT PREVIEW',
      previewStatus: 'DEMO · SYSTEM READY TO ANALYZE',
      demo: 'DEMO',

      exampleBusiness: 'Example Business',
      scoreLabel: 'AUDIT SCORE',

      directPhoneFriction: 'Google Maps Phone',
      directPhoneFrictionValue: 'Direct mobile · Not on website',

      ads: 'Advertising',
      adsValue: 'Meta + Google · detected',

      commercialLeak: 'Commercial Leak',
      commercialLeakValue: 'NO WHATSAPP',

      pitch: 'Generate WhatsApp Pitch',
      pitchLocked: 'Available after website analysis',

      heroMicro:
        'Get an audit like this for any website in just a few seconds.',

      // SCANNING
      scanningBadge: 'AUDIT2REVENUE · LIVE SCAN',
      scanProgressCompleted: 'COMPLETED',
      scanProgressRunning: 'IN PROGRESS',
      scanChecksLabel: 'System checks',
      scanVerified: 'Checked',
      scanScanning: 'Scanning',
      demoScanNotice:
        'Interface preview: website layout scan test and analytical visualization.',

      checklist: [
        {
          title: 'Accessibility & Mobile Speed',
          discovered: '✓ Server responds in 160ms, SSL TLS 1.3 active',
          type: 'ok',
        },
        {
          title: 'Ad Trackers & Pixels',
          discovered: '✓ Meta Pixel (Instagram) and Google Ads Tag active',
          type: 'ok',
        },
        {
          title: 'Mobile Traffic Conversion',
          discovered: '⚠️ Detected: No WhatsApp button, losing up to 40% of leads',
          type: 'warn',
        },
        {
          title: 'Reputation & Google Maps Reviews',
          discovered: '✓ Rating 4.8★ (384 reviews), complaints about unanswered calls',
          type: 'warn',
        },
        {
          title: 'Legal Compliance LSSI-CE (Spain)',
          discovered: '⚠️ Critical: placeholder text instead of legal tax NIF/CIF',
          type: 'error',
        },
      ],

      // REPORT
      reportLabel: 'DEMO · SCAN RESULTS',
      reportTitle: 'Website Audit Results',
      reportMissedRevenue: 'Missed revenue: ~€1,800/mo',
      demoReportNotice:
        'Demo report. Exclusively intended for technical development and UI testing purposes.',

      reportCard1Cat: 'Fines in Spain',
      reportCard1Title: 'Regulatory Penalty Risk',
      reportCard1Desc: 'Missing mandatory NIF/CIF tax ID in the footer...',
      reportCard1Foot: 'Fines up to €30,000',

      reportCard2Cat: 'Ad Leak',
      reportCard2Title: 'Losing ~35% of Leads',
      reportCard2Desc: 'Visitors bounce without instant WhatsApp messaging...',
      reportCard2Foot: 'Advertising Budget',

      reportCard3Cat: 'Google Maps',
      reportCard3Title: 'Unanswered Call Complaints',
      reportCard3Desc: 'Losing high-intent customers during peak hours...',
      reportCard3Foot: 'Details',

      reportLocked: 'Locked 🔒',

      reportPurchaseBadge: 'Complete 12-page Audit',
      reportPurchaseTitle: 'Unlock the full report with actionable fixes',
      reportPurchaseDesc:
        'A clear step-by-step blueprint to fix all issues with your web developer or legal counsel.',
      demoPriceBadge: 'DEMO · illustrative price',
      demoPriceNote: 'Example price. Commercial payment processing is disabled in this interface.',
      demoPriceButton: 'View demo report (Simulation)',
      connecting: 'Connecting...',

      // FOOTER
      footerDisclaimer:
        'Technical prototype and developer sandbox. No commercial services are provided and no payments are accepted.',
      footer:
        '© 2026 Audit2Revenue.es — Website audit and revenue growth service in Spain.',
      footerLegalNav: 'Legal information',
      legalNotice: 'Legal Notice',
      privacyPolicy: 'Privacy Policy',
      cookiePolicy: 'Cookie Policy',
      termsOfService: 'Terms of Service',
      cookieSettings: 'Cookie settings',

      cookieTitle: 'We use cookies',
      cookieText:
        'We use necessary cookies to operate the website and, with your consent, additional cookies to analyze and improve the service.',
      cookieAccept: 'Accept all',
      cookieNecessary: 'Necessary only',
    },
  }[lang];

  const scanChecklist = t.checklist;

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
  // SCANNING & STRIPE
  // =========================================================
  const handleStartScan = (e: React.FormEvent) => {
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
      const elapsed = Date.now() - startTime;
      const currentP = Math.min(
        Math.round((elapsed / duration) * 100),
        100
      );
      setProgress(currentP);

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          setStage('report');
        }, 600);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [stage]);

  const handleStripeCheckout = async () => {
    setIsRedirecting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: url || 'https://clinica-mabelle.es',
          country: 'ES',
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push(`/report/demo-audit?url=${encodeURIComponent(url || 'https://clinica-mabelle.es')}&demo=true`);
      }
    } catch {
      router.push(`/report/demo-audit?url=${encodeURIComponent(url || 'https://clinica-mabelle.es')}&demo=true`);
    } finally {
      setIsRedirecting(false);
    }
  };

  // =========================================================
  // COOKIE CONSENT
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

  useEffect(() => {
    if (!showCookieModal) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCookieChoice('necessary');
      }
    };

    window.addEventListener('keydown', handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [showCookieModal]);

  return (
    <div className="relative min-h-[100dvh] bg-[#FBFBFD] text-[#1D1D1F] flex flex-col overflow-x-hidden selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">

      {/* ================= ЗАЩИТНАЯ ПЛАШКА РАЗРАБОТЧИКА ================= */}
      <div className="relative z-30 bg-[#0F2744] text-white px-3 py-1.5 text-center text-[10px] sm:text-[11px] font-medium border-b border-[#0284C7]/20 flex items-center justify-center gap-2">
        <Code2 className="w-3.5 h-3.5 text-[#7DD3FC] shrink-0" />
        <span className="tracking-wide text-slate-200">{t.devBadge}</span>
      </div>

      {/* ================= PRELOADER ================= */}
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
              INITIALIZING CORE
            </span>

            <div className="flex items-baseline justify-center gap-1 font-mono text-3xl font-extrabold text-[#0F2744]">
              <span>{loadProgress}</span>
              <span className="text-xs text-[#0284C7] font-bold">%</span>
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

      {/* ================= СТИЛИ АНИМАЦИИ (БЕЗ STYLED-JSX ДЛЯ ЧИСТОЙ ГИДРАТАЦИИ) ================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
          animation: header-drop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes card-reveal {
          0% {
            opacity: 0;
            transform: translateY(34px) scale(0.94) rotateX(8deg);
            filter: blur(10px);
          }
          60% {
            opacity: 1;
            transform: translateY(-3px) scale(1.012) rotateX(-1deg);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0);
            filter: blur(0);
          }
        }

        .anim-card {
          animation: card-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes text-line-unmask {
          0% {
            transform: translateY(125%) rotateX(-16deg);
            opacity: 0;
            filter: blur(6px);
          }
          100% {
            transform: translateY(0) rotateX(0);
            opacity: 1;
            filter: blur(0);
          }
        }

        .anim-line-1,
        .anim-line-2 {
          animation: text-line-unmask 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes bar-ignition {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.94);
            filter: blur(10px);
          }
          65% {
            transform: translateY(-2px) scale(1.01);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .anim-bar {
          animation: bar-ignition 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animated-input-border {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: rgba(2, 132, 199, 0.08);
          transition: box-shadow 350ms ease, background-color 350ms ease;
        }

        .animated-input-border::before {
          content: '';
          position: absolute;
          inset: -150%;
          z-index: 0;
          pointer-events: none;
          transform-origin: center;
          background: conic-gradient(
            from 0deg,
            transparent 0deg 235deg,
            #0F2744 260deg,
            #0284C7 300deg,
            #7DD3FC 330deg,
            transparent 360deg
          );
          opacity: 0.9;
          animation: input-border-travel 4s linear infinite;
          will-change: transform;
        }

        .animated-input-border:focus-within {
          background: rgba(2, 132, 199, 0.16);
          box-shadow: 0 0 0 1px rgba(2, 132, 199, 0.12), 0 0 22px rgba(2, 132, 199, 0.12);
        }

        .animated-input-border:focus-within::before {
          animation-duration: 2.4s;
          opacity: 1;
        }

        @keyframes input-border-travel {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
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
          animation: footer-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes simple-fade {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: simple-fade 0.5s ease-out forwards;
        }

        .audit-card-perspective {
          perspective: 1200px;
          perspective-origin: 50% 50%;
        }

        .audit-card-3d {
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --light-x: 50%;
          --light-y: 50%;
          --glow-opacity: 0;

          transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
          transform-style: preserve-3d;
          transform-origin: center center;
          will-change: transform;
          transition: transform 120ms linear;
        }

        .audit-card-shell {
          position: relative;
          transform-style: preserve-3d;
          animation: card-float 5s ease-in-out infinite;
        }

        .audit-card-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: radial-gradient(
            260px 200px at var(--light-x) var(--light-y),
            rgba(125, 211, 252, 1) 0%,
            rgba(2, 132, 199, 0.8) 17%,
            rgba(2, 132, 199, 0.28) 38%,
            rgba(2, 132, 199, 0.06) 55%,
            transparent 76%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          opacity: var(--glow-opacity);
          pointer-events: none;
          z-index: 50;
          filter: blur(0.2px);
        }

        .audit-card-content {
          position: relative;
          z-index: 10;
          transform-style: preserve-3d;
        }

        .audit-card-depth {
          transform: translateZ(14px);
          transform-style: preserve-3d;
        }

        .audit-card-depth-strong {
          transform: translateZ(24px);
          transform-style: preserve-3d;
        }

        .audit-card-shadow {
          position: absolute;
          inset: 15px -8px -14px;
          border-radius: 28px;
          background: rgba(15, 39, 68, 0.13);
          filter: blur(28px);
          transform: translateZ(-18px) scale(0.94);
          pointer-events: none;
        }

        @keyframes card-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes dot-pulse {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }

        .dot-pulse {
          animation: dot-pulse 2.2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-160%);
          }
          100% {
            transform: translateX(420%);
          }
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
            transform: translateY(24px) scale(0.96);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .anim-cookie-backdrop {
          animation: cookie-backdrop-in 0.45s ease-out forwards;
        }

        .anim-cookie-modal {
          animation: cookie-modal-in 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-height: 720px) {
          .audit-card-compact {
            transform: scale(0.92);
            transform-origin: center top;
            margin-bottom: -18px;
          }
        }

        @media (max-height: 640px) {
          .audit-card-compact {
            transform: scale(0.84);
            margin-bottom: -30px;
          }
        }

        @media (max-width: 640px) {
          .audit-card-3d {
            transition: transform 180ms linear;
          }
        }
      `,
        }}
      />

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
            <span className="font-semibold tracking-tight text-[#1D1D1F] text-[14px] sm:text-[15px]">
              Audit
              <span className="text-[#0284C7]">2</span>
              Revenue
            </span>
          </div>

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

            {/* 3D AUDIT CARD */}
            <div className="audit-card-perspective audit-card-compact w-full flex justify-center mb-2.5 sm:mb-3">
              <div
                className={`relative w-full max-w-[500px] ${
                  revealStep >= 2 ? 'anim-card' : 'opacity-0'
                }`}
              >
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

                      {/* DIVIDER */}
                      <div className="audit-card-depth h-px bg-[#E5EDF2] my-2.5 sm:my-3" />

                      {/* ПАРАМЕТРЫ */}
                      <div className="audit-card-depth space-y-1.5">
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

                      {/* PITCH CTA */}
                      <div className="audit-card-depth-strong relative mt-2.5 rounded-xl border border-[#BFDEEC] bg-[#F3FAFD] overflow-hidden">
                        <div className="absolute inset-y-0 w-[32%] bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_3.5s_linear_infinite] pointer-events-none" />

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

                      {/* STATUS */}
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

            {/* MICRO COPY */}
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
                  hasUrl
                    ? 'opacity-60 scale-[1.02]'
                    : isInputFocused
                      ? 'opacity-25 scale-[1.01]'
                      : 'opacity-0 scale-95'
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
                          hasUrl
                            ? 'text-[#0284C7] drop-shadow-[0_0_12px_rgba(2,132,199,0.95)] scale-110 rotate-12'
                            : 'text-[#86868B]'
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
            SCANNING (СТРАНИЦА АНАЛИЗА — ПОЛНОСТЬЮ ЛОКАЛИЗОВАНА)
        ==================================================== */}
        {stage !== 'idle' && (
          <div className="w-full max-w-4xl px-1 sm:px-3 py-5 sm:py-7 space-y-6 text-left animate-fade-in">
            <div className="flex items-start justify-between gap-5 pb-1">
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#0284C7] font-bold mb-1.5">
                  {t.scanningBadge}
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
                <span className="block mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-semibold text-[#94A3B8]">
                  {progress >= 100 ? t.scanProgressCompleted : t.scanProgressRunning}
                </span>
              </div>
            </div>

            <div className="w-full bg-[#EAF0F4] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="pt-1">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-[#64748B]">
                  {t.scanChecksLabel}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tabular-nums text-[#0284C7]">
                  {Math.min(Math.floor(progress / 20), scanChecklist.length)} / {scanChecklist.length}
                </span>
              </div>

              <div className="divide-y divide-[#E8EEF2]">
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

                            {isPassed ? (
                              <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-[#94A3B8]">
                                {t.scanVerified}
                              </span>
                            ) : isCurrent ? (
                              <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-[#0284C7] animate-pulse">
                                {t.scanScanning}
                              </span>
                            ) : null}
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
          </div>
        )}

        {/* ===================================================
            TEASER / REPORT (ПОЛНОСТЬЮ ЛОКАЛИЗОВАН)
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
                      {t.reportTitle}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-[#0284C7] font-mono break-all">
                      {url}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
                  {t.reportMissedRevenue}
                </div>
              </div>

              <p className="mt-4 rounded-xl border border-[#CBEAF7] bg-[#EFF9FD] px-4 py-3 text-[11px] sm:text-xs leading-relaxed text-[#0F2744]">
                {t.demoReportNotice}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>{t.reportCard1Cat}</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    {t.reportCard1Title}
                  </h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    {t.reportCard1Desc}
                  </p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">{t.reportCard1Foot}</span>
                    <span className="text-rose-600 font-medium">{t.reportLocked}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>{t.reportCard2Cat}</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    {t.reportCard2Title}
                  </h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    {t.reportCard2Desc}
                  </p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">{t.reportCard2Foot}</span>
                    <span className="text-rose-600 font-medium">{t.reportLocked}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>{t.reportCard3Cat}</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">
                    {t.reportCard3Title}
                  </h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    {t.reportCard3Desc}
                  </p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">{t.reportCard3Foot}</span>
                    <span className="text-rose-600 font-medium">{t.reportLocked}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PURCHASE */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-black/[0.06] shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.reportPurchaseBadge}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
                    {t.reportPurchaseTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                    {t.reportPurchaseDesc}
                  </p>
                </div>

                <div className="md:col-span-2 p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] text-center space-y-3">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-[#1D1D1F]">
                        €19
                      </span>
                      <span className="px-2 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/15 text-[9px] font-extrabold tracking-[0.12em] text-[#0284C7]">
                        DEMO
                      </span>
                    </div>

                    <span className="text-xs text-[#0284C7] font-semibold block">
                      {t.demoPriceBadge}
                    </span>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[#64748B]">
                      {t.demoPriceNote}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    disabled={isRedirecting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-bold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.connecting}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-current" />
                        <span>{t.demoPriceButton}</span>
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
          FOOTER (ЗАЩИЩЕН ОТ HYDRATION MISMATCH И ЛОКАЛИЗОВАН)
      ====================================================== */}
      <footer
        suppressHydrationWarning
        className={`relative z-20 min-h-12 sm:min-h-14 shrink-0 border-t border-black/[0.05] bg-white/70 backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center ${
          revealStep >= 6 ? 'anim-footer' : 'opacity-0'
        }`}
      >
        <div
          suppressHydrationWarning
          className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#64748B] gap-3 text-center lg:text-left"
        >
          <div suppressHydrationWarning translate="no" className="notranslate">
            <p suppressHydrationWarning className="font-medium text-[#1D1D1F]">
              {t.footer}
            </p>
            <p suppressHydrationWarning className="text-[9px] text-[#86868B] mt-0.5 max-w-xl">
              {t.footerDisclaimer}
            </p>
          </div>

          <nav
            suppressHydrationWarning
            aria-label={t.footerLegalNav}
            className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-[#64748B]"
          >
            <a href="/aviso-legal" className="transition hover:text-[#0284C7]">{t.legalNotice}</a>
            <a href="/politica-de-privacidad" className="transition hover:text-[#0284C7]">{t.privacyPolicy}</a>
            <a href="/politica-de-cookies" className="transition hover:text-[#0284C7]">{t.cookiePolicy}</a>
            <a href="/condiciones-de-contratacion" className="transition hover:text-[#0284C7]">{t.termsOfService}</a>
            <button type="button" onClick={() => setShowCookieModal(true)} className="transition hover:text-[#0284C7]">
              {t.cookieSettings}
            </button>
          </nav>
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
          aria-labelledby="cookie-title"
        >
          <div
            className="absolute inset-0 bg-[#0F2744]/25 backdrop-blur-md anim-cookie-backdrop"
            onClick={() => handleCookieChoice('necessary')}
          />

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
                onClick={() => handleCookieChoice('necessary')}
                className="flex-1 h-11 rounded-xl border border-black/[0.08] bg-[#F5F5F7] hover:bg-black/[0.06] text-[#1D1D1F] text-[13px] font-semibold transition"
              >
                {t.cookieNecessary}
              </button>

              <button
                type="button"
                onClick={() => handleCookieChoice('all')}
                className="flex-1 h-11 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white text-[13px] font-bold transition shadow-sm hover:scale-[1.01] active:scale-[0.98]"
              >
                {t.cookieAccept}
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