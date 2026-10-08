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
  Sliders,
  X
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

export default function AppleSynapticOrbitalLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Панель настройки масштаба волн
  const [showGui, setShowGui] = useState(false);
  const [warpScale, setWarpScale] = useState(0.3);

  const fixedParams = useMemo(() => ({
    timeSpeed: 0.2,
    vortexStrength: 0.5,
    waveDetail: 0.4,
    meshDistortion: 0.0,
    blendMode: 3,
    colorDeep: '#0055ff',
    colorPrimary: '#23f7fb',
    colorElectric: '#c6fbf7',
    colorAccent: '#0a23ff',
    vortexRadius: 2.0,
    inertiaDecay: 0.045,
    fresnelPower: 1.8,
    innerScatter: 1.2,
    synapticGlow: 1.1,
    specularShine: 0.85,
    autoRotation: 0.003,
  }), []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniformsRef = useRef<any>(null);

  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uWarpScale.value = warpScale;
    }
  }, [warpScale]);

  const hasUrl = useMemo(() => url.trim().length > 3, [url]);

  const t = {
    ru: {
      h1_1: 'Найдите проблемы на сайте,',
      h1_2: 'которые мешают вам зарабатывать.',
      btn: 'Проверить сайт',
      placeholder: 'https://vash-salon-ili-klinika.es',
      scanningTitle: 'Интеллектуальная диагностика',
    },
    es: {
      h1_1: 'Encuentra los fallos en tu web,',
      h1_2: 'que te hacen perder clientes.',
      btn: 'Analizar web',
      placeholder: 'https://tu-clinica-o-salon.es',
      scanningTitle: 'Diagnóstico inteligente',
    },
    en: {
      h1_1: 'Find the website issues,',
      h1_2: 'that cost you customers.',
      btn: 'Analyze Website',
      placeholder: 'https://your-business.es',
      scanningTitle: 'Intelligent Website Audit',
    },
  }[lang];

  // ================= THREE.JS: СФЕРА + 4 ОРБИТЫ + 10 САПФИРОВЫХ КАПСУЛ =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Расширенный формат холста для свободного полета всех 10 бейджей
    const width = 540;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Камера отведена на z: 10.4, чтобы все внешние орбиты R=4.15 помещались без обрезки
    camera.position.set(0, 0, 10.4);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. ЦЕНТРАЛЬНАЯ КВАНТОВАЯ НЕЙРОСФЕРА
    const sphereGeo = new THREE.IcosahedronGeometry(2.0, 56);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uVelocity: { value: 0 },
      uVortexStrength: { value: fixedParams.vortexStrength },
      uVortexRadius: { value: fixedParams.vortexRadius },
      uTimeSpeed: { value: fixedParams.timeSpeed },
      uWarpScale: { value: warpScale },
      uWaveDetail: { value: fixedParams.waveDetail },
      uMeshDistortion: { value: fixedParams.meshDistortion },
      uBlendMode: { value: fixedParams.blendMode },
      uColorDeep: { value: new THREE.Color(fixedParams.colorDeep) },
      uColorPrimary: { value: new THREE.Color(fixedParams.colorPrimary) },
      uColorElectric: { value: new THREE.Color(fixedParams.colorElectric) },
      uColorAccent: { value: new THREE.Color(fixedParams.colorAccent) },
      uFresnelPower: { value: fixedParams.fresnelPower },
      uInnerScatter: { value: fixedParams.innerScatter },
      uSynapticGlow: { value: fixedParams.synapticGlow },
      uSpecularShine: { value: fixedParams.specularShine },
    };
    uniformsRef.current = uniforms;

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uVelocity;
      uniform float uVortexStrength;
      uniform float uVortexRadius;
      uniform float uTimeSpeed;
      uniform float uWarpScale;
      uniform float uMeshDistortion;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWarpCoords;
      varying float vDistortion;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
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
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      vec3 rotateAround(vec3 p, vec3 axis, float angle) {
        return mix(dot(axis, p) * axis, p, cos(angle)) + cross(axis, p) * sin(angle);
      }

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec3 mouseAxis = normalize(vec3(uMouse.x, uMouse.y, 1.2));
        float mouseDist = length(position.xy - uMouse * 2.5);
        float vortexForce = exp(-mouseDist * uVortexRadius) * (0.6 + uVelocity * 2.5) * uVortexStrength;
        vec3 posWithVortex = rotateAround(position, mouseAxis, vortexForce * 0.9);

        float t = uTime * uTimeSpeed;
        vec3 q = vec3(
          snoise(posWithVortex * uWarpScale + vec3(0.0, t, 0.0)),
          snoise(posWithVortex * uWarpScale + vec3(3.2, 0.0, t * 1.2)),
          snoise(posWithVortex * uWarpScale + vec3(0.0, 2.1, -t))
        );
        
        vec3 r = vec3(
          snoise(posWithVortex * (uWarpScale * 1.3) + 2.5 * q + vec3(1.7, -t * 0.8, 0.5)),
          snoise(posWithVortex * (uWarpScale * 1.3) + 2.5 * q + vec3(8.3, t * 0.9, -1.2)),
          snoise(posWithVortex * (uWarpScale * 1.3) + 2.5 * q + vec3(0.4, 1.9, t * 0.7))
        );

        vWarpCoords = r;
        float displacement = snoise(posWithVortex * uWarpScale + 1.8 * r);
        vDistortion = displacement;

        vec3 newPosition = position + normal * (displacement * uMeshDistortion);
        vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uVelocity;
      uniform vec3 uColorDeep;
      uniform vec3 uColorPrimary;
      uniform vec3 uColorElectric;
      uniform vec3 uColorAccent;
      uniform float uFresnelPower;
      uniform float uInnerScatter;
      uniform float uSynapticGlow;
      uniform float uSpecularShine;
      uniform float uWaveDetail;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWarpCoords;
      varying float vDistortion;

      void main() {
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(clamp(1.0 - dot(viewDir, vNormal), 0.0, 1.0), uFresnelPower);
        float swirlA = smoothstep(-0.6, 0.6, vDistortion);

        float diff = pow(abs(vDistortion), 1.4);
        vec3 fluidColor = mix(uColorDeep, uColorPrimary, diff);
        
        float filaments = abs(sin(vWarpCoords.z * (8.0 * uWaveDetail)));
        fluidColor = mix(fluidColor, uColorElectric, (1.0 - filaments) * 0.65);
        fluidColor = mix(fluidColor, uColorAccent, swirlA * 0.5);

        float synapticFilament = pow(clamp(sin(vWarpCoords.z * (6.0 * uWaveDetail) + uTime * 1.5) * 0.5 + 0.5, 0.0, 1.0), 5.0);
        fluidColor += uColorElectric * synapticFilament * uSynapticGlow;

        float scatterFactor = pow(clamp(dot(viewDir, vNormal), 0.0, 1.0), uInnerScatter);
        fluidColor = mix(fluidColor, uColorElectric * 1.1, (1.0 - scatterFactor) * 0.25);

        vec3 pearlWhite = vec3(0.98, 0.99, 1.0);
        vec3 finalColor = mix(fluidColor, pearlWhite, fresnel * 0.7);

        vec3 lightDir = normalize(vec3(0.6, 1.2, 0.9));
        vec3 halfVec = normalize(lightDir + viewDir);
        float spec = pow(max(dot(vNormal, halfVec), 0.0), 32.0);
        finalColor += pearlWhite * spec * uSpecularShine;

        gl_FragColor = vec4(finalColor, 0.98);
      }
    `;

    const sphereMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    rootGroup.add(sphereMesh);

    // ================= 2. 4 ГИРОСКОПИЧЕСКИЕ ОРБИТЫ =================
    const orbitalGroup = new THREE.Group();
    rootGroup.add(orbitalGroup);

    const createRail = (radius: number, rotX: number, rotY: number, colorHex: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(96);
      const railGeo = new THREE.BufferGeometry().setFromPoints(points);
      const railMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.24,
      });
      const railLine = new THREE.Line(railGeo, railMat);
      railLine.rotation.x = rotX;
      railLine.rotation.y = rotY;
      return { railLine, radius, rotX, rotY };
    };

    // 4 Пространственные орбиты с разными радиусами и углами
    const orbit1 = createRail(2.75, Math.PI / 2.9, Math.PI / 9.0, 0x23f7fb);
    const orbit2 = createRail(3.25, -Math.PI / 3.4, -Math.PI / 6.5, 0x0055ff);
    const orbit3 = createRail(3.75, Math.PI / 5.5, Math.PI / 2.6, 0x23f7fb);
    const orbit4 = createRail(4.15, -Math.PI / 2.8, Math.PI / 4.2, 0x38bdf8);
    orbitalGroup.add(orbit1.railLine);
    orbitalGroup.add(orbit2.railLine);
    orbitalGroup.add(orbit3.railLine);
    orbitalGroup.add(orbit4.railLine);

    // ================= 3. ГЕНЕРАТОР ВЫСОКОЧЕТКИХ САПФИРОВЫХ КАПСУЛ (512x130px) =================
    const createSapphirePod = (title: string, subtitle: string, glowColor: string) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 130;
      const ctx = c.getContext('2d');
      if (ctx) {
        const bgGrad = ctx.createLinearGradient(0, 0, 512, 130);
        bgGrad.addColorStop(0, 'rgba(3, 11, 40, 0.94)');
        bgGrad.addColorStop(1, 'rgba(0, 45, 160, 0.90)');

        ctx.beginPath();
        ctx.roundRect(8, 8, 496, 114, 57);
        ctx.fillStyle = bgGrad;
        ctx.fill();

        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 4.5;
        ctx.stroke();

        ctx.fillStyle = glowColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(52, 65, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
        ctx.fillText(title, 88, 56);

        ctx.fillStyle = '#23F7FB';
        ctx.font = 'bold 23px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';
        ctx.fillText(subtitle, 88, 93);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(1.4, 0.355, 1);
      return sprite;
    };

    // ================= 10 УНИКАЛЬНЫХ БЕЙДЖЕЙ АНАЛИТИКИ B2B =================
    const pods = [
      // Орбита 1 (Правовой & фискальный контур)
      { pod: createSapphirePod('LSSI-CE', 'AUDIT // NIF', '#23f7fb'), orbit: orbit1, offset: 0, dir: 1, speed: 0.38 },
      { pod: createSapphirePod('AEPD COMPLY', 'RISK // €30K', '#0055ff'), orbit: orbit1, offset: Math.PI, dir: 1, speed: 0.38 },

      // Орбита 2 (Рекламная воронка & мессенджер)
      { pod: createSapphirePod('META ADS', 'PIXEL // СЛИВ', '#23f7fb'), orbit: orbit2, offset: 0.3, dir: -1, speed: 0.34 },
      { pod: createSapphirePod('WHATSAPP', 'CTA // 0-CLICK', '#38bdf8'), orbit: orbit2, offset: 0.3 + (Math.PI * 2) / 3, dir: -1, speed: 0.34 },
      { pod: createSapphirePod('ANALYTICS', 'GA4 // GTM TAG', '#0055ff'), orbit: orbit2, offset: 0.3 + (Math.PI * 4) / 3, dir: -1, speed: 0.34 },

      // Орбита 3 (Офлайн карты & онлайн бронь)
      { pod: createSapphirePod('GOOGLE MAPS', '4.8★ // ОТЗЫВЫ', '#23f7fb'), orbit: orbit3, offset: 0.7, dir: 1, speed: 0.30 },
      { pod: createSapphirePod('BOOKING', 'CALENDAR // GAP', '#0055ff'), orbit: orbit3, offset: 0.7 + (Math.PI * 2) / 3, dir: 1, speed: 0.30 },
      { pod: createSapphirePod('ЛПР // TITULAR', 'FOUNDER // CEO', '#38bdf8'), orbit: orbit3, offset: 0.7 + (Math.PI * 4) / 3, dir: 1, speed: 0.30 },

      // Орбита 4 (Инфраструктура, мобильный UX & безопасность)
      { pod: createSapphirePod('SSL / TLS', 'HTTPS // 1.3 OK', '#23f7fb'), orbit: orbit4, offset: 1.2, dir: -1, speed: 0.26 },
      { pod: createSapphirePod('MOBILE UX', 'TTFB // 160ms', '#0055ff'), orbit: orbit4, offset: 1.2 + Math.PI, dir: -1, speed: 0.26 },
    ];

    pods.forEach(p => orbitalGroup.add(p.pod));

    // Световые кометы данных вдоль рельсов
    const packetCount = 16;
    const packetGeo = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));

    const packetMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x23f7fb,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    orbitalGroup.add(packetPoints);

    // ================= АНИМАЦИЯ =================
    let lastX = 0;
    let lastY = 0;
    let velocity = 0;
    const targetMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = -((e.clientY - rect.top) / rect.height - 0.5);

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      velocity = Math.min(velocity + dist * 4.0, 1.5);

      lastX = x;
      lastY = y;
      targetMouse.set(x, y);
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      velocity = THREE.MathUtils.lerp(velocity, 0.0, fixedParams.inertiaDecay);
      uniforms.uVelocity.value = velocity;
      uniforms.uMouse.value.lerp(targetMouse, 0.08);
      uniforms.uTime.value = elapsed;

      // Ускорение в 2.4 раза при вставке ссылки
      const speedMult = hasUrl ? 2.4 : 1.0;

      const getOrbitPos = (angle: number, radius: number, rotX: number, rotY: number) => {
        const p = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        p.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotX);
        p.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
        return p;
      };

      // 1. Полет всех 10 сапфировых капсул по своим орбитам
      pods.forEach(p => {
        const angle = (p.dir * elapsed * p.speed * speedMult + p.offset) % (Math.PI * 2);
        const pos = getOrbitPos(angle, p.orbit.radius, p.orbit.rotX, p.orbit.rotY);
        p.pod.position.copy(pos);
      });

      // 2. Полет световых комет данных вдоль 4 рельсов
      const posArr = packetPoints.geometry.attributes.position.array as Float32Array;
      const allOrbits = [orbit1, orbit2, orbit3, orbit4];
      for (let i = 0; i < packetCount; i++) {
        const orb = allOrbits[i % 4];
        const dir = i % 2 === 0 ? 1 : -1;
        const offset = (i / packetCount) * Math.PI * 2;
        const ang = (dir * elapsed * 0.65 * speedMult + offset) % (Math.PI * 2);
        const p = getOrbitPos(ang, orb.radius, orb.rotX, orb.rotY);
        posArr[i * 3] = p.x;
        posArr[i * 3 + 1] = p.y;
        posArr[i * 3 + 2] = p.z;
      }
      packetPoints.geometry.attributes.position.needsUpdate = true;

      // Параллакс наклона всей системы за курсором
      rootGroup.rotation.y = THREE.MathUtils.lerp(rootGroup.rotation.y, targetMouse.x * 0.28, 0.05);
      rootGroup.rotation.x = THREE.MathUtils.lerp(rootGroup.rotation.x, -targetMouse.y * 0.18, 0.05);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      sphereGeo.dispose();
      sphereMat.dispose();
      orbit1.railLine.geometry.dispose();
      orbit2.railLine.geometry.dispose();
      orbit3.railLine.geometry.dispose();
      orbit4.railLine.geometry.dispose();
      renderer.dispose();
    };
  }, [fixedParams, hasUrl]);

  const scanChecklist = [
    { title: 'Доступность и мобильная скорость', discovered: '✓ Сервер отвечает за 160ms, SSL TLS 1.3 активен', type: 'ok' },
    { title: 'Рекламные трекеры и пиксели', discovered: '✓ Активны Meta Pixel (Instagram) и Google Ads Tag', type: 'ok' },
    { title: 'Конверсия мобильного трафика', discovered: '⚠️ Найдено: нет кнопки WhatsApp, потеря до 40% переходов', type: 'warn' },
    { title: 'Репутация и отзывы в картах Google', discovered: '✓ Рейтинг 4.8★ (384 отзыва), найдены жалобы на недозвон', type: 'warn' },
    { title: 'Юридический аудит LSSI-CE (Испания)', discovered: '⚠️ Критично: тестовая заглушка вместо налогового NIF/CIF', type: 'error' },
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    let formatted = url.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
      setUrl(formatted);
    }
    setStage('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (stage === 'scanning') {
      const startTime = Date.now();
      const duration = 6500;
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentP = Math.min(Math.round((elapsed / duration) * 100), 100);
        setProgress(currentP);
        if (elapsed >= duration) {
          clearInterval(timer);
          setTimeout(() => setStage('teaser'), 600);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [stage]);

  const handleStripeCheckout = async () => {
    setIsRedirecting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl: url, country: 'ES' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push(`/report/demo-audit?url=${encodeURIComponent(url)}`);
      }
    } catch {
      router.push(`/report/demo-audit?url=${encodeURIComponent(url)}`);
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#FBFBFD] text-[#1D1D1F] flex flex-col justify-between overflow-x-hidden selection:bg-[#0071E3]/20 selection:text-[#0071E3] font-sans antialiased">
      
      <style jsx global>{`
        @keyframes blue-beam-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
            #0071E3 320deg,
            #38BDF8 350deg,
            transparent 360deg
          );
          animation: blue-beam-rotate 4s linear infinite;
        }
      `}</style>

      {/* ШАПКА */}
      <header className="relative z-20 h-15 sm:h-16 border-b border-black/[0.05] backdrop-blur-xl bg-white/80 px-6 sm:px-8 flex items-center shrink-0">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0071E3] to-[#38BDF8] flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-[#0071E3]/30">
              A2R
            </div>
            <span className="font-semibold tracking-tight text-[#1D1D1F] text-[15px]">
              Audit<span className="text-[#0071E3]">2</span>Revenue
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGui(!showGui)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071E3]/10 hover:bg-[#0071E3]/20 text-[#0071E3] text-xs font-semibold transition"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Масштаб волн ({warpScale})</span>
            </button>

            <div className="flex items-center p-0.5 rounded-full bg-black/[0.04] border border-black/[0.05] text-xs font-semibold">
              {(['es', 'en', 'ru'] as Lang[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={`px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[11px] ${
                    lang === item
                      ? 'bg-white text-[#0071E3] shadow-sm font-bold'
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

      {/* МИНИ-КОНТРОЛЛЕР МАСШТАБА ВОЛН */}
      {showGui && (
        <aside className="fixed top-20 right-4 sm:right-6 z-50 w-72 sm:w-80 bg-white/95 backdrop-blur-2xl border border-black/10 shadow-2xl rounded-3xl p-5 text-xs text-[#1D1D1F] space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0071E3]" />
              <span className="font-bold text-sm">Масштаб волн</span>
            </div>
            <button 
              onClick={() => setShowGui(false)}
              className="p-1 rounded-full hover:bg-black/5 text-[#86868B]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px]">
              <span>Текущий масштаб:</span>
              <span className="font-mono text-[#0071E3] font-bold text-sm">{warpScale}</span>
            </div>
            <input 
              type="range" 
              min="0.05" 
              max="2.0" 
              step="0.05"
              value={warpScale}
              onChange={(e) => setWarpScale(parseFloat(e.target.value))}
              className="w-full accent-[#0071E3] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#86868B] font-medium pt-1">
              <span>← Огромные широкие</span>
              <span>Мелкие →</span>
            </div>
          </div>
        </aside>
      )}

      {/* ЦЕНТРАЛЬНАЯ КАРТИНА ХОЛСТА */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-6 sm:py-8 w-full">
        
        {stage === 'idle' && (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center -translate-y-2 sm:-translate-y-4 transition-transform duration-500">

            {/* РАСШИРЕННЫЙ 3D ХОЛСТ С 4 ОРБИТАМИ И 10 САПФИРОВЫМИ КАПСУЛАМИ */}
            <div className="w-[340px] h-[240px] sm:w-[460px] sm:h-[280px] md:w-[540px] md:h-[300px] relative flex items-center justify-center mb-1 sm:mb-2 shrink-0 overflow-visible">
              <div className="absolute inset-x-8 inset-y-4 rounded-full bg-gradient-to-tr from-[#0055ff]/18 via-[#23f7fb]/12 to-transparent blur-3xl pointer-events-none" />
              <canvas ref={canvasRef} className="relative z-10 w-full h-full pointer-events-none" />
            </div>

            {/* ЗАГОЛОВОК H1 */}
            <div className="w-full space-y-1.5 mb-7 sm:mb-8">
              <h1 className="text-[32px] sm:text-[46px] lg:text-[52px] font-black tracking-[-0.035em] leading-[1.08] text-[#1D1D1F]">
                <span>{t.h1_1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] via-[#23f7fb] to-[#0a23ff] mt-0.5">
                  {t.h1_2}
                </span>
              </h1>
            </div>

            {/* СТРОКА ВВОДА */}
            <form onSubmit={handleStartScan} className="w-full max-w-[540px] relative">
              <div 
                className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#0055ff] via-[#23f7fb] to-[#0a23ff] blur-xl transition-all duration-700 pointer-events-none ${
                  hasUrl 
                    ? 'opacity-60 scale-[1.02] shadow-[0_0_50px_rgba(35,247,251,0.4)]' 
                    : isInputFocused 
                      ? 'opacity-25 scale-[1.01]' 
                      : 'opacity-0 scale-95'
                }`} 
              />

              <div className="border-beam-container p-[1px] rounded-2xl relative z-10 bg-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <div className={`blue-border-beam transition-opacity duration-500 ${hasUrl || isInputFocused ? 'opacity-100' : 'opacity-35'}`} />
                
                <div className={`relative flex flex-col sm:flex-row items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${
                  hasUrl ? 'shadow-[0_0_0_2px_#0055ff]' : 'shadow-none'
                }`}>
                  
                  {/* Планета загорается только от ссылки */}
                  <div className="flex-1 w-full flex items-center gap-3 px-3.5 h-11 sm:h-12">
                    <div className="relative flex items-center justify-center shrink-0">
                      <div 
                        className={`absolute inset-0 rounded-full bg-[#23f7fb] blur-md transition-all duration-500 ${
                          hasUrl ? 'scale-150 opacity-90 animate-pulse' : 'scale-50 opacity-0'
                        }`} 
                      />
                      <Globe 
                        className={`relative z-10 w-5 h-5 transition-all duration-500 ${
                          hasUrl 
                            ? 'text-[#0055ff] drop-shadow-[0_0_12px_rgba(35,247,251,0.95)] scale-110 rotate-12' 
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
                      className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#1D1D1F] placeholder-[#86868B] focus:outline-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto h-11 px-5 sm:px-6 rounded-xl bg-[#0055ff] hover:bg-[#0a23ff] text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>{t.btn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            </form>

          </div>
        )}

        {/* ЭКРАН 2: ЛОАДЕР */}
        {stage === 'scanning' && (
          <div className="w-full max-w-[500px] p-6 sm:p-7 rounded-3xl bg-white/95 border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl space-y-5 text-center animate-fade-in">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3.5">
              <div className="text-left">
                <h3 className="text-base font-bold text-[#1D1D1F]">
                  {t.scanningTitle}
                </h3>
                <p className="text-xs text-[#0055ff] font-medium truncate max-w-[260px] mt-0.5 font-mono">
                  {url}
                </p>
              </div>

              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-black text-[#0055ff] tracking-tight">
                  {progress}
                </span>
                <span className="text-xs font-bold text-[#23f7fb]">%</span>
              </div>
            </div>

            <div className="w-full bg-black/[0.04] h-2 rounded-full overflow-hidden p-[1px]">
              <div 
                className="bg-gradient-to-r from-[#0055ff] via-[#23f7fb] to-[#0a23ff] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-2.5 text-left pt-1">
              {scanChecklist.map((item, idx) => {
                const stepThreshold = (idx + 1) * 20;
                const isPassed = progress >= stepThreshold;
                const isCurrent = progress < stepThreshold && progress >= stepThreshold - 20;

                return (
                  <div 
                    key={idx}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-400 ${
                      isPassed 
                        ? item.type === 'error'
                          ? 'bg-rose-50/60 border-rose-200'
                          : item.type === 'warn'
                            ? 'bg-amber-50/60 border-amber-200'
                            : 'bg-emerald-50/60 border-emerald-200'
                        : isCurrent
                          ? 'bg-white border-[#0055ff]/40 shadow-xs'
                          : 'bg-transparent border-transparent opacity-35'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isPassed ? (
                        item.type === 'error' ? (
                          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        ) : item.type === 'warn' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 text-[#0055ff] animate-spin shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                      )}
                      
                      <span className={`text-[12px] font-semibold ${isPassed ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>
                        {item.title}
                      </span>
                    </div>

                    {isPassed && (
                      <div className="pl-5.5 mt-1 text-[11px] leading-snug animate-fade-in font-medium">
                        <span className={
                          item.type === 'error' 
                            ? 'text-rose-700' 
                            : item.type === 'warn' 
                              ? 'text-amber-800' 
                              : 'text-emerald-700'
                        }>
                          {item.discovered}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ЭКРАН 3: ТИЗЕР */}
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
                    <span>Штрафы в Испании</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">Риск проверки регулятором</h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">Отсутствует обязательный NIF/CIF в футере...</p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">Штраф до €30,000</span>
                    <span className="text-rose-600 font-medium">Скрыто 🔒</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>Слив рекламы</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">Потеря ~35% заявок</h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">Клиенты уходят без быстрой связи в WhatsApp...</p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">Рекламный бюджет</span>
                    <span className="text-rose-600 font-medium">Скрыто 🔒</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-1.5">
                    <span>Карты Google</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1D1D1F]">Жалобы на недозвон</h4>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">Потеря клиентов в часы пиковых обращений...</p>
                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex justify-between text-[11px]">
                    <span className="text-[#86868B]">Подробности</span>
                    <span className="text-rose-600 font-medium">Скрыто 🔒</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.06] shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0055ff]/10 text-[#0055ff] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Полный 12-страничный аудит</span>
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
                      <span className="text-3xl sm:text-4xl font-black text-[#1D1D1F]">€19</span>
                      <span className="text-sm text-[#86868B] line-through">€150</span>
                    </div>
                    <span className="text-xs text-[#0055ff] font-medium block mt-0.5">
                      Мгновенный доступ + PDF копия
                    </span>
                  </div>

                  <button
                    onClick={handleStripeCheckout}
                    disabled={isRedirecting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0055ff] hover:bg-[#0a23ff] text-white font-bold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Подключение Stripe...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-current" />
                        <span>Открыть отчет за €19</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* НИЖНЯЯ ПЛАНКА */}
      <footer className="relative z-20 h-13 sm:h-14 border-t border-black/[0.05] bg-white/70 backdrop-blur-xl px-6 sm:px-8 flex items-center shrink-0">
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86868B] gap-2">
          <p>© 2026 Audit2Revenue.es — Сервис аудита и роста выручки сайтов в Испании.</p>
          <div className="flex items-center gap-4">
            <span>Comunidad de Madrid</span>
            <span>•</span>
            <span>Stripe 256-bit Encrypted</span>
          </div>
        </div>
      </footer>

    </div>
  );
}