'use client';

import React, { useState, useEffect, useMemo, useRef, useLayoutEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CheckCircle2, 
  Download, 
  ArrowUpRight, 
  Sparkles, 
  Calendar, 
  Loader2, 
  Building2, 
  PhoneCall, 
  Coins, 
  ListChecks,
  ShieldCheck,
  ShieldAlert,
  XCircle,
  AlertTriangle,
  Code2,
  ChevronDown,
  Printer,
  SlidersHorizontal,
  Target,
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function BusinessIntelligenceReport() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://clinica-mabelle.es';
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const [lang, setLang] = useState<Lang>('ru');
  const [activePillar, setActivePillar] = useState<'all' | '01' | '02' | '03'>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'issues' | 'healthy'>('all');

  // PRELOADER & REVEAL CADENCE (КАК НА ГЛАВНОЙ)
  const [pageLoading, setPageLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealStep, setRevealStep] = useState(0);
  const reportContainerRef = useRef<HTMLDivElement>(null);

  // Аккордеоны
  const [openParamId, setOpenParamId] = useState<string | null>(null);
  const [openLeakId, setOpenLeakId] = useState<number | null>(1);
  const [openDevPlanId, setOpenDevPlanId] = useState<number | null>(null);

  // Интерактивная симуляция устранения проблем
  const [resolvedIssues, setResolvedIssues] = useState<string[]>([]);

  // Синхронное безопасное чтение языка до первого рендера
  useIsomorphicLayoutEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as Lang | null;
      if (urlLang && ['ru', 'es', 'en'].includes(urlLang)) {
        setLang(urlLang);
        return;
      }

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

  const toggleResolvedIssue = (id: string) => {
    setResolvedIssues((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
    baseHealthScore: 46,
  };

  const simulatedHealthScore = useMemo(() => {
    const bonus = resolvedIssues.length * 12;
    return Math.min(100, businessData.baseHealthScore + bonus);
  }, [resolvedIssues.length, businessData.baseHealthScore]);

  // Анимация кругового индикатора
  const [isGaugeAnimated, setIsGaugeAnimated] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (pageLoading) return;

    const timer = setTimeout(() => setIsGaugeAnimated(true), 140);
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedScore(Math.round(ease * simulatedHealthScore));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [pageLoading, simulatedHealthScore]);

  const circumference = 163.36;
  const targetOffset = circumference - (circumference * simulatedHealthScore) / 100;

  // =========================================================
  // ТАЙМЕР ПРЕЛОАДЕРА И ПОШАГОВЫЙ КАДАНС ПОЯВЛЕНИЯ
  // =========================================================
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

    const duration = 400;
    const revealTimeouts: number[] = [];

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(Math.round((elapsed / duration) * 100), 100);
      setLoadProgress(p);

      if (elapsed >= duration) {
        clearInterval(interval);
        const closeTimeout = window.setTimeout(() => {
          setPageLoading(false);
          setRevealStep(1);
          const cadence = 120;
          [2, 3, 4, 5, 6].forEach((step, index) => {
            revealTimeouts.push(
              window.setTimeout(() => setRevealStep(step), cadence * (index + 1))
            );
          });
        }, 100);
        revealTimeouts.push(closeTimeout);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      revealTimeouts.forEach(window.clearTimeout);
    };
  }, []);

  // GSAP SCROLL REVEAL ДЛЯ СЕКЦИЙ ПРИ СКРОЛЛЕ
  useLayoutEffect(() => {
    if (
      pageLoading ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('a2r-js-fallback')
    )
      return;

    const scope = reportContainerRef.current;
    if (!scope) return;

    gsap.registerPlugin(ScrollTrigger);

    const pendingReveal = new Set<Element>();
    const revealOnEnter = (targets: Element | NodeListOf<Element>) => {
      const elements = targets instanceof Element ? [targets] : Array.from(targets);
      elements.forEach((el) => pendingReveal.add(el));
    };

    revealOnEnter(scope.querySelectorAll('.reveal-on-scroll'));

    pendingReveal.forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 24, filter: 'blur(6px)' });
    });

    let frame = 0;
    const checkVisibleItems = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      pendingReveal.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > viewportHeight * 1.05 || rect.bottom < 0) return;

        pendingReveal.delete(el);
        const index = Array.from(el.parentElement?.children ?? []).indexOf(el);
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24, filter: 'blur(6px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.72,
            delay: Math.max(0, index) * 0.08,
            ease: 'power3.out',
            overwrite: 'auto',
            clearProps: 'opacity,visibility,transform,filter',
          }
        );
      });
    };

    const scheduleCheck = () => {
      if (!frame) frame = window.requestAnimationFrame(checkVisibleItems);
    };

    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });
    scheduleCheck();

    return () => {
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      if (frame) window.cancelAnimationFrame(frame);
      pendingReveal.forEach((el) => {
        gsap.set(el, { clearProps: 'opacity,visibility,transform,filter' });
      });
    };
  }, [pageLoading]);

  const t = {
    ru: {
      devBadge: 'ПРОТОТИП · Некоммерческая демонстрация (Тестовый режим · Данные смоделированы)',
      auditReadyBadge: 'DEMO · ОТЧЕТ СФОРМИРОВАН',
      preloaderKicker: 'ФОРМИРОВАНИЕ ОТЧЕТА АУДИТА',
      exportPdf: 'Экспорт PDF',
      printDoc: 'Печать',
      backToHome: 'На главную',

      dashboardTitle: `Аудит конверсии: ${businessData.domain}`,
      dashboardSubtitle: 'Инспекция по стандартам Испании (LSSI-CE, AEPD) и точкам потери мобильного трафика',
      readinessBadge: 'AI REVENUE AUDIT',
      retentionIndex: 'Индекс готовности к продажам',
      revenueLossWarning: 'Критическая потеря клиентов',
      retentionNote: '100% = идеальная воронка',
      impactDetailsTitle: 'Оценка финансовых утечек',

      criticalTitle: 'Критические сбои',
      criticalSub: 'Точки слива клиентов',
      warningTitle: 'Зоны риска',
      warningSub: 'Снижают отдачу рекламы',
      healthyTitle: 'Исправные узлы',
      healthySub: 'Работают стабильно',

      radarAdSpendTag: 'Слив бюджета рекламы',
      radarAdSpendVal: '~€1,200 – €1,600',
      radarAdSpendPerMonth: '/мес',
      radarAdSpendDesc: 'Потеря до 40% переходов из Meta Ads из-за отсутствия прямого чата WhatsApp.',

      radarFineTag: 'Риск проверок AEPD',
      radarFineVal: 'До €30,000',
      radarFineDesc: 'Нарушение ст. 10 LSSI-CE: заглушка разработчика в футере вместо фискального CIF/NIF.',

      radarCallTag: 'Недозвон пациентов',
      radarCallVal: '~14–18 записей',
      radarCallPerMonth: '/мес',
      radarCallDesc: 'Жалобы в Google картах на пропущенные звонки в часы пик и отсутствие быстрой записи.',

      simulateButton: 'Смоделировать решение',
      simulatedDone: 'Решение смоделировано',
      pointsBonus: '+12 баллов',

      pillarsNavTitle: '3 коммерческие опоры аудита',
      pillarAll: 'Все проверки',
      pillar01: '01 Техника & Закон',
      pillar02: '02 WhatsApp & Связь',
      pillar03: '03 Реклама & Карты',

      filterAll: 'Все узлы',
      filterIssues: 'Только проблемы',
      filterHealthy: 'Исправные',
      diagnosisTitle: 'Технический диагноз:',
      fixActionTitle: 'Рекомендуемое решение:',

      leaksTitle: '4 ключевые точки потери выручки',
      leaksSubtitle: 'Узкие места, снижающие количество первичных записей в клинику',

      leak1Title: '1. Слив платного трафика без WhatsApp (wa.me)',
      leak1Badge: '-40% лидов',
      leak1Punch: '78% мобильных кликов из рекламы закрывают сайт без звонка',
      leak1Desc: `В рекламу Meta Ads инвестируется около ${businessData.monthlyAdSpendEst}, но на сайте нет прямой кнопки мессенджера. Пациенты не хотят заполнять формы на смартфонах и уходят.`,

      leak2Title: '2. Отсутствие обязательного NIF/CIF (Ley LSSI-CE)',
      leak2Badge: 'Штраф до €30,000',
      leak2Punch: 'В разделе Aviso Legal оставлена тестовая заглушка темы разработчика',
      leak2Desc: 'Статья 10 закона LSSI-CE обязывает публиковать реальный фискальный NIF/CIF компании. Испанский регулятор AEPD штрафует коммерческие сайты без реквизитов.',

      leak3Title: '3. Потеря звонков и клиентов в Google Maps',
      leak3Badge: '~16 записей/мес',
      leak3Punch: 'Повторяющиеся жалобы пациентов на неотвеченные звонки по вечерам',
      leak3Quote: '«No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»',
      leak3Desc: 'При анализе 384 отзывов в картах обнаружено 14 негативных упоминаний о сбросе звонков в вечерние пиковые часы.',

      leak4Title: '4. Каталог процедур без мгновенной записи (Cita Previa)',
      leak4Badge: 'Отказ без брони',
      leak4Punch: 'Прайс-лист содержит 46 услуг, но нет кнопки бронирования в 1 клик',
      leak4Desc: 'Пользователи просматривают прайс, но без кнопки моментальной онлайн-записи уходят искать другие клиники в Google.',

      devPlanTitle: 'План исправления для вашего веб-мастера',
      devPlanSubtitle: 'Пошаговый технический регламент для программиста или веб-студии',
      devPlan1Title: '1. Подключение плавающего WhatsApp (wa.me)',
      devPlan1Desc: 'Разместить кнопку быстрого чата с автозаполнением темы обращения в правом нижнем углу мобильной версии.',
      devPlan2Title: '2. Публикация фискальных данных NIF/CIF',
      devPlan2Desc: 'Заменить текст заглушки в подвале и на странице Aviso Legal на реальный CIF/NIF юридического лица.',
      devPlan3Title: '3. Маршрутизация звонков и автоответчик',
      devPlan3Desc: 'Настроить переадресацию пропущенных звонков на дежурный WhatsApp с автоответом в нерабочие часы.',
      devPlan4Title: '4. Кнопки быстрой записи под каждым блоком услуг',
      devPlan4Desc: 'Интегрировать виджет Cita Previa в каждый из 46 пунктов прайс-листа клиники.',

      upsellBadge: 'ДЕМО · РЕШЕНИЕ ПОД КЛЮЧ',
      upsellTitle: 'Устранить все ошибки и внедрить WhatsApp-воронку',
      upsellDesc: 'Комплексное внедрение: юридическое оформление LSSI-CE, оптимизация скорости, кнопка WhatsApp и автоматизация обработки пропущенных звонков (демонстрационная симуляция).',
      upsellPrice: '€900 (Демо)',
      upsellInstallment: 'или 2 платежа по €450',
      upsellGuarantee: 'Гарантия окупаемости: возврат средств, если внедрение не увеличит число обращений за 14 дней.',
      upsellWaBtn: 'Обсудить внедрение в WhatsApp',
      upsellCallBtn: 'Забронировать 15-мин звонок',

      bottomBarTitle: 'Демо-режим • Коммерческий приём платежей отключен',
      bottomBarSub: 'Срок внедрения: 5 рабочих дней • Стоимость: €900 (Иллюстративный пример)',
      bottomBarBtn: 'Написать в WhatsApp ➔',

      waMessage: `Здравствуйте! Я изучил аудит по сайту ${targetUrl}. Хочу обсудить устранение найденных ошибок и внедрение WhatsApp-воронки.`,
    },

    es: {
      devBadge: 'PROTOTIPO · Demostración técnica no comercial (Sin actividad mercantil · Datos simulados)',
      auditReadyBadge: 'DEMO · INFORME GENERADO',
      preloaderKicker: 'COMPILANDO INFORME FORENSE',
      exportPdf: 'Exportar PDF',
      printDoc: 'Imprimir',
      backToHome: 'Volver al inicio',

      dashboardTitle: `Auditoría de conversión: ${businessData.domain}`,
      dashboardSubtitle: 'Inspección según normativa española (LSSI-CE, AEPD) y puntos de fuga de tráfico móvil',
      readinessBadge: 'AI REVENUE AUDIT',
      retentionIndex: 'Índice de preparación comercial',
      revenueLossWarning: 'Fuga crítica de pacientes',
      retentionNote: '100% = embudo óptimo',
      impactDetailsTitle: 'Estimación de impacto económico',

      criticalTitle: 'Fallos críticos',
      criticalSub: 'Fugas de clientes',
      warningTitle: 'Puntos de riesgo',
      warningSub: 'Reducen el ROI de anuncios',
      healthyTitle: 'Nodos correctos',
      healthySub: 'Operan con normalidad',

      radarAdSpendTag: 'Presupuesto publicitario quemado',
      radarAdSpendVal: '~1.200 € – 1.600 €',
      radarAdSpendPerMonth: '/mes',
      radarAdSpendDesc: 'Pérdida de hasta un 40% de clics en Meta Ads por falta de botón directo a WhatsApp.',

      radarFineTag: 'Riesgo de sanciones AEPD',
      radarFineVal: 'Hasta 30.000 €',
      radarFineDesc: 'Infracción art. 10 LSSI-CE: plantilla de prueba en el pie en lugar del CIF/NIF fiscal.',

      radarCallTag: 'Llamadas perdidas sin cita',
      radarCallVal: '~14–18 citas',
      radarCallPerMonth: '/mes',
      radarCallDesc: 'Quejas reiteradas en Google Maps por llamadas sin respuesta por las tardes.',

      simulateButton: 'Simular solución',
      simulatedDone: 'Solución simulada',
      pointsBonus: '+12 puntos',

      pillarsNavTitle: '3 pilares comerciales de la auditoría',
      pillarAll: 'Todas las pruebas',
      pillar01: '01 Técnico & Legal',
      pillar02: '02 WhatsApp & Citas',
      pillar03: '03 Anuncios & Maps',

      filterAll: 'Todos los nodos',
      filterIssues: 'Solo incidencias',
      filterHealthy: 'Correctos',
      diagnosisTitle: 'Diagnóstico técnico:',
      fixActionTitle: 'Acción correctora recomendada:',

      leaksTitle: '4 puntos clave de fuga de ingresos',
      leaksSubtitle: 'Cuellos de botella que reducen las reservas directas de la clínica',

      leak1Title: '1. Fuga de tráfico publicitario sin WhatsApp (wa.me)',
      leak1Badge: '-40% de leads',
      leak1Punch: 'El 78% del tráfico móvil desde anuncios abandona la web sin llamar',
      leak1Desc: `Se invierten en Meta Ads unos ${businessData.monthlyAdSpendEst}, pero no hay canal directo en WhatsApp. Los pacientes no rellenan formularios largos en móvil y se marchan.`,

      leak2Title: '2. Ausencia de NIF/CIF fiscal obligatorio (Ley LSSI-CE)',
      leak2Badge: 'Multa hasta 30.000 €',
      leak2Punch: 'El Aviso Legal conserva el texto de prueba del desarrollador',
      leak2Desc: 'El artículo 10 de la ley LSSI-CE exige publicar el NIF/CIF fiscal visible de la empresa. La AEPD sanciona las webs comerciales que omiten su identificación fiscal.',

      leak3Title: '3. Pérdida de llamadas y pacientes en Google Maps',
      leak3Badge: '~16 citas/mes',
      leak3Punch: 'Quejas reiteradas de pacientes por llamadas sin atender en horario vespertino',
      leak3Quote: '«No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»',
      leak3Desc: 'El análisis de 384 reseñas revela 14 quejas por llamadas perdidas y falta de respuesta telefónica en horas punta.',

      leak4Title: '4. Catálogo de tratamientos sin reserva directa (Cita Previa)',
      leak4Badge: 'Fuga sin reserva',
      leak4Punch: 'Tarifas con 46 servicios publicadas sin botón de reserva en 1 clic',
      leak4Desc: 'Los pacientes consultan precios pero se marchan a buscar otra clínica con reserva instantánea.',

      devPlanTitle: 'Plan de acción para tu programador',
      devPlanSubtitle: 'Directrices técnicas paso a paso para tu desarrollador o agencia web',
      devPlan1Title: '1. Integración de botón flotante de WhatsApp (wa.me)',
      devPlan1Desc: 'Implementar botón flotante directo en la esquina inferior derecha móvil con mensaje inicial preconfigurado.',
      devPlan2Title: '2. Publicación de datos fiscales NIF/CIF en Aviso Legal',
      devPlan2Desc: 'Sustituir el texto plantilla del pie y de la página legal por el NIF/CIF fiscal real de la sociedad.',
      devPlan3Title: '3. Desvío de llamadas no atendidas y automatización',
      devPlan3Desc: 'Configurar respuesta automática a llamadas perdidas hacia WhatsApp comercial fuera de horario.',
      devPlan4Title: '4. Botones de reserva bajo cada categoría de tarifas',
      devPlan4Desc: 'Integrar botón de cita previa bajo cada uno de los 46 tratamientos del catálogo.',

      upsellBadge: 'DEMO · SOLUCIÓN INTEGRAL LLAVE EN MANO',
      upsellTitle: 'Corregir todos los fallos e implementar embudo de WhatsApp',
      upsellDesc: 'Implantación completa: adaptación legal LSSI-CE, optimización móvil, botón directo de WhatsApp y captura de llamadas perdidas (modo demostración técnica).',
      upsellPrice: '900 € (Demo)',
      upsellInstallment: 'o 2 pagos de 450 €',
      upsellGuarantee: 'Garantía simulada: Devolución del 100% si no genera nuevas reservas en los primeros 14 días.',
      upsellWaBtn: 'Hablar por WhatsApp (Prueba)',
      upsellCallBtn: 'Reservar llamada de 15 min',

      bottomBarTitle: 'Modo demostración técnica • Pagos desactivados en este prototipo',
      bottomBarSub: 'Plazo: 5 días laborables • Precio: 900 € (Ilustrativo de prueba)',
      bottomBarBtn: 'Contactar por WhatsApp ➔',

      waMessage: `¡Hola! He revisado el informe de auditoría de ${targetUrl}. Quiero consultar sobre la resolución de errores y la integración del embudo de WhatsApp.`,
    },

    en: {
      devBadge: 'PROTOTYPE · Non-commercial technical demo (Payments disabled · Mock data)',
      auditReadyBadge: 'DEMO · AUDIT GENERATED',
      preloaderKicker: 'COMPILING FORENSIC REPORT',
      exportPdf: 'Export PDF',
      printDoc: 'Print',
      backToHome: 'Back to Home',

      dashboardTitle: `Conversion Audit: ${businessData.domain}`,
      dashboardSubtitle: 'Inspected under Spanish regulations (LSSI-CE, AEPD) and mobile traffic conversion bottlenecks',
      readinessBadge: 'AI REVENUE AUDIT',
      retentionIndex: 'Sales-Readiness Index',
      revenueLossWarning: 'Critical Patient Drop-off',
      retentionNote: '100% = optimal funnel',
      impactDetailsTitle: 'Estimated Financial Leakage',

      criticalTitle: 'Critical Breaches',
      criticalSub: 'Customer drop-off points',
      warningTitle: 'Risk Areas',
      warningSub: 'Reduces advertising ROI',
      healthyTitle: 'Healthy Nodes',
      healthySub: 'Operating smoothly',

      radarAdSpendTag: 'Wasted Ad Spend',
      radarAdSpendVal: '~€1,200 – €1,600',
      radarAdSpendPerMonth: '/mo',
      radarAdSpendDesc: 'Losing up to 40% of Meta Ads clicks due to lack of direct WhatsApp chat.',

      radarFineTag: 'AEPD Regulatory Fines',
      radarFineVal: 'Up to €30,000',
      radarFineDesc: 'Art. 10 LSSI-CE breach: theme placeholder text in the footer instead of tax NIF/CIF.',

      radarCallTag: 'Unanswered Calls Drop-off',
      radarCallVal: '~14–18 bookings',
      radarCallPerMonth: '/mo',
      radarCallDesc: 'Google Maps reviews reporting unanswered calls in the evening with zero online booking.',

      simulateButton: 'Simulate fix',
      simulatedDone: 'Fix simulated',
      pointsBonus: '+12 points',

      pillarsNavTitle: '3 Core Commercial Audit Pillars',
      pillarAll: 'All Checks',
      pillar01: '01 Tech & Legal',
      pillar02: '02 WhatsApp & Leads',
      pillar03: '03 Ads & Google Maps',

      filterAll: 'All Nodes',
      filterIssues: 'Issues Only',
      filterHealthy: 'Healthy Nodes',
      diagnosisTitle: 'Technical Diagnosis:',
      fixActionTitle: 'Recommended Fix:',

      leaksTitle: '4 Core Revenue Bottlenecks',
      leaksSubtitle: 'High-impact drop-offs draining potential appointments from your clinic',

      leak1Title: '1. Paid Traffic Waste without WhatsApp (wa.me)',
      leak1Badge: '-40% leads',
      leak1Punch: '78% of mobile clicks from paid ads bounce without calling',
      leak1Desc: `Approx. ${businessData.monthlyAdSpendEst} is invested in Meta Ads, but there is no direct WhatsApp link. Mobile visitors bounce rather than fill out lengthy forms.`,

      leak2Title: '2. Missing Mandatory Tax CIF/NIF (Ley LSSI-CE)',
      leak2Badge: 'Fines up to €30,000',
      leak2Punch: 'The Legal Notice page still holds developer placeholder text',
      leak2Desc: 'Article 10 of LSSI-CE mandates publishing visible company NIF/CIF tax details. Spanish regulator AEPD imposes heavy fines on commercial websites lacking tax identity.',

      leak3Title: '3. Lost Phone Calls & Patients in Google Maps',
      leak3Badge: '~16 bookings/mo',
      leak3Punch: 'Repeated patient complaints about unanswered phone calls in the evening',
      leak3Quote: '«No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»',
      leak3Desc: 'Analysis of 384 reviews revealed 14 complaints regarding dropped calls during peak evening hours.',

      leak4Title: '4. Service Catalog without Instant Booking (Cita Previa)',
      leak4Badge: 'Drop-off without Booking',
      leak4Punch: '46 medical treatments displayed with pricing, but no 1-click booking button',
      leak4Desc: 'Patients review pricing but leave to search competitor clinics with instant online scheduling.',

      devPlanTitle: 'Action Plan for Your Web Developer',
      devPlanSubtitle: 'Step-by-step technical blueprint for your developer or digital agency',
      devPlan1Title: '1. Connect Floating WhatsApp Button (wa.me)',
      devPlan1Desc: 'Add a floating WhatsApp quick-chat button to the bottom-right of mobile screens with a pre-filled enquiry template.',
      devPlan2Title: '2. Publish NIF/CIF Tax Data in Legal Notice',
      devPlan2Desc: 'Replace developer template placeholder text in footer and Aviso Legal with verified legal entity tax details.',
      devPlan3Title: '3. Missed-call Routing & After-hours Automation',
      devPlan3Desc: 'Configure missed-call auto-replies directing high-intent callers to business WhatsApp after reception hours.',
      devPlan4Title: '4. Instant Booking Buttons under Treatment Categories',
      devPlan4Desc: 'Add a 1-click appointment booking link directly under each of the 46 catalog services.',

      upsellBadge: 'DEMO · TURNKEY SOLUTION',
      upsellTitle: 'Resolve All Bottlenecks & Deploy WhatsApp Funnel',
      upsellDesc: 'Turnkey rollout: LSSI-CE legal compliance, mobile performance tuning, direct WhatsApp booking widget, and missed-call capture (UI demo preview).',
      upsellPrice: '€900 (Demo)',
      upsellInstallment: 'or 2 payments of €450',
      upsellGuarantee: 'Simulated Guarantee: 100% money-back if the system does not generate new bookings within 14 days.',
      upsellWaBtn: 'Discuss on WhatsApp (Test)',
      upsellCallBtn: 'Book 15-min Call',

      bottomBarTitle: 'Technical Demo Mode • Payments Disabled in this Sandbox',
      bottomBarSub: 'Turnaround: 5 business days • Illustrative price: €900',
      bottomBarBtn: 'Contact via WhatsApp ➔',

      waMessage: `Hello! I reviewed the technical audit for ${targetUrl}. I would like to inquire about resolving the bottlenecks and integrating the WhatsApp funnel.`,
    },
  }[lang];

  // 14 проверочных узлов по 3 коммерческим опорам
  const allParameters = useMemo(() => [
    {
      id: 'lssi-cif',
      pillar: '01' as const,
      category: lang === 'ru' ? '01 Закон & LSSI-CE' : lang === 'es' ? '01 Legal & LSSI-CE' : '01 Legal & LSSI-CE',
      title: lang === 'ru' ? 'Публикация NIF/CIF (ст. 10 Ley LSSI-CE)' : lang === 'es' ? 'Publicación NIF/CIF (art. 10 Ley LSSI-CE)' : 'NIF/CIF Publication (Art. 10 LSSI-CE)',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Штраф до €30,000' : lang === 'es' ? 'Multa hasta 30.000 €' : 'Fines up to €30,000',
      desc: lang === 'ru'
        ? 'В футере Aviso Legal оставлена тестовая заглушка темы без фискального CIF/NIF. Прямое нарушение требований AEPD.'
        : lang === 'es'
          ? 'En el Aviso Legal figura una plantilla sin el CIF/NIF de la empresa. Infracción directamente sancionable por la AEPD.'
          : 'Legal notice footer holds developer placeholder text without tax NIF/CIF. Direct violation of AEPD requirements.',
      action: lang === 'ru' ? 'Прописать официальный CIF компании в Aviso Legal и футере.' : lang === 'es' ? 'Añadir el CIF legal de la sociedad en pie y Aviso Legal.' : 'Add official corporate tax CIF into footer and Legal Notice.',
    },
    {
      id: 'ssl-security',
      pillar: '01' as const,
      category: lang === 'ru' ? '01 Техника & Безопасность' : lang === 'es' ? '01 Técnico & Seguridad' : '01 Tech & Security',
      title: 'SSL / TLS 1.3 Encryption',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Защищено (TLS 1.3)' : lang === 'es' ? 'Protegido (TLS 1.3)' : 'Secure (TLS 1.3)',
      desc: lang === 'ru'
        ? 'Соединение зашифровано современным сертификатом, HTTPS активен на всех страницах.'
        : lang === 'es'
          ? 'Conexión cifrada con certificado moderno, HTTPS activo en todo el dominio.'
          : 'Modern encrypted connection, strict HTTPS active across all pages.',
      action: lang === 'ru' ? 'Поддерживать автообновление SSL.' : lang === 'es' ? 'Mantener renovación automática de SSL.' : 'Keep SSL auto-renewal active.',
    },
    {
      id: 'cookie-banner',
      pillar: '01' as const,
      category: lang === 'ru' ? '01 Закон & RGPD' : lang === 'es' ? '01 Legal & RGPD' : '01 Legal & GDPR',
      title: lang === 'ru' ? 'Политика согласия Cookies (Guía AEPD)' : lang === 'es' ? 'Gestor de Cookies (Guía AEPD)' : 'Cookie Consent Banner (AEPD Guide)',
      status: 'warning' as const,
      metric: lang === 'ru' ? 'Неполный отказ' : lang === 'es' ? 'Rechazo incompleto' : 'Incomplete Opt-out',
      desc: lang === 'ru'
        ? 'Баннер не содержит равнозначной кнопки «Отклонить все» на первом уровне, что противоречит директивам AEPD.'
        : lang === 'es'
          ? 'El banner carece de botón visible de "Rechazar todo" en primera capa, contraviniendo la guía de la AEPD.'
          : 'Cookie banner lacks a direct "Reject all" button on the first layer, breaching AEPD guidelines.',
      action: lang === 'ru' ? 'Добавить кнопку отказа от cookies первого уровня.' : lang === 'es' ? 'Añadir botón de rechazo en la primera capa del banner.' : 'Add equal 1-click reject button on the first layer.',
    },
    {
      id: 'ttfb-speed',
      pillar: '01' as const,
      category: lang === 'ru' ? '01 Мобильная скорость' : lang === 'es' ? '01 Velocidad móvil' : '01 Mobile Speed',
      title: lang === 'ru' ? 'Отклик сервера (TTFB & Core Web Vitals)' : lang === 'es' ? 'Respuesta del servidor (TTFB)' : 'Server Response (TTFB & Web Vitals)',
      status: 'ok' as const,
      metric: '160ms (Отлично)',
      desc: lang === 'ru'
        ? 'Сервер в Испании отвечает за 160 мс, кэширование Elementor настроено корректно.'
        : lang === 'es'
          ? 'El servidor responde en 160 ms con caché de Elementor bien configurada.'
          : 'Server in Spain responds in 160ms, Elementor caching configured properly.',
      action: lang === 'ru' ? 'Оптимизировать сжатие WebP для новых фото.' : lang === 'es' ? 'Mantener compresión WebP en nuevas imágenes.' : 'Maintain WebP compression on new media.',
    },
    {
      id: 'mixed-content',
      pillar: '01' as const,
      category: lang === 'ru' ? '01 Техника & Безопасность' : lang === 'es' ? '01 Técnico & Seguridad' : '01 Tech & Security',
      title: lang === 'ru' ? 'Смешанный контент HTTP/HTTPS' : lang === 'es' ? 'Contenido mixto HTTP/HTTPS' : 'Mixed Insecure Content HTTP/HTTPS',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Предупреждение в Safari' : lang === 'es' ? 'Aviso "No seguro" en iOS' : 'Warning in Safari iOS',
      desc: lang === 'ru'
        ? '3 изображения галереи подгружаются по http://, вызывая значок «Небезопасно» на iPhone.'
        : lang === 'es'
          ? '3 imágenes de la galería cargan por http://, mostrando advertencia en Safari móvil.'
          : '3 gallery assets load via http://, triggering "Not secure" badges on mobile Safari.',
      action: lang === 'ru' ? 'Заменить ссылки http:// в базе данных через Search & Replace.' : lang === 'es' ? 'Ejecutar Search & Replace para forzar URLs relativas https://.' : 'Run database Search & Replace to enforce https:// URLs.',
    },
    {
      id: 'whatsapp-funnel',
      pillar: '02' as const,
      category: lang === 'ru' ? '02 WhatsApp & Конверсия' : lang === 'es' ? '02 WhatsApp & Conversión' : '02 WhatsApp & Leads',
      title: lang === 'ru' ? 'Прямой контакт WhatsApp в 1 клик' : lang === 'es' ? 'Contacto directo por WhatsApp (1 clic)' : 'Direct 1-Click WhatsApp Booking',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Слив до 40% лидов' : lang === 'es' ? 'Fuga de hasta 40% de leads' : 'Losing up to 40% leads',
      desc: lang === 'ru'
        ? 'На смартфонах нет кнопки быстрого чата. 78% переходов с мобильной рекламы уходят без звонка.'
        : lang === 'es'
          ? 'Sin botón flotante de WhatsApp. El 78% del tráfico móvil desde anuncios se va sin llamar.'
          : 'No floating WhatsApp chat button. 78% of mobile ad visitors bounce without dialling.',
      action: lang === 'ru' ? 'Разместить плавающий виджет wa.me с шаблоном записи.' : lang === 'es' ? 'Integrar widget wa.me con mensaje inicial predeterminado.' : 'Deploy floating wa.me widget with appointment template.',
    },
    {
      id: 'phone-bottleneck',
      pillar: '02' as const,
      category: lang === 'ru' ? '02 Дозвон & Клиенты' : lang === 'es' ? '02 Atención de llamadas' : '02 Call Reception',
      title: lang === 'ru' ? 'Обработка пропущенных звонков' : lang === 'es' ? 'Atención telefónica en hora punta' : 'Missed Call Bottleneck',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Потеря ~16 записей/мес' : lang === 'es' ? 'Pérdida de ~16 citas/mes' : '~16 lost clients/mo',
      desc: lang === 'ru'
        ? 'В отзывах найдены жалобы на сброс звонков по вечерам. Нет автопереадресации на WhatsApp.'
        : lang === 'es'
          ? 'Reseñas negativas por llamadas no contestadas por las tardes. Sin desvío automático a WhatsApp.'
          : 'Repeated reviews complaining of unanswered calls in the evening. No WhatsApp auto-routing.',
      action: lang === 'ru' ? 'Настроить авто-сообщение в WhatsApp при пропущенном звонке.' : lang === 'es' ? 'Activar desvío con mensaje instantáneo de WhatsApp en llamadas perdidas.' : 'Set up instant WhatsApp follow-up for unanswered calls.',
    },
    {
      id: 'booking-widget',
      pillar: '02' as const,
      category: lang === 'ru' ? '02 Онлайн-запись' : lang === 'es' ? '02 Reserva y cita online' : '02 Instant Booking',
      title: lang === 'ru' ? 'Кнопка Cita Previa в каталоге услуг' : lang === 'es' ? 'Botón de Cita Previa en catálogo' : 'Cita Previa Button in Catalog',
      status: 'critical' as const,
      metric: lang === 'ru' ? 'Отсутствует в прайсе' : lang === 'es' ? 'Ausente en tarifas' : 'Missing in Pricing',
      desc: lang === 'ru'
        ? 'В каталоге 46 услуг с ценами, но нет кнопки прямой записи в 1 клик.'
        : lang === 'es'
          ? 'El catálogo muestra 46 tratamientos con precios, pero sin botón de cita directa.'
          : 'Catalog lists 46 priced treatments but lacks an instant booking link.',
      action: lang === 'ru' ? 'Добавить кнопку бронирования к каждой процедуре.' : lang === 'es' ? 'Añadir enlace directo de cita previa bajo cada tarifa.' : 'Add 1-click booking link under each treatment row.',
    },
    {
      id: 'form-friction',
      pillar: '02' as const,
      category: lang === 'ru' ? '02 Формы обратной связи' : lang === 'es' ? '02 Formularios de contacto' : '02 Lead Form Friction',
      title: lang === 'ru' ? 'Количество полей в форме заявки' : lang === 'es' ? 'Longitud del formulario móvil' : 'Mobile Form Field Friction',
      status: 'warning' as const,
      metric: lang === 'ru' ? '5 полей (отказ ~24%)' : lang === 'es' ? '5 campos (abandono ~24%)' : '5 fields (~24% drop-off)',
      desc: lang === 'ru'
        ? 'Форма требует имя, фамилию, email, телефон и комментарий. Четверть пользователей бросают ввод.'
        : lang === 'es'
          ? 'El formulario exige 5 campos obligatorios. Un 24% de usuarios móvil lo abandona sin enviar.'
          : 'Form requires 5 mandatory fields, causing roughly 24% of mobile users to abandon.',
      action: lang === 'ru' ? 'Сократить форму до 2 полей (Имя + Телефон) или заменить на WhatsApp.' : lang === 'es' ? 'Reducir a 2 campos (Nombre y Teléfono) o sustituir por WhatsApp.' : 'Simplify to 2 fields (Name + Phone) or switch to WhatsApp.',
    },
    {
      id: 'meta-pixel',
      pillar: '03' as const,
      category: lang === 'ru' ? '03 Meta Ads (Instagram)' : lang === 'es' ? '03 Meta Ads (Instagram)' : '03 Meta Ads (Instagram)',
      title: 'Meta Ads Pixel & CAPI Event',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Активен (ID: 4819***)' : lang === 'es' ? 'Activo (ID: 4819***)' : 'Active (ID: 4819***)',
      desc: lang === 'ru'
        ? 'Пиксель отслеживает просмотры страниц и переходы, реклама в Instagram фиксируется.'
        : lang === 'es'
          ? 'El píxel registra visitas a páginas correctamente para campañas de Instagram.'
          : 'Pixel tracks page views and campaign clicks properly for Instagram ads.',
      action: lang === 'ru' ? 'Добавить отслеживание клика по кнопке WhatsApp.' : lang === 'es' ? 'Configurar evento de conversión para clics en WhatsApp.' : 'Set up custom conversion event on WhatsApp clicks.',
    },
    {
      id: 'google-ads',
      pillar: '03' as const,
      category: lang === 'ru' ? '03 Google Ads & Трафик' : lang === 'es' ? '03 Google Ads' : '03 Google Ads',
      title: 'Google Ads Remarketing Tag',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Активен (AW-***)' : lang === 'es' ? 'Activo (AW-***)' : 'Active (AW-***)',
      desc: lang === 'ru'
        ? 'Тег ремаркетинга Google активен, собирает аудитории для поисковой рекламы.'
        : lang === 'es'
          ? 'La etiqueta de Google Ads funciona y recopila listas de remarketing.'
          : 'Google remarketing tag is active and gathering remarketing audiences.',
      action: lang === 'ru' ? 'Проверить фиксацию конверсий звонков.' : lang === 'es' ? 'Verificar medición de conversiones de llamada.' : 'Verify click-to-call conversion tracking.',
    },
    {
      id: 'google-rating',
      pillar: '03' as const,
      category: lang === 'ru' ? '03 Google Maps & Отзывы' : lang === 'es' ? '03 Google Maps & Reseñas' : '03 Google Maps & Reviews',
      title: lang === 'ru' ? 'Репутационный капитал в Google Maps' : lang === 'es' ? 'Reputación en Google Maps' : 'Google Maps Social Proof',
      status: 'ok' as const,
      metric: '4.8★ (384 отзыва)',
      desc: lang === 'ru'
        ? 'Отличный рейтинг и признательность пациентов за качество процедур.'
        : lang === 'es'
          ? 'Excelente valoración y fidelidad de pacientes por la calidad asistencial.'
          : 'Outstanding rating and patient appreciation for medical quality.',
      action: lang === 'ru' ? 'Отрабатывать негативные отзывы о недозвоне.' : lang === 'es' ? 'Responder a las quejas por llamadas perdidas.' : 'Actively reply to complaints regarding missed calls.',
    },
    {
      id: 'schema-local',
      pillar: '03' as const,
      category: lang === 'ru' ? '03 Локальное SEO' : lang === 'es' ? '03 SEO Local' : '03 Local SEO',
      title: 'Schema.org MedicalBusiness Microdata',
      status: 'warning' as const,
      metric: lang === 'ru' ? 'Не настроена' : lang === 'es' ? 'Sin microdatos' : 'Missing Schema',
      desc: lang === 'ru'
        ? 'В коде отсутствует разметка MedicalBusiness. Поисковик хуже ранжирует клинику по локальным запросам в Мадриде.'
        : lang === 'es'
          ? 'Faltan microdatos estructurados de MedicalBusiness para destacar en búsquedas locales de Madrid.'
          : 'Missing MedicalBusiness structured schema data, weakening Google local search ranking in Madrid.',
      action: lang === 'ru' ? 'Внедрить JSON-LD разметку с адресом, часами и врачами.' : lang === 'es' ? 'Insertar bloque JSON-LD con dirección, horario y especialidades.' : 'Add JSON-LD MedicalBusiness structured data.',
    },
    {
      id: 'owner-id',
      pillar: '03' as const,
      category: lang === 'ru' ? '03 Доверие & Экспертиза' : lang === 'es' ? '03 Confianza & E-E-A-T' : '03 Trust & E-E-A-T',
      title: lang === 'ru' ? 'Идентификация главного врача (ЛПР)' : lang === 'es' ? 'Identificación médica titular' : 'Medical Director Identity',
      status: 'ok' as const,
      metric: lang === 'ru' ? 'Подтверждено' : lang === 'es' ? 'Verificado' : 'Verified',
      desc: lang === 'ru'
        ? `Главный врач указан: ${businessData.titular} (Коллегиальный номер в наличии).`
        : lang === 'es'
          ? `Titular médica confirmada: ${businessData.titular} (Nº de colegiada visible).`
          : `Medical director confirmed: ${businessData.titular} (License number visible).`,
      action: lang === 'ru' ? 'Поддерживать актуальность дипломов и лицензий.' : lang === 'es' ? 'Mantener titulaciones visibles.' : 'Keep certifications up to date.',
    },
  ], [lang, businessData.titular]);

  const filteredParameters = useMemo(() => {
    return allParameters.filter((p) => {
      const matchPillar = activePillar === 'all' || p.pillar === activePillar;
      const matchStatus =
        activeFilter === 'all' ||
        (activeFilter === 'issues' && (p.status === 'critical' || p.status === 'warning')) ||
        (activeFilter === 'healthy' && p.status === 'ok');

      return matchPillar && matchStatus;
    });
  }, [allParameters, activePillar, activeFilter]);

  const criticalCount = useMemo(() => allParameters.filter((p) => p.status === 'critical').length, [allParameters]);
  const warningCount = useMemo(() => allParameters.filter((p) => p.status === 'warning').length, [allParameters]);
  const healthyCount = useMemo(() => allParameters.filter((p) => p.status === 'ok').length, [allParameters]);

  const devPlanItems = [
    { id: 1, title: t.devPlan1Title, desc: t.devPlan1Desc },
    { id: 2, title: t.devPlan2Title, desc: t.devPlan2Desc },
    { id: 3, title: t.devPlan3Title, desc: t.devPlan3Desc },
    { id: 4, title: t.devPlan4Title, desc: t.devPlan4Desc },
  ];

  const phoneWhatsApp = '34600123456';
  const whatsappUrl = `https://wa.me/${phoneWhatsApp}?text=${encodeURIComponent(t.waMessage)}`;

  return (
    <div
      ref={reportContainerRef}
      suppressHydrationWarning
      className="min-h-screen bg-[#F0F9FF] text-[#0F2744] pb-28 selection:bg-[#0284C7]/20 selection:text-[#0F2744] font-sans antialiased relative"
    >
      {/* ================= СТИЛИ АНИМАЦИИ (ПРЕЛОАДЕР, HEADER DROP, CARD REVEAL, TEXT UNMASK) ================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes preloader-appear {
          0% { opacity: 0; transform: scale(0.96) translateY(6px); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .anim-preloader-in {
          animation: preloader-appear 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes header-drop {
          0% { opacity: 0; transform: translateY(-18px); filter: blur(7px); }
          78% { opacity: 1; transform: translateY(1px); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .anim-header {
          animation: header-drop 1.05s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes card-reveal {
          0% { opacity: 0; transform: translateY(32px) scale(0.96) rotateX(3deg); filter: blur(9px); }
          74% { opacity: 1; transform: translateY(-3px) scale(1.006) rotateX(0); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); filter: blur(0); }
        }
        .anim-card {
          animation: card-reveal 1.15s cubic-bezier(0.2, 0.78, 0.28, 1) both;
        }

        @keyframes text-line-unmask {
          0% { transform: translateY(120%); opacity: 0; filter: blur(4px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        .anim-line-1 {
          animation: text-line-unmask 1.05s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .anim-line-2 {
          animation: text-line-unmask 1.05s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
        }

        .hero-pending {
          opacity: 0 !important;
          transform: translateY(20px) !important;
          visibility: hidden !important;
        }
      `,
        }}
      />

      {/* ================= 1. ПРЕЛОАДЕР ПРИ ПЕРВОМ ВХОДЕ В ОТЧЕТ ================= */}
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
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#0284C7] font-extrabold block font-mono">
              {t.preloaderKicker}
            </span>

            <div className="flex items-baseline justify-center gap-1 font-mono text-3xl font-extrabold text-[#0F2744]">
              <span>{loadProgress}</span>
              <span className="text-xs text-[#0284C7] font-bold">%</span>
            </div>
          </div>

          <div className="w-full bg-[#0284C7]/10 h-[3px] rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] h-full transition-all duration-100 ease-out rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= 2. ЗАЩИТНАЯ ПЛАШКА РАЗРАБОТЧИКА ================= */}
      <div
        className={`relative z-40 bg-[#0F2744] text-white px-3 py-1.5 text-center text-[10px] sm:text-[11px] font-medium border-b border-[#0284C7]/20 flex items-center justify-center gap-2 ${
          revealStep >= 1 ? 'anim-header' : 'hero-pending'
        }`}
      >
        <Code2 className="w-3.5 h-3.5 text-[#7DD3FC] shrink-0" />
        <span className="tracking-wide text-slate-200">{t.devBadge}</span>
      </div>

      {/* ================= 3. ШАПКА В СТИЛЕ ЛЕНДИНГА ================= */}
      <header
        className={`border-b border-black/[0.05] bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-8 h-14 sm:h-16 flex items-center ${
          revealStep >= 1 ? 'anim-header' : 'hero-pending'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4">
          <Link href={`/?lang=${lang}`} className="flex items-center gap-2.5 min-w-0 group no-underline">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-white text-xs shadow-sm shadow-[#0284C7]/30 shrink-0">
              A2R
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-[#0F2744] text-[13px] sm:text-sm">
                  Audit<span className="text-[#0284C7]">2</span>Revenue
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-[9.5px] font-extrabold uppercase tracking-wider hidden sm:inline">
                  {t.auditReadyBadge}
                </span>
              </div>
              <span className="block text-[10.5px] text-[#64748B] font-mono truncate">{domain}</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05]">
              {(['es', 'en', 'ru'] as Lang[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleLangChange(item)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[10px] sm:text-[11px] ${
                    lang === item
                      ? 'bg-white text-[#0284C7] shadow-sm font-bold'
                      : 'text-[#64748B] hover:text-[#0F2744]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0F2744] flex items-center gap-1.5 shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="hidden sm:inline">{t.printDoc}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= 4. ОСНОВНОЙ КОНТЕНТ ОТЧЕТА С КАСКАДНЫМ ПОЯВЛЕНИЕМ ================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-7 py-6 sm:py-10 space-y-7">
        
        {/* ================= ГЛАВНЫЙ ДАШБОРД (STEP 2: ANIM-CARD + TEXT UNMASK) ================= */}
        <section
          className={`p-5 sm:p-8 rounded-3xl bg-white border border-[#D5E1E9] shadow-[0_16px_50px_rgba(15,39,68,0.08)] space-y-6 relative overflow-hidden ${
            revealStep >= 2 ? 'anim-card' : 'hero-pending'
          }`}
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#EFFAFF] to-transparent pointer-events-none" />

          {/* Верхняя строка с заголовком и круговым индикатором */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{t.readinessBadge}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-[#0F2744] tracking-tight leading-tight overflow-hidden">
                <span className={`inline-block ${revealStep >= 2 ? 'anim-line-1' : 'hero-pending'}`}>
                  {t.dashboardTitle}
                </span>
              </h1>
              <p className={`text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed ${revealStep >= 2 ? 'anim-line-2' : 'hero-pending'}`}>
                {t.dashboardSubtitle}
              </p>
            </div>

            {/* Круговой индикатор */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shrink-0 shadow-xs">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="26"
                    stroke="#E2E8F0"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="26"
                    stroke={simulatedHealthScore > 75 ? '#059669' : simulatedHealthScore > 55 ? '#D97706' : '#DC2626'}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={isGaugeAnimated ? targetOffset : circumference}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.6s ease',
                    }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                  <span className="text-xl font-black text-[#0F2744] tabular-nums">
                    {animatedScore}%
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#0F2744]">{t.retentionIndex}</span>
                </div>
                <span className="text-[11px] text-rose-600 font-bold block">{t.revenueLossWarning}</span>
                <span className="text-[10px] text-[#64748B]">{t.retentionNote}</span>
                {resolvedIssues.length > 0 && (
                  <span className="text-[10.5px] text-emerald-600 font-extrabold mt-0.5 block">
                    ✓ +{resolvedIssues.length * 12}% {t.simulatedDone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Светофорная панель инцидентов */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 relative z-10">
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-rose-200 flex items-center justify-center shrink-0">
                  <XCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <strong className="text-xs text-rose-950 block font-bold">{t.criticalTitle}</strong>
                  <span className="text-[11px] text-rose-700 font-medium">{t.criticalSub}</span>
                </div>
              </div>
              <span className="text-2xl font-black text-rose-600 tabular-nums">
                {Math.max(0, criticalCount - resolvedIssues.length)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <strong className="text-xs text-amber-950 block font-bold">{t.warningTitle}</strong>
                  <span className="text-[11px] text-amber-700 font-medium">{t.warningSub}</span>
                </div>
              </div>
              <span className="text-2xl font-black text-amber-600 tabular-nums">
                {warningCount}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <strong className="text-xs text-emerald-950 block font-bold">{t.healthyTitle}</strong>
                  <span className="text-[11px] text-emerald-700 font-medium">{t.healthySub}</span>
                </div>
              </div>
              <span className="text-2xl font-black text-emerald-600 tabular-nums">
                {healthyCount + resolvedIssues.length}
              </span>
            </div>
          </div>

          {/* Радар финансовых потерь */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-3">
              {t.impactDetailsTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#EFF9FD] to-white border border-[#BAE6FD] shadow-xs">
                <span className="text-xs font-bold text-[#0284C7] flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-[#0284C7]" /> {t.radarAdSpendTag}
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#0F2744] mt-1.5 tracking-tight">
                  {t.radarAdSpendVal} <span className="text-xs font-normal text-[#64748B]">{t.radarAdSpendPerMonth}</span>
                </div>
                <p className="text-[11.5px] text-[#64748B] mt-1 leading-relaxed">
                  {t.radarAdSpendDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FEF2F2] to-white border border-rose-200 shadow-xs">
                <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> {t.radarFineTag}
                </span>
                <div className="text-xl sm:text-2xl font-black text-rose-700 mt-1.5 tracking-tight">
                  {t.radarFineVal}
                </div>
                <p className="text-[11.5px] text-[#64748B] mt-1 leading-relaxed">
                  {t.radarFineDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-white border border-amber-200 shadow-xs">
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-amber-700" /> {t.radarCallTag}
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#0F2744] mt-1.5 tracking-tight">
                  {t.radarCallVal} <span className="text-xs font-normal text-[#64748B]">{t.radarCallPerMonth}</span>
                </div>
                <p className="text-[11.5px] text-[#64748B] mt-1 leading-relaxed">
                  {t.radarCallDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4 КЛЮЧЕВЫЕ ТОЧКИ ПОТЕРИ (REVEAL ON SCROLL) ================= */}
        <section className="space-y-4 reveal-on-scroll" aria-labelledby="leaks-section-title">
          <div className="flex items-center justify-between gap-4 px-1">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-[10.5px] font-bold uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3 h-3" />
                <span>Forensic findings</span>
              </div>
              <h2 id="leaks-section-title" className="text-lg sm:text-2xl font-extrabold text-[#0F2744] tracking-tight">
                {t.leaksTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                {t.leaksSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Утечка 1: WhatsApp */}
            <article
              onClick={() => setOpenLeakId((prev) => (prev === 1 ? null : 1))}
              className={`rounded-3xl bg-white border p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs ${
                openLeakId === 1
                  ? 'border-[#0284C7] ring-1 ring-[#0284C7] shadow-[0_12px_32px_rgba(2,132,199,0.12)]'
                  : 'border-[#E2E8F0] hover:border-[#0284C7]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-extrabold border border-rose-200">
                    {t.leak1Badge}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${openLeakId === 1 ? 'rotate-180' : ''}`} />
              </div>

              <h3 className="font-bold text-base text-[#0F2744] leading-snug">{t.leak1Title}</h3>
              <p className="text-xs sm:text-[13px] font-extrabold text-rose-700 mt-1 leading-snug">{t.leak1Punch}</p>

              {openLeakId === 1 && (
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
                  <p className="text-xs text-[#596B7A] leading-relaxed">{t.leak1Desc}</p>
                  <div className="p-3 rounded-2xl bg-[#EFF9FD] border border-[#BAE6FD] flex items-center justify-between gap-3">
                    <span className="text-xs text-[#0F2744] font-medium">WhatsApp direct funnel</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleResolvedIssue('whatsapp-funnel');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                        resolvedIssues.includes('whatsapp-funnel')
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0284C7] hover:bg-[#0F2744] text-white'
                      }`}
                    >
                      {resolvedIssues.includes('whatsapp-funnel') ? `✓ ${t.simulatedDone}` : `+ ${t.simulateButton}`}
                    </button>
                  </div>
                </div>
              )}
            </article>

            {/* Утечка 2: LSSI-CE CIF */}
            <article
              onClick={() => setOpenLeakId((prev) => (prev === 2 ? null : 2))}
              className={`rounded-3xl bg-white border p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs ${
                openLeakId === 2
                  ? 'border-[#0284C7] ring-1 ring-[#0284C7] shadow-[0_12px_32px_rgba(2,132,199,0.12)]'
                  : 'border-[#E2E8F0] hover:border-[#0284C7]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-extrabold border border-rose-200">
                    {t.leak2Badge}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${openLeakId === 2 ? 'rotate-180' : ''}`} />
              </div>

              <h3 className="font-bold text-base text-[#0F2744] leading-snug">{t.leak2Title}</h3>
              <p className="text-xs sm:text-[13px] font-extrabold text-rose-700 mt-1 leading-snug">{t.leak2Punch}</p>

              {openLeakId === 2 && (
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
                  <code className="text-xs font-mono bg-slate-100 p-2 rounded-xl text-rose-700 block border border-slate-200 truncate">
                    {businessData.cifPlaceholder}
                  </code>
                  <p className="text-xs text-[#596B7A] leading-relaxed">{t.leak2Desc}</p>
                  <div className="p-3 rounded-2xl bg-[#EFF9FD] border border-[#BAE6FD] flex items-center justify-between gap-3">
                    <span className="text-xs text-[#0F2744] font-medium">LSSI-CE compliance patch</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleResolvedIssue('lssi-cif');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                        resolvedIssues.includes('lssi-cif')
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0284C7] hover:bg-[#0F2744] text-white'
                      }`}
                    >
                      {resolvedIssues.includes('lssi-cif') ? `✓ ${t.simulatedDone}` : `+ ${t.simulateButton}`}
                    </button>
                  </div>
                </div>
              )}
            </article>

            {/* Утечка 3: Недозвон */}
            <article
              onClick={() => setOpenLeakId((prev) => (prev === 3 ? null : 3))}
              className={`rounded-3xl bg-white border p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs ${
                openLeakId === 3
                  ? 'border-[#0284C7] ring-1 ring-[#0284C7] shadow-[0_12px_32px_rgba(2,132,199,0.12)]'
                  : 'border-[#E2E8F0] hover:border-[#0284C7]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-extrabold border border-amber-200">
                    {t.leak3Badge}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${openLeakId === 3 ? 'rotate-180' : ''}`} />
              </div>

              <h3 className="font-bold text-base text-[#0F2744] leading-snug">{t.leak3Title}</h3>
              <p className="text-xs sm:text-[13px] font-extrabold text-amber-800 mt-1 leading-snug">{t.leak3Punch}</p>

              {openLeakId === 3 && (
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
                  <blockquote className="p-3 rounded-xl bg-slate-50 text-xs italic text-[#0F2744] border-l-2 border-amber-500">
                    {t.leak3Quote}
                  </blockquote>
                  <p className="text-xs text-[#596B7A] leading-relaxed">{t.leak3Desc}</p>
                </div>
              )}
            </article>

            {/* Утечка 4: Каталог без Cita Previa */}
            <article
              onClick={() => setOpenLeakId((prev) => (prev === 4 ? null : 4))}
              className={`rounded-3xl bg-white border p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs ${
                openLeakId === 4
                  ? 'border-[#0284C7] ring-1 ring-[#0284C7] shadow-[0_12px_32px_rgba(2,132,199,0.12)]'
                  : 'border-[#E2E8F0] hover:border-[#0284C7]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-extrabold border border-rose-200">
                    {t.leak4Badge}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${openLeakId === 4 ? 'rotate-180' : ''}`} />
              </div>

              <h3 className="font-bold text-base text-[#0F2744] leading-snug">{t.leak4Title}</h3>
              <p className="text-xs sm:text-[13px] font-extrabold text-rose-700 mt-1 leading-snug">{t.leak4Punch}</p>

              {openLeakId === 4 && (
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
                  <p className="text-xs text-[#596B7A] leading-relaxed">{t.leak4Desc}</p>
                  <div className="p-3 rounded-2xl bg-[#EFF9FD] border border-[#BAE6FD] flex items-center justify-between gap-3">
                    <span className="text-xs text-[#0F2744] font-medium">Online booking integration</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleResolvedIssue('booking-widget');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                        resolvedIssues.includes('booking-widget')
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0284C7] hover:bg-[#0F2744] text-white'
                      }`}
                    >
                      {resolvedIssues.includes('booking-widget') ? `✓ ${t.simulatedDone}` : `+ ${t.simulateButton}`}
                    </button>
                  </div>
                </div>
              )}
            </article>
          </div>
        </section>

        {/* ================= ДЕТАЛЬНАЯ МАТРИЦА 14 ПАРАМЕТРОВ (REVEAL ON SCROLL) ================= */}
        <section className="space-y-4 reveal-on-scroll" aria-labelledby="parameters-matrix-title">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-[10.5px] font-bold uppercase tracking-wider mb-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Deep analysis matrix</span>
              </div>
              <h2 id="parameters-matrix-title" className="text-lg sm:text-2xl font-extrabold text-[#0F2744] tracking-tight">
                {t.pillarsNavTitle}
              </h2>
            </div>

            <div className="flex items-center p-1 rounded-2xl bg-black/[0.04] border border-black/[0.05] text-xs font-bold self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeFilter === 'all' ? 'bg-white text-[#0284C7] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                {t.filterAll} ({allParameters.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('issues')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeFilter === 'issues' ? 'bg-white text-rose-600 shadow-xs' : 'text-[#64748B]'
                }`}
              >
                {t.filterIssues} ({criticalCount + warningCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('healthy')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeFilter === 'healthy' ? 'bg-white text-emerald-600 shadow-xs' : 'text-[#64748B]'
                }`}
              >
                {t.filterHealthy} ({healthyCount})
              </button>
            </div>
          </div>

          {/* Таб-переключатель 3 опор */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActivePillar('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                activePillar === 'all'
                  ? 'bg-[#0F2744] text-white border-[#0F2744] shadow-xs'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#0F2744]'
              }`}
            >
              {t.pillarAll}
            </button>
            <button
              type="button"
              onClick={() => setActivePillar('01')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                activePillar === '01'
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-xs'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#0F2744]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.pillar01}</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePillar('02')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                activePillar === '02'
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-xs'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#0F2744]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.pillar02}</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePillar('03')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                activePillar === '03'
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-xs'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#0F2744]'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{t.pillar03}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredParameters.map((param) => {
              const isCrit = param.status === 'critical';
              const isWarn = param.status === 'warning';
              const isSimulated = resolvedIssues.includes(param.id);
              const isOpen = openParamId === param.id;

              return (
                <div
                  key={param.id}
                  onClick={() => setOpenParamId((prev) => (prev === param.id ? null : param.id))}
                  className={`rounded-2xl border bg-white p-4 transition-all duration-200 cursor-pointer shadow-xs ${
                    isOpen
                      ? 'border-[#0284C7] ring-1 ring-[#0284C7] shadow-md'
                      : isSimulated
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : isCrit
                          ? 'border-rose-200 hover:border-rose-400'
                          : isWarn
                            ? 'border-amber-200 hover:border-amber-400'
                            : 'border-[#E2E8F0] hover:border-[#0284C7]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <div className="mt-0.5 shrink-0">
                        {isSimulated ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isCrit ? (
                          <XCircle className="w-4 h-4 text-rose-600" />
                        ) : isWarn ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-0.5">
                          {param.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0F2744] leading-snug">
                          {param.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10.5px] font-extrabold tracking-tight ${
                          isSimulated
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCrit
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isWarn
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {isSimulated ? t.simulatedDone : param.metric}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-[#596B7A] space-y-2">
                      <div>
                        <strong className="text-[10.5px] uppercase font-bold text-[#0284C7] block mb-0.5">
                          {t.diagnosisTitle}
                        </strong>
                        <p className="leading-relaxed">{param.desc}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <strong className="text-[10.5px] uppercase font-bold text-[#0F2744] block mb-0.5">
                          {t.fixActionTitle}
                        </strong>
                        <p className="text-[11.5px] text-[#0F2744] leading-snug">{param.action}</p>
                      </div>

                      {(isCrit || isWarn) && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleResolvedIssue(param.id);
                          }}
                          className={`w-full py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            isSimulated
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-[#EFF9FD] hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-[#BAE6FD]'
                          }`}
                        >
                          {isSimulated ? `✓ ${t.simulatedDone}` : `+ ${t.simulateButton} (${t.pointsBonus})`}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= ЧЕК-ЛИСТ ДЛЯ РАЗРАБОТЧИКА (REVEAL ON SCROLL) ================= */}
        <section className="p-5 sm:p-7 rounded-3xl bg-white border border-[#D5E1E9] shadow-xs space-y-4 reveal-on-scroll">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EFF9FD] text-[#0284C7] flex items-center justify-center">
              <ListChecks className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#0F2744]">{t.devPlanTitle}</h3>
              <p className="text-xs text-[#64748B]">{t.devPlanSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {devPlanItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setOpenDevPlanId((prev) => (prev === item.id ? null : item.id))}
                className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7]/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-xs font-bold text-[#0F2744] block">{item.title}</strong>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#64748B] transition-transform ${openDevPlanId === item.id ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-[11.5px] text-[#64748B] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= БЛОК ГОТОВОГО ВНЕДРЕНИЯ (REVEAL ON SCROLL) ================= */}
        <section className="p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-[#0F2744] via-[#0284C7] to-[#0369A1] text-white shadow-xl space-y-6 relative overflow-hidden reveal-on-scroll">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#7DD3FC] text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.upsellBadge}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              {t.upsellTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              {t.upsellDesc}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/15 relative z-10">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{t.upsellPrice}</span>
                <span className="text-xs text-slate-300">{t.upsellInstallment}</span>
              </div>
              <p className="text-xs text-[#7DD3FC] mt-0.5 font-medium">
                {t.upsellGuarantee}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0F2744] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
              >
                <span>{t.upsellWaBtn}</span>
                <ArrowUpRight className="w-4 h-4 text-[#0284C7]" />
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
        </section>

      </main>

      {/* ================= 5. ПЛАВАЮЩИЙ НИЖНИЙ БАР ДЛЯ БЫСТРОГО ДЕЙСТВИЯ ================= */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-bold text-[#0F2744] truncate">
              {t.bottomBarTitle}
            </p>
            <p className="text-[10.5px] sm:text-xs text-[#64748B] truncate">
              {t.bottomBarSub}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-bold text-xs sm:text-sm shadow-xs transition whitespace-nowrap shrink-0"
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
        <div className="min-h-screen bg-[#F0F9FF] flex flex-col items-center justify-center gap-3 text-[#64748B]">
          <Loader2 className="w-8 h-8 animate-spin text-[#0284C7]" />
          <p className="text-sm font-medium">Loading report...</p>
        </div>
      }
    >
      <BusinessIntelligenceReport />
    </Suspense>
  );
}