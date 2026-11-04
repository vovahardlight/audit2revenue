'use client';

import React, {
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
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
  MessageCircle,
  Activity,
  TrendingDown,
  Code2,
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// =========================================================================
// ЭТАЛОННЫЕ ПАРАМЕТРЫ ЛОАДЕРА (Three.js)
// =========================================================================
const defaultLoaderSettings = {
  height: 25,
  speed: 0.55,
  noiseScale: 4.0,
  turbulence: 0.05,
  caustics: 0.6,
  crestIntensity: 1.8,
};

// =========================================================================
// THREE.JS: ЛОАДЕР СКАНЕРА
// =========================================================================
function ThreeScanVisualizer({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight || defaultLoaderSettings.height;
    const aspect = width / height;

    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
    camera.position.set(0, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const planeGeo = new THREE.PlaneGeometry(aspect * 2, 2, 80, 24);

    const fluidShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0.01 },
        uTime: { value: 0 },
        uTurbulence: { value: defaultLoaderSettings.turbulence },
        uNoiseScale: { value: defaultLoaderSettings.noiseScale },
        uCaustics: { value: defaultLoaderSettings.caustics },
        uCrestIntensity: { value: defaultLoaderSettings.crestIntensity },
        uColorNavy: { value: new THREE.Color(0x0f2744) },
        uColorOcean: { value: new THREE.Color(0x0369a1) },
        uColorBlue: { value: new THREE.Color(0x0284c7) },
        uColorCyan: { value: new THREE.Color(0x7dd3fc) },
        uColorWhite: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uProgress;
        uniform float uTime;
        uniform float uTurbulence;
        uniform float uNoiseScale;
        uniform float uCaustics;
        uniform float uCrestIntensity;
        uniform vec3 uColorNavy;
        uniform vec3 uColorOcean;
        uniform vec3 uColorBlue;
        uniform vec3 uColorCyan;
        uniform vec3 uColorWhite;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(cos(0.52), sin(0.52), -sin(0.52), cos(0.52));
          for (int i = 0; i < 4; ++i) {
            v += a * snoise(p);
            p = rot * p * 2.1 + vec2(10.0);
            a *= 0.5;
          }
          return v;
        }

        vec3 getNordicFlow(float t) {
          vec3 col = uColorNavy;
          col = mix(col, uColorOcean, smoothstep(0.0, 0.32, t));
          col = mix(col, uColorBlue, smoothstep(0.28, 0.65, t));
          col = mix(col, uColorCyan, smoothstep(0.58, 0.92, t));
          col = mix(col, uColorWhite, smoothstep(0.88, 1.0, t));
          return col;
        }

        void main() {
          vec2 uv = vUv;
          float t = uTime;

          vec2 p = uv * vec2(uNoiseScale, uNoiseScale * 0.5);

          vec2 q = vec2(
            fbm(p + vec2(t * 0.18, t * 0.14)),
            fbm(p + vec2(4.2, 1.8) - vec2(t * 0.12, t * 0.16))
          );

          vec2 r = vec2(
            fbm(p + 3.0 * q + vec2(1.7, 9.2) + vec2(t * 0.22, -t * 0.16)),
            fbm(p + 3.0 * q + vec2(8.3, 2.8) + vec2(-t * 0.18, t * 0.24))
          );

          float mistFlow = fbm(p + 3.5 * r + t * 0.09);

          float frontWave = (r.x * uTurbulence + q.y * (uTurbulence * 0.6));
          float boundary = uProgress + frontWave;

          if (uv.x > boundary) {
            discard;
          }

          float normX = uv.x / max(boundary, 0.001);
          float gradT = clamp(normX + mistFlow * 0.14, 0.0, 1.0);
          vec3 fluidColor = getNordicFlow(gradT);

          float caustics = pow(clamp(length(q) * 0.75, 0.0, 1.0), 2.2);
          fluidColor += uColorCyan * caustics * uCaustics;

          float distToEdge = boundary - uv.x;
          if (distToEdge < 0.045 && uProgress < 0.995) {
            float crestLight = smoothstep(0.045, 0.0, distToEdge);
            fluidColor = mix(fluidColor, uColorWhite, crestLight * uCrestIntensity);
          }

          float verticalEdge = smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);
          gl_FragColor = vec4(fluidColor, 0.98 * verticalEdge);
        }
      `,
      transparent: true,
    });

    const fluidMesh = new THREE.Mesh(planeGeo, fluidShaderMat);
    scene.add(fluidMesh);

    let animId = 0;
    let smoothP = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * defaultLoaderSettings.speed;

      const targetP = Math.max(0.01, Math.min(1.0, progressRef.current / 100));
      smoothP += (targetP - smoothP) * 0.09;

      fluidShaderMat.uniforms.uProgress.value = smoothP;
      fluidShaderMat.uniforms.uTime.value = elapsedTime;
      fluidShaderMat.uniforms.uTurbulence.value = defaultLoaderSettings.turbulence;
      fluidShaderMat.uniforms.uNoiseScale.value = defaultLoaderSettings.noiseScale;
      fluidShaderMat.uniforms.uCaustics.value = defaultLoaderSettings.caustics;
      fluidShaderMat.uniforms.uCrestIntensity.value = defaultLoaderSettings.crestIntensity;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || defaultLoaderSettings.height;
      const newAspect = w / h;
      camera.left = -newAspect;
      camera.right = newAspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      fluidMesh.geometry.dispose();
      fluidMesh.geometry = new THREE.PlaneGeometry(newAspect * 2, 2, 80, 24);
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      planeGeo.dispose();
      fluidShaderMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `${defaultLoaderSettings.height}px` }}
      className="relative w-full overflow-hidden"
    />
  );
}

export default function AppleNordicGlacierPureLanding() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');

  // Безопасное чтение языка ДО первого рендера
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

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('a2r_lang', newLang);
    document.cookie = `a2r_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const [stage, setStage] = useState<'idle' | 'scanning' | 'report'>('idle');
  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Ссылка для плавного скролла к открывшемуся отчету
  const reportAnchorRef = useRef<HTMLDivElement>(null);

  // PRELOADER & HERO REVEAL CADENCE
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

  const hasUrl = useMemo(() => url.trim().length > 3, [url]);

  const t = {
    ru: {
      devBadge: 'ПРОТОТИП · Некоммерческая разработка (Платежи отключены / Тестовый режим)',
      h1_1: 'Сайт теряет',
      h1_2: 'клиентов?',
      btn: 'Проверить',
      prev: 'Назад',
      next: 'Далее',
      placeholder: 'https://vash-salon-ili-klinika.es',

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

      pitch: 'Сгенерировать WhatsApp-питч',
      pitchLocked: 'Доступ после анализа сайта',

      heroMicro:
        'Узнайте, что мешает посетителям оставить заявку: мобильная версия, контакты, реклама или доверие.',

      scanVerified: 'Проверено',
      scanScanning: 'Анализируем',

      checklist: [
        {
          title: 'Доступность и мобильная скорость',
          discovered: '✓ Сервер отвечает за 160ms, защищенное соединение активно',
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
          title: 'Юридический аудит (Испания)',
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
      reportCard1Desc: 'Обнаружена зона, которую стоит подробнее проверить на соответствие требованиям в Испании.',
      reportCard1Foot: 'Штраф до €30,000',
      reportCard1Action: 'Сверить реквизиты компании в подвале сайта и юридических страницах.',

      reportCard2Cat: 'Слив рекламы',
      reportCard2Title: 'Потеря ~35% заявок',
      reportCard2Desc: 'В мобильном пути клиента может быть барьер перед отправкой заявки.',
      reportCard2Foot: 'Рекламный бюджет',
      reportCard2Action: 'Проверить заметность WhatsApp на мобильном экране.',

      reportCard3Cat: 'Карты Google',
      reportCard3Title: 'Жалобы на недозвон',
      reportCard3Desc: 'Есть признаки, что локальная видимость не полностью превращается в звонки и обращения.',
      reportCard3Foot: 'Подробности',
      reportCard3Action: 'Сверить телефон, часы работы и ссылку в карточке компании.',

      reportLocked: 'Скрыто 🔒',

      reportPurchaseBadge: 'Полный 12-страничный аудит',
      reportPurchaseTitle: 'Откройте полный отчет с готовыми решениями',
      reportPurchaseDesc:
        'Простой документ с пошаговым планом исправления всех ошибок для вашего программиста или юриста.',
      demoPriceBadge: 'DEMO · цена для примера',
      demoPriceNote: 'Показательная цена. Коммерческий приём платежей отключен.',
      demoPriceButton: 'Открыть демо-отчёт (Симуляция)',
      connecting: 'Подключение...',

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
      devBadge: 'PROTOTIPO · Demostración técnica no comercial (Sin actividad económica)',
      h1_1: '¿Tu web pierde',
      h1_2: 'clientes?',
      btn: 'Analizar',
      prev: 'Anterior',
      next: 'Siguiente',
      placeholder: 'https://tu-clinica-o-salon.es',

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

      pitch: 'Generar pitch de WhatsApp',
      pitchLocked: 'Disponible después del análisis',

      heroMicro:
        'Descubre qué impide que los visitantes contacten: móvil, datos de contacto, publicidad o confianza.',

      scanVerified: 'Verificado',
      scanScanning: 'Analizando',

      checklist: [
        {
          title: 'Accesibilidad y velocidad móvil',
          discovered: '✓ El servidor responde en 160 ms, conexión segura activa',
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
          title: 'Auditoría legal (España)',
          discovered: '⚠️ Crítico: texto de prueba en lugar de NIF/CIF fiscal',
          type: 'error',
        },
      ],

      reportLabel: 'DEMO · RESULTADOS DEL ESCANEO',
      reportTitle: 'Resultados del análisis web',
      reportMissedRevenue: 'Ingresos perdidos: ~1.800 €/mes',
      demoReportNotice:
        'Informe en modo demostración. Diseñado exclusivamente para pruebas de desarrollo e interfaz técnica.',

      reportCard1Cat: 'Sanciones en España',
      reportCard1Title: 'Riesgo de sanción regulatoria',
      reportCard1Desc: 'Hay un aspecto que conviene revisar para comprobar el cumplimiento de los requisitos en España.',
      reportCard1Foot: 'Multa hasta 30.000 €',
      reportCard1Action: 'Revisar los datos de empresa en el pie y las páginas legales.',

      reportCard2Cat: 'Fuga publicitaria',
      reportCard2Title: 'Pérdida de ~35% de leads',
      reportCard2Desc: 'El recorrido móvil del cliente puede tener una barrera antes de enviar una consulta.',
      reportCard2Foot: 'Presupuesto publicitario',
      reportCard2Action: 'Comprobar la visibilidad de WhatsApp en móvil.',

      reportCard3Cat: 'Google Maps',
      reportCard3Title: 'Quejas por llamadas perdidas',
      reportCard3Desc: 'Hay señales de que la visibilidad local no se convierte del todo en llamadas y consultas.',
      reportCard3Foot: 'Detalles',
      reportCard3Action: 'Revisar teléfono, horario y enlace en la ficha de empresa.',

      reportLocked: 'Bloqueado 🔒',

      reportPurchaseBadge: 'Auditoría completa de 12 páginas',
      reportPurchaseTitle: 'Desbloquea el informe completo con soluciones',
      reportPurchaseDesc:
        'Documento claro con el plan paso a paso para resolver todos los fallos con tu programador o asesor legal.',
      demoPriceBadge: 'DEMO · precio ilustrativo',
      demoPriceNote: 'Precio de ejemplo. Los pagos comerciales están desactivados en esta interfaz.',
      demoPriceButton: 'Ver informe demo (Simulación)',
      connecting: 'Conectando...',

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
      devBadge: 'PROTOTYPE · Non-commercial technical demo (Payments disabled)',
      h1_1: 'Is your website losing',
      h1_2: 'customers?',
      btn: 'Analyze',
      prev: 'Previous',
      next: 'Next',
      placeholder: 'https://your-business.es',

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

      pitch: 'Generate WhatsApp Pitch',
      pitchLocked: 'Available after website analysis',

      heroMicro:
        'See what stops visitors from getting in touch: mobile experience, contact options, ads, or trust.',

      scanVerified: 'Checked',
      scanScanning: 'Scanning',

      checklist: [
        {
          title: 'Accessibility & Mobile Speed',
          discovered: '✓ Server responds in 160ms, secure connection active',
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
          title: 'Legal Compliance (Spain)',
          discovered: '⚠️ Critical: placeholder text instead of legal tax ID',
          type: 'error',
        },
      ],

      reportLabel: 'DEMO · SCAN RESULTS',
      reportTitle: 'Website Audit Results',
      reportMissedRevenue: 'Missed revenue: ~€1,800/mo',
      demoReportNotice:
        'Demo report. Exclusively intended for technical development and UI testing purposes.',

      reportCard1Cat: 'Fines in Spain',
      reportCard1Title: 'Regulatory Penalty Risk',
      reportCard1Desc: 'A potential compliance issue needs a closer review against requirements in Spain.',
      reportCard1Foot: 'Fines up to €30,000',
      reportCard1Action: 'Check the company details in the footer and legal pages.',

      reportCard2Cat: 'Ad Leak',
      reportCard2Title: 'Losing ~35% of Leads',
      reportCard2Desc: 'The mobile customer journey may contain friction before a visitor sends an enquiry.',
      reportCard2Foot: 'Advertising Budget',
      reportCard2Action: 'Check that WhatsApp is easy to find on mobile.',

      reportCard3Cat: 'Google Maps',
      reportCard3Title: 'Unanswered Call Complaints',
      reportCard3Desc: 'Some local-search activity may not be translating fully into calls and enquiries.',
      reportCard3Foot: 'Details',
      reportCard3Action: 'Check the phone, hours, and website link on the business listing.',

      reportLocked: 'Locked 🔒',

      reportPurchaseBadge: 'Complete 12-page Audit',
      reportPurchaseTitle: 'Unlock the full report with actionable fixes',
      reportPurchaseDesc:
        'A clear step-by-step blueprint to fix all issues with your web developer or legal counsel.',
      demoPriceBadge: 'DEMO · illustrative price',
      demoPriceNote: 'Example price. Commercial payment processing is disabled in this interface.',
      demoPriceButton: 'View demo report (Simulation)',
      connecting: 'Connecting...',

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
          badge: 'Скорость и штрафы',
          title: 'Техническое состояние',
          headline: 'Быстрый сайт и законы Испании',
          description: 'Клиент уходит через 3 секунды ожидания. А отсутствие налогового номера (NIF/CIF) грозит штрафами.',
          checks: [
            { label: 'Мобильная загрузка', desc: 'Быстрый отклик страниц на смартфонах' },
            { label: 'Законы Испании', desc: 'Обязательный NIF/CIF и правовые данные' },
            { label: 'Безопасное соединение', desc: 'Защита данных и отсутствие битых страниц' },
          ],
          impact: 'Штрафы до €30.000 и 53% отказов при медленной загрузке.',
        },
        {
          number: '02',
          badge: 'Заявки и чат',
          title: 'Путь к обращению',
          headline: 'Связь с клиентом в 1 клик',
          description: 'В Испании большинство клиентов пишут в чат. Сложные формы заявок убивают продажи.',
          checks: [
            { label: 'Прямой WhatsApp', desc: 'Кнопка чата с готовым текстом обращения' },
            { label: 'Звонок в 1 тап', desc: 'Прямой набор телефона без копирования номера' },
            { label: 'Понятный график', desc: 'Прозрачные часы работы и легкая запись' },
          ],
          impact: 'Потеря до 40% обращений при отсутствии прямого чата.',
        },
        {
          number: '03',
          badge: 'Реклама и карты',
          title: 'Реклама и спрос',
          headline: 'Учет бюджета и Google Карты',
          description: 'Реклама без точной аналитики расходует бюджет впустую, а ошибки в картах лишают звонков.',
          checks: [
            { label: 'Учет рекламы', desc: 'Корректная фиксация каждой входящей заявки' },
            { label: 'Google Карты', desc: 'Актуальный телефон, адрес и часы работы' },
            { label: 'Локальный поиск', desc: 'Видимость бизнеса в вашем городе' },
          ],
          impact: 'Слив 30–50% рекламного бюджета без точной аналитики.',
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
          badge: 'Velocidad & Sanciones',
          title: 'Estado técnico',
          headline: 'Rendimiento móvil y leyes en España',
          description: 'El usuario se va en 3s. Sin NIF/CIF o datos legales correctos, se arriesga a sanciones.',
          checks: [
            { label: 'Carga móvil', desc: 'Velocidad óptima en smartphones' },
            { label: 'Leyes en España', desc: 'NIF/CIF obligatorio y avisos legales' },
            { label: 'Conexión segura', desc: 'Cifrado web y cero enlaces rotos' },
          ],
          impact: 'Multas de hasta 30.000 € y rebote del 53% en móvil.',
        },
        {
          number: '02',
          badge: 'Leads & Chat',
          title: 'Camino al contacto',
          headline: 'Contacto directo en 1 clic',
          description: 'En España la mayoría prefiere chatear. Los formularios complejos matan las ventas.',
          checks: [
            { label: 'WhatsApp directo', desc: 'Botón de chat con mensaje preescrito' },
            { label: 'Llamada en 1 toque', desc: 'Marcación directa sin copiar números' },
            { label: 'Horario claro', desc: 'Disponibilidad transparente y sin fricción' },
          ],
          impact: 'Fuga de hasta 40% de contactos sin chat directo.',
        },
        {
          number: '03',
          badge: 'Anuncios & Mapas',
          title: 'Publicidad y demanda',
          headline: 'Control de inversión y Google Maps',
          description: 'Anuncios sin medición queman presupuesto; datos desactualizados en Maps espantan clientes.',
          checks: [
            { label: 'Medición de anuncios', desc: 'Seguimiento exacto de cada cliente potencial' },
            { label: 'Google Maps', desc: 'Teléfono, dirección y horarios sincronizados' },
            { label: 'Visibilidad local', desc: 'Destacar en las búsquedas de tu zona' },
          ],
          impact: '30% a 50% de presupuesto publicitario desperdiciado sin analítica.',
        },
      ],
    },
    en: {
      eyebrow: 'Website audit · Spain',
      insightTitle: 'Every click should lead to a customer.',
      insightIntro: '3 critical leaks where businesses in Spain lose leads, trust, and ad spend.',
      insightLead: ['Find', 'the friction', 'and see', 'what to fix.'],
      auditTitle: '3 pillars of commercial audit',
      findingsEyebrow: 'Finding sample',
      findingsTitle: 'Sample: what the report shows',
      findingsDemoNote: 'Demonstration examples, not results for your website.',
      sampleActionLabel: 'Next step example',
      cardsSectionBadge: 'Funnel diagnostics',
      insights: [
        {
          number: '01',
          badge: 'Speed & Penalties',
          title: 'Technical Health',
          headline: 'Mobile speed & Spanish regulations',
          description: 'Visitors bounce after 3 seconds. Missing tax IDs risks regulatory penalties.',
          checks: [
            { label: 'Mobile speed', desc: 'Fast loading on smartphones and devices' },
            { label: 'Spanish regulations', desc: 'Mandatory tax IDs and legal notices' },
            { label: 'Secure connection', desc: 'Encrypted traffic and zero dead ends' },
          ],
          impact: 'Fines up to €30,000 and 53% bounced visitors on slow mobile.',
        },
        {
          number: '02',
          badge: 'WhatsApp & Leads',
          title: 'Path to Contact',
          headline: 'Instant booking and messaging in 1 tap',
          description: 'Most local clients prefer chat. Complex enquiry forms kill conversions.',
          checks: [
            { label: 'Direct WhatsApp', desc: 'Prominent chat button with pre-filled message' },
            { label: 'Instant calling', desc: 'Direct phone dialing without manual copying' },
            { label: 'Schedule clarity', desc: 'Transparent hours and low-friction booking' },
          ],
          impact: 'Up to 40% lost enquiries when direct WhatsApp is absent.',
        },
        {
          number: '03',
          badge: 'Ads & Maps',
          title: 'Ads & Local Demand',
          headline: 'Ad accountability and Google Maps alignment',
          description: 'Ads without tracking leak budget; mismatched map details kill incoming calls.',
          checks: [
            { label: 'Ad tracking', desc: 'Accurate measurement for your campaigns' },
            { label: 'Google Business Profile', desc: 'Consistent phone, hours, and location data' },
            { label: 'Local search presence', desc: 'Structured details to dominate local search' },
          ],
          impact: '30% to 50% of ad spend wasted when attribution is blind.',
        },
      ],
    },
  }[lang];

  return (
    <main ref={landingRef} className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Верхний баннер */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 text-center font-medium">
        {t.devBadge}
      </div>

      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold">
            A2R
          </div>
          <span className="font-bold text-lg tracking-tight">Audit2Revenue</span>
        </div>

        {/* Переключатель языков */}
        <div className="flex bg-slate-200/60 p-1 rounded-full text-xs font-medium">
          {(['es', 'en', 'ru'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* Главный экран (Hero) */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          {landingCopy.insightTitle}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          {landingCopy.insightIntro}
        </p>

        {/* Интерактивная строка ввода сайта */}
        <div className="max-w-xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-slate-800"
          />
          <button
            onClick={() => {
              if (hasUrl) {
                setStage('scanning');
                setProgress(100);
                setTimeout(() => setStage('report'), 1500);
              }
            }}
            disabled={!hasUrl}
            className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {t.btn} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-3">{t.heroMicro}</p>
      </section>

      {/* Блоки с деталями воронки (01, 02, 03) */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {landingCopy.insights.map((insight, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {insight.badge}
                </span>
                <h3 className="text-2xl font-bold mt-4 mb-2 text-slate-900">{insight.headline}</h3>
                <p className="text-slate-600 text-sm mb-6">{insight.description}</p>
                <div className="space-y-3 mb-6">
                  {insight.checks.map((check, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{check.label}</p>
                        <p className="text-xs text-slate-500">{check.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="text-xs font-medium text-rose-800">{insight.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Подвал */}
      <footer className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200 mt-16 text-center text-xs text-slate-500 space-y-4">
        <p>{t.footerDisclaimer}</p>
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}