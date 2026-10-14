'use client';

import React, {
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Loader2,
  AlertTriangle,
  XCircle,
  Target,
  MessageCircle,
  Activity,
  TrendingDown,
  Code2,
  PhoneCall,
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

// Хук, работающий до отрисовки пикселей в браузере (без предупреждений SSR)
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function AppleNordicGlacierPureLanding() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  // Исходный язык одинаков для SSR и первой гидратации (защита от Hydration Failed)
  const [lang, setLang] = useState<Lang>('ru');

  // Читаем сохраненный язык ДО отрисовки первого кадра (без мигания и без ошибок гидратации)
  useIsomorphicLayoutEffect(() => {
    try {
      const saved = localStorage.getItem('a2r_lang') as Lang;
      if (saved && ['ru', 'es', 'en'].includes(saved)) {
        setLang(saved);
        return;
      }

      const match = document.cookie.match(/(?:^|; )a2r_lang=([^;]*)/);
      if (match && ['ru', 'es', 'en'].includes(match[1])) {
        setLang(match[1] as Lang);
        return;
      }

      const navLang = navigator.language?.slice(0, 2);
      if (navLang === 'es' || navLang === 'en') {
        setLang(navLang as Lang);
      }
    } catch {}
  }, []);

  // Функция переключения с сохранением в память и куки
  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('a2r_lang', newLang);
    document.cookie = `a2r_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const [stage, setStage] = useState<'idle' | 'scanning' | 'report'>('idle');

  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // PRELOADER
  const [pageLoading, setPageLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealStep, setRevealStep] = useState(0);

  // COOKIE & INTERACTION
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [resolvedDemoIssues, setResolvedDemoIssues] = useState<number[]>([]);

  // 3D CARD
  const auditCardRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('a2r-reveals-ready');
    }
  }, []);

  const hasUrl = useMemo(
    () => url.trim().length > 3,
    [url]
  );

  const t = {
    ru: {
      devBadge:
        'ПРОТОТИП · Некоммерческая разработка (Платежи отключены / Тестовый режим)',
      h1_1: 'Сайт теряет',
      h1_2: 'клиентов?',
      btn: 'Проверить',
      prev: 'Назад',
      next: 'Далее',
      placeholder: 'https://vash-salon-ili-klinika.es',
      scanningTitle: 'Интеллектуальная диагностика',

      previewLabel: 'AI AUDIT PREVIEW',
      previewStatus: 'DEMO · СИСТЕМА ГОТОВА К АНАЛИЗУ',
      demo: 'DEMO',

      exampleBusiness: 'Example Business',
      scoreLabel: 'AUDIT SCORE',
      revenueScoreTitle: 'Индекс потенциала выручки',
      revenueScoreNote: 'Демо-модель сайта · не прогноз реальной выручки',
      scoreIssueTrust: 'Юридические данные',
      scoreIssueTrustDetail: 'Демо: реквизиты компании требуют проверки.',
      scoreIssueContact: 'Связь с клиентом',
      scoreIssueContactDetail: 'Демо: быстрый канал связи требует проверки.',
      scoreIssueLocal: 'Локальная видимость',
      scoreIssueLocalDetail: 'Демо: телефон, часы работы и карточку компании стоит проверить.',
      scoreSimulateFix: 'Смоделировать исправление',
      scoreUndoFix: 'Отменить симуляцию',
      scoreFixed: 'Исправление смоделировано',
      scoreReset: 'Сбросить',
      scorePointsRestored: 'Восстановлено в симуляции',
      scorePoints: 'баллов',
      scoreOutOf: 'из 100',

      directPhoneFriction: 'Телефон в картах Google',
      directPhoneFrictionValue: 'Скрытый мобильный · Нет на сайте',

      ads: 'Реклама',
      adsValue: 'Meta + Google · обнаружено',

      commercialLeak: 'Точка потери',
      commercialLeakValue: 'НЕТ WHATSAPP',

      pitch: 'Сгенерировать WhatsApp-питч',
      pitchLocked: 'Доступ после анализа сайта',

      heroMicro:
        'Узнайте, что мешает посетителям оставить заявку: мобильная версия, контакты, реклама или доверие.',

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
      reportCard1Action: 'Сверить реквизиты компании в подвале сайта и юридических страницах; требования уточнить у профильного специалиста.',

      reportCard2Cat: 'Слив рекламы',
      reportCard2Title: 'Потеря ~35% заявок',
      reportCard2Desc: 'Клиенты уходят без быстрой связи в WhatsApp...',
      reportCard2Foot: 'Рекламный бюджет',
      reportCard2Action: 'Проверить заметность WhatsApp на мобильном экране и передачу источника заявки в аналитику.',

      reportCard3Cat: 'Карты Google',
      reportCard3Title: 'Жалобы на недозвон',
      reportCard3Desc: 'Потеря клиентов в часы пиковых обращений...',
      reportCard3Foot: 'Подробности',
      reportCard3Action: 'Сверить телефон, часы работы и ссылку в карточке компании; определить порядок обработки пропущенных звонков.',

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
      h1_1: '¿Tu web pierde',
      h1_2: 'clientes?',
      btn: 'Analizar',
      prev: 'Anterior',
      next: 'Siguiente',
      placeholder: 'https://tu-clinica-o-salon.es',
      scanningTitle: 'Diagnóstico inteligente',

      previewLabel: 'AI AUDIT PREVIEW',
      previewStatus: 'DEMO · SISTEMA LISTO PARA ANALIZAR',
      demo: 'DEMO',

      exampleBusiness: 'Example Business',
      scoreLabel: 'PUNTUACIÓN',
      revenueScoreTitle: 'Índice de potencial de ingresos',
      revenueScoreNote: 'Modelo de demostración · no es una previsión real',
      scoreIssueTrust: 'Datos legales',
      scoreIssueTrustDetail: 'Demo: es necesario revisar los datos fiscales de la empresa.',
      scoreIssueContact: 'Contacto con clientes',
      scoreIssueContactDetail: 'Demo: conviene revisar el canal de contacto rápido.',
      scoreIssueLocal: 'Visibilidad local',
      scoreIssueLocalDetail: 'Demo: conviene revisar el teléfono, el horario y la ficha del negocio.',
      scoreSimulateFix: 'Simular corrección',
      scoreUndoFix: 'Deshacer simulación',
      scoreFixed: 'Corrección simulada',
      scoreReset: 'Restablecer',
      scorePointsRestored: 'Recuperado en la simulación',
      scorePoints: 'puntos',
      scoreOutOf: 'de 100',

      directPhoneFriction: 'Teléfono en Google Maps',
      directPhoneFrictionValue: 'Móvil directo · Ausente en web',

      ads: 'Publicidad',
      adsValue: 'Meta + Google · detectado',

      commercialLeak: 'Fuga comercial',
      commercialLeakValue: 'SIN WHATSAPP',

      pitch: 'Generar pitch de WhatsApp',
      pitchLocked: 'Disponible después del análisis',

      heroMicro:
        'Descubre qué impide que los visitantes contacten: móvil, datos de contacto, publicidad o confianza.',

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
      reportCard1Action: 'Revisar los datos de empresa en el pie y las páginas legales; confirmar los requisitos con un profesional.',

      reportCard2Cat: 'Fuga publicitaria',
      reportCard2Title: 'Pérdida de ~35% de leads',
      reportCard2Desc: 'Los usuarios se van sin contacto directo por WhatsApp...',
      reportCard2Foot: 'Presupuesto publicitario',
      reportCard2Action: 'Comprobar la visibilidad de WhatsApp en móvil y el registro de la fuente de cada contacto en analítica.',

      reportCard3Cat: 'Google Maps',
      reportCard3Title: 'Quejas por llamadas perdidas',
      reportCard3Desc: 'Pérdida de clientes en horas punta de atención...',
      reportCard3Foot: 'Detalles',
      reportCard3Action: 'Revisar teléfono, horario y enlace en la ficha de empresa; definir cómo atender las llamadas perdidas.',

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
      h1_1: 'Is your website losing',
      h1_2: 'customers?',
      btn: 'Analyze',
      prev: 'Previous',
      next: 'Next',
      placeholder: 'https://your-business.es',
      scanningTitle: 'Intelligent Website Audit',

      previewLabel: 'AI AUDIT PREVIEW',
      previewStatus: 'DEMO · SYSTEM READY TO ANALYZE',
      demo: 'DEMO',

      exampleBusiness: 'Example Business',
      scoreLabel: 'AUDIT SCORE',
      revenueScoreTitle: 'Revenue potential index',
      revenueScoreNote: 'Demo model · not a real revenue forecast',
      scoreIssueTrust: 'Legal information',
      scoreIssueTrustDetail: 'Demo: company registration details need review.',
      scoreIssueContact: 'Customer contact',
      scoreIssueContactDetail: 'Demo: the quick contact route needs review.',
      scoreIssueLocal: 'Local visibility',
      scoreIssueLocalDetail: 'Demo: phone, opening hours, and business listing need review.',
      scoreSimulateFix: 'Simulate a fix',
      scoreUndoFix: 'Undo simulation',
      scoreFixed: 'Fix simulated',
      scoreReset: 'Reset',
      scorePointsRestored: 'Restored in simulation',
      scorePoints: 'points',
      scoreOutOf: 'out of 100',

      directPhoneFriction: 'Google Maps Phone',
      directPhoneFrictionValue: 'Direct mobile · Not on website',

      ads: 'Advertising',
      adsValue: 'Meta + Google · detected',

      commercialLeak: 'Commercial Leak',
      commercialLeakValue: 'NO WHATSAPP',

      pitch: 'Generate WhatsApp Pitch',
      pitchLocked: 'Available after website analysis',

      heroMicro:
        'See what stops visitors from getting in touch: mobile experience, contact options, ads, or trust.',

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
      reportCard1Action: 'Check the company details in the footer and legal pages; confirm requirements with a qualified professional.',

      reportCard2Cat: 'Ad Leak',
      reportCard2Title: 'Losing ~35% of Leads',
      reportCard2Desc: 'Visitors bounce without instant WhatsApp messaging...',
      reportCard2Foot: 'Advertising Budget',
      reportCard2Action: 'Check that WhatsApp is easy to find on mobile and that enquiry sources reach analytics.',

      reportCard3Cat: 'Google Maps',
      reportCard3Title: 'Unanswered Call Complaints',
      reportCard3Desc: 'Losing high-intent customers during peak hours...',
      reportCard3Foot: 'Details',
      reportCard3Action: 'Check the phone, hours, and website link on the business listing; define a process for missed calls.',

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

  // СТРУКТУРА 3 ОПОР АУДИТА (01, 02, 03)
  const landingCopy = {
    ru: {
      eyebrow: 'Аудит сайта · Испания',
      insightTitle: 'Каждый клик должен вести к клиенту.',
      insightIntro: '3 критические точки, где сайт в Испании теряет заявки, доверие и рекламу.',
      insightLead: ['Находим', 'узкие места', 'и показываем', 'что исправить.'],
      auditTitle: '3 опоры коммерческого аудита',
      findingsEyebrow: 'Пример находки',
      findingsTitle: 'Пример: что показывает отчёт',
      findingsDemoNote: 'Демонстрационные примеры, не результаты проверки вашего сайта.',
      sampleActionLabel: 'Пример следующего шага',
      cardsSectionBadge: 'Диагностика воронки',
      insights: [
        {
          number: '01',
          badge: 'Скорость & LSSI-CE',
          title: 'Техническое состояние',
          headline: 'Мобильный отклик и закон Испании',
          description: 'Клиент уходит через 3 секунды ожидания. А без NIF/CIF в футере грозят штрафы AEPD.',
          checks: [
            { label: 'Core Web Vitals', desc: 'Загрузка до 2.2с на 4G, сервер TTFB < 200ms' },
            { label: 'Закон LSSI-CE & RGPD', desc: 'Обязательный NIF/CIF, Aviso Legal и cookies' },
            { label: 'SSL TLS 1.3 и 404', desc: 'Безопасное соединение и ноль битых ссылок' },
          ],
          impact: 'Штрафы до €30.000 и 53% отказов при медленной загрузке.',
          icon: ShieldCheck,
        },
        {
          number: '02',
          badge: 'WhatsApp & Лиды',
          title: 'Путь к обращению',
          headline: 'Запись в клинику или салон в 1 клик',
          description: 'В Испании 80%+ локальных заявок идут через мессенджер. Длинные формы убивают конверсию.',
          checks: [
            { label: 'Прямой WhatsApp (wa.me)', desc: 'Заметная кнопка чата с шаблоном обращения' },
            { label: 'Кликабельный tel:', desc: 'Вызов в 1 тап без ручного копирования номера' },
            { label: 'Cita Previa и график', desc: 'Понятные часы работы без барьеров записи' },
          ],
          impact: 'Потеря до 40% обращений при отсутствии WhatsApp.',
          icon: PhoneCall,
        },
        {
          number: '03',
          badge: 'Meta Ads & Google Maps',
          title: 'Реклама и спрос',
          headline: 'Окупаемость кликов и Google Maps',
          description: 'Реклама без пикселей крутится вслепую, а несовпадение телефона с картами лишает звонков.',
          checks: [
            { label: 'Meta Pixel & GA4', desc: 'Корректная фиксация лидов с рекламы' },
            { label: 'Google Business Profile', desc: 'Сверка телефона, адреса и часов с картами' },
            { label: 'Schema LocalBusiness', desc: 'Локальная микроразметка для выдачи в городе' },
          ],
          impact: 'Слив 30–50% бюджета на рекламу без трекинга лидов.',
          icon: Target,
        },
      ],
    },
    es: {
      eyebrow: 'Auditoría web · España',
      insightTitle: 'Cada clic debería acercar un cliente.',
      insightIntro: '3 puntos críticos donde una web en España pierde clientes y presupuesto.',
      insightLead: ['Detectamos', 'obstáculos', 'y explicamos', 'cómo resolverlos.'],
      auditTitle: 'Los 3 pilares del análisis',
      findingsEyebrow: 'Ejemplo de hallazgo',
      findingsTitle: 'Ejemplo: qué muestra el informe',
      findingsDemoNote: 'Casos demostrativos para previsualización técnica.',
      sampleActionLabel: 'Ejemplo de siguiente paso',
      cardsSectionBadge: 'Diagnóstico del embudo',
      insights: [
        {
          number: '01',
          badge: 'Velocidad & Legalidad',
          title: 'Estado técnico',
          headline: 'Rendimiento móvil y leyes en España',
          description: 'El usuario se va en 3s. Sin NIF/CIF o Aviso Legal visible, la AEPD aplica sanciones.',
          checks: [
            { label: 'Core Web Vitals', desc: 'Carga < 2.2s en 4G/5G y TTFB óptimo' },
            { label: 'LSSI-CE y RGPD', desc: 'NIF/CIF reglamentario, Aviso Legal y cookies' },
            { label: 'SSL TLS 1.3', desc: 'Cifrado seguro y sin enlaces rotos (404)' },
          ],
          impact: 'Multas de hasta 30.000 € y rebote del 53% en móvil.',
          icon: ShieldCheck,
        },
        {
          number: '02',
          badge: 'WhatsApp & Leads',
          title: 'Camino al contacto',
          headline: 'De la visita a la cita en 1 solo clic',
          description: 'En España el 80% de consultas locales se cierran por chat. Los formularios extensos ahuyentan.',
          checks: [
            { label: 'WhatsApp directo (wa.me)', desc: 'Botón flotante con mensaje inicial preparado' },
            { label: 'Teléfono clicable (tel:)', desc: 'Llamada directa sin copiar el número' },
            { label: 'Cita previa clara', desc: 'Horario comercial visible sin pasos innecesarios' },
          ],
          impact: 'Fuga de hasta 40% de contactos sin WhatsApp directo.',
          icon: PhoneCall,
        },
        {
          number: '03',
          badge: 'Meta Ads & Maps',
          title: 'Publicidad y demanda',
          headline: 'ROI en anuncios y ficha de Maps',
          description: 'Pagar publicidad sin píxeles es quemar dinero; datos dispares con Maps destruyen confianza.',
          checks: [
            { label: 'Meta Pixel & GA4', desc: 'Registro exacto de conversiones de anuncios' },
            { label: 'Google Business Profile', desc: 'Coincidencia de teléfono, horario y web' },
            { label: 'Schema LocalBusiness', desc: 'Microdatos para posicionar por ciudad o zona' },
          ],
          impact: '30% a 50% de inversión en Ads perdida sin trazabilidad.',
          icon: Target,
        },
      ],
    },
    en: {
      eyebrow: 'Website audit · Spain',
      insightTitle: 'Every click should lead to a customer.',
      insightIntro: 'The 3 critical leaks where businesses in Spain lose leads, trust, and ad spend.',
      insightLead: ['Find', 'the friction', 'and see', 'what to fix.'],
      auditTitle: '3 Pillars of Audit',
      findingsEyebrow: 'Sample finding',
      findingsTitle: 'Example: what the report shows',
      findingsDemoNote: 'Demo model for interface testing purposes.',
      sampleActionLabel: 'Example next step',
      cardsSectionBadge: 'Funnel diagnostics',
      insights: [
        {
          number: '01',
          badge: 'Speed & Compliance',
          title: 'Technical Health',
          headline: 'Mobile speed & Spanish regulations',
          description: 'Visitors bounce after 3 seconds. Missing NIF/CIF tax IDs risks AEPD penalties.',
          checks: [
            { label: 'Core Web Vitals', desc: 'Mobile load under 2.2s on 4G, fast TTFB' },
            { label: 'LSSI-CE & GDPR', desc: 'Mandatory NIF/CIF, Legal Notice & cookie consent' },
            { label: 'SSL TLS 1.3', desc: 'Strict HTTPS encryption and zero 404 dead ends' },
          ],
          impact: 'Fines up to €30,000 and 53% bounced visitors on slow mobile.',
          icon: ShieldCheck,
        },
        {
          number: '02',
          badge: 'WhatsApp & Leads',
          title: 'Path to Contact',
          headline: 'Slashing friction to booking in 1 tap',
          description: '80%+ of Spanish local clients book via chat. Complex enquiry forms kill conversions.',
          checks: [
            { label: 'Direct WhatsApp (wa.me)', desc: 'Prominent chat button with pre-filled message' },
            { label: 'Click-to-Call (tel:)', desc: 'Direct phone dialling without manual copying' },
            { label: 'Appointment Clarity', desc: 'Transparent hours and low-friction booking' },
          ],
          impact: 'Up to 40% lost enquiries when direct WhatsApp is absent.',
          icon: PhoneCall,
        },
        {
          number: '03',
          badge: 'Meta Ads & Maps',
          title: 'Ads & Local Demand',
          headline: 'Ad accountability and Google Maps alignment',
          description: 'Ads without tracking leak budget; mismatched Google Maps phone numbers kill calls.',
          checks: [
            { label: 'Meta Pixel & GA4', desc: 'Accurate tracking for Facebook and Google Ads' },
            { label: 'Google Business Profile', desc: 'Consistent phone, hours, and URL with Maps' },
            { label: 'Schema LocalBusiness', desc: 'Structured data to dominate local search' },
          ],
          impact: '30% to 50% of ad spend wasted when attribution is blind.',
          icon: Target,
        },
      ],
    },
  }[lang];

  const demoFindings = [
    { title: t.reportCard1Title, detail: t.reportCard1Desc, action: t.reportCard1Action, category: t.reportCard1Cat, foot: t.reportCard1Foot },
    { title: t.reportCard2Title, detail: t.reportCard2Desc, action: t.reportCard2Action, category: t.reportCard2Cat, foot: t.reportCard2Foot },
    { title: t.reportCard3Title, detail: t.reportCard3Desc, action: t.reportCard3Action, category: t.reportCard3Cat, foot: t.reportCard3Foot },
  ];

  const scanChecklist = t.checklist;

  const demoScoreIssues = [
    { id: 0, points: 12, title: t.scoreIssueTrust, detail: t.scoreIssueTrustDetail, Icon: ShieldAlert },
    { id: 1, points: 8, title: t.scoreIssueContact, detail: t.scoreIssueContactDetail, Icon: MessageCircle },
    { id: 2, points: 8, title: t.scoreIssueLocal, detail: t.scoreIssueLocalDetail, Icon: Globe },
  ];
  const demoReadinessScore = 100 - demoScoreIssues.reduce(
    (total, issue) => total + (resolvedDemoIssues.includes(issue.id) ? 0 : issue.points),
    0,
  );
  const restoredDemoPoints = demoReadinessScore - 72;

  const toggleDemoIssue = (issueId: number) => {
    setResolvedDemoIssues((current) =>
      current.includes(issueId)
        ? current.filter((id) => id !== issueId)
        : [...current, issueId],
    );
  };

  const resetDemoScore = () => setResolvedDemoIssues([]);

  const renderScorePanel = (variant: 'compact' | 'full') => (
    <section
      className={`a2r-score-panel ${variant === 'compact' ? 'a2r-score-panel--compact' : 'a2r-score-panel--full'}`}
      aria-label={t.revenueScoreTitle}
    >
      <div className="a2r-score-panel-head">
        <div className="a2r-score-panel-copy">
          <span className="a2r-score-kicker">{t.revenueScoreTitle}</span>
          <p>{t.revenueScoreNote}</p>
        </div>
        <div className="a2r-score-number" aria-live="polite" aria-atomic="true">
          <strong>{demoReadinessScore}</strong>
          <span>/100</span>
        </div>
      </div>

      <div
        className="a2r-score-track"
        role="progressbar"
        aria-label={t.revenueScoreTitle}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={demoReadinessScore}
        aria-valuetext={`${demoReadinessScore} ${t.scoreOutOf}`}
      >
        <span style={{ width: `${demoReadinessScore}%` }} />
      </div>

      <div className="a2r-score-panel-foot">
        <span>{t.demo}</span>
        <span>{t.scorePointsRestored}: <strong>+{restoredDemoPoints}</strong></span>
      </div>

      {variant === 'compact' && (
        <div className="a2r-score-issues" aria-label={t.revenueScoreTitle}>
          {demoScoreIssues.map((issue) => {
            const simulatedFixed = resolvedDemoIssues.includes(issue.id);
            const IssueIcon = issue.Icon;

            return (
              <button
                key={issue.id}
                type="button"
                className={`a2r-score-issue ${simulatedFixed ? 'is-simulated' : ''}`}
                data-simulated={simulatedFixed}
                aria-pressed={simulatedFixed}
                aria-label={`${simulatedFixed ? t.scoreUndoFix : t.scoreSimulateFix}: ${issue.title}`}
                onClick={() => toggleDemoIssue(issue.id)}
              >
                <span className="a2r-score-issue-icon" aria-hidden="true">
                  {simulatedFixed ? <CheckCircle2 /> : <IssueIcon />}
                </span>
                <span className="a2r-score-issue-copy">
                  <strong>{issue.title}</strong>
                  <span>{issue.detail}</span>
                </span>
                <span className="a2r-score-issue-meta">
                  <strong>{simulatedFixed ? `+${issue.points}` : `−${issue.points}`}</strong>
                  <span>{simulatedFixed ? t.scoreUndoFix : t.scoreSimulateFix}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {variant === 'full' && resolvedDemoIssues.length > 0 && (
        <button type="button" className="a2r-score-reset" onClick={resetDemoScore}>
          {t.scoreReset}
        </button>
      )}
    </section>
  );

  // PRELOADER
  useEffect(() => {
    const startTime = Date.now();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => {
        setLoadProgress(100);
        setPageLoading(false);
        setRevealStep(6);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const duration = 420;
    const revealTimeouts: number[] = [];

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(
        Math.round((elapsed / duration) * 100),
        100
      );
      setLoadProgress(p);

      if (elapsed >= duration) {
        clearInterval(interval);
        const closeTimeout = window.setTimeout(() => {
          setPageLoading(false);
          setRevealStep(1);
          const cadence = 130;
          [2, 3, 4, 5, 6].forEach((step, index) => {
            revealTimeouts.push(window.setTimeout(
              () => setRevealStep(step),
              cadence * (index + 1),
            ));
          });
        }, 120);
        revealTimeouts.push(closeTimeout);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      revealTimeouts.forEach(window.clearTimeout);
    };
  }, []);

  // Синхронизация GSAP ScrollTrigger
  useEffect(() => {
    if (pageLoading || stage !== 'idle') return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
  }, [pageLoading, stage]);

  // НАДЕЖНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
  useLayoutEffect(() => {
    if (
      pageLoading ||
      stage !== 'idle' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('a2r-js-fallback')
    )
      return;
    const scope = landingRef.current;
    if (!scope) return;

    const pendingReveal = new Set<Element>();
    const revealOnEnter = (targets: Element | NodeListOf<Element>) => {
      const elements = targets instanceof Element ? [targets] : Array.from(targets);
      if (!elements.length) return;
      elements.forEach((element) => pendingReveal.add(element));
    };

    revealOnEnter(scope.querySelectorAll('.insight-heading'));
    revealOnEnter(scope.querySelectorAll('.insight-row'));
    revealOnEnter(scope.querySelectorAll('.findings-heading'));
    revealOnEnter(scope.querySelectorAll('.finding-card'));
    revealOnEnter(scope.querySelectorAll('.closing-cta'));

    pendingReveal.forEach((element) => {
      gsap.set(element, { autoAlpha: 0, y: 24, filter: 'blur(6px)' });
    });

    let frame = 0;
    const checkVisibleItems = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      pendingReveal.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top > viewportHeight * 1.05 || rect.bottom < 0) return;

        pendingReveal.delete(element);
        element.classList.remove('scroll-reveal-pending');
        const index = Array.from(element.parentElement?.children ?? []).indexOf(element);
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 24, filter: 'blur(6px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.72,
            delay: Math.max(0, index) * 0.1,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'opacity,visibility,transform,filter',
          },
        );
      });
    };
    const scheduleCheck = () => {
      if (!frame) frame = window.requestAnimationFrame(checkVisibleItems);
    };
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });
    scheduleCheck();
    document.documentElement.classList.add('a2r-reveals-ready');

    return () => {
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      if (frame) window.cancelAnimationFrame(frame);
      pendingReveal.forEach((element) => {
        gsap.set(element, { clearProps: 'opacity,visibility,transform,filter' });
      });
    };
  }, [pageLoading, stage]);

  // 3D CARD CURSOR TRACKING
  useEffect(() => {
    const card = auditCardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

  // SCANNING & STRIPE
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

    setResolvedDemoIssues([]);
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
        router.push(
          `/report/demo-audit?url=${encodeURIComponent(url || 'https://clinica-mabelle.es')}&demo=true&lang=${lang}`
        );
      }
    } catch {
      router.push(
        `/report/demo-audit?url=${encodeURIComponent(url || 'https://clinica-mabelle.es')}&demo=true&lang=${lang}`
      );
    } finally {
      setIsRedirecting(false);
    }
  };

  // COOKIE CONSENT
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
    <div
      suppressHydrationWarning
      className={`a2r-app relative ${
        stage === 'idle'
          ? 'min-h-[100dvh] overflow-x-hidden'
          : 'min-h-[100dvh] overflow-x-hidden overflow-y-auto'
      } bg-[#F0F9FF] text-[#0F2744] flex flex-col selection:bg-[#0284C7]/20 selection:text-[#0F2744] font-sans antialiased`}
    >
      {/* 1. ЗАЩИТНАЯ ПЛАШКА РАЗРАБОТЧИКА */}
      <div className="relative z-30 bg-[#0F2744] text-white px-3 py-1 sm:py-1.5 text-center text-[9px] sm:text-[11px] font-medium border-b border-[#0284C7]/20 flex items-center justify-center gap-1.5 shrink-0">
        <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7DD3FC] shrink-0" />
        <span className="tracking-wide text-slate-200 truncate">{t.devBadge}</span>
      </div>

      {/* 2. PRELOADER */}
      <div
        className={`fixed inset-0 z-[100] bg-[#F0F9FF] flex flex-col items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          pageLoading
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 scale-[1.02] blur-sm pointer-events-none invisible'
        }`}
      >
        <div className="w-64 space-y-4 text-center anim-preloader-in">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-[#0284C7]/25 mx-auto">
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

          <div className="w-full bg-[#0284C7]/10 h-[3px] rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-100 ease-out rounded-full"
              style={{
                width: `${loadProgress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. СТИЛИ АНИМАЦИИ */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root, html, body {
          background-color: #F0F9FF !important;
          background: #F0F9FF !important;
          color: #0F2744 !important;
          color-scheme: light !important;
        }

        @media screen and (max-width: 768px) {
          input[type="text"],
          input[type="url"],
          input {
            font-size: 16px !important;
          }
        }

        @keyframes preloader-appear {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(6px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        .anim-preloader-in {
          animation: preloader-appear 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes header-drop {
          0% {
            opacity: 0;
            transform: translateY(-18px);
            filter: blur(7px);
          }
          78% {
            opacity: 1;
            transform: translateY(1px);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .anim-header {
          animation: header-drop 1.05s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes card-reveal {
          0% {
            opacity: 0;
            transform: translateY(34px) scale(0.94) rotateX(3deg);
            filter: blur(9px);
          }
          74% {
            opacity: 1;
            transform: translateY(-3px) scale(1.008) rotateX(0);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0);
            filter: blur(0);
          }
        }

        .anim-card {
          animation: card-reveal 1.2s cubic-bezier(0.2, 0.78, 0.28, 1) both;
        }

        @keyframes text-line-unmask {
          0% {
            transform: translateY(120%);
            opacity: 0;
            filter: blur(4px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            filter: blur(0);
          }
        }

        .anim-line-1,
        .anim-line-2 {
          animation: text-line-unmask 1.05s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes bar-ignition {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
            filter: blur(7px);
          }
          76% {
            opacity: 1;
            transform: translateY(-2px) scale(1.006);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .anim-bar {
          animation: bar-ignition 1.05s cubic-bezier(0.22, 1, 0.36, 1) both;
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
          transform: translateZ(12px);
          transform-style: preserve-3d;
        }

        .audit-card-depth-strong {
          transform: translateZ(20px);
          transform-style: preserve-3d;
        }

        .audit-card-shadow {
          position: absolute;
          inset: 12px -6px -12px;
          border-radius: 28px;
          background: rgba(15, 39, 68, 0.12);
          filter: blur(24px);
          transform: translateZ(-16px) scale(0.94);
          pointer-events: none;
        }

        @keyframes card-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
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

        @media (max-height: 720px) {
          .audit-card-compact {
            transform: scale(0.9);
            transform-origin: center top;
            margin-bottom: -16px;
          }
        }

        @media (max-height: 640px) {
          .audit-card-compact {
            transform: scale(0.82);
            transform-origin: center top;
            margin-bottom: -28px;
          }
        }

        @media (max-height: 580px) {
          .audit-card-compact {
            transform: scale(0.74);
            margin-bottom: -40px;
          }
        }
      `,
        }}
      />

      {/* 4. HEADER */}
      <header
        className={`site-header relative z-20 h-12 sm:h-16 shrink-0 border-b border-black/[0.05] backdrop-blur-xl bg-white/80 px-3 sm:px-8 flex items-center ${
          revealStep >= 1 ? 'anim-header' : 'hero-pending'
        }`}
      >
        <div className="site-header-inner max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-[#0284C7]/30">
              A2R
            </div>
            <span className="font-semibold tracking-tight text-[#0F2744] text-[13px] sm:text-[15px]">
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
                onClick={() => handleLangChange(item)}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all uppercase tracking-wider text-[9px] sm:text-[11px] ${
                  lang === item
                    ? 'bg-white text-[#0284C7] shadow-sm font-bold'
                    : 'text-[#6E6E73] hover:text-[#0F2744]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 5. MAIN */}
      <main
        ref={landingRef}
        className={`relative z-10 flex-1 min-h-0 flex flex-col ${
          stage === 'idle'
            ? 'justify-start py-3 sm:py-4 lg:py-5'
            : 'justify-start gap-4 sm:gap-6 pt-4 sm:pt-8 py-4 sm:py-6'
        } items-center px-4 sm:px-7 w-full max-w-7xl mx-auto landing-main`}
      >
        {/* ================= IDLE STAGE ================= */}
        {stage === 'idle' && (
          <div className="landing-hero w-full grid items-center text-left">
            {/* 3D AUDIT CARD PREVIEW */}
            <div className="landing-preview audit-card-perspective audit-card-compact w-full flex justify-center mb-1.5 sm:mb-3">
              <div
                className={`relative w-full max-w-[380px] sm:max-w-[480px] ${
                  revealStep >= 5 ? 'anim-card' : 'hero-pending'
                }`}
              >
                <div ref={auditCardRef} className="audit-card-3d relative">
                  <div className="audit-card-shadow" />
                  <div className="absolute -inset-4 rounded-[30px] bg-[#0284C7]/8 blur-xl pointer-events-none" />
                  <div className="a2r-mascot" aria-hidden="true">
                    <span className="a2r-mascot-eye" />
                    <span className="a2r-mascot-eye" />
                    <span className="a2r-mascot-cheek a2r-mascot-cheek--left" />
                    <span className="a2r-mascot-cheek a2r-mascot-cheek--right" />
                  </div>

                  <div className="audit-card-shell relative overflow-hidden rounded-[22px] sm:rounded-[26px] bg-white border border-[#D5E1E9] shadow-[0_16px_50px_rgba(15,39,68,0.12)]">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent z-[60]" />
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#EFFAFF] to-transparent pointer-events-none z-[1]" />

                    <div className="audit-card-content px-3.5 py-3 sm:px-5 sm:py-4">
                      {/* HEADER КАРТОЧКИ */}
                      <div className="audit-card-depth flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#EFF9FD] border border-[#C9EAF7] flex items-center justify-center shadow-xs">
                            <Activity className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#0284C7]" />
                            <span className="absolute -right-0.5 -top-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 border-2 border-white dot-pulse" />
                          </div>

                          <div className="text-left min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#0284C7] font-extrabold">
                                {t.previewLabel}
                              </span>
                              <span className="px-1 py-[1px] rounded-full bg-slate-100 border border-slate-200 text-[6.5px] sm:text-[8px] text-slate-500 font-extrabold uppercase tracking-wider">
                                {t.demo}
                              </span>
                            </div>

                            <div className="text-[12px] sm:text-[14px] font-bold text-[#0F2744] truncate mt-0.5">
                              {t.exampleBusiness}
                            </div>
                          </div>
                        </div>

                        <div className="a2r-preview-score-label">
                          <span>{t.scoreLabel}</span>
                          <span className="a2r-demo-pill">{t.demo}</span>
                        </div>
                      </div>

                      <div className="audit-card-depth h-px bg-[#E5EDF2] my-2 sm:my-3" />

                      {renderScorePanel('compact')}

                      <div className="audit-card-depth-strong a2r-locked-feature">
                        <span className="a2r-locked-feature-icon">
                          <MessageCircle aria-hidden="true" />
                        </span>
                        <span className="a2r-locked-feature-copy">
                          <strong>{t.pitch}</strong>
                          <small>{t.pitchLocked}</small>
                        </span>
                        <Lock className="a2r-locked-feature-lock" aria-hidden="true" />
                      </div>

                      {/* STATUS */}
                      <div className="audit-card-depth flex items-center justify-center gap-1.5 mt-1.5 sm:mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dot-pulse" />
                        <span className="text-[6.5px] sm:text-[8px] uppercase tracking-[0.13em] text-[#94A3B8] font-bold">
                          {t.previewStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-copy-column">
              {/* H1 */}
              <div
                className={`landing-heading hero-reveal hero-reveal-heading w-full space-y-2 mb-2 sm:mb-4 ${
                  revealStep >= 1 ? '' : 'hero-pending'
                }`}
              >
                <p className="landing-eyebrow">{landingCopy.eyebrow}</p>
                <h1 className="landing-title">
                  <span className={`landing-title-ink ${revealStep >= 1 ? 'anim-line-1' : 'hero-pending'}`}>
                    {t.h1_1}
                  </span>{' '}
                  <span className={`landing-title-accent ${revealStep >= 2 ? 'anim-line-2' : 'hero-pending'}`}>
                    {t.h1_2}
                  </span>
                </h1>
              </div>

              {/* MICRO COPY */}
              <p
                className={`landing-copy hero-reveal hero-reveal-copy text-[15px] sm:text-base text-[#596B7A] mb-4 sm:mb-6 transition-all duration-700 ${
                  revealStep >= 3 ? 'hero-copy-enter' : 'hero-pending'
                }`}
              >
                {t.heroMicro}
              </p>

              {/* INPUT FORM */}
              <form
                id="scan-form"
                onSubmit={handleStartScan}
                className={`landing-form hero-reveal hero-reveal-form w-full max-w-[600px] relative will-change-transform ${
                  revealStep >= 4 ? 'anim-bar' : 'hero-pending'
                }`}
              >
                <div
                  className={`absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] blur-lg transition-all duration-700 pointer-events-none ${
                    hasUrl
                      ? 'opacity-60 scale-[1.02]'
                      : isInputFocused
                        ? 'opacity-25 scale-[1.01]'
                        : 'opacity-0 scale-95'
                  }`}
                />

                <div
                  className={`animated-input-border relative z-10 p-[1px] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${
                    isInputFocused ? 'is-focused' : ''
                  } ${hasUrl ? 'has-value' : ''}`}
                >
                  <div
                    className={`relative z-[1] flex flex-row items-center gap-1 p-1 sm:p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${
                      hasUrl ? 'shadow-[0_0_0_2px_#0284C7]' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 h-10 sm:h-12">
                      <div className="relative flex items-center justify-center shrink-0">
                        <div
                          className={`absolute inset-0 rounded-full bg-[#0284C7] blur-md transition-all duration-500 ${
                            hasUrl ? 'scale-150 opacity-90 animate-pulse' : 'scale-50 opacity-0'
                          }`}
                        />
                        <Globe
                          className={`relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 ${
                            hasUrl
                              ? 'text-[#0284C7] drop-shadow-[0_0_12px_rgba(2,132,199,0.95)] scale-110 rotate-12'
                              : 'text-[#86868B]'
                          }`}
                        />
                      </div>

                      <input
                        type="text"
                        required
                        aria-label={
                          lang === 'ru'
                            ? 'Адрес сайта для диагностики'
                            : lang === 'es'
                              ? 'Dirección web para analizar'
                              : 'Website address to scan'
                        }
                        inputMode="url"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        placeholder={t.placeholder}
                        value={url}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full min-w-0 bg-transparent text-[16px] sm:text-[15px] text-[#0F2744] placeholder-[#86868B] placeholder:text-xs sm:placeholder:text-[14px] focus:outline-none font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="scan-submit h-10 sm:h-11 px-4 sm:px-6 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-semibold text-xs sm:text-[14px] flex items-center justify-center gap-1.5 transition duration-200 shadow-xs hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
                    >
                      <span>{t.btn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= СЕКЦИЯ 01, 02, 03 ================= */}
        {stage === 'idle' && (
          <>
            <section
              className="insight-section w-full py-8 sm:py-12 lg:py-0 lg:h-[100dvh] lg:min-h-[640px] lg:max-h-[860px] flex flex-col justify-center px-4 sm:px-6"
              aria-labelledby="insight-title"
            >
              {/* НАДЕЖНЫЙ ХЕДЕР СЕКЦИИ */}
              <div className="insight-heading max-w-3xl mx-auto text-center mb-4 sm:mb-6 lg:mb-7 shrink-0" data-reveal>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-[10.5px] font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>{landingCopy.cardsSectionBadge}</span>
                </div>

                <h2 id="insight-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0F2744] tracking-tight leading-tight">
                  {landingCopy.insightLead.map((word, index) => (
                    <span
                      key={`${word}-${index}`}
                      className={index === 1 || index === 3 ? 'text-[#0284C7]' : ''}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-lg mx-auto leading-relaxed">
                  {landingCopy.insightIntro}
                </p>

                {/* МОБИЛЬНЫЙ СВИТЧЕР ТАБОВ (Только на смартфонах) */}
                <div className="flex lg:hidden items-center justify-center p-1 rounded-2xl bg-black/[0.04] border border-black/[0.05] mt-4 max-w-xs mx-auto">
                  {landingCopy.insights.map((item, idx) => (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() => setActiveCardIndex(idx)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                        activeCardIndex === idx
                          ? 'bg-white text-[#0284C7] shadow-xs'
                          : 'text-[#64748B] hover:text-[#0F2744]'
                      }`}
                    >
                      {item.number} {item.badge.split('&')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* СЕТКА КАРТОЧЕК */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto w-full items-stretch">
                {landingCopy.insights.map((item, index) => {
                  const Icon = item.icon;
                  const isMobileActive = activeCardIndex === index;

                  return (
                    <article
                      key={item.number}
                      className={`insight-row group rounded-3xl p-4 sm:p-5 flex-col justify-between transition-all duration-300 border bg-white border-[#E2E8F0] hover:border-[#0284C7] hover:shadow-[0_16px_36px_rgba(2,132,199,0.12)] lg:hover:-translate-y-1 ${
                        isMobileActive ? 'flex' : 'hidden lg:flex'
                      }`}
                      data-reveal
                    >
                      <div>
                        {/* Верх: номер + бейдж + иконка */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-black px-2 py-0.5 rounded-lg bg-[#0F2744] text-white">
                              {item.number}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          </div>

                          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100 text-[#0F2744] group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-200">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#0F2744] tracking-tight">{item.title}</h3>
                        <p className="text-xs font-semibold text-[#0284C7] mt-0.5">{item.headline}</p>
                        <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">{item.description}</p>

                        {/* Чеклист */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                          {item.checks.map((check, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                              <div className="text-left text-xs leading-tight">
                                <span className="font-bold text-[#0F2744]">{check.label}: </span>
                                <span className="text-[#64748B]">{check.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Низ: блок риска + мобильная пагинация */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="rounded-xl p-2.5 bg-rose-50/80 border border-rose-100 flex items-center gap-2">
                          <span className="text-xs shrink-0">⚠️</span>
                          <span className="text-[11px] font-semibold text-rose-900 leading-tight">
                            {item.impact}
                          </span>
                        </div>

                        {/* Кнопки переключения для мобилок */}
                        <div className="flex lg:hidden items-center justify-between mt-3 text-xs text-[#64748B]">
                          <button
                            type="button"
                            disabled={activeCardIndex === 0}
                            onClick={() => setActiveCardIndex((prev) => Math.max(0, prev - 1))}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50 font-medium"
                          >
                            ← {t.prev}
                          </button>
                          <span className="font-mono font-bold text-[11px] text-[#0F2744]">
                            {activeCardIndex + 1} / 3
                          </span>
                          <button
                            type="button"
                            disabled={activeCardIndex === 2}
                            onClick={() => setActiveCardIndex((prev) => Math.min(2, prev + 1))}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50 font-medium"
                          >
                            {t.next} →
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* ПРИМЕРЫ НАХОДОК В ОТЧЕТЕ */}
            <section className="findings-section w-full my-6 sm:my-10" aria-labelledby="findings-title">
              <div className="findings-heading mb-6" data-reveal>
                <div>
                  <p className="landing-eyebrow">{landingCopy.findingsEyebrow}</p>
                  <h2 id="findings-title" className="text-xl sm:text-3xl font-extrabold text-[#0F2744]">
                    {landingCopy.findingsTitle}
                  </h2>
                  <p className="findings-demo-note text-xs text-[#64748B] flex items-center gap-1.5 mt-1">
                    <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-[#0284C7]" />
                    {landingCopy.findingsDemoNote}
                  </p>
                </div>
              </div>

              <div className="findings-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                {demoFindings.map((finding) => (
                  <article className="finding-card sample-finding-card p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm" key={finding.title}>
                    <div className="sample-report-category text-xs font-bold text-rose-600 mb-1">
                      <span>{finding.category}</span>
                    </div>
                    <h3 className="font-bold text-[#0F2744] text-sm sm:text-base">{finding.title}</h3>
                    <p className="text-xs text-[#64748B] mt-1">{finding.detail}</p>

                    <div className="sample-report-action mt-3 pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-semibold text-[#0284C7] block">
                        {landingCopy.sampleActionLabel}
                      </span>
                      <p className="text-xs text-[#0F2744] mt-0.5">{finding.action}</p>
                    </div>

                    <div className="sample-report-footer mt-3 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-[#64748B]">
                      <span>{finding.foot}</span>
                      <span className="text-rose-600 font-medium">{t.reportLocked}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ПРИЗЫВ К ДЕЙСТВИЮ */}
            <section className="closing-cta w-full my-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#0F2744] text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl" data-reveal>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#7DD3FC] font-bold">Audit2Revenue</p>
                <h2 className="text-xl sm:text-3xl font-extrabold mt-1">
                  {t.h1_1} {t.h1_2}
                </h2>
              </div>
              <a
                href="#scan-form"
                onClick={() => document.querySelector<HTMLInputElement>('#scan-form input')?.focus()}
                className="px-6 py-3 rounded-2xl bg-white text-[#0F2744] font-bold text-sm flex items-center gap-2 hover:bg-[#F0F9FF] transition shadow-md whitespace-nowrap"
              >
                <span>{t.btn}</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </a>
            </section>
          </>
        )}

        {/* ================= SCANNING STAGE ================= */}
        {stage !== 'idle' && (
          <div
            className="stage-intro scan-stage scan-stage-enter w-full max-w-4xl px-1 sm:px-3 py-3 sm:py-7 space-y-5 text-left"
            aria-busy={stage === 'scanning'}
          >
            <div className="flex items-start justify-between gap-4 pb-1">
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#0284C7] font-bold mb-1">
                  {t.scanningBadge}
                </div>

                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#0F2744]">
                  {t.scanningTitle}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] font-medium truncate mt-1 font-mono max-w-[min(72vw,680px)]">
                  {url}
                </p>
                <p className="max-w-2xl mt-1.5 text-[11px] sm:text-xs leading-relaxed text-[#64748B]">
                  {t.demoScanNotice}
                </p>
              </div>

              <div className="shrink-0 text-right leading-none">
                <div className="flex items-baseline justify-end gap-0.5 tabular-nums">
                  <span className="text-3xl sm:text-5xl font-black tracking-[-0.05em] text-[#0284C7]">
                    {progress}
                  </span>
                  <span className="text-xs sm:text-base font-bold text-[#7DD3FC]">%</span>
                </div>
                <span className="block mt-1.5 text-[8.5px] sm:text-[10px] uppercase tracking-[0.16em] font-semibold text-[#94A3B8]">
                  {progress >= 100 ? t.scanProgressCompleted : t.scanProgressRunning}
                </span>
              </div>
            </div>

            <div
              className="scan-progress-track w-full bg-[#EAF0F4] h-1.5 rounded-full overflow-hidden"
              role="progressbar"
              aria-label={t.scanChecksLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="scan-progress-fill bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="pt-1">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.14em] font-bold text-[#64748B]">
                  {t.scanChecksLabel}
                </span>
                <span className="text-[9.5px] sm:text-[11px] font-semibold tabular-nums text-[#0284C7]">
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
                      className={`scan-check-row py-3 sm:py-4 transition-opacity duration-500 ${
                        isPassed ? 'opacity-100' : isCurrent ? 'opacity-100' : 'opacity-40'
                      }`}
                      style={{ animationDelay: `${idx * 110}ms` }}
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
                            <span
                              className={`text-[12px] sm:text-sm font-semibold ${
                                isPassed || isCurrent ? 'text-[#0F2744]' : 'text-[#86868B]'
                              }`}
                            >
                              {item.title}
                            </span>

                            {isPassed ? (
                              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.12em] font-bold text-[#94A3B8]">
                                {t.scanVerified}
                              </span>
                            ) : isCurrent ? (
                              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.12em] font-bold text-[#0284C7] animate-pulse">
                                {t.scanScanning}
                              </span>
                            ) : null}
                          </div>

                          {isPassed && (
                            <p
                              className={`scan-finding-reveal mt-1 text-[11px] sm:text-xs leading-relaxed font-medium ${
                                item.type === 'error'
                                  ? 'text-rose-700'
                                  : item.type === 'warn'
                                    ? 'text-amber-800'
                                    : 'text-[#64748B]'
                              }`}
                            >
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

        {/* ================= REPORT STAGE ================= */}
        {stage === 'report' && (
          <div className="report-stage w-full max-w-4xl space-y-4 sm:space-y-6 text-left">
            <div className="report-card report-card-reveal p-4 sm:p-7 rounded-3xl bg-white/95 border border-rose-200 shadow-lg backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/[0.05] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 rounded-2xl bg-rose-50 text-rose-600 shrink-0">
                    <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                      {t.reportLabel}
                    </span>
                    <h2 className="text-base sm:text-xl font-bold text-[#0F2744]">
                      {t.reportTitle}
                    </h2>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#0284C7] font-mono break-all">
                      {url}
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] sm:text-xs font-semibold">
                  {t.reportMissedRevenue}
                </div>
              </div>

              <p className="mt-3 sm:mt-4 rounded-xl border border-[#CBEAF7] bg-[#EFF9FD] px-3.5 py-2.5 text-[11px] sm:text-xs leading-relaxed text-[#0F2744]">
                {t.demoReportNotice}
              </p>

              {renderScorePanel('full')}

              <div className="a2r-report-findings grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4 sm:mt-5">
                <div
                  className={`a2r-report-issue p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] ${
                    resolvedDemoIssues.includes(0) ? 'is-simulated' : ''
                  }`}
                  data-simulated={resolvedDemoIssues.includes(0)}
                >
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>{t.reportCard1Cat}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0F2744]">{t.reportCard1Title}</h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">{t.reportCard1Desc}</p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">{t.reportCard1Foot}</span>
                    <span className="text-rose-600 font-medium">{t.reportLocked}</span>
                  </div>
                  <div className="a2r-issue-score-row">
                    <span className="a2r-issue-score-status">
                      {resolvedDemoIssues.includes(0) ? (
                        <CheckCircle2 aria-hidden="true" />
                      ) : (
                        <TrendingDown aria-hidden="true" />
                      )}
                      <span>
                        {resolvedDemoIssues.includes(0) ? t.scoreFixed : `−12 ${t.scorePoints}`}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleDemoIssue(0)}
                      aria-pressed={resolvedDemoIssues.includes(0)}
                    >
                      {resolvedDemoIssues.includes(0) ? t.scoreUndoFix : t.scoreSimulateFix}
                    </button>
                  </div>
                </div>

                <div
                  className={`a2r-report-issue p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] ${
                    resolvedDemoIssues.includes(1) ? 'is-simulated' : ''
                  }`}
                  data-simulated={resolvedDemoIssues.includes(1)}
                >
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>{t.reportCard2Cat}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0F2744]">{t.reportCard2Title}</h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">{t.reportCard2Desc}</p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">{t.reportCard2Foot}</span>
                    <span className="text-rose-600 font-medium">{t.reportLocked}</span>
                  </div>
                  <div className="a2r-issue-score-row">
                    <span className="a2r-issue-score-status">
                      {resolvedDemoIssues.includes(1) ? (
                        <CheckCircle2 aria-hidden="true" />
                      ) : (
                        <TrendingDown aria-hidden="true" />
                      )}
                      <span>
                        {resolvedDemoIssues.includes(1) ? t.scoreFixed : `−8 ${t.scorePoints}`}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleDemoIssue(1)}
                      aria-pressed={resolvedDemoIssues.includes(1)}
                    >
                      {resolvedDemoIssues.includes(1) ? t.scoreUndoFix : t.scoreSimulateFix}
                    </button>
                  </div>
                </div>

                <div
                  className={`a2r-report-issue p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] ${
                    resolvedDemoIssues.includes(2) ? 'is-simulated' : ''
                  }`}
                  data-simulated={resolvedDemoIssues.includes(2)}
                >
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>{t.reportCard3Cat}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0F2744]">{t.reportCard3Title}</h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">{t.reportCard3Desc}</p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">{t.reportCard3Foot}</span>
                    <span className="text-rose-600 font-medium">{t.reportLocked}</span>
                  </div>
                  <div className="a2r-issue-score-row">
                    <span className="a2r-issue-score-status">
                      {resolvedDemoIssues.includes(2) ? (
                        <CheckCircle2 aria-hidden="true" />
                      ) : (
                        <TrendingDown aria-hidden="true" />
                      )}
                      <span>
                        {resolvedDemoIssues.includes(2) ? t.scoreFixed : `−8 ${t.scorePoints}`}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleDemoIssue(2)}
                      aria-pressed={resolvedDemoIssues.includes(2)}
                    >
                      {resolvedDemoIssues.includes(2) ? t.scoreUndoFix : t.scoreSimulateFix}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PURCHASE */}
            <div
              className="purchase-card report-card-reveal p-4 sm:p-7 rounded-3xl bg-white border border-black/[0.06] shadow-xl"
              style={{ animationDelay: '140ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 items-center">
                <div className="md:col-span-3 space-y-2 sm:space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.reportPurchaseBadge}</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-[#0F2744] tracking-tight">
                    {t.reportPurchaseTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                    {t.reportPurchaseDesc}
                  </p>
                </div>

                <div className="md:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] text-center space-y-3">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-2xl sm:text-4xl font-black text-[#0F2744]">€19</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/15 text-[8.5px] font-extrabold tracking-[0.12em] text-[#0284C7]">
                        DEMO
                      </span>
                    </div>

                    <span className="text-xs text-[#0284C7] font-semibold block">
                      {t.demoPriceBadge}
                    </span>
                    <p className="mt-1 text-[10.5px] sm:text-[11px] leading-relaxed text-[#64748B]">
                      {t.demoPriceNote}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    disabled={isRedirecting}
                    className="w-full py-3 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.connecting}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
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

      {/* 6. FOOTER */}
      <footer
        suppressHydrationWarning
        className={`relative z-20 shrink-0 border-t border-black/[0.05] bg-white/70 backdrop-blur-xl px-3 sm:px-8 ${
          stage === 'idle' ? 'py-1.5 sm:py-3' : 'py-3'
        } flex items-center opacity-100`}
      >
        <div
          suppressHydrationWarning
          className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between text-[8.5px] sm:text-[11px] text-[#64748B] gap-1 sm:gap-3 text-center lg:text-left"
        >
          <div>
            <p className="font-medium text-[#0F2744]">{t.footer}</p>
            <p className="text-[8px] sm:text-[9px] text-[#86868B] mt-0.5 max-w-xl hidden sm:block">
              {t.footerDisclaimer}
            </p>
          </div>

          <nav
            aria-label={t.footerLegalNav}
            className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-0.5 sm:gap-y-1.5 text-[#64748B]"
          >
            <a href={`/aviso-legal?lang=${lang}`} className="transition hover:text-[#0284C7]">
              {t.legalNotice}
            </a>
            <a href={`/politica-de-privacidad?lang=${lang}`} className="transition hover:text-[#0284C7]">
              {t.privacyPolicy}
            </a>
            <a href={`/politica-de-cookies?lang=${lang}`} className="transition hover:text-[#0284C7]">
              {t.cookiePolicy}
            </a>
            <a href={`/condiciones-de-contratacion?lang=${lang}`} className="transition hover:text-[#0284C7]">
              {t.termsOfService}
            </a>
            <button
              type="button"
              onClick={() => setShowCookieModal(true)}
              className="transition hover:text-[#0284C7]"
            >
              {t.cookieSettings}
            </button>
          </nav>
        </div>
      </footer>

      {/* 7. COOKIE MODAL */}
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
                  className="text-base sm:text-lg font-bold tracking-tight text-[#0F2744]"
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
                className="flex-1 h-11 rounded-xl border border-black/[0.08] bg-[#F5F5F7] hover:bg-black/[0.06] text-[#0F2744] text-[13px] font-semibold transition"
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