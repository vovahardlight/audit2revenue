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
      devBadge: 'ПРОТОТИП · Демонстрационный режим (Платежи отключены)',
      h1_1: 'Сайт теряет',
      h1_2: 'клиентов?',
      btn: 'Проверить сайт',
      prev: 'Назад',
      next: 'Далее',
      placeholder: 'https://vash-salon-ili-klinika.es',

      previewLabel: 'ДЕМО-ДИАГНОСТИКА',
      previewStatus: 'ГОТОВ К ПРОВЕРКЕ ВАШЕГО САЙТА',
      demo: 'ПРИМЕР',

      exampleBusiness: 'Пример: Местный бизнес в Испании',
      scoreLabel: 'ПРИМЕР ПРОВЕРКИ',
      revenueScoreTitle: 'Ошибки и возможные потери клиентов',
      revenueScoreNote: 'Демонстрационная оценка: как ошибки могут влиять на обращения',
      scoreIssueTrust: 'Данные компании',
      scoreIssueTrustDetail: 'Пример: на сайте могут отсутствовать обязательные данные компании.',
      scoreIssueContact: 'Быстрая связь',
      scoreIssueContactDetail: 'Пример: клиенту сложно записаться или написать в WhatsApp за 1 клик.',
      scoreIssueLocal: 'Карты Google и доверие',
      scoreIssueLocalDetail: 'Пример: телефон или часы работы на сайте расходятся с картами.',
      scoreSimulateFix: 'Устранить ошибку',
      scoreUndoFix: 'Отменить',
      scoreFixed: 'Ошибка устранена',
      scoreReset: 'Сбросить',
      scorePointsRestored: 'Потенциал восстановлен',
      scorePoints: 'баллов',
      scoreOutOf: 'из 100',

      pitch: 'Готовое обращение в WhatsApp',
      pitchLocked: 'Доступно после экспресс-проверки',

      heroMicro:
        'Найдём ошибки на сайте и покажем, как они могут мешать клиентам связаться с вами и сколько обращений вы можете терять.',

      scanVerified: 'В порядке',
      scanScanning: 'Проверяем...',

      checklist: [
        {
          title: 'Данные компании на сайте',
          discovered: '⚠️ В примере не указаны необходимые данные компании',
          type: 'error',
        },
        {
          title: 'Контроль расходов на рекламу',
          discovered: '✓ Учет заявок с рекламы Instagram и Google настроен',
          type: 'ok',
        },
        {
          title: 'Удобство записи для клиентов',
          discovered: '⚠️ Нет заметного способа написать в WhatsApp; часть клиентов может уйти без обращения',
          type: 'warn',
        },
        {
          title: 'Карточка компании на Google Maps',
          discovered: '✓ Отличный рейтинг 4.8★, но обнаружен риск потери звонков',
          type: 'warn',
        },
        {
          title: 'Обязательные данные компании',
          discovered: '⚠️ В примере не указаны необходимые данные компании',
          type: 'error',
        },
      ],

      // REPORT
      reportLabel: 'РЕЗУЛЬТАТЫ ЭКСПРЕСС-ПРОВЕРКИ',
      reportTitle: 'Ошибки сайта и возможная потеря клиентов',
      reportMissedRevenue: 'Возможные потери: примерная оценка',
      demoReportNotice:
        'Это пример отчёта на смоделированных данных. Реальная проверка покажет ошибки вашего сайта и оценит, как они могут влиять на обращения.',

      reportCard1Cat: 'Защита бизнеса',
      reportCard1Title: 'Не указаны данные компании',
      reportCard1Desc: 'На сайте могут отсутствовать данные компании, которые должны быть опубликованы в Испании.',
      reportCard1Foot: 'Возможный риск: претензии и штрафы',
      reportCard1Action: 'Проверить и добавить необходимые данные компании.',

      reportCard2Cat: 'Связь с клиентами',
      reportCard2Title: 'Посетителям сложно связаться с вами',
      reportCard2Desc: 'Если на сайте трудно найти способ связи, часть потенциальных клиентов может уйти без обращения.',
      reportCard2Foot: 'Возможная потеря обращений',
      reportCard2Action: 'Добавить заметную кнопку звонка или WhatsApp.',

      reportCard3Cat: 'Клиенты рядом',
      reportCard3Title: 'Контакты на сайте и в Google Maps расходятся',
      reportCard3Desc: 'Разные телефоны или часы работы могут запутать клиента и помешать ему связаться с вами.',
      reportCard3Foot: 'Доверие клиентов',
      reportCard3Action: 'Указать одинаковые телефон, адрес и часы работы на сайте и в Google Maps.',

      reportLocked: 'Скрыто 🔒',

      reportPurchaseBadge: 'Полный отчёт и план исправлений',
      reportPurchaseTitle: 'Узнайте, что исправить в первую очередь',
      reportPurchaseDesc:
        'Понятный список найденных проблем и шагов, которые помогут клиентам связаться с вами.',
      demoPriceBadge: 'Специальная цена для теста',
      demoPriceNote: 'Показательная стоимость. Приём платежей в демо-режиме отключен.',
      demoPriceButton: 'Посмотреть пример полного отчёта',
      connecting: 'Подключение...',

      footerDisclaimer:
        'Платформа работает в режиме демонстрации. Коммерческие расчеты не производятся.',
      footer:
        '© 2026 Audit2Revenue.es — Сервис роста заявок и защиты сайтов в Испании.',
      footerLegalNav: 'Правовая информация',
      legalNotice: 'Правовое уведомление',
      privacyPolicy: 'Конфиденциальность',
      cookiePolicy: 'Файлы cookie',
      termsOfService: 'Условия сервиса',
      cookieSettings: 'Настройки cookies',

      cookieTitle: 'Мы заботимся о конфиденциальности',
      cookieText:
        'Мы используем cookies для корректной работы сервиса и аналитики, помогающей делать диагностику точнее.',
      cookieAccept: 'Принять все',
      cookieNecessary: 'Только необходимые',
    },

    es: {
      devBadge: 'PROTOTIPO · Demostración técnica (Pagos desactivados)',
      h1_1: '¿Tu web pierde',
      h1_2: 'clientes?',
      btn: 'Revisar mi web',
      prev: 'Anterior',
      next: 'Siguiente',
      placeholder: 'https://tu-clinica-o-salon.es',

      previewLabel: 'DIAGNÓSTICO DEMO',
      previewStatus: 'LISTO PARA ANALIZAR TU WEB',
      demo: 'EJEMPLO',

      exampleBusiness: 'Ejemplo: Negocio local en España',
      scoreLabel: 'EJEMPLO DE ANÁLISIS',
      revenueScoreTitle: 'Errores y posibles clientes perdidos',
      revenueScoreNote: 'Ejemplo: cómo los errores pueden afectar a las consultas',
      scoreIssueTrust: 'Datos de la empresa',
      scoreIssueTrustDetail: 'Ejemplo: puede que falten datos necesarios de la empresa.',
      scoreIssueContact: 'Contacto rápido',
      scoreIssueContactDetail: 'Ejemplo: el cliente no puede reservar o escribir por WhatsApp en 1 clic.',
      scoreIssueLocal: 'Ficha de Google Maps',
      scoreIssueLocalDetail: 'Ejemplo: teléfono u horarios desalineados entre la web y los mapas.',
      scoreSimulateFix: 'Resolver fallo',
      scoreUndoFix: 'Deshacer',
      scoreFixed: 'Fallo resuelto',
      scoreReset: 'Restablecer',
      scorePointsRestored: 'Potencial recuperado',
      scorePoints: 'puntos',
      scoreOutOf: 'de 100',

      pitch: 'Mensaje directo para WhatsApp',
      pitchLocked: 'Disponible tras el análisis rápido',

      heroMicro:
        'Encontramos errores en tu web y te mostramos cómo pueden dificultar el contacto y cuántas consultas podrías estar perdiendo.',

      scanVerified: 'Correcto',
      scanScanning: 'Comprobando...',

      checklist: [
        {
          title: 'Datos de la empresa',
          discovered: '⚠️ Comprueba que tu web incluya los datos necesarios de la empresa',
          type: 'ok',
        },
        {
          title: 'Control de rentabilidad publicitaria',
          discovered: '✓ Medición de contactos desde Instagram y Google activada',
          type: 'ok',
        },
        {
          title: 'Facilidad de contacto para clientes',
          discovered: '⚠️ No hay un botón visible de WhatsApp; algunos clientes pueden no contactar',
          type: 'warn',
        },
        {
          title: 'Ficha y opiniones en Google Maps',
          discovered: '✓ Excelente nota 4.8★, pero se detecta riesgo de llamadas perdidas',
          type: 'warn',
        },
        {
          title: 'Datos necesarios de la empresa',
          discovered: '⚠️ En el ejemplo faltan algunos datos necesarios de la empresa',
          type: 'error',
        },
      ],

      reportLabel: 'RESULTADOS DEL DIAGNÓSTICO',
      reportTitle: 'Errores de tu web y posibles clientes perdidos',
      reportMissedRevenue: 'Posibles pérdidas: estimación orientativa',
      demoReportNotice:
        'Este es un ejemplo con datos simulados. El análisis real mostrará errores de tu web y estimará cómo pueden afectar a las consultas.',

      reportCard1Cat: 'Seguridad legal',
      reportCard1Title: 'Faltan datos de la empresa',
      reportCard1Desc: 'Puede que falten datos de la empresa que deben aparecer en una web en España.',
      reportCard1Foot: 'Posible riesgo: reclamaciones o sanciones',
      reportCard1Action: 'Revisar y añadir los datos necesarios de la empresa.',

      reportCard2Cat: 'Contacto con clientes',
      reportCard2Title: 'Cuesta encontrar cómo contactar contigo',
      reportCard2Desc: 'Si contactar es difícil, algunos posibles clientes pueden irse sin escribir ni llamar.',
      reportCard2Foot: 'Posibles consultas perdidas',
      reportCard2Action: 'Añadir un botón visible para llamar o escribir por WhatsApp.',

      reportCard3Cat: 'Clientes de tu zona',
      reportCard3Title: 'La web y Google Maps muestran datos distintos',
      reportCard3Desc: 'Un teléfono o un horario distinto puede confundir e impedir que te contacten.',
      reportCard3Foot: 'Confianza del cliente',
      reportCard3Action: 'Usar el mismo teléfono, dirección y horario en la web y Google Maps.',

      reportLocked: 'Bloqueado 🔒',

      reportPurchaseBadge: 'Informe completo y pasos para corregir errores',
      reportPurchaseTitle: 'Descubre qué conviene corregir primero',
      reportPurchaseDesc:
        'Una lista clara de los problemas encontrados y de los pasos que pueden facilitar el contacto con tus clientes.',
      demoPriceBadge: 'Precio de prueba',
      demoPriceNote: 'Importe de demostración. Los cobros están desactivados en esta versión.',
      demoPriceButton: 'Ver ejemplo del informe completo',
      connecting: 'Conectando...',

      footerDisclaimer:
        'Plataforma en fase de demostración técnica. Sin actividad comercial directa.',
      footer:
        '© 2026 Audit2Revenue.es — Diagnóstico de captación de clientes y cumplimiento web en España.',
      footerLegalNav: 'Información legal',
      legalNotice: 'Aviso Legal',
      privacyPolicy: 'Privacidad',
      cookiePolicy: 'Cookies',
      termsOfService: 'Condiciones de uso',
      cookieSettings: 'Gestionar cookies',

      cookieTitle: 'Cuidamos tu privacidad',
      cookieText:
        'Utilizamos cookies esenciales para el funcionamiento de la web y análisis estadístico que nos permite mejorar el servicio.',
      cookieAccept: 'Aceptar todas',
      cookieNecessary: 'Solo necesarias',
    },

    en: {
      devBadge: 'PROTOTYPE · Technical Preview (Payments disabled)',
      h1_1: 'Is your website losing',
      h1_2: 'customers?',
      btn: 'Check my website',
      prev: 'Previous',
      next: 'Next',
      placeholder: 'https://your-business.es',

      previewLabel: 'DEMO DIAGNOSTICS',
      previewStatus: 'READY TO SCAN YOUR WEBSITE',
      demo: 'DEMO',

      exampleBusiness: 'Example: Local Business in Spain',
      scoreLabel: 'SAMPLE WEBSITE CHECK',
      revenueScoreTitle: 'Website errors and potential lost customers',
      revenueScoreNote: 'Interactive demo: shows how many enquiries are lost every month',
      scoreIssueTrust: 'Business details',
      scoreIssueTrustDetail: 'Sample: required business information may be missing from the website.',
      scoreIssueContact: 'Fast contact channel',
      scoreIssueContactDetail: 'Demo: customers cannot easily book or start a WhatsApp chat in 1 tap.',
      scoreIssueLocal: 'Google Maps alignment',
      scoreIssueLocalDetail: 'Demo: phone numbers or opening hours on the site mismatch Google Maps.',
      scoreSimulateFix: 'Fix this issue',
      scoreUndoFix: 'Undo fix',
      scoreFixed: 'Issue resolved',
      scoreReset: 'Reset',
      scorePointsRestored: 'Potential restored',
      scorePoints: 'points',
      scoreOutOf: 'out of 100',

      pitch: 'Ready-to-use WhatsApp message',
      pitchLocked: 'Available after instant scan',

      heroMicro:
        'We find website errors and show how they may make it harder for customers to contact you and how many enquiries you could be losing.',

      scanVerified: 'Passed',
      scanScanning: 'Checking...',

      checklist: [
        {
          title: 'Business information',
          discovered: '⚠️ Check that your website includes the required business details',
          type: 'ok',
        },
        {
          title: 'Ad spend accountability',
          discovered: '✓ Enquiries from Instagram and Google ads are being recorded',
          type: 'ok',
        },
        {
          title: 'Customer contact convenience',
          discovered: '⚠️ There is no clear WhatsApp button; some customers may not get in touch',
          type: 'warn',
        },
        {
          title: 'Google Maps listing & reviews',
          discovered: '✓ Great 4.8★ rating, but risk of unanswered calls detected',
          type: 'warn',
        },
        {
          title: 'Required business details',
          discovered: '⚠️ The sample is missing some required business details',
          type: 'error',
        },
      ],

      reportLabel: 'INSTANT SCAN REPORT',
      reportTitle: 'Website errors and potential lost customers',
      reportMissedRevenue: 'Potential losses: an estimate',
      demoReportNotice:
        'This sample uses simulated data. A real check will show your website errors and estimate how they may affect enquiries.',

      reportCard1Cat: 'Legal Safety',
      reportCard1Title: 'Business details are missing',
      reportCard1Desc: 'Your website may be missing company details that should be shown in Spain.',
      reportCard1Foot: 'Possible risk: complaints or fines',
      reportCard1Action: 'Check and add the required company details.',

      reportCard2Cat: 'Customer contact',
      reportCard2Title: 'It is hard to find how to contact you',
      reportCard2Desc: 'If contacting you is difficult, some potential customers may leave without calling or writing.',
      reportCard2Foot: 'Potential lost enquiries',
      reportCard2Action: 'Add a visible button to call or message you on WhatsApp.',

      reportCard3Cat: 'Local Demand',
      reportCard3Title: 'Website and Google Maps show different details',
      reportCard3Desc: 'Different phone numbers or opening hours can confuse customers and stop them reaching you.',
      reportCard3Foot: 'Customer trust',
      reportCard3Action: 'Use the same phone, address, and opening hours on your website and Google Maps.',

      reportLocked: 'Locked 🔒',

      reportPurchaseBadge: 'Full report and suggested fixes',
      reportPurchaseTitle: 'See what to fix first',
      reportPurchaseDesc:
        'A clear list of the issues found and steps that can make it easier for customers to reach you.',
      demoPriceBadge: 'Special demo pricing',
      demoPriceNote: 'Illustrative price. Payment processing is disabled in demo mode.',
      demoPriceButton: 'View a sample full report',
      connecting: 'Connecting...',

      footerDisclaimer:
        'Platform is currently in technical preview mode. No commercial services are billed.',
      footer:
        '© 2026 Audit2Revenue.es — Website audit and customer acquisition service in Spain.',
      footerLegalNav: 'Legal info',
      legalNotice: 'Legal Notice',
      privacyPolicy: 'Privacy Policy',
      cookiePolicy: 'Cookie Policy',
      termsOfService: 'Terms of Service',
      cookieSettings: 'Cookie settings',

      cookieTitle: 'We value your privacy',
      cookieText:
        'We use essential cookies to run the site and analytical cookies to help improve diagnostic accuracy.',
      cookieAccept: 'Accept all',
      cookieNecessary: 'Necessary only',
    },
  }[lang];

  // УПРОЩЕННЫЙ, ЛАКОНИЧНЫЙ ТЕКСТ ДЛЯ БЛОКА КАРТОЧЕК БЕЗ ТЕРМИНОВ И АББРЕВИАТУР
  const landingCopy = {
    ru: {
      eyebrow: 'Проверка сайтов в Испании',
      insightTitle: 'Ошибки сайта могут стоить вам клиентов.',
      insightIntro: 'Находим проблемы на сайте и показываем, как они могут влиять на обращения.',
      insightLead: ['Находим ошибки', 'оцениваем возможные потери', 'и объясняем', 'что исправить.'],
      auditTitle: 'Что проверяем',
      findingsEyebrow: 'Пример проверки',
      findingsTitle: 'Что показывает отчет',
      findingsDemoNote: 'Демо-пример для оценки работы системы.',
      sampleActionLabel: 'Что нужно сделать',
      cardsSectionBadge: 'Ошибки и возможные потери',
      insights: [
        {
          number: '01',
          badge: 'Данные компании',
          title: 'Обязательные данные',
          headline: 'На сайте должны быть данные вашей компании',
          description: 'Проверяем, указана ли нужная информация о компании и легко ли её найти.',
          checks: [
            { label: 'Данные', desc: 'Указана необходимая информация о компании' },
            { label: 'Понятность', desc: 'Клиент может найти важную информацию' },
            { label: 'Ошибки', desc: 'Показываем найденные проблемы и способы их исправить' },
          ],
          impact: 'Отсутствие нужных данных может создать правовые риски.',
        },
        {
          number: '02',
          badge: 'Связь и запись',
          title: 'Удобство для клиента',
          headline: 'Запись или звонок в 1 касание',
          description: 'Клиенты не хотят заполнять длинные анкеты. Им намного проще сразу написать вам в WhatsApp.',
          checks: [
            { label: 'WhatsApp', desc: 'Кнопка чата на виду с готовым приветствием' },
            { label: 'Звонок', desc: 'Набор номера сразу в 1 клик без ручного ввода' },
            { label: 'График', desc: 'Понятные часы работы без лишней путаницы' },
          ],
          impact: 'Если связаться трудно, часть потенциальных клиентов может уйти.',
        },
        {
          number: '03',
          badge: 'Реклама и карты',
          title: 'Приток клиентов',
          headline: 'Окупаемость каждого клика',
          description: 'Реклама должна приводить реальных людей, а телефон на картах Google — совпадать с сайтом.',
          checks: [
            { label: 'Контроль', desc: 'Видно, какая реклама окупается, а какая впустую' },
            { label: 'Карты Google', desc: 'Точный телефон и адрес, чтобы клиент дозвонился' },
            { label: 'Поиск рядом', desc: 'Вас легко находят те, кто ищет услуги поблизости' },
          ],
          impact: 'Несовпадение контактов может помешать клиенту дозвониться.',
        },
      ],
    },
    es: {
      eyebrow: 'Auditoría web en España',
      insightTitle: 'Los errores de tu web pueden costarte clientes.',
      insightIntro: 'Encontramos problemas y te explicamos cómo pueden afectar a las consultas.',
      insightLead: ['Encontramos errores', 'estimamos posibles pérdidas', 'y explicamos', 'cómo corregirlos.'],
      auditTitle: 'Qué revisamos',
      findingsEyebrow: 'Ejemplo de análisis',
      findingsTitle: 'Qué muestra el informe',
      findingsDemoNote: 'Ejemplo ilustrativo del sistema.',
      sampleActionLabel: 'Solución recomendada',
      cardsSectionBadge: 'Errores y posibles pérdidas',
      insights: [
        {
          number: '01',
          badge: 'Datos de la empresa',
          title: 'Información necesaria',
          headline: 'Tu web debe mostrar los datos de tu empresa',
          description: 'Revisamos si la información necesaria está publicada y es fácil de encontrar.',
          checks: [
            { label: 'Datos', desc: 'La información necesaria de la empresa está visible' },
            { label: 'Claridad', desc: 'Los clientes pueden encontrar la información importante' },
            { label: 'Errores', desc: 'Indicamos qué problemas encontramos y cómo corregirlos' },
          ],
          impact: 'La falta de datos puede crear riesgos legales.',
        },
        {
          number: '02',
          badge: 'WhatsApp y Citas',
          title: 'Facilidad de contacto',
          headline: 'Pedir cita o llamar en 1 toque',
          description: 'Nadie quiere formularios largos. La mayoría de clientes prefieren escribir directamente por WhatsApp.',
          checks: [
            { label: 'WhatsApp', desc: 'Botón directo en pantalla con mensaje listo' },
            { label: 'Llamada', desc: 'Marcación directa al tocar el teléfono' },
            { label: 'Horario', desc: 'Horas de atención claras y sin dudas' },
          ],
          impact: 'Si contactar cuesta, algunos posibles clientes pueden marcharse.',
        },
        {
          number: '03',
          badge: 'Publicidad y Maps',
          title: 'Captación de clientes',
          headline: 'Rentabilidad de cada clic',
          description: 'Tus anuncios deben traer clientes reales y los datos en Google Maps deben coincidir.',
          checks: [
            { label: 'Control', desc: 'Claridad sobre qué anuncio genera ventas' },
            { label: 'Google Maps', desc: 'Mismo teléfono y dirección para no perder llamadas' },
            { label: 'En tu zona', desc: 'Aparece ante quienes buscan servicios cerca' },
          ],
          impact: 'Los datos distintos pueden impedir que los clientes te llamen.',
        },
      ],
    },
    en: {
      eyebrow: 'Website Audit · Spain',
      insightTitle: 'Website errors can cost you customers.',
      insightIntro: 'We find problems and explain how they may affect customer enquiries.',
      insightLead: ['We find errors', 'estimate possible losses', 'and explain', 'how to fix them.'],
      auditTitle: 'What we check',
      findingsEyebrow: 'Sample finding',
      findingsTitle: 'What the report reveals',
      findingsDemoNote: 'Demo model for preview purposes.',
      sampleActionLabel: 'Recommended action',
      cardsSectionBadge: 'Errors and potential losses',
      insights: [
        {
          number: '01',
          badge: 'Business details',
          title: 'Required information',
          headline: 'Your website should show your business details',
          description: 'We check whether the necessary company information is published and easy to find.',
          checks: [
            { label: 'Details', desc: 'The necessary company information is visible' },
            { label: 'Clarity', desc: 'Customers can find important information' },
            { label: 'Errors', desc: 'We explain the problems found and how to fix them' },
          ],
          impact: 'Missing details may create legal risks.',
        },
        {
          number: '02',
          badge: 'WhatsApp & Booking',
          title: 'Effortless Contact',
          headline: 'Booking and calling in 1 tap',
          description: 'Nobody wants long enquiry forms. Clients simply want to chat on WhatsApp or call.',
          checks: [
            { label: 'WhatsApp', desc: 'Clear chat button with pre-written message' },
            { label: 'Click to call', desc: 'Phone dials instantly without manual typing' },
            { label: 'Clear hours', desc: 'Transparent opening hours with no confusion' },
          ],
          impact: 'If getting in touch is difficult, potential customers may leave.',
        },
        {
          number: '03',
          badge: 'Ads & Google Maps',
          title: 'Client Acquisition',
          headline: 'Make every click pay off',
          description: 'Ads should bring paying clients, and your Google Maps info must match your website.',
          checks: [
            { label: 'Tracking', desc: 'See which ads bring clients and which waste cash' },
            { label: 'Google Maps', desc: 'Matching phone and address so callers reach you' },
            { label: 'Local search', desc: 'Stand out to people looking for services nearby' },
          ],
          impact: 'Different details can stop customers from reaching you.',
        },
      ],
    },
  }[lang];

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
      className={`a2r-score-panel ${
        variant === 'compact'
          ? 'a2r-score-panel--compact flex-1 flex flex-col justify-between'
          : 'a2r-score-panel--full'
      }`}
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
        <div className="a2r-score-issues min-h-[180px] sm:min-h-[200px] flex flex-col justify-between" aria-label={t.revenueScoreTitle}>
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

  // PRELOADER & HERO CADENCE REVEAL
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
      const p = Math.min(Math.round((elapsed / duration) * 100), 100);
      setLoadProgress(p);

      if (elapsed >= duration) {
        clearInterval(interval);
        const closeTimeout = window.setTimeout(() => {
          setPageLoading(false);
          setRevealStep(1);
          const cadence = 400;
          [2, 3, 4, 5, 6].forEach((step, index) => {
            revealTimeouts.push(
              window.setTimeout(() => setRevealStep(step), cadence * (index + 1))
            );
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

  useEffect(() => {
    if (pageLoading || stage !== 'idle') return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
  }, [pageLoading, stage]);

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
          {
            autoAlpha: 0,
            y: 38,
            rotateX: -9,
            transformPerspective: 900,
            transformOrigin: 'center bottom',
            filter: 'blur(6px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 0.82,
            delay: Math.max(0, index) * 0.24,
            ease: 'back.out(1.15)',
            overwrite: 'auto',
            clearProps: 'opacity,visibility,transform,transformOrigin,filter',
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

  // СКАНИРОВАНИЕ
  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let formatted = url.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
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
    const duration = 5800;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentP = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentP);

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          setStage('report');
        }, 300);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === 'report') {
      const scrollTimer = setTimeout(() => {
        reportAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
      return () => clearTimeout(scrollTimer);
    }
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
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= 3. СТИЛИ АНИМАЦИИ ================= */}
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
          input[type="text"], input[type="url"], input {
            font-size: 16px !important;
          }
        }

        .landing-eyebrow {
          font-size: 11px !important;
          line-height: 1.25 !important;
          letter-spacing: 0.16em !important;
          text-transform: uppercase !important;
          font-weight: 800 !important;
          color: #0284C7 !important;
          margin-bottom: 0.35rem !important;
        }
        @media (min-width: 640px) {
          .landing-eyebrow {
            font-size: 12px !important;
          }
        }

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
          0% { opacity: 0; transform: translateY(34px) scale(0.94) rotateX(3deg); filter: blur(9px); }
          74% { opacity: 1; transform: translateY(-3px) scale(1.008) rotateX(0); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); filter: blur(0); }
        }
        .anim-card {
          animation: card-reveal 1.2s cubic-bezier(0.2, 0.78, 0.28, 1) both;
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

        @keyframes bar-ignition {
          0% { opacity: 0; transform: translateY(24px) scale(0.96); filter: blur(7px); }
          76% { opacity: 1; transform: translateY(-2px) scale(1.006); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .anim-bar {
          animation: bar-ignition 1.05s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-pending {
          opacity: 0 !important;
          transform: translateY(20px) !important;
          visibility: hidden !important;
        }
        .hero-copy-enter {
          opacity: 1 !important;
          transform: translateY(0) !important;
          visibility: visible !important;
        }

        @keyframes scan-finding-lift {
          0% {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .scan-finding-reveal {
          animation: scan-finding-lift 0.52s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes scan-badge-lift {
          0% {
            opacity: 0;
            transform: translateY(8px);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .anim-badge-lift {
          animation: scan-badge-lift 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
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
        
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        
          -webkit-animation: input-border-travel 4s
            cubic-bezier(0.65, 0, 0.35, 1) infinite;
          animation: input-border-travel 4s
            cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .animated-input-border:focus-within {
          background: rgba(2, 132, 199, 0.16);
          box-shadow: 0 0 0 1px rgba(2, 132, 199, 0.12), 0 0 22px rgba(2, 132, 199, 0.12);
        }
        @-webkit-keyframes input-border-travel {
          from {
            -webkit-transform: translate3d(0, 0, 0) rotate(0deg);
          }
          to {
            -webkit-transform: translate3d(0, 0, 0) rotate(360deg);
          }
        }
        
        @keyframes input-border-travel {
          from {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          to {
            transform: translate3d(0, 0, 0) rotate(360deg);
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
          transition: transform 120ms linear;
        }
        .landing-preview {
          min-height: 480px;
        }
        @media (min-width: 640px) {
          .landing-preview {
            min-height: 520px;
          }
        }

        .audit-card-shell {
          position: relative;
          transform-style: preserve-3d;
          animation: card-float 5s ease-in-out infinite;
          min-height: 480px;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 640px) {
          .audit-card-shell {
            min-height: 520px;
          }
        }

        .audit-card-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          flex: 1 1 auto;
        }

        .a2r-score-issues {
          min-height: 180px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        @media (min-width: 640px) {
          .a2r-score-issues {
            min-height: 200px;
          }
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
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.12); }
        }
        .dot-pulse {
          animation: dot-pulse 2.2s ease-in-out infinite;
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
              Audit<span className="text-[#0284C7]">2</span>Revenue
            </span>
          </div>

          <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05]">
            {(['es', 'en', 'ru'] as Lang[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleLangChange(item)}
                className={`cursor-pointer px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all uppercase tracking-wider text-[9px] sm:text-[11px] ${
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

      {/* 5. MAIN CONTAINER */}
      <main
        ref={landingRef}
        className={`relative z-10 flex-1 min-h-0 flex flex-col ${
          stage === 'idle'
            ? 'justify-start py-3 sm:py-4 lg:py-5'
            : 'justify-start gap-5 sm:gap-7 pt-4 sm:pt-8 py-6 sm:py-10'
        } items-center px-4 sm:px-7 w-full max-w-7xl mx-auto landing-main`}
      >
        {/* ================= IDLE STAGE (ГЛАВНЫЙ ЭКРАН) ================= */}
        {stage === 'idle' && (
          <div className="landing-hero w-full grid items-center text-left">
           <div className="landing-preview audit-card-perspective audit-card-compact w-full flex justify-center mb-1.5 sm:mb-3 min-h-[480px] sm:min-h-[520px]">
              <div className={`relative w-full max-w-[380px] sm:max-w-[480px] h-full ${revealStep >= 5 ? 'anim-card' : 'hero-pending'}`}>
                <div ref={auditCardRef} className="audit-card-3d relative h-full">
                  <div className="audit-card-shadow" />
                  <div className="absolute -inset-4 rounded-[30px] bg-[#0284C7]/8 blur-xl pointer-events-none" />

                  <div className="audit-card-shell relative overflow-hidden rounded-[22px] sm:rounded-[26px] bg-white border border-[#D5E1E9] shadow-[0_16px_50px_rgba(15,39,68,0.12)] min-h-[480px] sm:min-h-[520px] flex flex-col justify-between">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent z-[60]" />
                    
                    <div className="audit-card-content px-3.5 py-3 sm:px-5 sm:py-4 flex-1 flex flex-col justify-between h-full">
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

                      <div className="audit-card-depth-strong a2r-locked-feature mt-2">
                        <span className="a2r-locked-feature-icon"><MessageCircle aria-hidden="true" /></span>
                        <span className="a2r-locked-feature-copy">
                          <strong>{t.pitch}</strong>
                          <small>{t.pitchLocked}</small>
                        </span>
                        <Lock className="a2r-locked-feature-lock" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-copy-column">
              <div className="landing-heading hero-reveal hero-reveal-heading w-full space-y-2 mb-2 sm:mb-4">
                <p className="landing-eyebrow">{landingCopy.eyebrow}</p>
                <h1 className="landing-title overflow-visible">
                  <span className={`landing-title-ink inline-block pe-1.5 overflow-hidden ${revealStep >= 1 ? 'anim-line-1' : 'hero-pending'}`}>
                    {t.h1_1}
                  </span>{' '}
                  <span className={`landing-title-accent inline-block pe-2 -me-2 overflow-visible ${revealStep >= 2 ? 'anim-line-2' : 'hero-pending'}`}>
                    {t.h1_2}
                  </span>
                </h1>
              </div>

              <p
                className={`landing-copy hero-reveal hero-reveal-copy text-[15px] sm:text-base text-[#596B7A] mb-4 sm:mb-6 transition-all duration-700 ${
                  revealStep >= 3 ? 'hero-copy-enter' : 'hero-pending'
                }`}
              >
                {t.heroMicro}
              </p>

              <form
                id="scan-form"
                onSubmit={handleStartScan}
                className={`landing-form hero-reveal hero-reveal-form w-full max-w-[600px] relative will-change-transform ${
                  revealStep >= 4 ? 'anim-bar' : 'hero-pending'
                }`}
              >
                <div
                  className={`absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] blur-lg transition-all duration-700 pointer-events-none ${
                    hasUrl ? 'opacity-60 scale-[1.02]' : isInputFocused ? 'opacity-25 scale-[1.01]' : 'opacity-0 scale-95'
                  }`}
                />

                <div className={`animated-input-border relative z-10 p-[1px] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${isInputFocused ? 'is-focused' : ''} ${hasUrl ? 'has-value' : ''}`}>
                  <div className={`relative z-[1] flex flex-row items-center gap-1 p-1 sm:p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${hasUrl ? 'shadow-[0_0_0_2px_#0284C7]' : ''}`}>
                    <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 h-10 sm:h-12">
                      <Globe className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 ${hasUrl ? 'text-[#0284C7]' : 'text-[#86868B]'}`} />
                      <input
                        type="text"
                        required
                        aria-label={lang === 'ru' ? 'Адрес сайта для проверки' : lang === 'es' ? 'Dirección web para analizar' : 'Website address to scan'}
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
                      className="scan-submit cursor-pointer h-10 sm:h-11 px-4 sm:px-6 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-semibold text-xs sm:text-[14px] flex items-center justify-center gap-1.5 transition duration-200 shadow-xs hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
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
          <section className="insight-section w-full py-8 sm:py-12 lg:py-0 lg:h-[100dvh] lg:min-h-[640px] lg:max-h-[860px] flex flex-col justify-center px-4 sm:px-6">
            <div className="insight-heading max-w-3xl mx-auto text-center mb-4 sm:mb-6 lg:mb-7 shrink-0" data-reveal>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-[10.5px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>{landingCopy.cardsSectionBadge}</span>
              </div>

              <h2 id="insight-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0F2744] tracking-tight leading-tight">
                {landingCopy.insightLead.map((word, index) => (
                  <span key={`${word}-${index}`} className={index === 1 || index === 3 ? 'text-[#0284C7]' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-lg mx-auto leading-relaxed">
                {landingCopy.insightIntro}
              </p>

              <div className="flex lg:hidden items-center justify-center p-1 rounded-2xl bg-black/[0.04] border border-black/[0.05] mt-4 max-w-xs mx-auto">
                {landingCopy.insights.map((item, idx) => (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveCardIndex(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      activeCardIndex === idx ? 'bg-white text-[#0284C7] shadow-xs' : 'text-[#64748B]'
                    }`}
                  >
                    {item.number} {item.badge.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto w-full items-stretch">
              {landingCopy.insights.map((item, index) => {
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
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-black px-2 py-0.5 rounded-lg bg-[#0F2744] text-white">
                            {item.number}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#0F2744] tracking-tight">{item.title}</h3>
                      <p className="text-xs font-semibold text-[#0284C7] mt-0.5">{item.headline}</p>
                      <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">{item.description}</p>

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

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="rounded-xl p-2.5 bg-rose-50/80 border border-rose-100 flex items-center gap-2">
                        <span className="text-xs shrink-0">⚠️</span>
                        <span className="text-[11px] font-semibold text-rose-900 leading-tight">
                          {item.impact}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= ЕДИНЫЙ ПАНЕЛЬНЫЙ БЛОК СКАНЕРА ================= */}
        {(stage === 'scanning' || stage === 'report') && (
          <div className="scan-stage w-full max-w-4xl px-2 sm:px-4 text-left">
            <div className="relative rounded-3xl bg-white border border-[#D5E1E9] p-5 sm:p-7 shadow-[0_20px_60px_rgba(15,39,68,0.08)] backdrop-blur-xl overflow-hidden space-y-5">
              <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#7DD3FC] to-transparent" />

              {/* ЛАКОНИЧНАЯ ШАПКА СКАНЕРА */}
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <p className="text-sm sm:text-base text-[#0F2744] font-mono font-bold truncate">
                    {url}
                  </p>
                </div>

                <div className="shrink-0 flex items-baseline gap-1 tabular-nums">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC]">
                    {progress}
                  </span>
                  <span className="text-sm sm:text-lg font-extrabold text-[#0284C7]">%</span>
                </div>
              </div>

              {/* ЛОАДЕР (Three.js WebGL) */}
              <div className="w-full my-2">
                <div
                  style={{ height: `${defaultLoaderSettings.height}px` }}
                  className="w-full relative rounded-2xl p-[3px] bg-[#0A1A2F] border border-[#1E3A5F] shadow-[0_8px_30px_rgba(15,39,68,0.22),inset_0_2px_8px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-[#06121E]">
                    <ThreeScanVisualizer progress={progress} />
                  </div>
                </div>
              </div>

              {/* ПОСЛЕДОВАТЕЛЬНЫЙ ЧЕКЛИСТ С АНИМАЦИЕЙ */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                {scanChecklist.map((item, idx) => {
                  const stepThreshold = (idx + 1) * 20;
                  const isPassed = progress >= stepThreshold;
                  const isCurrent = progress < stepThreshold && progress >= stepThreshold - 20;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-500 ease-out ${
                        isPassed
                          ? 'bg-[#F8FAFC] border-[#E2E8F0] shadow-xs opacity-100'
                          : isCurrent
                            ? 'bg-[#EFF9FD] border-[#0284C7] shadow-sm ring-1 ring-[#0284C7]/30 opacity-100 scale-[1.008]'
                            : 'bg-slate-50/40 border-slate-100 opacity-40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5">
                          {isPassed ? (
                            <span key={`icon-${idx}`} className="anim-badge-lift">
                              {item.type === 'error' ? (
                                <XCircle className="w-4.5 h-4.5 text-rose-600" />
                              ) : item.type === 'warn' ? (
                                <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                              ) : (
                                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                              )}
                            </span>
                          ) : isCurrent ? (
                            <Loader2 className="w-4.5 h-4.5 text-[#0284C7] animate-spin" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-300" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 overflow-hidden">
                            <span className={`text-xs sm:text-sm font-bold ${isPassed ? 'text-[#0F2744]' : isCurrent ? 'text-[#0F2744]' : 'text-[#86868B]'}`}>
                              {item.title}
                            </span>

                            {isPassed ? (
                              <span key={`badge-${idx}`} className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] anim-badge-lift">
                                {t.scanVerified}
                              </span>
                            ) : isCurrent ? (
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0284C7] animate-pulse">
                                {t.scanScanning}
                              </span>
                            ) : null}
                          </div>

                          {isPassed && (
                            <div className="overflow-hidden mt-1.5">
                              <p className={`scan-finding-reveal text-xs leading-relaxed font-medium ${
                                item.type === 'error' ? 'text-rose-700' : item.type === 'warn' ? 'text-amber-800' : 'text-[#64748B]'
                              }`}>
                                {item.discovered}
                              </p>
                            </div>
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

        {/* ЯКОРЬ ДЛЯ МЯГКОГО СКРОЛЛА К ОТЧЕТУ */}
        <div ref={reportAnchorRef} className="w-full h-0" />

        {/* ================= ЭКРАН ОТЧЕТА ================= */}
        {stage === 'report' && (
          <div className="report-stage w-full max-w-4xl space-y-6 text-left animate-fadeIn">
            <div className="report-card p-5 sm:p-7 rounded-3xl bg-white border border-[#D5E1E9] shadow-lg backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block">
                      {t.reportLabel}
                    </span>
                    <h2 className="text-base sm:text-xl font-extrabold text-[#0F2744]">
                      {t.reportTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#0284C7] font-mono">
                      {url}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  {t.reportMissedRevenue}
                </div>
              </div>

              <p className="mt-3.5 rounded-2xl border border-[#BAE6FD] bg-[#EFF9FD] px-4 py-2.5 text-xs text-[#0F2744]">
                {t.demoReportNotice}
              </p>

              {renderScorePanel('full')}

              {/* КАРТОЧКИ УТЕЧЕК */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
                {[
                  { id: 0, cat: t.reportCard1Cat, title: t.reportCard1Title, desc: t.reportCard1Desc, foot: t.reportCard1Foot, points: 12 },
                  { id: 1, cat: t.reportCard2Cat, title: t.reportCard2Title, desc: t.reportCard2Desc, foot: t.reportCard2Foot, points: 8 },
                  { id: 2, cat: t.reportCard3Cat, title: t.reportCard3Title, desc: t.reportCard3Desc, foot: t.reportCard3Foot, points: 8 },
                ].map((card) => {
                  const isSimulated = resolvedDemoIssues.includes(card.id);

                  return (
                    <div
                      key={card.id}
                      className={`p-4.5 rounded-2xl transition-all duration-200 border bg-white shadow-xs ${
                        isSimulated
                          ? 'border-emerald-300 ring-1 ring-emerald-300'
                          : 'border-[#D5E1E9] hover:border-[#0284C7]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1">
                        <span>{card.cat}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0F2744] leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-[11.5px] text-[#64748B] mt-1 leading-relaxed">
                        {card.desc}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between text-[11px] text-[#64748B]">
                        <span>{card.foot}</span>
                        <span className="text-rose-600 font-semibold">{t.reportLocked}</span>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#0F2744] flex items-center gap-1">
                          {isSimulated ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                          )}
                          <span>{isSimulated ? t.scoreFixed : `−${card.points} ${t.scorePoints}`}</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleDemoIssue(card.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition shadow-xs ${
                            isSimulated
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-[#EFF9FD] hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-[#BAE6FD]'
                          }`}
                        >
                          {isSimulated ? t.scoreUndoFix : t.scoreSimulateFix}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* БЛОК ПРЕДЛОЖЕНИЯ */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#D5E1E9] shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 items-center">
                <div className="md:col-span-3 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0284C7]/10 text-[#0284C7] text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.reportPurchaseBadge}</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-[#0F2744] tracking-tight">
                    {t.reportPurchaseTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {t.reportPurchaseDesc}
                  </p>
                </div>

                <div className="md:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#EFF9FD] border border-[#BAE6FD] text-center space-y-3">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#0F2744]">€19</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#0284C7]/10 text-[9px] font-extrabold text-[#0284C7]">
                        DEMO
                      </span>
                    </div>

                    <span className="text-xs text-[#0284C7] font-bold block">{t.demoPriceBadge}</span>
                    <p className="mt-1 text-[11px] text-[#64748B] leading-snug">{t.demoPriceNote}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    disabled={isRedirecting}
                    className="w-full py-3 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.connecting}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
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

      {/* 5. FOOTER */}
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

          <nav className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-0.5 text-[#64748B]">
            <a href={`/aviso-legal?lang=${lang}`} className="transition hover:text-[#0284C7]">{t.legalNotice}</a>
            <a href={`/politica-de-privacidad?lang=${lang}`} className="transition hover:text-[#0284C7]">{t.privacyPolicy}</a>
            <a href={`/politica-de-cookies?lang=${lang}`} className="transition hover:text-[#0284C7]">{t.cookiePolicy}</a>
            <a href={`/condiciones-de-contratacion?lang=${lang}`} className="transition hover:text-[#0284C7]">{t.termsOfService}</a>
            <button type="button" onClick={() => setShowCookieModal(true)} className="transition hover:text-[#0284C7]">
              {t.cookieSettings}
            </button>
          </nav>
        </div>
      </footer>

      {/* 6. COOKIE MODAL */}
      {showCookieModal && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-[#0F2744]/25 backdrop-blur-md anim-cookie-backdrop" onClick={() => handleCookieChoice('necessary')} />

          <div className="relative z-10 w-full max-w-[520px] rounded-3xl bg-white border border-black/[0.06] shadow-2xl p-5 sm:p-6 anim-cookie-modal">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center shadow-sm">
                <Lock className="w-5 h-5 text-white" />
              </div>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0F2744]">{t.cookieTitle}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6E6E73]">{t.cookieText}</p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => handleCookieChoice('necessary')}
                className="flex-1 h-11 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0F2744] text-xs font-semibold transition"
              >
                {t.cookieNecessary}
              </button>

              <button
                type="button"
                onClick={() => handleCookieChoice('all')}
                className="flex-1 h-11 rounded-xl bg-[#0284C7] hover:bg-[#0F2744] text-white text-xs font-bold transition shadow-sm hover:scale-[1.01] active:scale-[0.98]"
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
