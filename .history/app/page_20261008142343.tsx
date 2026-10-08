'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
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
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

// ВАШИ ТОЧНЫЕ ПАРАМЕТРЫ ШЕЙДЕРА (NORDIC GLACIER)
const SHADER_CONFIG = {
  warpScale: 0.05,
  timeSpeed: 0.02,
  vortexStrength: 0.5,
  boundarySoftness: 0.65,
  colorBleed: 0.45,
  edgeTurbulence: 0.05,
  fogDensity: 0.8,
  mistScatter: 0.1,
  synapticFilaments: 1.75,
  color1_Deep: '#0f2744',
  color2_Brand: '#0284c7',
  color3_Flow: '#7dd3fc',
  color4_Mist: '#f0f9ff',
  fresnelPower: 1.0,
  specularShine: 0.75,
};

export default function AppleNordicGlacierPureLanding() {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // COOKIE MODAL
  const [showCookieModal, setShowCookieModal] = useState(false);

  // ПРЕЛОАДЕР С ПУЛЬСИРУЮЩИМ ЛОГОТИПОМ
  const [pageLoading, setPageLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [revealStep, setRevealStep] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hasUrl = useMemo(() => url.trim().length > 3, [url]);

  // Прелоадер с логотипом, меняющим яркость
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1100;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(Math.round((elapsed / duration) * 100), 100);

      setLoadProgress(p);

      if (elapsed >= duration) {
        clearInterval(interval);

        setTimeout(() => {
          setPageLoading(false);

          // Пошаговая сборка элементов после растворения прелоадера
          setTimeout(() => setRevealStep(1), 120);
          setTimeout(() => setRevealStep(2), 260);
          setTimeout(() => setRevealStep(3), 420);
          setTimeout(() => setRevealStep(4), 600);
          setTimeout(() => setRevealStep(5), 780);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const t = {
    ru: {
      h1_1: 'Найдите проблемы на сайте,',
      h1_2: 'которые мешают вам зарабатывать.',
      btn: 'Проверить сайт',
      placeholder: 'https://vash-salon-ili-klinika.es',
      scanningTitle: 'Интеллектуальная диагностика',

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
      placeholder: 'https://tu-clinica-o-salon.es',
      scanningTitle: 'Diagnóstico inteligente',

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
      placeholder: 'https://your-business.es',
      scanningTitle: 'Intelligent Website Audit',

      cookieTitle: 'We use cookies',
      cookieText:
        'We use necessary cookies to operate the website and, with your consent, additional cookies to analyze and improve the service.',
      cookieAccept: 'Accept all',
      cookieNecessary: 'Necessary only',
    },
  }[lang];

  // ================= THREE.JS: СФЕРА + КРУПНЫЕ КОНТРАСТНЫЕ ЧИПЫ =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 620;
    const height = 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );

    camera.position.set(0, 0, 11.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rootGroup = new THREE.Group();
    rootGroup.position.z = -28;
    rootGroup.scale.set(0.15, 0.15, 0.15);
    scene.add(rootGroup);

    // 1. ЦЕНТРАЛЬНАЯ КВАНТОВАЯ НЕЙРОСФЕРА
    const sphereGeo = new THREE.IcosahedronGeometry(2.0, 56);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uVelocity: { value: 0 },
      uWarpScale: { value: SHADER_CONFIG.warpScale },
      uTimeSpeed: { value: SHADER_CONFIG.timeSpeed },
      uVortexStrength: { value: SHADER_CONFIG.vortexStrength },
      uBoundarySoftness: { value: SHADER_CONFIG.boundarySoftness },
      uColorBleed: { value: SHADER_CONFIG.colorBleed },
      uEdgeTurbulence: { value: SHADER_CONFIG.edgeTurbulence },
      uFogDensity: { value: SHADER_CONFIG.fogDensity },
      uMistScatter: { value: SHADER_CONFIG.mistScatter },
      uSynapticFilaments: { value: SHADER_CONFIG.synapticFilaments },
      uColor1: {
        value: new THREE.Color(SHADER_CONFIG.color1_Deep),
      },
      uColor2: {
        value: new THREE.Color(SHADER_CONFIG.color2_Brand),
      },
      uColor3: {
        value: new THREE.Color(SHADER_CONFIG.color3_Flow),
      },
      uColor4: {
        value: new THREE.Color(SHADER_CONFIG.color4_Mist),
      },
      uFresnelPower: {
        value: SHADER_CONFIG.fresnelPower,
      },
      uSpecularShine: {
        value: SHADER_CONFIG.specularShine,
      },
    };

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uVelocity;
      uniform float uVortexStrength;
      uniform float uTimeSpeed;
      uniform float uWarpScale;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vFogCoords;
      varying float vMistField;

      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 permute(vec4 x) {
        return mod289(((x * 34.0) + 1.0) * x);
      }

      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;

        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);

        vec4 p = permute(
          permute(
            permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0)
            ) + i.y + vec4(0.0, i1.y, i2.y, 1.0)
          ) + i.x + vec4(0.0, i1.x, i2.x, 1.0)
        );

        vec4 j = p - 49.0 * floor(p * (1.0 / 49.0));

        vec4 x_ = floor(j * (1.0 / 7.0));
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * (2.0 / 7.0) + 0.5 / 7.0 - 1.0;
        vec4 y = y_ * (2.0 / 7.0) + 0.5 / 7.0 - 1.0;

        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;

        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(
          vec4(
            dot(p0,p0),
            dot(p1,p1),
            dot(p2,p2),
            dot(p3,p3)
          )
        );

        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(
          0.6 - vec4(
            dot(x0,x0),
            dot(x1,x1),
            dot(x2,x2),
            dot(x3,x3)
          ),
          0.0
        );

        m = m * m;

        return 42.0 * dot(
          m * m,
          vec4(
            dot(p0,x0),
            dot(p1,x1),
            dot(p2,x2),
            dot(p3,x3)
          )
        );
      }

      vec3 rotateAround(vec3 p, vec3 axis, float angle) {
        return mix(
          dot(axis, p) * axis,
          p,
          cos(angle)
        ) + cross(axis, p) * sin(angle);
      }

      void main() {
        vNormal = normalize(normalMatrix * normal);

        vec3 mouseAxis = normalize(
          vec3(uMouse.x, uMouse.y, 1.2)
        );

        float mouseDist = length(
          position.xy - uMouse * 2.5
        );

        float vortexTorque =
          exp(-mouseDist * 2.0) *
          (0.6 + uVelocity * 2.5) *
          uVortexStrength;

        vec3 warpedPos = rotateAround(
          position,
          mouseAxis,
          vortexTorque * 0.9
        );

        float t = uTime * uTimeSpeed;

        vec3 q = vec3(
          snoise(
            warpedPos * uWarpScale +
            vec3(0.0, t * 0.9, 0.0)
          ),
          snoise(
            warpedPos * uWarpScale +
            vec3(2.8, 0.0, t * 1.1)
          ),
          snoise(
            warpedPos * uWarpScale +
            vec3(0.0, 1.9, -t * 0.8)
          )
        );

        vec3 r = vec3(
          snoise(
            warpedPos * (uWarpScale * 1.25) +
            2.2 * q +
            vec3(1.5, -t * 0.7, 0.4)
          ),
          snoise(
            warpedPos * (uWarpScale * 1.25) +
            2.2 * q +
            vec3(7.4, t * 0.8, -1.1)
          ),
          snoise(
            warpedPos * (uWarpScale * 1.25) +
            2.2 * q +
            vec3(0.3, 1.7, t * 0.6)
          )
        );

        vFogCoords = r;

        vMistField = snoise(
          warpedPos * uWarpScale + 1.6 * r
        );

        vPosition = (
          modelViewMatrix *
          vec4(position, 1.0)
        ).xyz;

        gl_Position =
          projectionMatrix *
          modelViewMatrix *
          vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uVelocity;
      uniform float uBoundarySoftness;
      uniform float uColorBleed;
      uniform float uEdgeTurbulence;
      uniform float uFogDensity;
      uniform float uMistScatter;
      uniform float uSynapticFilaments;

      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;

      uniform float uFresnelPower;
      uniform float uSpecularShine;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vFogCoords;
      varying float vMistField;

      void main() {
        vec3 viewDir = normalize(-vPosition);

        float fresnel = pow(
          clamp(
            1.0 - dot(viewDir, vNormal),
            0.0,
            1.0
          ),
          uFresnelPower
        );

        float microWisp =
          sin(
            vFogCoords.z * 12.0 +
            uTime * 0.8
          ) *
          uEdgeTurbulence *
          0.25;

        float density =
          (vMistField + microWisp) *
          uFogDensity;

        float softness =
          max(uBoundarySoftness, 0.05);

        float t1 = smoothstep(
          -0.6 - softness,
          -0.6 +
            softness +
            uColorBleed * 0.5,
          density
        );

        float t2 = smoothstep(
          -0.1 - softness,
          -0.1 +
            softness +
            uColorBleed * 0.5,
          density
        );

        float t3 = smoothstep(
          0.35 - softness * 0.8,
          0.35 + softness * 0.8,
          density
        );

        vec3 fogColor = mix(
          uColor1,
          uColor2,
          t1
        );

        fogColor = mix(
          fogColor,
          uColor3,
          t2
        );

        fogColor = mix(
          fogColor,
          uColor4,
          t3 * 0.85
        );

        float filaments = pow(
          clamp(
            sin(
              vFogCoords.y * 14.0 +
              vFogCoords.x * 8.0
            ) * 0.5 + 0.5,
            0.0,
            1.0
          ),
          6.0
        );

        fogColor +=
          uColor3 *
          filaments *
          uSynapticFilaments *
          0.6;

        float coreGaze = pow(
          clamp(
            dot(viewDir, vNormal),
            0.0,
            1.0
          ),
          uMistScatter
        );

        fogColor = mix(
          fogColor,
          uColor4 * 1.15,
          (1.0 - coreGaze) * 0.35
        );

        vec3 pearlHighlight =
          vec3(0.96, 0.98, 1.0);

        vec3 finalColor = mix(
          fogColor,
          pearlHighlight,
          fresnel * 0.65
        );

        vec3 lightDir =
          normalize(vec3(0.6, 1.2, 0.9));

        vec3 halfVec =
          normalize(lightDir + viewDir);

        float spec = pow(
          max(dot(vNormal, halfVec), 0.0),
          32.0
        );

        finalColor +=
          pearlHighlight *
          spec *
          uSpecularShine;

        gl_FragColor =
          vec4(finalColor, 0.97);
      }
    `;

    const sphereMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const sphereMesh = new THREE.Mesh(
      sphereGeo,
      sphereMat
    );

    rootGroup.add(sphereMesh);

    // ================= 2. КРУПНЫЕ КОНТРАСТНЫЕ ЧИПЫ АНАЛИТИКИ =================
    const streamGroup = new THREE.Group();
    rootGroup.add(streamGroup);

    const createHighContrastChip = (
      mainText: string,
      subBadge: string
    ) => {
      const c = document.createElement('canvas');

      c.width = 560;
      c.height = 130;

      const ctx = c.getContext('2d');

      if (ctx) {
        ctx.clearRect(
          0,
          0,
          c.width,
          c.height
        );

        // Тень
        ctx.shadowColor =
          'rgba(15, 39, 68, 0.22)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 6;

        // Белый фон
        ctx.fillStyle = '#FFFFFF';

        ctx.beginPath();

        ctx.roundRect(
          8,
          8,
          544,
          114,
          57
        );

        ctx.fill();

        ctx.shadowColor = 'transparent';

        // Сапфировый контур
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 3.5;

        ctx.stroke();

        // Неоновая точка
        ctx.fillStyle = '#0284c7';

        ctx.beginPath();

        ctx.arc(
          55,
          65,
          12,
          0,
          Math.PI * 2
        );

        ctx.fill();

        // Основной текст
        ctx.fillStyle = '#0f2744';

        ctx.font =
          '800 42px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';

        ctx.fillText(
          mainText,
          86,
          64
        );

        // Метрика
        ctx.fillStyle = '#0284c7';

        ctx.font =
          '700 24px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';

        ctx.fillText(
          subBadge,
          86,
          100
        );
      }

      const tex = new THREE.CanvasTexture(c);

      tex.needsUpdate = true;

      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const sprite = new THREE.Sprite(mat);

      const aspect = c.width / c.height;

      sprite.scale.set(
        aspect * 0.72,
        0.72,
        1
      );

      return sprite;
    };

    // Поток А
    const streamA_tokens = [
      {
        sprite: createHighContrastChip(
          'booking',
          'ONLINE // 24/7'
        ),
        offset: 0.0,
      },
      {
        sprite: createHighContrastChip(
          'metapixel',
          'ADS TRACKED'
        ),
        offset: 0.2,
      },
      {
        sprite: createHighContrastChip(
          'Google Places',
          'REPUTATION'
        ),
        offset: 0.4,
      },
      {
        sprite: createHighContrastChip(
          'revenue',
          'LEAK RECOVERY'
        ),
        offset: 0.6,
      },
      {
        sprite: createHighContrastChip(
          '€ 1,800',
          'MONTHLY LOSS'
        ),
        offset: 0.8,
      },
    ];

    // Поток Б
    const streamB_tokens = [
      {
        sprite: createHighContrastChip(
          'Google Analytics',
          'GA4 // GTM'
        ),
        offset: 0.1,
      },
      {
        sprite: createHighContrastChip(
          '$ ROI',
          '+38% CONVERT'
        ),
        offset: 0.3,
      },
      {
        sprite: createHighContrastChip(
          'LSSI-CE',
          'LEGAL // NIF'
        ),
        offset: 0.5,
      },
      {
        sprite: createHighContrastChip(
          '4.8★',
          'GOOGLE MAPS'
        ),
        offset: 0.7,
      },
      {
        sprite: createHighContrastChip(
          'WhatsApp AI',
          'CONVERSION'
        ),
        offset: 0.9,
      },
    ];

    streamA_tokens.forEach((item) => {
      streamGroup.add(item.sprite);
    });

    streamB_tokens.forEach((item) => {
      streamGroup.add(item.sprite);
    });

    // ================= АНИМАЦИЯ 3D-СЛАЛОМА =================
    let lastX = 0;
    let lastY = 0;
    let velocity = 0;

    const targetMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect =
        canvas.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        -(
          (e.clientY - rect.top) /
            rect.height -
          0.5
        );

      const dx =
        x - lastX;

      const dy =
        y - lastY;

      const dist =
        Math.sqrt(
          dx * dx +
          dy * dy
        );

      velocity = Math.min(
        velocity +
          dist * 3.0,
        1.2
      );

      lastX = x;
      lastY = y;

      targetMouse.set(x, y);
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove
    );

    let animationId: number;

    const clock =
      new THREE.Clock();

    const animate = () => {
      animationId =
        requestAnimationFrame(
          animate
        );

      const elapsed =
        clock.getElapsedTime();

      // Прилет группы по Z
      rootGroup.position.z =
        THREE.MathUtils.lerp(
          rootGroup.position.z,
          0,
          0.045
        );

      const targetScale =
        THREE.MathUtils.lerp(
          rootGroup.scale.x,
          1.0,
          0.045
        );

      rootGroup.scale.set(
        targetScale,
        targetScale,
        targetScale
      );

      velocity =
        THREE.MathUtils.lerp(
          velocity,
          0.0,
          0.04
        );

      uniforms.uVelocity.value =
        velocity;

      uniforms.uMouse.value.lerp(
        targetMouse,
        0.06
      );

      uniforms.uTime.value =
        elapsed;

      const baseSpeed = 0.052;

      const bloom =
        THREE.MathUtils.clamp(
          (rootGroup.position.z + 28) /
            28,
          0.1,
          1.0
        );

      // Поток А
      streamA_tokens.forEach(
        (item) => {
          const theta =
            ((
              elapsed * baseSpeed +
              item.offset
            ) %
              1.0) *
            Math.PI *
            2;

          const x =
            4.4 *
            Math.cos(theta) *
            bloom;

          const y =
            (
              1.35 *
                Math.cos(
                  2.0 * theta
                ) +
              1.25 *
                Math.sin(theta)
            ) *
            bloom;

          const z =
            2.4 *
            Math.sin(theta);

          item.sprite.position.set(
            x,
            y,
            z
          );

          const depthNorm =
            THREE.MathUtils.clamp(
              (z + 2.4) / 4.8,
              0.0,
              1.0
            );

          const scale =
            0.72 *
            (
              0.8 +
              0.25 * depthNorm
            ) *
            bloom;

          const aspect =
            560 / 130;

          item.sprite.scale.set(
            aspect * scale,
            scale,
            1
          );

          const mat =
            item.sprite.material as THREE.SpriteMaterial;

          mat.opacity =
            (
              0.85 +
              0.15 * depthNorm
            ) *
            bloom;
        }
      );

      // Поток Б
      streamB_tokens.forEach(
        (item) => {
          const theta =
            ((
              -elapsed * baseSpeed +
              item.offset
            ) %
              1.0) *
            Math.PI *
            2;

          const x =
            4.5 *
            Math.cos(theta) *
            bloom;

          const y =
            (
              -1.4 *
                Math.cos(
                  2.0 * theta
                ) -
              1.15 *
                Math.sin(theta)
            ) *
            bloom;

          const z =
            2.3 *
            Math.sin(theta);

          item.sprite.position.set(
            x,
            y,
            z
          );

          const depthNorm =
            THREE.MathUtils.clamp(
              (z + 2.3) / 4.6,
              0.0,
              1.0
            );

          const scale =
            0.72 *
            (
              0.8 +
              0.25 * depthNorm
            ) *
            bloom;

          const aspect =
            560 / 130;

          item.sprite.scale.set(
            aspect * scale,
            scale,
            1
          );

          const mat =
            item.sprite.material as THREE.SpriteMaterial;

          mat.opacity =
            (
              0.85 +
              0.15 * depthNorm
            ) *
            bloom;
        }
      );

      // Параллакс наклона
      rootGroup.rotation.y =
        THREE.MathUtils.lerp(
          rootGroup.rotation.y,
          targetMouse.x * 0.22,
          0.04
        );

      rootGroup.rotation.x =
        THREE.MathUtils.lerp(
          rootGroup.rotation.x,
          -targetMouse.y * 0.14,
          0.04
        );

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      sphereGeo.dispose();
      sphereMat.dispose();

      renderer.dispose();

      streamA_tokens.forEach(
        ({ sprite }) => {
          const material =
            sprite.material as THREE.SpriteMaterial;

          material.map?.dispose();
          material.dispose();
        }
      );

      streamB_tokens.forEach(
        ({ sprite }) => {
          const material =
            sprite.material as THREE.SpriteMaterial;

          material.map?.dispose();
          material.dispose();
        }
      );
    };
  }, []);

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

  const handleStartScan = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!url) return;

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
        'https://' +
        formatted;

      setUrl(formatted);
    }

    setStage('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (stage === 'scanning') {
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
            clearInterval(
              timer
            );

            setTimeout(
              () =>
                setStage(
                  'teaser'
                ),
              600
            );
          }
        }, 50);

      return () =>
        clearInterval(
          timer
        );
    }
  }, [stage]);

  // =========================================================
  // COOKIE MODAL:
  // показываем только после полного initial reveal
  // =========================================================
  useEffect(() => {
    // Последний reveal-step — footer.
    if (
      revealStep !== 5 ||
      pageLoading
    ) {
      return;
    }

    // Не показываем повторно, если пользователь
    // уже сделал выбор ранее.
    const consent =
      localStorage.getItem(
        'a2r_cookie_consent'
      );

    if (consent) {
      return;
    }

    // Последняя entrance-анимация должна
    // полностью закончиться.
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

  return (
    <div className="relative min-h-[100dvh] bg-[#FBFBFD] text-[#1D1D1F] flex flex-col justify-between overflow-x-hidden selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">

      {/* =====================================================
          1. ПРЕЛОАДЕР
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
          СТИЛИ ХОРЕОГРАФИИ AWWWARDS
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

        @keyframes text-line-unmask {
          0% {
            transform: translateY(125%) rotateX(-16deg);
            opacity: 0;
            filter: blur(6px);
          }

          100% {
            transform: translateY(0%) rotateX(0deg);
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
            transform: translateY(28px) scale(0.94);
            filter: blur(10px);
          }

          65% {
            transform: translateY(-2px) scale(1.01);
            filter: blur(0px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
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

        @keyframes blue-beam-rotate {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        .border-beam-container {
          position: relative;
          overflow: hidden;
        }

        .blue-border-beam {
          position: absolute;
          width: 170%;
          height: 400%;
          top: -150%;
          left: -35%;

          background: conic-gradient(
            transparent 0deg,
            transparent 270deg,
            #0284C7 320deg,
            #7DD3FC 350deg,
            transparent 360deg
          );

          animation:
            blue-beam-rotate
            4s
            linear
            infinite;
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

        /* =====================================================
           COOKIE MODAL
        ====================================================== */

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
            {(['es', 'en', 'ru'] as Lang[]).map(
              (item) => (
                <button
                  key={item}
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
              )
            )}
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-6 sm:py-8 w-full">

        {/* ===================================================
            ЭКРАН 1: IDLE
        ==================================================== */}
        {stage === 'idle' && (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center -translate-y-2 sm:-translate-y-4">

            {/* 3D CANVAS */}
            <div className="w-[360px] h-[260px] sm:w-[500px] sm:h-[300px] md:w-[620px] md:h-[340px] relative flex items-center justify-center mb-1 sm:mb-2 shrink-0 overflow-visible">
              <div className="absolute inset-x-8 inset-y-4 rounded-full bg-gradient-to-tr from-[#0F2744]/20 via-[#0284C7]/15 to-transparent blur-3xl pointer-events-none" />

              <canvas
                ref={canvasRef}
                className="relative z-10 w-full h-full pointer-events-none"
              />
            </div>

            {/* H1 */}
            <div className="w-full space-y-1 mb-7 sm:mb-8">

              <div className="overflow-hidden py-1">
                <span
                  className={`block text-[32px] sm:text-[46px] lg:text-[52px] font-black tracking-[-0.035em] leading-[1.08] text-[#1D1D1F] will-change-transform ${
                    revealStep >= 2
                      ? 'anim-line-1'
                      : 'opacity-0'
                  }`}
                >
                  {t.h1_1}
                </span>
              </div>

              <div className="overflow-hidden py-1">
                <span
                  className={`block text-[32px] sm:text-[46px] lg:text-[52px] font-black tracking-[-0.035em] leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] will-change-transform ${
                    revealStep >= 3
                      ? 'anim-line-2'
                      : 'opacity-0'
                  }`}
                >
                  {t.h1_2}
                </span>
              </div>
            </div>

            {/* INPUT */}
            <form
              onSubmit={
                handleStartScan
              }
              className={`w-full max-w-[540px] relative will-change-transform ${
                revealStep >= 4
                  ? 'anim-bar'
                  : 'opacity-0'
              }`}
            >
              <div
                className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#0F2744] via-[#0284C7] to-[#7DD3FC] blur-xl transition-all duration-700 pointer-events-none ${
                  hasUrl
                    ? 'opacity-60 scale-[1.02] shadow-[0_0_50px_rgba(2,132,199,0.35)]'
                    : isInputFocused
                      ? 'opacity-25 scale-[1.01]'
                      : 'opacity-0 scale-95'
                }`}
              />

              <div className="border-beam-container p-[1px] rounded-2xl relative z-10 bg-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">

                <div
                  className={`blue-border-beam transition-opacity duration-500 ${
                    hasUrl ||
                    isInputFocused
                      ? 'opacity-100'
                      : 'opacity-35'
                  }`}
                />

                <div
                  className={`relative flex flex-col sm:flex-row items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${
                    hasUrl
                      ? 'shadow-[0_0_0_2px_#0284C7]'
                      : 'shadow-none'
                  }`}
                >

                  {/* Planet */}
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
            ЭКРАН 2: SCANNING
        ==================================================== */}
        {stage === 'scanning' && (
          <div className="w-full max-w-[500px] p-6 sm:p-7 rounded-3xl bg-white/95 border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl space-y-5 text-center animate-fade-in">

            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3.5">

              <div className="text-left">
                <h3 className="text-base font-bold text-[#1D1D1F]">
                  {
                    t.scanningTitle
                  }
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
            ЭКРАН 3: TEASER
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
        className={`relative z-20 h-13 sm:h-14 border-t border-black/[0.05] bg-white/70 backdrop-blur-xl px-6 sm:px-8 flex items-center shrink-0 ${
          revealStep >= 5
            ? 'anim-footer'
            : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86868B] gap-2">

          <p>
            © 2026 Audit2Revenue.es — Сервис аудита и роста выручки сайтов в Испании.
          </p>

          <div className="flex items-center gap-4">
            <span>
              Comunidad de Madrid
            </span>

            <span>
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