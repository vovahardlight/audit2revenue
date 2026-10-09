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
  const [isInputFocused, setIsInputFocused] =
    useState(false);
  const [isRedirecting, setIsRedirecting] =
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

      decisionMaker:
        'ЛПР',
      decisionMakerValue:
        'Найден в открытых источниках',

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
        'Получите такой же аудит любого сайта за несколько секунд.',

      teaserLabel:
        'Экспресс-скан завершен',

      footer:
        '© 2026 Audit2Revenue.es — Сервис аудита и роста выручки сайтов в Испании.',

      cookieTitle:
        'Мы используем cookies',
      cookieText:
        'Мы используем необходимые cookies для работы сайта и, с вашего согласия, дополнительные cookies для аналитики и улучшения сервиса.',
      cookieAccept:
        'Принять все',
      cookieNecessary:
        'Только необходимые',
    },

    es: {
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

      decisionMaker:
        'Responsable',
      decisionMakerValue:
        'Identificado en fuentes públicas',

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
        'Obtén una auditoría como esta para cualquier web en pocos segundos.',

      teaserLabel:
        'Escaneo rápido completado',

      footer:
        '© 2026 Audit2Revenue.es — Servicio de auditoría y crecimiento de webs en España.',

      cookieTitle:
        'Utilizamos cookies',
      cookieText:
        'Utilizamos cookies necesarias para el funcionamiento del sitio y, con tu consentimiento, cookies adicionales para analizar y mejorar el servicio.',
      cookieAccept:
        'Aceptar todas',
      cookieNecessary:
        'Solo necesarias',
    },

    en: {
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

      decisionMaker:
        'Decision Maker',
      decisionMakerValue:
        'Identified from public sources',

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
        'Get an audit like this for any website in just a few seconds.',

      teaserLabel:
        'Quick scan completed',

      footer:
        '© 2026 Audit2Revenue.es — Website audit and revenue growth service in Spain.',

      cookieTitle:
        'We use cookies',
      cookieText:
        'We use necessary cookies to operate the website and, with your consent, additional cookies to analyze and improve the service.',
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
      const elapsed =
        Date.now() - startTime;

      const p = Math.min(
        Math.round(
          (elapsed / duration) * 100
        ),
        100
      );

      setLoadProgress(p);

      if (elapsed >= duration) {
        clearInterval(interval);

        setTimeout(() => {
          setPageLoading(false);

          setTimeout(
            () => setRevealStep(1),
            120
          );

          setTimeout(
            () => setRevealStep(2),
            300
          );

          setTimeout(
            () => setRevealStep(3),
            480
          );

          setTimeout(
            () => setRevealStep(4),
            660
          );

          setTimeout(
            () => setRevealStep(5),
            840
          );

          setTimeout(
            () => setRevealStep(6),
            1020
          );
        }, 150);
      }
    }, 20);

    return () =>
      clearInterval(interval);
  }, []);

  // =========================================================
  // 3D CARD — FULL VIEWPORT CURSOR TRACKING
  // =========================================================

  useEffect(() => {
    const card =
      auditCardRef.current;

    if (!card) {
      return;
    }

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let animationFrame = 0;

    const handlePointerMove = (
      e: PointerEvent
    ) => {
      if (e.pointerType !== 'mouse') {
        return;
      }

      /*
       * ВАЖНО:
       * координаты считаются относительно ВСЕГО экрана.
       * Поэтому карточка реагирует на мышь даже тогда,
       * когда курсор находится далеко от самой карточки.
       */

      targetX =
        e.clientX /
          window.innerWidth -
        0.5;

      targetY =
        e.clientY /
          window.innerHeight -
        0.5;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      /*
       * Плавное следование.
       * Чем меньше число, тем более "тяжёлой"
       * ощущается карточка.
       */

      currentX +=
        (targetX - currentX) *
        0.9;

      currentY +=
        (targetY - currentY) *
        0.9;

      /*
       * Максимальный наклон:
       *
       * currentX = -0.5 ... +0.5
       * currentY = -0.5 ... +0.5
       *
       * 28 → примерно ±14°
       * 22 → примерно ±11°
       */

      const rotateY =
        currentX * 40;

      const rotateX =
        -currentY * 30;

      /*
       * Свет следует за той же точкой,
       * где сейчас курсор на viewport.
       */

      const lightX =
        (currentX + 0.5) *
        100;

      const lightY =
        (currentY + 0.5) *
        100;

      card.style.setProperty(
        '--rotate-x',
        `${rotateX}deg`
      );

      card.style.setProperty(
        '--rotate-y',
        `${rotateY}deg`
      );

      card.style.setProperty(
        '--light-x',
        `${lightX}%`
      );

      card.style.setProperty(
        '--light-y',
        `${lightY}%`
      );

      card.style.setProperty(
        '--glow-opacity',
        '1'
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      'pointerleave',
      handlePointerLeave
    );

    animate();

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      window.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, []);

  // =========================================================
  // SCANNING
  // =========================================================

  const handleStartScan = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    let formatted =
      url.trim();

    if (
      !formatted.startsWith(
        'http://'
      ) &&
      !formatted.startsWith(
        'https://'
      )
    ) {
      formatted =
        `https://${formatted}`;

      setUrl(formatted);
    }

    setStage('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (
      stage !== 'scanning'
    ) {
      return;
    }

    const startTime =
      Date.now();

    const duration = 6500;

    const timer =
      setInterval(() => {
        const elapsed =
          Date.now() -
          startTime;

        const currentP =
          Math.min(
            Math.round(
              (elapsed /
                duration) *
                100
            ),
            100
          );

        setProgress(
          currentP
        );

        if (
          elapsed >=
          duration
        ) {
          clearInterval(timer);

          setTimeout(() => {
            setStage('teaser');
          }, 600);
        }
      }, 50);

    return () =>
      clearInterval(timer);
  }, [stage]);

  // =========================================================
  // COOKIE CHOICE
  // =========================================================

  const handleCookieChoice = (
    choice:
      | 'all'
      | 'necessary'
  ) => {
    localStorage.setItem(
      'a2r_cookie_consent',
      choice
    );

    setShowCookieModal(
      false
    );
  };

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

    const consent =
      localStorage.getItem(
        'a2r_cookie_consent'
      );

    if (consent) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setShowCookieModal(
          true
        );
      }, 800);

    return () =>
      window.clearTimeout(
        timer
      );
  }, [
    revealStep,
    pageLoading,
  ]);

  useEffect(() => {
    if (!showCookieModal) {
      return;
    }

    const handleEscape = (
      e: KeyboardEvent
    ) => {
      if (e.key === 'Escape') {
        handleCookieChoice(
          'necessary'
        );
      }
    };

    window.addEventListener(
      'keydown',
      handleEscape
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [showCookieModal]);

  // =========================================================
  // STRIPE
  // =========================================================

  const handleStripeCheckout =
    async () => {
      setIsRedirecting(true);

      try {
        const res =
          await fetch(
            '/api/checkout',
            {
              method:
                'POST',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify(
                {
                  targetUrl:
                    url,
                  country:
                    'ES',
                }
              ),
            }
          );

        const data =
          await res.json();

        if (data.url) {
          window.location.href =
            data.url;
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
        setIsRedirecting(
          false
        );
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
    <div className="relative min-h-[100dvh] bg-[#FBFBFD] text-[#1D1D1F] flex flex-col overflow-x-hidden selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">

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
                width:
                  `${loadProgress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style jsx global>{`

        @keyframes header-drop {
          0% {
            opacity: 0;
            transform:
              translateY(-24px);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        .anim-header {
          animation:
            header-drop
            0.8s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* ================================================
           CARD ENTRANCE
        ================================================ */

        @keyframes card-reveal {
          0% {
            opacity: 0;
            transform:
              translateY(34px)
              scale(0.94)
              rotateX(8deg);
            filter:
              blur(10px);
          }

          60% {
            opacity: 1;
            transform:
              translateY(-3px)
              scale(1.012)
              rotateX(-1deg);
            filter:
              blur(0);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1)
              rotateX(0);
            filter:
              blur(0);
          }
        }

        .anim-card {
          animation:
            card-reveal
            1s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* ================================================
           H1
        ================================================ */

        @keyframes text-line-unmask {
          0% {
            transform:
              translateY(125%)
              rotateX(-16deg);
            opacity: 0;
            filter:
              blur(6px);
          }

          100% {
            transform:
              translateY(0)
              rotateX(0);
            opacity: 1;
            filter:
              blur(0);
          }
        }

        .anim-line-1,
        .anim-line-2 {
          animation:
            text-line-unmask
            0.9s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* ================================================
           INPUT
        ================================================ */

        @keyframes bar-ignition {
          0% {
            opacity: 0;
            transform:
              translateY(28px)
              scale(0.94);
            filter:
              blur(10px);
          }

          65% {
            transform:
              translateY(-2px)
              scale(1.01);
            filter:
              blur(0);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            filter:
              blur(0);
          }
        }

        .anim-bar {
          animation:
            bar-ignition
            0.95s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* ================================================
           ANIMATED INPUT BORDER — A2R BRAND COLORS
           Navy #0F2744 → Blue #0284C7 → Ice Blue #7DD3FC
        ================================================ */

        .animated-input-border {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: rgba(2, 132, 199, 0.08);
          transition:
            box-shadow 350ms ease,
            background-color 350ms ease;
        }

        .animated-input-border::before {
          content: '';
          position: absolute;
          inset: -150%;
          /* Keep the animated gradient above the wrapper background. */
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
          box-shadow:
            0 0 0 1px rgba(2, 132, 199, 0.12),
            0 0 22px rgba(2, 132, 199, 0.12);
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

        /* ================================================
           FOOTER
        ================================================ */

        @keyframes footer-fade {
          0% {
            opacity: 0;
            transform:
              translateY(12px);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        .anim-footer {
          animation:
            footer-fade
            0.7s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* ================================================
           GENERIC FADE
        ================================================ */

        @keyframes simple-fade {
          0% {
            opacity: 0;
            transform:
              translateY(8px);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        .animate-fade-in {
          animation:
            simple-fade
            0.5s
            ease-out
            forwards;
        }

        /* ================================================
           3D CARD
        ================================================ */

        .audit-card-perspective {
          perspective:
            1200px;

          perspective-origin:
            50% 50%;
        }

        .audit-card-3d {
          --rotate-x: 0deg;
          --rotate-y: 0deg;

          --light-x: 50%;
          --light-y: 50%;

          --glow-opacity: 0;

          transform:
            rotateX(
              var(--rotate-x)
            )
            rotateY(
              var(--rotate-y)
            );

          transform-style:
            preserve-3d;

          transform-origin:
            center center;

          will-change:
            transform;

          transition:
            transform
            120ms
            linear;
        }

        .audit-card-shell {
          position:
            relative;

          transform-style:
            preserve-3d;

          animation:
            card-float
            5s
            ease-in-out
            infinite;
        }

        /*
         * Динамический светящийся край.
         * Световая точка находится в том же направлении,
         * где находится курсор относительно всего viewport.
         */

        .audit-card-shell::before {
          content:
            '';

          position:
            absolute;

          inset:
            0;

          border-radius:
            inherit;

          padding:
            2px;

          background:
            radial-gradient(
              260px 200px
              at
              var(--light-x)
              var(--light-y),

              rgba(
                125,
                211,
                252,
                1
              )
              0%,

              rgba(
                2,
                132,
                199,
                0.8
              )
              17%,

              rgba(
                2,
                132,
                199,
                0.28
              )
              38%,

              rgba(
                2,
                132,
                199,
                0.06
              )
              55%,

              transparent
              76%
            );

          -webkit-mask:
            linear-gradient(
              #000 0 0
            )
            content-box,

            linear-gradient(
              #000 0 0
            );

          -webkit-mask-composite:
            xor;

          mask:
            linear-gradient(
              #000 0 0
            )
            content-box,

            linear-gradient(
              #000 0 0
            );

          mask-composite:
            exclude;

          opacity:
            var(--glow-opacity);

          pointer-events:
            none;

          z-index:
            50;

          filter:
            blur(0.2px);
        }

        /*
         * Мягкая внутренняя засветка.
         */

        // .audit-card-shell::after 
        // {
        //   content:
        //     '';

        //   position:
        //     absolute;

        //   inset:
        //     0;

        //   border-radius:
        //     inherit;

        //   background:
        //     radial-gradient(
        //       300px 220px
        //       at
        //       var(--light-x)
        //       var(--light-y),

        //       rgba(
        //         255,
        //         255,
        //         255,
        //         0.58
        //       )
        //       0%,

        //       rgba(
        //         125,
        //         211,
        //         252,
        //         0.11
        //       )
        //       24%,

        //       transparent
        //       68%
        //     );

        //   opacity:
        //     var(--glow-opacity);

        //   pointer-events:
        //     none;

        //   z-index:
        //     20;

        //   mix-blend-mode:
        //     soft-light;
        // }

        .audit-card-content {
          position:
            relative;

          z-index:
            10;

          transform-style:
            preserve-3d;
        }

        .audit-card-depth {
          transform:
            translateZ(14px);

          transform-style:
            preserve-3d;
        }

        .audit-card-depth-strong {
          transform:
            translateZ(24px);

          transform-style:
            preserve-3d;
        }

        /*
         * Дополнительный мягкий moving-light слой.
         */

        // .audit-card-light {
        //   position:
        //     absolute;

        //   width:
        //     230px;

        //   height:
        //     230px;

        //   left:
        //     var(--light-x);

        //   top:
        //     var(--light-y);

        //   transform:
        //     translate(
        //       -50%,
        //       -50%
        //     );

        //   background:
        //     radial-gradient(
        //       circle,

        //       rgba(
        //         125,
        //         211,
        //         252,
        //         0.20
        //       )
        //       0%,

        //       rgba(
        //         2,
        //         132,
        //         199,
        //         0.08
        //       )
        //       25%,

        //       transparent
        //       70%
        //     );

        //   opacity:
        //     var(--glow-opacity);

        //   pointer-events:
        //     none;

        //   z-index:
        //     15;
        // }

        .audit-card-shadow {
          position:
            absolute;

          inset:
            15px
            -8px
            -14px;

          border-radius:
            28px;

          background:
            rgba(
              15,
              39,
              68,
              0.13
            );

          filter:
            blur(28px);

          transform:
            translateZ(
              -18px
            )
            scale(
              0.94
            );

          pointer-events:
            none;
        }

        @keyframes card-float {
          0%,
          100% {
            translate:
              0
              0;
          }

          50% {
            translate:
              0
              -4px;
          }
        }

        /* ================================================
           STATUS DOTS
        ================================================ */

        @keyframes dot-pulse {
          0%,
          100% {
            opacity:
              0.55;

            transform:
              scale(
                0.9
              );
          }

          50% {
            opacity:
              1;

            transform:
              scale(
                1.12
              );
          }
        }

        .dot-pulse {
          animation:
            dot-pulse
            2.2s
            ease-in-out
            infinite;
        }

        /* ================================================
           CTA SHIMMER
        ================================================ */

        @keyframes shimmer {
          0% {
            transform:
              translateX(
                -160%
              );
          }

          100% {
            transform:
              translateX(
                420%
              );
          }
        }

        /* ================================================
           COOKIE
        ================================================ */

        @keyframes cookie-backdrop-in {
          0% {
            opacity:
              0;
          }

          100% {
            opacity:
              1;
          }
        }

        @keyframes cookie-modal-in {
          0% {
            opacity:
              0;

            transform:
              translateY(
                24px
              )
              scale(
                0.96
              );

            filter:
              blur(
                8px
              );
          }

          100% {
            opacity:
              1;

            transform:
              translateY(
                0
              )
              scale(
                1
              );

            filter:
              blur(
                0
              );
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
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            forwards;
        }

        /* ================================================
           SMALL HEIGHT DEVICES
        ================================================ */

        @media (
          max-height: 720px
        ) {
          .audit-card-compact {
            transform:
              scale(
                0.92
              );

            transform-origin:
              center top;

            margin-bottom:
              -18px;
          }
        }

        @media (
          max-height: 640px
        ) {
          .audit-card-compact {
            transform:
              scale(
                0.84
              );

            margin-bottom:
              -30px;
          }
        }

        @media (
          max-width: 640px
        ) {
          .audit-card-3d {
            transition:
              transform
              180ms
              linear;
          }
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .audit-card-3d {
            transition:
              none;
          }

          .audit-card-shell {
            animation:
              none;
          }

          .dot-pulse {
            animation:
              none;
          }

          .animated-input-border::before {
            /* Keep the requested border motion, but slow it down. */
            animation-duration: 8s;
            opacity: 0.55;
          }
        }
      `}</style>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className={`relative z-20 h-14 sm:h-16 shrink-0 border-b border-black/[0.05] backdrop-blur-xl bg-white/80 px-4 sm:px-8 flex items-center ${
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

            <span className="font-semibold tracking-tight text-[#1D1D1F] text-[14px] sm:text-[15px]">
              Audit
              <span className="text-[#0284C7]">
                2
              </span>
              Revenue
            </span>
          </div>

          <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05]">

            {(
              [
                'es',
                'en',
                'ru',
              ] as Lang[]
            ).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setLang(item)
                  }
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] ${
                    lang === item
                      ? 'bg-white text-[#0284C7] shadow-sm font-bold'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 flex-1 min-h-0 flex flex-col justify-center items-center px-4 sm:px-6 py-3 sm:py-4 w-full">

        {/* ===================================================
            IDLE
        ==================================================== */}

        {stage === 'idle' && (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center">

            {/* =================================================
                3D AUDIT CARD
            ================================================== */}

            <div className="audit-card-perspective audit-card-compact w-full flex justify-center mb-2.5 sm:mb-3">

              <div
                className={`relative w-full max-w-[500px] ${
                  revealStep >= 2
                    ? 'anim-card'
                    : 'opacity-0'
                }`}
              >
                <div
                  ref={
                    auditCardRef
                  }
                  className="audit-card-3d relative"
                >

                  {/* Shadow */}

                  <div className="audit-card-shadow" />

                  {/* Ambient glow */}

                  <div className="absolute -inset-5 rounded-[34px] bg-[#0284C7]/8 blur-2xl pointer-events-none" />

                  {/* Decorative particles */}

                

                  {/* =================================================
                      CARD SHELL
                  ================================================== */}

                  <div className="audit-card-shell relative overflow-hidden rounded-[26px] bg-white border border-[#D5E1E9] shadow-[0_22px_65px_rgba(15,39,68,0.15)]">

                    {/* top line */}

                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent z-[60]" />

                    {/* background glow */}

                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#EFFAFF] to-transparent pointer-events-none z-[1]" />

                    {/* moving light */}

                    <div className="audit-card-light" />

                    {/* content */}

                    <div className="audit-card-content px-4 py-3.5 sm:px-5 sm:py-4">

                      {/* ==========================================
                          HEADER
                      =========================================== */}

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

                      {/* ==========================================
                          INSIGHTS
                      =========================================== */}

                      <div className="audit-card-depth space-y-1.5">

                        {/* Decision Maker */}

                        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F8FAFC] border border-[#E4EBF0] px-2.5 sm:px-3 py-1.5 sm:py-2">

                          <div className="flex items-center gap-2 min-w-0">

                            <div className="w-6 h-6 rounded-lg bg-[#EFF9FD] border border-[#D7EDF6] flex items-center justify-center shrink-0">

                              <UserRound className="w-3.5 h-3.5 text-[#0284C7]" />
                            </div>

                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#64748B] whitespace-nowrap">
                              {t.decisionMaker}
                            </span>
                          </div>

                          <span className="text-[9px] sm:text-[10px] font-bold text-[#0F2744] text-right truncate max-w-[52%]">
                            {t.decisionMakerValue}
                          </span>
                        </div>

                        {/* Ads */}

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

                        {/* Commercial leak */}

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

                      {/* ==========================================
                          PITCH CTA
                      =========================================== */}

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

            {/* =================================================
                H1
            ================================================== */}

            <div className="w-full space-y-0.5 mb-1.5">

              <div className="overflow-hidden py-0.5">

                <span
                  className={`block text-[28px] sm:text-[42px] lg:text-[48px] font-black tracking-[-0.035em] leading-[1.05] text-[#1D1D1F] will-change-transform ${
                    revealStep >= 3
                      ? 'anim-line-1'
                      : 'opacity-0'
                  }`}
                >
                  {t.h1_1}
                </span>
              </div>

              <div className="overflow-hidden py-0.5">

                <span
                  className={`block text-[28px] sm:text-[42px] lg:text-[48px] font-black tracking-[-0.035em] leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] will-change-transform ${
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
              className={`text-[10px] sm:text-xs text-[#6E6E73] mb-2.5 sm:mb-3 transition-all duration-700 px-3 ${
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
              onSubmit={
                handleStartScan
              }
              className={`w-full max-w-[540px] relative will-change-transform ${
                revealStep >= 5
                  ? 'anim-bar'
                  : 'opacity-0'
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
                    hasUrl
                      ? 'shadow-[0_0_0_2px_#0284C7]'
                      : ''
                  }`}
                >

                  <div className="flex-1 w-full flex items-center gap-3 px-3.5 h-10 sm:h-12">

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
                      className="w-full min-w-0 bg-transparent text-[13px] sm:text-[15px] text-[#1D1D1F] placeholder-[#86868B] focus:outline-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-semibold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
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
          <div className="w-full max-w-[500px] p-5 sm:p-7 rounded-3xl bg-white/95 border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl space-y-5 text-center animate-fade-in">

            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3.5">

              <div className="text-left min-w-0">

                <h3 className="text-base font-bold text-[#1D1D1F]">
                  {t.scanningTitle}
                </h3>

                <p className="text-xs text-[#0284C7] font-medium truncate max-w-[260px] mt-0.5 font-mono">
                  {url}
                </p>
              </div>

              <div className="flex items-baseline gap-0.5 shrink-0">

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
                  width:
                    `${progress}%`,
                }}
              />
            </div>

            <div className="space-y-2.5 text-left pt-1">

              {scanChecklist.map(
                (
                  item,
                  idx
                ) => {

                  const stepThreshold =
                    (idx + 1) *
                    20;

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
                          {
                            item.title
                          }
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
          <div className="w-full max-w-4xl space-y-5 sm:space-y-6 text-left my-auto animate-fade-in">

            <div className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-rose-200 shadow-lg backdrop-blur-xl">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/[0.05] pb-4">

                <div className="flex items-center gap-3">

                  <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 shrink-0">

                    <ShieldAlert className="w-6 h-6" />
                  </div>

                  <div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                      {t.teaserLabel}
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

            {/* PURCHASE */}

            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-black/[0.06] shadow-xl">

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
        className={`relative z-20 min-h-12 sm:min-h-14 shrink-0 border-t border-black/[0.05] bg-white/70 backdrop-blur-xl px-4 sm:px-8 py-2 flex items-center ${
          revealStep >= 6
            ? 'anim-footer'
            : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[11px] text-[#86868B] gap-1.5 text-center sm:text-left">

          <p>
            {t.footer}
          </p>

          <div className="flex items-center gap-3 sm:gap-4">

            <span className="hidden sm:inline">
              Comunidad de Madrid
            </span>

            <span className="hidden sm:inline">
              •
            </span>

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
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
        >

          {/* Backdrop */}

          <div
            className="absolute inset-0 bg-[#0F2744]/25 backdrop-blur-md anim-cookie-backdrop"
            onClick={() =>
              handleCookieChoice(
                'necessary'
              )
            }
          />

          {/* Modal */}

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