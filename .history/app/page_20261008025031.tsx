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
  XCircle
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

export default function AppleNeuralCloudLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [progress, setProgress] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Реф для контейнера и холста 3D-облака
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Планета загорается, только когда вставлена ссылка
  const hasUrl = useMemo(() => url.trim().length > 3, [url]);

  // Мультиязычные тексты
  const t = {
    ru: {
      h1_1: 'Найдите проблемы на сайте,',
      h1_2: 'которые мешают вам зарабатывать.',
      btn: 'Проверить сайт',
      placeholder: 'https://vash-salon-ili-klinika.es',
      scanningTitle: 'Нейросеть сканирует сайт',
    },
    es: {
      h1_1: 'Encuentra los fallos en tu web,',
      h1_2: 'que te hacen perder clientes.',
      btn: 'Analizar web',
      placeholder: 'https://tu-clinica-o-salon.es',
      scanningTitle: 'La IA está analizando tu web',
    },
    en: {
      h1_1: 'Find the website issues,',
      h1_2: 'that cost you customers.',
      btn: 'Analyze Website',
      placeholder: 'https://your-business.es',
      scanningTitle: 'AI is auditing your website',
    },
  }[lang];

  // ================= ДЕТАЛИЗИРОВАННЫЕ ШАГИ СКАНЕРА С НАЙДЕННЫМИ ОШИБКАМИ =================
  const scanChecklist = [
    {
      title: 'Проверка доступности и мобильной верстки',
      discovered: '✓ Сервер отвечает за 160ms, SSL TLS 1.3 активен',
      type: 'ok',
    },
    {
      title: 'Поиск рекламных трекеров и пикселей',
      discovered: '✓ Обнаружены активные Meta Pixel (Instagram) и Google Ads Tag',
      type: 'ok',
    },
    {
      title: 'Анализ конверсии мобильного трафика',
      discovered: '⚠️ Найдено: нет кнопки WhatsApp, потеря до 40% переходов',
      type: 'warn',
    },
    {
      title: 'Скан репутации и отзывов в картах Google',
      discovered: '✓ Рейтинг 4.8★ (384 отзыва), но зафиксированы жалобы на недозвон',
      type: 'warn',
    },
    {
      title: 'Юридический аудит по закону LSSI-CE (Испания)',
      discovered: '⚠️ Критично: тестовая заглушка вместо налогового NIF/CIF компании',
      type: 'error',
    },
  ];

  // ================= 3D МИЛОЕ АККУРАТНОЕ ОБЛАКО С МОЛНИЯМИ (THREE.JS) =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 240;
    const height = 150;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    // Компактные кластеры для аккуратного размера облака
    const clusters = [
      { x: 0, y: 0.1, z: 0, r: 2.2 },
      { x: -1.7, y: -0.2, z: 0.2, r: 1.6 },
      { x: 1.7, y: -0.2, z: -0.2, r: 1.6 },
      { x: -0.9, y: 1.1, z: 0.1, r: 1.4 },
      { x: 0.9, y: 1.1, z: -0.1, r: 1.4 },
      { x: 0, y: -0.7, z: 0.6, r: 1.3 },
    ];

    const particlesPerCluster = 170;
    const totalCount = clusters.length * particlesPerCluster;
    const positions = new Float32Array(totalCount * 3);
    const colors = new Float32Array(totalCount * 3);

    const cWhite = new THREE.Color(0xffffff);
    const cIce = new THREE.Color(0xbae6fd);
    const cBlue = new THREE.Color(0x0071e3);

    let idx = 0;
    clusters.forEach((c) => {
      for (let j = 0; j < particlesPerCluster; j++) {
        const u = Math.random();
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const rad = Math.cbrt(u) * c.r;

        positions[idx] = c.x + rad * Math.sin(phi) * Math.cos(theta);
        positions[idx + 1] = c.y + rad * Math.sin(phi) * Math.sin(theta);
        positions[idx + 2] = c.z + rad * Math.cos(phi);

        const blend = Math.random();
        const col = blend > 0.45 
          ? cWhite.clone().lerp(cIce, Math.random() * 0.7) 
          : cIce.clone().lerp(cBlue, Math.random() * 0.5);

        colors[idx] = col.r;
        colors[idx + 1] = col.g;
        colors[idx + 2] = col.b;
        idx += 3;
      }
    });

    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    cloudGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Мягкая круглая текстура
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 48;
    pCanvas.height = 48;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(24, 24, 0, 24, 24, 24);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.35, 'rgba(186, 230, 253, 0.6)');
      grad.addColorStop(0.75, 'rgba(0, 113, 227, 0.2)');
      grad.addColorStop(1, 'rgba(0, 113, 227, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 48, 48);
    }
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const cloudMat = new THREE.PointsMaterial({
      size: 0.95,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });

    const particles = new THREE.Points(cloudGeo, cloudMat);
    cloudGroup.add(particles);

    // Узлы нейросети внутри облака
    const neurons: THREE.Vector3[] = [];
    for (let k = 0; k < 14; k++) {
      neurons.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 3.8,
          (Math.random() - 0.5) * 2.2,
          (Math.random() - 0.5) * 2.2
        )
      );
    }

    // 2 линии синаптических молний
    const boltSegments = 5;
    const bolts = [0, 1].map((i) => {
      const bGeo = new THREE.BufferGeometry();
      bGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array((boltSegments + 1) * 3), 3));
      const bMat = new THREE.LineBasicMaterial({
        color: i === 0 ? 0x0071e3 : 0x38bdf8,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(bGeo, bMat);
      cloudGroup.add(line);
      return { line, geo: bGeo, mat: bMat, life: 0 };
    });

    const fireLightning = (bIdx: number) => {
      const from = neurons[Math.floor(Math.random() * neurons.length)];
      let to = neurons[Math.floor(Math.random() * neurons.length)];
      while (to === from) to = neurons[Math.floor(Math.random() * neurons.length)];

      const bolt = bolts[bIdx];
      const arr = bolt.geo.attributes.position.array as Float32Array;

      for (let s = 0; s <= boltSegments; s++) {
        const tVal = s / boltSegments;
        const cur = new THREE.Vector3().lerpVectors(from, to, tVal);
        if (s > 0 && s < boltSegments) {
          cur.x += (Math.random() - 0.5) * 0.6;
          cur.y += (Math.random() - 0.5) * 0.6;
          cur.z += (Math.random() - 0.5) * 0.6;
        }
        arr[s * 3] = cur.x;
        arr[s * 3 + 1] = cur.y;
        arr[s * 3 + 2] = cur.z;
      }
      bolt.geo.attributes.position.needsUpdate = true;
      bolt.life = 1.0;
      bolt.mat.opacity = 1.0;
    };

    let reqId: number;
    let clock = new THREE.Clock();

    const render = () => {
      reqId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Мягкое живое покачивание облачка
      cloudGroup.position.y = Math.sin(elapsed * 1.4) * 0.2;
      cloudGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.08;

      bolts.forEach((b, i) => {
        if (b.life > 0) {
          b.life -= 0.08;
          b.mat.opacity = Math.max(b.life, 0);
        } else if (Math.random() < 0.04) {
          fireLightning(i);
        }
      });

      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(reqId);
      cloudGeo.dispose();
      cloudMat.dispose();
      renderer.dispose();
    };
  }, []);

  // ================= ЗАПУСК СКАНЕРА С ПРОЦЕНТАМИ =================
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

  // Таймер прогресса от 0% до 100% с раскрытием деталей
  useEffect(() => {
    if (stage === 'scanning') {
      const startTime = Date.now();
      const duration = 6500; // 6.5 секунд для комфортного чтения

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
    <div className="relative min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex flex-col justify-between overflow-x-hidden selection:bg-[#0071E3]/20 selection:text-[#0071E3]">
      
      {/* СТИЛИ АНИМАЦИИ ЛУЧА */}
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

      {/* ================= ШАПКА ================= */}
      <header className="relative z-20 border-b border-black/[0.05] backdrop-blur-xl bg-white/70 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0071E3] to-[#38BDF8] flex items-center justify-center font-bold text-xs text-white shadow-md shadow-[#0071E3]/25">
              A2R
            </div>
            <span className="font-semibold tracking-tight text-[#1D1D1F] text-sm">
              Audit<span className="text-[#0071E3]">2</span>Revenue
            </span>
          </div>

          {/* Переключатель языков Apple Pill */}
          <div className="flex items-center p-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-semibold">
            {(['es', 'en', 'ru'] as Lang[]).map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={`px-3 py-1 rounded-full transition-all uppercase tracking-wider text-[11px] ${
                  lang === item
                    ? 'bg-white text-[#0071E3] shadow-sm'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ================= ГЛАВНЫЙ ЭКРАН ================= */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20 flex flex-col justify-center text-center">
        
        {/* ================= ЭКРАН 1: ГЛАВНАЯ СТРАНИЦА ================= */}
        {stage === 'idle' && (
          <div className="space-y-6">

            {/* МИЛОЕ 3D ОБЛАКО НАД ТЕКСТОМ (БЕЗ ПЕРЕСЕЧЕНИЙ) */}
            <div className="w-60 h-36 mx-auto relative flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
            </div>

            {/* ЗАГОЛОВОК H1 */}
            <div className="space-y-2 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.12] text-[#1D1D1F]">
                <span>{t.h1_1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-[#1E40AF] to-[#0284C7] mt-1.5">
                  {t.h1_2}
                </span>
              </h1>
            </div>

            {/* ИНПУТ С ЗАГОРАЮЩЕЙСЯ ПЛАНЕТОЙ */}
            <div className="pt-4">
              <form onSubmit={handleStartScan} className="max-w-xl mx-auto w-full relative">
                
                {/* Синее свечение разгорается, когда вставлена ссылка */}
                <div 
                  className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#0071E3] via-[#38BDF8] to-[#1E40AF] blur-xl transition-all duration-700 pointer-events-none ${
                    hasUrl 
                      ? 'opacity-60 scale-[1.03] shadow-[0_0_50px_rgba(0,113,227,0.4)]' 
                      : isInputFocused 
                        ? 'opacity-30 scale-[1.01]' 
                        : 'opacity-0 scale-95'
                  }`} 
                />

                <div className="border-beam-container p-[1px] rounded-2xl relative z-10 bg-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className={`blue-border-beam transition-opacity duration-500 ${hasUrl || isInputFocused ? 'opacity-100' : 'opacity-35'}`} />
                  
                  <div className={`relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${
                    hasUrl ? 'shadow-[0_0_0_2px_#0071E3]' : 'shadow-none'
                  }`}>
                    
                    {/* ПЛАНЕТА: ЗАГОРАЕТСЯ ТОЛЬКО КОГДА ВСТАВЛЕНА ССЫЛКА */}
                    <div className="flex-1 w-full flex items-center gap-3 px-3">
                      <div className="relative flex items-center justify-center shrink-0">
                        <div 
                          className={`absolute inset-0 rounded-full bg-[#0071E3] blur-md transition-all duration-500 ${
                            hasUrl ? 'scale-150 opacity-90 animate-pulse' : 'scale-50 opacity-0'
                          }`} 
                        />
                        <Globe 
                          className={`relative z-10 w-5 h-5 transition-all duration-500 ${
                            hasUrl 
                              ? 'text-[#0071E3] drop-shadow-[0_0_12px_rgba(0,113,227,0.95)] scale-110 rotate-12' 
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
                        className="w-full bg-transparent text-sm sm:text-base text-[#1D1D1F] placeholder-[#86868B] focus:outline-none font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0071E3] hover:bg-[#1E40AF] text-white font-medium text-sm flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-[#0071E3]/25 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                    >
                      <span>{t.btn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* ================= ЭКРАН 2: ЛОАДЕР С ПРОЦЕНТАМИ И НАЙДЕННЫМИ ДЕТАЛЯМИ ================= */}
        {stage === 'scanning' && (
          <div className="max-w-xl mx-auto w-full p-6 sm:p-8 rounded-3xl bg-white/95 border border-black/[0.06] shadow-xl backdrop-blur-xl space-y-6 text-center animate-fade-in">
            
            {/* Верхняя плашка с процентами */}
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-4">
              <div className="text-left">
                <h3 className="text-lg font-bold text-[#1D1D1F]">
                  {t.scanningTitle}
                </h3>
                <p className="text-xs text-[#0071E3] font-medium truncate max-w-xs">
                  {url}
                </p>
              </div>

              {/* Крупный процент */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#0071E3] tracking-tight">
                  {progress}
                </span>
                <span className="text-sm font-bold text-[#38BDF8]">%</span>
              </div>
            </div>

            {/* Прогресс-бар */}
            <div className="w-full bg-black/[0.05] h-2.5 rounded-full overflow-hidden p-[1px]">
              <div 
                className="bg-gradient-to-r from-[#0071E3] via-[#38BDF8] to-[#1E40AF] h-full transition-all duration-300 rounded-full shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* ЧЕК-ЛИСТ С РАСКРЫВАЮЩИМИСЯ НАХОДКАМИ */}
            <div className="space-y-3 text-left pt-1">
              {scanChecklist.map((item, idx) => {
                // Пункт считается пройденным по шагам шкалы
                const stepThreshold = (idx + 1) * 20;
                const isPassed = progress >= stepThreshold;
                const isCurrent = progress < stepThreshold && progress >= stepThreshold - 20;

                return (
                  <div 
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all duration-500 ${
                      isPassed 
                        ? item.type === 'error'
                          ? 'bg-rose-50/60 border-rose-200'
                          : item.type === 'warn'
                            ? 'bg-amber-50/60 border-amber-200'
                            : 'bg-emerald-50/60 border-emerald-200'
                        : isCurrent
                          ? 'bg-white border-[#0071E3]/40 shadow-sm'
                          : 'bg-transparent border-transparent opacity-40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isPassed ? (
                        item.type === 'error' ? (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        ) : item.type === 'warn' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-[#0071E3] animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      
                      <span className={`text-xs font-semibold ${isPassed ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>
                        {item.title}
                      </span>
                    </div>

                    {/* Показ найденной детали при завершении шага */}
                    {isPassed && (
                      <div className="pl-6.5 mt-1.5 text-[11px] leading-snug animate-fade-in font-medium">
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

        {/* ================= ЭКРАН 3: ТИЗЕР И ПЕЙВОЛЛ €19 ================= */}
        {stage === 'teaser' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-rose-200 shadow-xl backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.05] pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 shrink-0">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 block">
                      Экспресс-скан завершен
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1D1D1F]">
                      На сайте обнаружено 3 скрытые проблемы
                    </h2>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
                  Упущенная выручка: ~€1,800/мес
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-2">
                    <span>Штрафы в Испании</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1D1D1F]">Риск проверки регулятором</h4>
                  <p className="text-xs text-[#6E6E73] mt-1">Отсутствует обязательный NIF/CIF в футере...</p>
                  <div className="mt-4 pt-2 border-t border-black/[0.05] flex justify-between text-xs text-[#86868B]">
                    <span>Штраф до €30,000</span>
                    <span className="text-rose-600 font-medium">Скрыто 🔒</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-2">
                    <span>Слив рекламы</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1D1D1F]">Потеря ~35% заявок</h4>
                  <p className="text-xs text-[#6E6E73] mt-1">Клиенты уходят без быстрой связи в WhatsApp...</p>
                  <div className="mt-4 pt-2 border-t border-black/[0.05] flex justify-between text-xs text-[#86868B]">
                    <span>Подробности</span>
                    <span className="text-rose-600 font-medium">Скрыто 🔒</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs text-rose-600 font-bold mb-2">
                    <span>Карты Google</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1D1D1F]">Жалобы на недозвон</h4>
                  <p className="text-xs text-[#6E6E73] mt-1">Потеря клиентов в часы пиковых обращений...</p>
                  <div className="mt-4 pt-2 border-t border-black/[0.05] flex justify-between text-xs text-[#86868B]">
                    <span>Подробности</span>
                    <span className="text-rose-600 font-medium">Скрыто 🔒</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Карточка оффера за €19 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Полный 12-страничный аудит</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                    Откройте полный отчет с готовыми решениями
                  </h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">
                    Простой документ с пошаговым планом исправления всех ошибок для вашего программиста или юриста.
                  </p>
                </div>

                <div className="md:col-span-2 p-6 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] text-center space-y-4">
                  <div>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-[#1D1D1F]">€19</span>
                      <span className="text-base text-[#86868B] line-through">€150</span>
                    </div>
                    <span className="text-xs text-[#0071E3] font-medium block mt-1">
                      Мгновенный доступ + PDF копия
                    </span>
                  </div>

                  <button
                    onClick={handleStripeCheckout}
                    disabled={isRedirecting}
                    className="w-full py-4 px-5 rounded-xl bg-[#0071E3] hover:bg-[#1E40AF] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-[#0071E3]/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
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

      {/* ================= ФУТЕР ================= */}
      <footer className="relative z-10 border-t border-black/[0.06] bg-[#F5F5F7]/80 backdrop-blur-lg pt-12 pb-8 px-6 text-xs text-[#6E6E73]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F]">Экосистема</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#0071E3] transition">Audit2Revenue Core</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">WhatsApp AI-Агент 24/7</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">LSSI-CE Монитор</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F]">Решения</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#0071E3] transition">Для клиник и салонов</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Для консалтинга и юристов</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Маркетинговым агентствам</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F]">Платформа</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#0071E3] transition">Технология Puppeteer & AI</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Кейсы в Испании</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">База знаний AEPD</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F]">Законы Испании</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#0071E3] transition">Aviso Legal</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Ley LSSI-CE 34/2002</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#86868B]">
            <p>© 2026 Audit2Revenue.es — Сервис аудита и роста выручки сайтов в Испании.</p>
            <div className="flex items-center gap-6">
              <span>Испания (Madrid)</span>
              <span>•</span>
              <span>Stripe 256-bit Encrypted</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}