'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  Star, 
  Download, 
  ArrowUpRight, 
  Sparkles, 
  Calendar, 
  Loader2, 
  Building2, 
  PhoneCall, 
  AlertOctagon, 
  Coins, 
  Cpu, 
  ListChecks,
  ShieldCheck,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

function BusinessIntelligenceReport() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://clinica-mabelle.es';
  const urlLang = searchParams.get('lang') as Lang | null;
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const [lang, setLang] = useState<Lang>(urlLang && ['ru', 'es', 'en'].includes(urlLang) ? urlLang : 'ru');
  const [activeFilter, setActiveFilter] = useState<'all' | 'issues' | 'healthy'>('all');

  // 1. Считываем сохранённый язык при первой загрузке
  useEffect(() => {
    const saved = (searchParams.get('lang') as Lang) || (localStorage.getItem('a2r_lang') as Lang);
    if (saved && ['ru', 'es', 'en'].includes(saved)) {
      setLang(saved);
    }
  }, [searchParams]);

  // 2. Функция смены языка с сохранением
  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('a2r_lang', newLang);
    document.cookie = `a2r_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;

    const params = new URLSearchParams(window.location.search);
    params.set('lang', newLang);
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const businessData = {
    brandName: 'Clínica & Estética Mabelle Madrid',
    domain: domain,
    titular: 'Dra. Esther González de la Vega',
    cifPlaceholder: '[Pendiente de insertar NIF/CIF por desarrollador]',
    cms: 'WordPress 6.4 + Elementor Pro',
    rating: 4.8,
    reviewsCount: 384,
    monthlyAdSpendEst: '€1,800 – €3,200',
    overallHealthScore: 46,
  };

  // =========================================================
  // АНИМАЦИЯ ПОКАЗАТЕЛЕЙ И ДАШБОРДА (EASE-OUT COUNTER)
  // =========================================================
  const [isGaugeAnimated, setIsGaugeAnimated] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedCrit, setAnimatedCrit] = useState(0);
  const [animatedWarn, setAnimatedWarn] = useState(0);
  const [animatedHealthy, setAnimatedHealthy] = useState(0);

  const criticalCount = 4;
  const warningCount = 2;
  const healthyCount = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGaugeAnimated(true);
    }, 150);

    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedScore(Math.round(ease * businessData.overallHealthScore));
      setAnimatedCrit(Math.round(ease * criticalCount));
      setAnimatedWarn(Math.round(ease * warningCount));
      setAnimatedHealthy(Math.round(ease * healthyCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [businessData.overallHealthScore]);

  const circumference = 163.36;
  const targetOffset = circumference - (circumference * businessData.overallHealthScore) / 100;

  const t = {
    ru: {
      auditReadyBadge: 'Аудит готов',
      exportPdf: 'Экспорт PDF',

      // Главная карточка
      salesReadinessBadge: 'Интеллектуальный отчет готовности к продажам',
      dashboardTitle: `Дашборд эффективности: ${businessData.domain}`,
      dashboardSubtitle: 'Анализ по нормам Испании (LSSI-CE / AEPD) и воронке мобильного трафика',
      retentionIndex: 'Индекс удержания',
      revenueLossWarning: 'Критические потери выручки',
      retentionNote: '100% = идеальная конверсия',

      // Светофор
      criticalTitle: 'Критические поломки',
      criticalSub: 'Точки потери клиентов',
      warningTitle: 'Зоны внимания',
      warningSub: 'Снижают отдачу рекламы',
      healthyTitle: 'Исправные узлы',
      healthySub: 'Работают штатно',

      // Радар потерь
      radarAdSpendTag: 'Слив платной рекламы',
      radarAdSpendVal: '~€1,200 – €1,600',
      radarAdSpendPerMonth: '/мес',
      radarAdSpendDesc: 'Потеря до 40% кликов из Meta Ads из-за отсутствия прямого чата в WhatsApp.',

      radarFineTag: 'Риск штрафов AEPD',
      radarFineVal: 'До €30,000',
      radarFineDesc: 'Нарушение ст. 10 LSSI-CE: тестовая заглушка темы вместо фискального NIF/CIF.',

      radarCallTag: 'Недозвон и сбой записи',
      radarCallVal: '~14-18 клиентов',
      radarCallPerMonth: '/мес',
      radarCallDesc: 'Жалобы в Google картах на неотвеченные звонки и отсутствие онлайн-брони.',

      // Матрица параметров
      matrixTitle: 'Инспекция параметров сайта',
      matrixSubtitle: 'Наведите курсор на карточку для мгновенного просмотра технической причины',
      filterAll: 'Все',
      filterIssues: 'Только сбои',
      filterHealthy: 'Исправные',
      hoverDetails: 'Наведите для деталей',
      diagnosisTitle: 'Диагностика:',

      // Детализация 4 утечек
      leaksTitle: '4 ключевые точки потери клиентов',
      leaksSubtitle: 'Главные ошибки, влияющие на прибыль клиники прямо сейчас',
      proofsTitle: 'Детали проверки:',

      leak1Title: '1. Слив платного трафика без WhatsApp',
      leak1Badge: '-40% лидов',
      leak1Punch: '78% мобильных кликов из рекламы закрывают сайт без звонка',
      leak1Desc: `В рекламу Meta Ads инвестируется около ${businessData.monthlyAdSpendEst}, но на сайте нет прямой кнопки мессенджера. Пользователи уходят без обращения.`,

      leak2Title: '2. Отсутствие NIF/CIF (Закон LSSI-CE)',
      leak2Badge: 'Штраф до €30,000',
      leak2Punch: 'В разделе Aviso Legal оставлена тестовая заглушка темы разработчика',
      leak2Desc: 'Статья 10 LSSI-CE обязывает публиковать реальный фискальный CIF компании. Нарушение наказывается регулятором AEPD штрафом до 30.000 €.',

      leak3Title: '3. Потеря звонков в картах Google',
      leak3Badge: '~16 записей/мес',
      leak3Punch: 'Повторяющиеся жалобы пациентов на недозвон в вечерние часы пик',
      leak3Quote: '«No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»',

      leak4Title: '4. Каталог без онлайн-записи',
      leak4Badge: 'Отказ без брони',
      leak4Punch: 'Прайс-лист содержит 46 услуг, но нет бронирования в 1 клик',
      leak4Desc: 'Пользователи смотрят прайс-лист, но без мгновенного виджета бронирования уходят в поисковик к конкурентам.',

      // Чек-лист разработчика
      devPlanTitle: 'План устранения для вашего разработчика',
      devPlan1Title: '1. Прямой чат в WhatsApp',
      devPlan1Desc: 'Добавить плавающий виджет WhatsApp для мобильного трафика из рекламы.',
      devPlan2Title: '2. Публикация NIF/CIF в Aviso Legal',
      devPlan2Desc: 'Опубликовать реальный NIF компании по ст. 10 закона LSSI-CE.',
      devPlan3Title: '3. Автоматизация нерабочих часов',
      devPlan3Desc: 'Внедрить AI-ассистента для приема заявок, когда администратор занят.',
      devPlan4Title: '4. Кнопка бронирования в каталоге',
      devPlan4Desc: 'Добавить кнопку брони под каждой из 46 позиций прайс-листа.',

      // Upsell
      upsellBadge: 'Решение под ключ за 5 рабочих дней',
      upsellTitle: 'Устранить все ошибки и внедрить WhatsApp AI-ассистента',
      upsellDesc: 'Мы устраним 100% найденных багов, приведем сайт в соответствие нормам AEPD и подключим AI-ассистента, который отвечает за 3 секунды и ведет запись клиентов 24/7.',
      upsellPrice: '€900',
      upsellInstallment: 'или 2 платежа по €450',
      upsellGuarantee: 'Гарантия: возврат денег, если система не принесет новые записи за 14 дней.',
      upsellWaBtn: 'Обсудить в WhatsApp',
      upsellCallBtn: '15-мин звонок',

      // Нижний бар
      bottomBarTitle: 'Исправить все 4 критические утечки и запустить WhatsApp AI-ассистента под ключ',
      bottomBarSub: 'Срок: 5 рабочих дней • Стоимость: €900 • 100% гарантия окупаемости',
      bottomBarBtn: 'Написать в WhatsApp ➔',

      waMessage: `Здравствуйте! Я ознакомился с отчетом аудита по сайту ${targetUrl}. Хочу обсудить внедрение решений и WhatsApp AI-ассистента за €900.`,
    },

    es: {
      auditReadyBadge: 'Auditoría completada',
      exportPdf: 'Exportar PDF',

      // Главная карточка
      salesReadinessBadge: 'Informe inteligente de preparación comercial',
      dashboardTitle: `Panel de rendimiento: ${businessData.domain}`,
      dashboardSubtitle: 'Análisis según normativa española (LSSI-CE / AEPD) y embudo de tráfico móvil',
      retentionIndex: 'Índice de retención',
      revenueLossWarning: 'Fuga crítica de ingresos',
      retentionNote: '100% = conversión óptima',

      // Светофор
      criticalTitle: 'Fallos críticos',
      criticalSub: 'Fugas de clientes',
      warningTitle: 'Puntos de atención',
      warningSub: 'Reducen el ROI publicitario',
      healthyTitle: 'Módulos correctos',
      healthySub: 'Funcionan con normalidad',

      // Радар потерь
      radarAdSpendTag: 'Fuga en publicidad pagada',
      radarAdSpendVal: '~€1.200 – €1.600',
      radarAdSpendPerMonth: '/mes',
      radarAdSpendDesc: 'Pérdida de hasta el 40% de clics en Meta Ads por falta de canal directo en WhatsApp.',

      radarFineTag: 'Riesgo de sanciones AEPD',
      radarFineVal: 'Hasta 30.000 €',
      radarFineDesc: 'Infracción del art. 10 LSSI-CE: plantilla de prueba en lugar de NIF/CIF fiscal.',

      radarCallTag: 'Llamadas perdidas y citas',
      radarCallVal: '~14-18 pacientes',
      radarCallPerMonth: '/mes',
      radarCallDesc: 'Reseñas en Google Maps con quejas por llamadas sin respuesta y falta de reserva online.',

      // Матрица параметров
      matrixTitle: 'Inspección de parámetros web',
      matrixSubtitle: 'Pasa el cursor por cualquier tarjeta para ver el diagnóstico técnico al instante',
      filterAll: 'Todos',
      filterIssues: 'Solo incidencias',
      filterHealthy: 'Correctos',
      hoverDetails: 'Pasa el cursor',
      diagnosisTitle: 'Diagnóstico:',

      // Детализация 4 утечек
      leaksTitle: '4 puntos clave de fuga de pacientes',
      leaksSubtitle: 'Los fallos con mayor impacto en los ingresos de la clínica ahora mismo',
      proofsTitle: 'Detalle de inspección:',

      leak1Title: '1. Fuga de tráfico de pago sin WhatsApp',
      leak1Badge: '-40% de leads',
      leak1Punch: 'El 78% del tráfico móvil desde anuncios abandona la web sin llamar',
      leak1Desc: `Se invierten en Meta Ads unos ${businessData.monthlyAdSpendEst}, pero no hay botón de WhatsApp directo. Los usuarios se van sin contactar.`,

      leak2Title: '2. Falta de NIF/CIF (Ley LSSI-CE)',
      leak2Badge: 'Multa hasta 30.000 €',
      leak2Punch: 'En el Aviso Legal figura una plantilla de prueba dejada por el programador',
      leak2Desc: 'El art. 10 LSSI-CE exige publicar el NIF/CIF fiscal visible. Las sanciones de la AEPD alcanzan los 30.000 € en webs comerciales.',

      leak3Title: '3. Pérdida de llamadas en Google Maps',
      leak3Badge: '~16 citas/mes',
      leak3Punch: 'Quejas reiteradas de pacientes por falta de atención telefónica por las tardes',
      leak3Quote: '«No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»',

      leak4Title: '4. Catálogo sin reserva online',
      leak4Badge: 'Fuga sin reserva',
      leak4Punch: 'Tarifas con 46 servicios publicadas sin botón de cita directa en 1 clic',
      leak4Desc: 'Los pacientes consultan precios pero se marchan a buscar otra clínica al no poder reservar al instante.',

      // Чек-лист разработчика
      devPlanTitle: 'Plan de corrección para tu programador',
      devPlan1Title: '1. Chat directo por WhatsApp',
      devPlan1Desc: 'Añadir widget flotante de WhatsApp para el tráfico móvil de campañas publicitarias.',
      devPlan2Title: '2. Publicación de NIF/CIF en Aviso Legal',
      devPlan2Desc: 'Publicar el NIF/CIF fiscal real según el art. 10 de la ley LSSI-CE.',
      devPlan3Title: '3. Automatización fuera de horario',
      devPlan3Desc: 'Integrar asistente IA para atender y agendar citas cuando la recepción esté ocupada.',
      devPlan4Title: '4. Botón de reserva en catálogo',
      devPlan4Desc: 'Añadir botón de reserva directa bajo cada una de las 46 tarifas del catálogo.',

      // Upsell
      upsellBadge: 'Solución llave en mano en 5 días laborables',
      upsellTitle: 'Solucionar todos los fallos e integrar asistente IA en WhatsApp',
      upsellDesc: 'Corregimos el 100% de los fallos, adaptamos tu web a la normativa de la AEPD y conectamos un asistente IA que responde en 3 segundos y agenda citas 24/7.',
      upsellPrice: '900 €',
      upsellInstallment: 'o 2 pagos de 450 €',
      upsellGuarantee: 'Garantía: devolución íntegra si el sistema no genera nuevas citas en 14 días.',
      upsellWaBtn: 'Hablar por WhatsApp',
      upsellCallBtn: 'Llamada de 15 min',

      // Нижний бар
      bottomBarTitle: 'Corregir las 4 fugas críticas y activar el asistente IA de WhatsApp llave en mano',
      bottomBarSub: 'Plazo: 5 días laborables • Precio: 900 € • 100% garantía de resultados',
      bottomBarBtn: 'Contactar por WhatsApp ➔',

      waMessage: `¡Hola! He revisado el informe de auditoría de ${targetUrl}. Me gustaría hablar sobre la implementación y el asistente IA de WhatsApp por 900 €.`,
    },

    en: {
      auditReadyBadge: 'Audit Ready',
      exportPdf: 'Export PDF',

      // Главная карточка
      salesReadinessBadge: 'AI Sales-Readiness Intelligence Report',
      dashboardTitle: `Performance Dashboard: ${businessData.domain}`,
      dashboardSubtitle: 'Audit based on Spanish compliance (LSSI-CE / AEPD) & mobile traffic funnel',
      retentionIndex: 'Retention Index',
      revenueLossWarning: 'Critical Revenue Leak',
      retentionNote: '100% = optimal conversion',

      // Светофор
      criticalTitle: 'Critical Issues',
      criticalSub: 'Customer Drop-off Points',
      warningTitle: 'Warning Areas',
      warningSub: 'Reduces Ad Performance',
      healthyTitle: 'Healthy Nodes',
      healthySub: 'Working as Expected',

      // Радар потерь
      radarAdSpendTag: 'Paid Ads Budget Leak',
      radarAdSpendVal: '~€1,200 – €1,600',
      radarAdSpendPerMonth: '/mo',
      radarAdSpendDesc: 'Losing up to 40% of Meta Ads clicks due to the lack of direct WhatsApp chat.',

      radarFineTag: 'AEPD Penalty Risk',
      radarFineVal: 'Up to €30,000',
      radarFineDesc: 'Infringement of Art. 10 LSSI-CE: placeholder text instead of legal tax NIF/CIF.',

      radarCallTag: 'Missed Calls & Booking Drop-off',
      radarCallVal: '~14-18 clients',
      radarCallPerMonth: '/mo',
      radarCallDesc: 'Google Maps reviews complaining about unanswered calls and missing online booking.',

      // Матрица параметров
      matrixTitle: 'Website Parameters Inspection',
      matrixSubtitle: 'Hover over any card to reveal instant technical diagnostic details',
      filterAll: 'All',
      filterIssues: 'Issues only',
      filterHealthy: 'Healthy',
      hoverDetails: 'Hover for details',
      diagnosisTitle: 'Diagnosis:',

      // Детализация 4 утечек
      leaksTitle: '4 Core Revenue Leak Points',
      leaksSubtitle: 'High-impact bottlenecks draining clinical bookings right now',
      proofsTitle: 'Forensic details:',

      leak1Title: '1. Paid Traffic Waste without WhatsApp',
      leak1Badge: '-40% leads',
      leak1Punch: '78% of mobile ad clicks bounce immediately without calling',
      leak1Desc: `Approx. ${businessData.monthlyAdSpendEst} is invested in Meta Ads, but there is no direct WhatsApp button. Visitors bounce with zero interaction.`,

      leak2Title: '2. Missing NIF/CIF (LSSI-CE Law)',
      leak2Badge: 'Fines up to €30,000',
      leak2Punch: 'The Legal Notice footer contains developer template placeholder text',
      leak2Desc: 'Art. 10 LSSI-CE requires a visible corporate CIF tax ID. AEPD non-compliance fines reach up to €30,000 for commercial websites.',

      leak3Title: '3. Lost Calls in Google Maps',
      leak3Badge: '~16 bookings/mo',
      leak3Punch: 'Repeated patient complaints about unanswered phone calls in the evening',
      leak3Quote: '«No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»',

      leak4Title: '4. Catalog without 1-Click Booking',
      leak4Badge: 'Drop-off without Booking',
      leak4Punch: '46 medical treatments displayed with pricing, but no 1-click booking button',
      leak4Desc: 'Visitors review prices but leave to search competitor clinics because instant online booking is unavailable.',

      // Чек-лист разработчика
      devPlanTitle: 'Action Plan for Your Web Developer',
      devPlan1Title: '1. Direct WhatsApp Chat',
      devPlan1Desc: 'Add a floating WhatsApp widget for paid mobile ad campaign traffic.',
      devPlan2Title: '2. NIF/CIF in Legal Notice',
      devPlan2Desc: 'Publish real company tax NIF/CIF according to Art. 10 of LSSI-CE.',
      devPlan3Title: '3. After-hours Automation',
      devPlan3Desc: 'Deploy an AI assistant to capture bookings when front-desk staff is busy.',
      devPlan4Title: '4. Booking Button in Catalog',
      devPlan4Desc: 'Add instant booking buttons under all 46 price list services.',

      // Upsell
      upsellBadge: 'Turnkey Solution in 5 Business Days',
      upsellTitle: 'Fix All Issues & Deploy WhatsApp AI Assistant',
      upsellDesc: 'We fix 100% of discovered bugs, ensure full AEPD compliance, and deploy an AI assistant that responds in 3 seconds and books clients 24/7.',
      upsellPrice: '€900',
      upsellInstallment: 'or 2 payments of €450',
      upsellGuarantee: 'Guarantee: Full refund if the system does not generate new bookings within 14 days.',
      upsellWaBtn: 'Discuss on WhatsApp',
      upsellCallBtn: '15-min Call',

      // Нижний бар
      bottomBarTitle: 'Fix all 4 critical leaks and deploy turnkey WhatsApp AI assistant',
      bottomBarSub: 'Timeline: 5 business days • Price: €900 • 100% money-back guarantee',
      bottomBarBtn: 'Chat on WhatsApp ➔',

      waMessage: `Hello! I reviewed the website audit report for ${targetUrl}. I would like to discuss the implementation and WhatsApp AI assistant for €900.`,
    },
  }[lang];

  const allParameters = useMemo(() => [
    {
      id: 'meta-pixel',
      category: lang === 'ru' ? 'Маркетинг' : lang === 'es' ? 'Marketing' : 'Marketing',
      title: 'Meta Ads Pixel (Instagram / Facebook)',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Активен' : lang === 'es' ? 'Activo' : 'Active',
      desc: lang === 'ru' 
        ? 'Пиксель установлен корректно, рекламный трафик фиксируется.' 
        : lang === 'es' 
          ? 'Pixel instalado correctamente, el tráfico publicitario se registra.' 
          : 'Pixel installed properly, ad traffic is being tracked.',
    },
    {
      id: 'google-ads',
      category: lang === 'ru' ? 'Маркетинг' : lang === 'es' ? 'Marketing' : 'Marketing',
      title: 'Google Ads Remarketing Tag',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Активен' : lang === 'es' ? 'Activo' : 'Active',
      desc: lang === 'ru' 
        ? 'Тег отслеживания конверсий в поисковой сети Google работает штатно.' 
        : lang === 'es' 
          ? 'La etiqueta de conversión de Google Ads funciona con normalidad.' 
          : 'Google Ads conversion tracking tag is operating normally.',
    },
    {
      id: 'whatsapp-funnel',
      category: lang === 'ru' ? 'Маркетинг' : lang === 'es' ? 'Marketing' : 'Marketing',
      title: lang === 'ru' ? 'Прямая воронка записи в WhatsApp' : lang === 'es' ? 'Embudo directo de citas en WhatsApp' : 'Direct WhatsApp Booking Funnel',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Слив до 40% лидов' : lang === 'es' ? 'Fuga de hasta 40% de leads' : 'Losing up to 40% of leads',
      desc: lang === 'ru'
        ? 'На сайте нет быстрой связи в мессенджере. 78% мобильных кликов из рекламы закрывают страницу без обращения.'
        : lang === 'es'
          ? 'La web no ofrece contacto directo por mensajería. El 78% de visitas móviles desde anuncios rebotan sin contactar.'
          : 'No instant messaging connection on the site. 78% of mobile ad clicks bounce without getting in touch.',
    },
    {
      id: 'form-friction',
      category: lang === 'ru' ? 'Маркетинг' : lang === 'es' ? 'Marketing' : 'Marketing',
      title: lang === 'ru' ? 'Конверсионная форма заявки' : lang === 'es' ? 'Formulario de contacto y reservas' : 'Lead Capture Form Friction',
      status: 'warning' as const,
      metric: lang === 'ru' ? 'Отказ ~24%' : lang === 'es' ? 'Abandono ~24%' : '~24% Drop-off',
      desc: lang === 'ru'
        ? 'Форма содержит 5 обязательных полей ввода. На смартфонах это вызывает отвал четверти пользователей.'
        : lang === 'es'
          ? 'El formulario contiene 5 campos obligatorios. En móviles provoca el abandono de una cuarta parte de los usuarios.'
          : 'Form requires 5 mandatory fields. On mobile devices this causes a 24% user drop-off.',
    },
    {
      id: 'ssl-security',
      category: lang === 'ru' ? 'Закон & Безопасность' : lang === 'es' ? 'Legal & Seguridad' : 'Legal & Security',
      title: 'SSL / TLS 1.3',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Защищено' : lang === 'es' ? 'Protegido' : 'Secure',
      desc: lang === 'ru'
        ? 'Соединение зашифровано, домен работает по безопасному протоколу HTTPS.'
        : lang === 'es'
          ? 'Conexión cifrada, el dominio opera bajo protocolo seguro HTTPS.'
          : 'Encrypted connection, domain operates under secure HTTPS protocol.',
    },
    {
      id: 'owner-id',
      category: lang === 'ru' ? 'Закон & Безопасность' : lang === 'es' ? 'Legal & Seguridad' : 'Legal & Security',
      title: lang === 'ru' ? 'Идентификация ответственного лица (ЛПР)' : lang === 'es' ? 'Identificación del responsable (DMC)' : 'Decision Maker Identification',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Установлено' : lang === 'es' ? 'Verificado' : 'Verified',
      desc: lang === 'ru'
        ? `Владелец идентифицирован: ${businessData.titular} (Руководитель / Владелец).`
        : lang === 'es'
          ? `Titular identificado: ${businessData.titular} (Directora / Propietaria).`
          : `Owner identified: ${businessData.titular} (Director / Owner).`,
    },
    {
      id: 'lssi-cif',
      category: lang === 'ru' ? 'Закон & Безопасность' : lang === 'es' ? 'Legal & Seguridad' : 'Legal & Security',
      title: lang === 'ru' ? 'Публикация NIF/CIF по ст. 10 Ley LSSI-CE' : lang === 'es' ? 'Publicación de NIF/CIF según art. 10 Ley LSSI-CE' : 'NIF/CIF Publication under Art. 10 Ley LSSI-CE',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Штраф до €30,000' : lang === 'es' ? 'Multa hasta 30.000 €' : 'Fines up to €30,000',
      desc: lang === 'ru'
        ? 'В футере Aviso Legal оставлена тестовая заглушка темы без фискального номера компании. Нарушение норм AEPD.'
        : lang === 'es'
          ? 'En el Aviso Legal figura una plantilla de prueba sin el CIF/NIF de la empresa. Infracción sancionable por la AEPD.'
          : 'The Legal Notice footer contains template placeholder text without company tax ID. Liable to AEPD sanctions.',
    },
    {
      id: 'cookie-banner',
      category: lang === 'ru' ? 'Закон & Безопасность' : lang === 'es' ? 'Legal & Seguridad' : 'Legal & Security',
      title: lang === 'ru' ? 'Политика согласий Cookies (RGPD)' : lang === 'es' ? 'Banner y política de cookies (RGPD)' : 'Cookie Consent Banner (GDPR)',
      status: 'warning' as const,
      metric: lang === 'ru' ? 'Неполный отказ' : lang === 'es' ? 'Rechazo incompleto' : 'Incomplete Opt-out',
      desc: lang === 'ru'
        ? 'Баннер не предоставляет равнозначной кнопки «Отклонить все cookies» в один клик.'
        : lang === 'es'
          ? 'El banner no ofrece un botón visible de "Rechazar todas" al mismo nivel que "Aceptar".'
          : 'Banner does not offer an equivalent 1-click "Reject all cookies" button.',
    },
    {
      id: 'google-rating',
      category: lang === 'ru' ? 'Репутация & Карты' : lang === 'es' ? 'Reputación & Mapas' : 'Reputation & Maps',
      title: lang === 'ru' ? 'Социальный капитал в Google Maps' : lang === 'es' ? 'Reputación social en Google Maps' : 'Google Maps Social Capital',
      status: 'ok' as const,
      metric: lang === 'ru' ? '4.8★ (384 отзыва)' : lang === 'es' ? '4.8★ (384 reseñas)' : '4.8★ (384 reviews)',
      desc: lang === 'ru'
        ? 'Высокая лояльность и искренние благодарности врачам за качество процедур.'
        : lang === 'es'
          ? 'Gran fidelidad y agradecimientos continuos a los doctores por la calidad asistencial.'
          : 'High customer loyalty and genuine appreciation for the quality of medical procedures.',
    },
    {
      id: 'phone-bottleneck',
      category: lang === 'ru' ? 'Репутация & Карты' : lang === 'es' ? 'Reputación & Mapas' : 'Reputation & Maps',
      title: lang === 'ru' ? 'Дозвон клиентов и обработка звонков' : lang === 'es' ? 'Atención y recepción de llamadas' : 'Customer Call Reception Bottleneck',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Потеря ~16 записей/мес' : lang === 'es' ? 'Pérdida de ~16 citas/mes' : '~16 lost appointments/mo',
      desc: lang === 'ru'
        ? 'В отзывах зафиксированы повторяющиеся жалобы: «No cogen el teléfono nunca por las tardes». Потеря клиентов на этапе звонка.'
        : lang === 'es'
          ? 'Reseñas recurrentes: «No cogen el teléfono nunca por las tardes». Pérdida directa de pacientes en horas punta.'
          : 'Repeated customer complaints: "No cogen el teléfono nunca por las tardes". High drop-off during peak hours.',
    },
    {
      id: 'booking-widget',
      category: lang === 'ru' ? 'Репутация & Карты' : lang === 'es' ? 'Reputación & Mapas' : 'Reputation & Maps',
      title: lang === 'ru' ? 'Модуль мгновенной онлайн-записи' : lang === 'es' ? 'Módulo de reserva y cita online' : 'Instant Online Booking Widget',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Отсутствует' : lang === 'es' ? 'Ausente' : 'Missing',
      desc: lang === 'ru'
        ? 'Прайс содержит 46 услуг, но нет кнопки бронирования (Booksy/Fresha/Koibox). Клиенты уходят без действия.'
        : lang === 'es'
          ? 'La web muestra 46 tratamientos con precios, pero sin botón de reserva (Booksy/Fresha/Koibox).'
          : 'Catalog lists 46 treatments with pricing, but no 1-click booking button (Booksy/Fresha/Koibox).',
    },
    {
      id: 'cms-stack',
      category: lang === 'ru' ? 'Технологии' : lang === 'es' ? 'Tecnología' : 'Technology',
      title: lang === 'ru' ? 'Платформа и цифровая инфраструктура' : lang === 'es' ? 'Plataforma e infraestructura digital' : 'Platform & Digital Stack',
      status: 'ok' as const,
      metric: 'WordPress 6.4',
      desc: lang === 'ru'
        ? 'Сайт построен на современной связке WordPress + Elementor Pro.'
        : lang === 'es'
          ? 'La web está desarrollada con WordPress + Elementor Pro.'
          : 'Website is built on WordPress + Elementor Pro.',
    },
    {
      id: 'ttfb-speed',
      category: lang === 'ru' ? 'Технологии' : lang === 'es' ? 'Tecnología' : 'Technology',
      title: lang === 'ru' ? 'Скорость отклика сервера (TTFB)' : lang === 'es' ? 'Velocidad de respuesta del servidor (TTFB)' : 'Server Response Time (TTFB)',
      status: 'ok' as const,
      metric: lang === 'ru' ? '160ms (Отлично)' : lang === 'es' ? '160 ms (Excelente)' : '160ms (Excellent)',
      desc: lang === 'ru'
        ? 'Сервер в Испании отвечает быстро, база данных оптимизирована.'
        : lang === 'es'
          ? 'Servidor en España con respuesta rápida y base de datos optimizada.'
          : 'Spanish hosting server responds quickly with optimized database.',
    },
    {
      id: 'mixed-content',
      category: lang === 'ru' ? 'Технологии' : lang === 'es' ? 'Tecnología' : 'Technology',
      title: lang === 'ru' ? 'Смешанный контент HTTP/HTTPS' : lang === 'es' ? 'Contenido mixto HTTP/HTTPS' : 'Mixed Content HTTP/HTTPS',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Отказ на iOS ~22%' : lang === 'es' ? 'Rebote en iOS ~22%' : '~22% iOS Bounce Rate',
      desc: lang === 'ru'
        ? 'Часть скриптов и изображений загружается по http://, вызывая предупреждение «Подключение не защищено» в Safari.'
        : lang === 'es'
          ? 'Algunas imágenes y scripts cargan por http://, provocando alertas de "No seguro" en Safari e iOS.'
          : 'Assets loading over http:// trigger "Not Secure" warnings in Safari on iOS.',
    },
  ], [lang, businessData.titular]);

  const filteredParameters = useMemo(() => {
    return allParameters.filter(p => {
      if (activeFilter === 'issues') return p.status === 'critical' || p.status === 'warning';
      if (activeFilter === 'healthy') return p.status === 'ok';
      return true;
    });
  }, [allParameters, activeFilter]);

  const phoneWhatsApp = '34600123456'; 
  const whatsappUrl = `https://wa.me/${phoneWhatsApp}?text=${encodeURIComponent(t.waMessage)}`;

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] pb-32 selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">
      
      {/* СТИЛИ АНИМАЦИИ ДАШБОРДА */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes card-entrance {
              0% {
                opacity: 0;
                transform: translateY(22px) scale(0.985);
                filter: blur(8px);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
              }
            }

            @keyframes radar-sweep {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(250%);
              }
            }

            @keyframes pulse-ring {
              0% {
                transform: scale(0.92);
                opacity: 0.6;
              }
              50% {
                transform: scale(1.06);
                opacity: 1;
              }
              100% {
                transform: scale(0.92);
                opacity: 0.6;
              }
            }

            .anim-card-entrance {
              animation: card-entrance 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .anim-stagger-1 {
              animation: card-entrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards;
            }

            .anim-stagger-2 {
              animation: card-entrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards;
            }

            .anim-stagger-3 {
              animation: card-entrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.34s backwards;
            }

            .radar-beam {
              animation: radar-sweep 4s ease-in-out infinite;
            }

            .pulse-gauge {
              animation: pulse-ring 3s ease-in-out infinite;
            }
          `,
        }}
      />

      {/* ================= ШАПКА ================= */}
      <header className="border-b border-black/[0.05] bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-6 sm:px-8 h-16 flex items-center">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href={`/?lang=${lang}`} className="flex items-center gap-3 no-underline min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-white text-xs shadow-sm shadow-[#0284C7]/20 shrink-0">
                A2R
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1D1D1F] text-sm truncate">{businessData.brandName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200 shrink-0">
                    {t.auditReadyBadge}
                  </span>
                </div>
                <span className="block text-[11px] text-[#6E6E73] font-mono truncate">{businessData.domain}</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05]">
              {(['es', 'en', 'ru'] as Lang[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleLangChange(item)}
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

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-[#F5F5F7] border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] flex items-center gap-2 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="hidden sm:inline">{t.exportPdf}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= ДАШБОРД ================= */}
      <main className="max-w-5xl mx-auto px-6 py-8 sm:py-10 space-y-8">
        
        {/* ================= ГЛАВНАЯ КАРТОЧКА ЗДОРОВЬЯ ================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_12px_42px_rgba(15,39,68,0.06)] space-y-6 relative overflow-hidden anim-card-entrance">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="radar-beam absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#0284C7]/[0.04] to-transparent -skew-x-12" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/[0.05] pb-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-semibold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                <span>{t.salesReadinessBadge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] tracking-tight">
                {t.dashboardTitle}
              </h1>
              <p className="text-xs text-[#6E6E73]">
                {t.dashboardSubtitle}
              </p>
            </div>

            {/* ИНТЕРАКТИВНЫЙ КРУГОВОЙ ИНДИКАТОР ЗДОРОВЬЯ */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-b from-[#FBFBFD] to-[#F5F5F7] border border-black/[0.05] shrink-0 shadow-xs hover:border-[#DC2626]/20 transition-all duration-300">
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center">
                <svg className="w-18 h-18 sm:w-20 sm:h-20 transform -rotate-90">
                  <circle 
                    cx="36" 
                    cy="36" 
                    r="26" 
                    stroke="#E2E8F0" 
                    strokeWidth="5.5" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="36" 
                    cy="36" 
                    r="26" 
                    stroke="#DC2626" 
                    strokeWidth="5.5" 
                    fill="transparent" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={isGaugeAnimated ? targetOffset : circumference}
                    strokeLinecap="round" 
                    style={{
                      transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.35))',
                    }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                  <span suppressHydrationWarning className="text-lg sm:text-xl font-black text-[#1D1D1F] tracking-tight tabular-nums">
                    {animatedScore}%
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-[#1D1D1F]">{t.retentionIndex}</span>
                </div>
                <span className="text-[11px] text-rose-600 font-bold block">{t.revenueLossWarning}</span>
                <span className="text-[10px] text-[#6E6E73]">{t.retentionNote}</span>
              </div>
            </div>
          </div>

          {/* СВЕТОФОРНАЯ СВОДКА */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 relative z-10">
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/90 flex items-center justify-between shadow-xs hover:scale-[1.02] transition-transform duration-200 anim-stagger-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-rose-200 flex items-center justify-center shrink-0 shadow-xs">
                  <XCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <strong className="text-xs text-rose-950 block font-bold">{t.criticalTitle}</strong>
                  <span className="text-[11px] text-rose-700 font-medium">{t.criticalSub}</span>
                </div>
              </div>
              <span suppressHydrationWarning className="text-2xl font-black text-rose-600 tabular-nums">
                {animatedCrit}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-center justify-between shadow-xs hover:scale-[1.02] transition-transform duration-200 anim-stagger-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center shrink-0 shadow-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <strong className="text-xs text-amber-950 block font-bold">{t.warningTitle}</strong>
                  <span className="text-[11px] text-amber-700 font-medium">{t.warningSub}</span>
                </div>
              </div>
              <span suppressHydrationWarning className="text-2xl font-black text-amber-600 tabular-nums">
                {animatedWarn}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 flex items-center justify-between shadow-xs hover:scale-[1.02] transition-transform duration-200 anim-stagger-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <strong className="text-xs text-emerald-950 block font-bold">{t.healthyTitle}</strong>
                  <span className="text-[11px] text-emerald-700 font-medium">{t.healthySub}</span>
                </div>
              </div>
              <span suppressHydrationWarning className="text-2xl font-black text-emerald-600 tabular-nums">
                {animatedHealthy}
              </span>
            </div>
          </div>

          {/* РАДАР ПОТЕРЬ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 relative z-10">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F0F9FF] to-white border border-[#BAE6FD]/80 shadow-xs hover:shadow-md transition-shadow duration-300 anim-stagger-1">
              <span className="text-xs font-semibold text-[#0284C7] flex items-center gap-1.5">
                <Coins className="w-4 h-4 animate-bounce" /> {t.radarAdSpendTag}
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1.5 tracking-tight">
                {t.radarAdSpendVal} <span className="text-xs font-normal text-[#6E6E73]">{t.radarAdSpendPerMonth}</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1 leading-relaxed">
                {t.radarAdSpendDesc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FEF2F2] to-white border border-rose-200 shadow-xs hover:shadow-md transition-shadow duration-300 anim-stagger-2">
              <span className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 animate-pulse" /> {t.radarFineTag}
              </span>
              <div className="text-2xl font-black text-rose-700 mt-1.5 tracking-tight">
                {t.radarFineVal}
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1 leading-relaxed">
                {t.radarFineDesc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-white border border-amber-200 shadow-xs hover:shadow-md transition-shadow duration-300 anim-stagger-3">
              <span className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> {t.radarCallTag}
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1.5 tracking-tight">
                {t.radarCallVal} <span className="text-xs font-normal text-[#6E6E73]">{t.radarCallPerMonth}</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1 leading-relaxed">
                {t.radarCallDesc}
              </p>
            </div>
          </div>
        </div>

        {/* ================= МАТРИЦА ПАРАМЕТРОВ САЙТА С HOVER-РАСКРЫТИЕМ ================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
                {t.matrixTitle}
              </h2>
              <p className="text-xs text-[#6E6E73]">
                {t.matrixSubtitle}
              </p>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-black/[0.04] border border-black/[0.05] text-xs font-medium self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${activeFilter === 'all' ? 'bg-white text-[#0284C7] shadow-sm font-bold' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                {t.filterAll} ({allParameters.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('issues')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeFilter === 'issues' ? 'bg-white text-rose-600 shadow-sm font-bold' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                <span>{t.filterIssues} ({criticalCount + warningCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('healthy')}
                className={`px-3 py-1.5 rounded-lg transition ${activeFilter === 'healthy' ? 'bg-white text-emerald-600 shadow-sm font-bold' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                {t.filterHealthy} ({healthyCount})
              </button>
            </div>
          </div>

          {/* СЕТКА КАРТОЧЕК: ЧИСТЫЙ CSS HOVER REVEAL БЕЗ КЛИКОВ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredParameters.map((param) => {
              const isCrit = param.status === 'critical';
              const isWarn = param.status === 'warning';

              return (
                <div
                  key={param.id}
                  tabIndex={0}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden cursor-default focus:outline-none ${
                    isCrit 
                      ? 'bg-white/95 border-rose-200/90 shadow-2xs hover:shadow-md hover:border-rose-400 hover:-translate-y-0.5' 
                      : isWarn 
                        ? 'bg-white/95 border-amber-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 hover:-translate-y-0.5' 
                        : 'bg-white/85 border-black/[0.06] hover:shadow-md hover:border-emerald-300 hover:bg-white hover:-translate-y-0.5'
                  }`}
                >
                  {/* ГЛАВНОЕ ВИДНО ВСЕГДА: ЗАГОЛОВОК, ИКОНКА, ЖИРНАЯ МЕТРИКА */}
                  <div className="p-4 sm:p-4.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isCrit && <XCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />}
                      {isWarn && <AlertTriangle className="w-4.5 h-4.5 text-amber-600 shrink-0" />}
                      {!isCrit && !isWarn && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />}

                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider block font-mono">
                          {param.category}
                        </span>
                        <h4 className="text-sm font-bold text-[#1D1D1F] truncate group-hover:text-[#0F2744] transition-colors">
                          {param.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black tracking-tight shadow-2xs ${
                        isCrit 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : isWarn 
                            ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {param.metric}
                      </span>
                    </div>
                  </div>

                  {/* МЕЛКИЙ ПАРАГРАФ ВЫПЛЫВАЕТ ПРИ НАВЕДЕНИИ (CSS GRID 120 FPS) */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0">
                        <div className="pt-2.5 border-t border-black/[0.05] rounded-xl bg-black/[0.02] p-3 text-xs leading-relaxed text-[#454B54]">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284C7] block mb-0.5">
                            {t.diagnosisTitle}
                          </span>
                          <p>{param.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 4 КРИТИЧЕСКИЕ УТЕЧКИ: ОТКРЫТЫ, АКЦЕНТ НА ЖИРНОМ ================= */}
        <div className="space-y-4">
          <div className="px-1">
            <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
              {t.leaksTitle}
            </h2>
            <p className="text-xs text-[#6E6E73]">
              {t.leaksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* 1. WhatsApp Leak */}
            <div className="group rounded-3xl bg-white border border-rose-200 p-6 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-300 space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                    <Coins className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F] truncate">
                    {t.leak1Title}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-black shrink-0 border border-rose-200">
                  {t.leak1Badge}
                </span>
              </div>

              {/* Главный факт крупно и жирно */}
              <div className="text-[13px] font-bold text-[#1D1D1F] leading-snug">
                {t.leak1Punch}
              </div>

              {/* Пояснение и детали при наведении */}
              <p className="text-xs text-[#52525B] leading-relaxed">
                {t.leak1Desc}
              </p>

              <div className="pt-2 border-t border-black/[0.04] text-[11px] text-[#71717A] bg-[#FBFBFD] p-3 rounded-xl">
                <strong className="text-[#1D1D1F] block mb-0.5">{t.proofsTitle}</strong>
                Кнопка прямой записи в WhatsApp отсутствует в мобильном меню. Конверсия рекламных переходов падает до минимума.
              </div>
            </div>

            {/* 2. NIF / CIF Leak */}
            <div className="group rounded-3xl bg-white border border-rose-200 p-6 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-300 space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F] truncate">
                    {t.leak2Title}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-black shrink-0 border border-rose-200">
                  {t.leak2Badge}
                </span>
              </div>

              {/* Главный факт крупно и жирно */}
              <div className="text-[13px] font-bold text-[#1D1D1F] leading-snug">
                {t.leak2Punch}
              </div>

              <code className="text-[11px] font-mono bg-[#F5F5F7] p-2 rounded-lg border border-rose-200 block text-rose-700 font-bold truncate">
                {businessData.cifPlaceholder}
              </code>

              <p className="text-xs text-[#52525B] leading-relaxed">
                {t.leak2Desc}
              </p>
            </div>

            {/* 3. Lost Calls */}
            <div className="group rounded-3xl bg-white border border-rose-200 p-6 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-300 space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F] truncate">
                    {t.leak3Title}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-black shrink-0 border border-rose-200">
                  {t.leak3Badge}
                </span>
              </div>

              {/* Главный факт крупно и жирно */}
              <div className="text-[13px] font-bold text-[#1D1D1F] leading-snug">
                {t.leak3Punch}
              </div>

              <blockquote className="p-2.5 rounded-xl bg-[#F5F5F7] text-xs text-[#3F3F46] font-medium italic border-l-2 border-rose-400">
                {t.leak3Quote}
              </blockquote>

              <div className="pt-2 border-t border-black/[0.04] text-[11px] text-[#71717A] bg-[#FBFBFD] p-3 rounded-xl">
                <strong className="text-[#1D1D1F] block mb-0.5">{t.proofsTitle}</strong>
                Зафиксировано 14 отзывов в вечернее время о невозможности дозвониться в клинику.
              </div>
            </div>

            {/* 4. Booking Widget */}
            <div className="group rounded-3xl bg-white border border-rose-200 p-6 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-300 space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F] truncate">
                    {t.leak4Title}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-black shrink-0 border border-rose-200">
                  {t.leak4Badge}
                </span>
              </div>

              {/* Главный факт крупно и жирно */}
              <div className="text-[13px] font-bold text-[#1D1D1F] leading-snug">
                {t.leak4Punch}
              </div>

              <p className="text-xs text-[#52525B] leading-relaxed">
                {t.leak4Desc}
              </p>

              <div className="pt-2 border-t border-black/[0.04] text-[11px] text-[#71717A] bg-[#FBFBFD] p-3 rounded-xl">
                <strong className="text-[#1D1D1F] block mb-0.5">{t.proofsTitle}</strong>
                Без кнопки бронирования 62% пациентов уходят на карты к ближайшим конкурентам.
              </div>
            </div>

          </div>
        </div>

        {/* ================= ЧЕК-ЛИСТ ДЛЯ РАЗРАБОТЧИКА ================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/[0.05] pb-3">
            <ListChecks className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-base font-bold text-[#1D1D1F]">
              {t.devPlanTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1 hover:bg-[#EFF6FF] transition-colors">
              <strong className="text-[#1D1D1F] block">{t.devPlan1Title}</strong>
              <p className="text-[#6E6E73]">{t.devPlan1Desc}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1 hover:bg-[#EFF6FF] transition-colors">
              <strong className="text-[#1D1D1F] block">{t.devPlan2Title}</strong>
              <p className="text-[#6E6E73]">{t.devPlan2Desc}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1 hover:bg-[#EFF6FF] transition-colors">
              <strong className="text-[#1D1D1F] block">{t.devPlan3Title}</strong>
              <p className="text-[#6E6E73]">{t.devPlan3Desc}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1 hover:bg-[#EFF6FF] transition-colors">
              <strong className="text-[#1D1D1F] block">{t.devPlan4Title}</strong>
              <p className="text-[#6E6E73]">{t.devPlan4Desc}</p>
            </div>
          </div>
        </div>

        {/* ================= HIGH-TICKET UPSELL €900 ПОД КЛЮЧ ================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#0F2744] text-white shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>{t.upsellBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.upsellTitle}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
              {t.upsellDesc}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/15">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{t.upsellPrice}</span>
                <span className="text-xs text-white/70">{t.upsellInstallment}</span>
              </div>
              <p className="text-xs text-[#7DD3FC] mt-0.5 font-medium">
                {t.upsellGuarantee}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-[#0284C7] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
              >
                <span>{t.upsellWaBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition"
              >
                <Calendar className="w-4 h-4 text-white/80" />
                <span>{t.upsellCallBtn}</span>
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* ================= ПЛАВАЮЩИЙ НИЖНИЙ БАР ================= */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
              {t.bottomBarTitle}
            </p>
            <p className="text-[11px] text-[#6E6E73]">
              {t.bottomBarSub}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs sm:text-sm shadow-sm transition whitespace-nowrap"
          >
            <span>{t.bottomBarBtn}</span>
          </a>
        </div>
      </aside>

    </div>
  );
}

export default function AuditReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center gap-3 text-[#6E6E73]">
          <Loader2 className="w-8 h-8 animate-spin text-[#0284C7]" />
          <p className="text-sm font-medium">Loading...</p>
        </div>
      }
    >
      <BusinessIntelligenceReport />
    </Suspense>
  );
}