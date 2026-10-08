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
  Loader2 
} from 'lucide-react';

type Lang = 'ru' | 'es' | 'en';

export default function AppleNeuralCloudLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [lang, setLang] = useState<Lang>('ru');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Флаг: ссылка вставлена (для активации сияния планеты)
  const hasUrl = useMemo(() => url.trim().length > 3, [url]);

  // Мультиязычный контент
  const t = {
    ru: {
      h1_1: 'Найдите проблемы на сайте,',
      h1_2: 'которые мешают вам зарабатывать.',
      btn: 'Проверить сайт',
      placeholder: 'https://vash-salon-ili-klinika.es',
    },
    es: {
      h1_1: 'Encuentra los fallos en tu web,',
      h1_2: 'que te hacen perder clientes.',
      btn: 'Analizar web',
      placeholder: 'https://tu-clinica-o-salon.es',
    },
    en: {
      h1_1: 'Find the website issues,',
      h1_2: 'that cost you customers.',
      btn: 'Analyze Website',
      placeholder: 'https://your-business.es',
    },
  }[lang];

  // ================= 3D МИЛОЕ ОБЛАКО С МОЛНИЯМИ НЕЙРОСЕТИ =================
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 28);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Группа всего облака
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    // 1. Формируем мягкое пушистое облако из кластеров частиц
    const sphereClusters = [
      { x: 0, y: 0.2, z: 0, r: 4.8 },
      { x: -3.6, y: -0.5, z: 0.4, r: 3.5 },
      { x: 3.6, y: -0.4, z: -0.4, r: 3.6 },
      { x: -1.9, y: 2.2, z: 0.2, r: 3.2 },
      { x: 1.9, y: 2.3, z: -0.2, r: 3.2 },
      { x: 0, y: -1.4, z: 1.2, r: 3.0 },
      { x: 0, y: 1.2, z: -1.4, r: 3.0 },
    ];

    const particleCountPerCluster = 320;
    const totalParticles = sphereClusters.length * particleCountPerCluster;
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);

    const colorWhite = new THREE.Color(0xffffff);
    const colorIceBlue = new THREE.Color(0xbae6fd);
    const colorAppleBlue = new THREE.Color(0x0071e3);

    let pIdx = 0;
    sphereClusters.forEach((c) => {
      for (let j = 0; j < particleCountPerCluster; j++) {
        const u = Math.random();
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const rad = Math.cbrt(u) * c.r;

        positions[pIdx] = c.x + rad * Math.sin(phi) * Math.cos(theta);
        positions[pIdx + 1] = c.y + rad * Math.sin(phi) * Math.sin(theta);
        positions[pIdx + 2] = c.z + rad * Math.cos(phi);

        // Градиент цвета от белого к лазурно-синему
        const blend = Math.random();
        const finalCol = blend > 0.4 
          ? colorWhite.clone().lerp(colorIceBlue, Math.random() * 0.7) 
          : colorIceBlue.clone().lerp(colorAppleBlue, Math.random() * 0.4);

        colors[pIdx] = finalCol.r;
        colors[pIdx + 1] = finalCol.g;
        colors[pIdx + 2] = finalCol.b;
        pIdx += 3;
      }
    });

    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    cloudGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Создаем круглую текстуру для мягких частиц облака
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.35, 'rgba(186, 230, 253, 0.6)');
      grad.addColorStop(0.7, 'rgba(0, 113, 227, 0.2)');
      grad.addColorStop(1, 'rgba(0, 113, 227, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const particleTex = new THREE.CanvasTexture(pCanvas);

    const cloudMat = new THREE.PointsMaterial({
      size: 1.4,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const cloudParticles = new THREE.Points(cloudGeo, cloudMat);
    cloudGroup.add(cloudParticles);

    // 2. Узлы нейросети (Neuron Matrix Nodes) внутри облака
    const neuronCount = 18;
    const neuronPositions: THREE.Vector3[] = [];
    for (let k = 0; k < neuronCount; k++) {
      neuronPositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 8.5,
          (Math.random() - 0.5) * 5.0,
          (Math.random() - 0.5) * 5.0
        )
      );
    }

    // 3. Создаем 3 линии синаптических молний, замыкающих веса
    const lightningCount = 3;
    const lightningLines: {
      line: THREE.Line;
      geo: THREE.BufferGeometry;
      mat: THREE.LineBasicMaterial;
      life: number;
    }[] = [];

    const segmentsPerBolt = 6;
    for (let l = 0; l < lightningCount; l++) {
      const lGeo = new THREE.BufferGeometry();
      const lPos = new Float32Array((segmentsPerBolt + 1) * 3);
      lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));

      const lMat = new THREE.LineBasicMaterial({
        color: l % 2 === 0 ? 0x0071e3 : 0x38bdf8,
        transparent: true,
        opacity: 0,
        linewidth: 2,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(lGeo, lMat);
      cloudGroup.add(line);
      lightningLines.push({ line, geo: lGeo, mat: lMat, life: 0 });
    }

    // Функция генерации извилистой молнии между двумя нейронами
    const sparkLightning = (index: number) => {
      const fromNode = neuronPositions[Math.floor(Math.random() * neuronCount)];
      let toNode = neuronPositions[Math.floor(Math.random() * neuronCount)];
      while (toNode === fromNode) {
        toNode = neuronPositions[Math.floor(Math.random() * neuronCount)];
      }

      const item = lightningLines[index];
      const posAttr = item.geo.attributes.position;
      const arr = posAttr.array as Float32Array;

      for (let s = 0; s <= segmentsPerBolt; s++) {
        const tVal = s / segmentsPerBolt;
        const current = new THREE.Vector3().lerpVectors(fromNode, toNode, tVal);
        
        // Добавляем зигзаг молнии (случайное отклонение в пространстве)
        if (s > 0 && s < segmentsPerBolt) {
          current.x += (Math.random() - 0.5) * 1.2;
          current.y += (Math.random() - 0.5) * 1.2;
          current.z += (Math.random() - 0.5) * 1.2;
        }

        arr[s * 3] = current.x;
        arr[s * 3 + 1] = current.y;
        arr[s * 3 + 2] = current.z;
      }
      posAttr.needsUpdate = true;
      item.life = 1.0;
      item.mat.opacity = 1.0;
    };

    // 4. Интерактивное слежение за мышью
    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
    };
    window.addEventListener('mousemove', handleMouse);

    // 5. Цикл анимации (дыхание облака + генерация молний)
    let reqId: number;
    let clock = new THREE.Clock();

    const render = () => {
      reqId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Мягкое покачивание и дыхание облака
      cloudGroup.position.y = Math.sin(elapsed * 1.1) * 0.45;
      cloudGroup.position.x = Math.cos(elapsed * 0.8) * 0.35;
      cloudGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.12;

      // Следование за мышью
      camera.position.x += (mouseX * 12 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 8 + 2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Замыкание молний нейросети
      lightningLines.forEach((bolt, idx) => {
        if (bolt.life > 0) {
          bolt.life -= 0.075;
          bolt.mat.opacity = Math.max(bolt.life, 0);
        } else if (Math.random() < 0.045) {
          sparkLightning(idx);
        }
      });

      renderer.render(scene, camera);
    };
    render();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      cloudGeo.dispose();
      cloudMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    let formatted = url.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
      setUrl(formatted);
    }
    setStage('scanning');
    setScanStep(0);
  };

  useEffect(() => {
    if (stage === 'scanning') {
      const interval = setInterval(() => {
        setScanStep((prev) => {
          if (prev < 4) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setStage('teaser'), 700);
            return prev;
          }
        });
      }, 1200);
      return () => clearInterval(interval);
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
      
      {/* 3D ХОЛСТ: МИЛОЕ НЕЙРОСЕТЕВОЕ ОБЛАКО */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* СТИЛИ АНИМАЦИИ */}
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

      {/* ================= ШАПКА С ПЕРЕКЛЮЧЕНИЕМ ЯЗЫКА ================= */}
      <header className="relative z-20 border-b border-black/[0.05] backdrop-blur-xl bg-white/70 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Логотип */}
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

      {/* ================= ГЛАВНЫЙ ЭКРАН: ТОЛЬКО СУТЬ И ВОЗДУХ ================= */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 py-20 md:py-32 flex flex-col justify-center text-center">
        
        {stage === 'idle' && (
          <div className="space-y-10">

            {/* H1 ЗАГОЛОВОК */}
            <div className="space-y-2 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.12] text-[#1D1D1F]">
                <span>{t.h1_1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-[#1E40AF] to-[#0284C7] mt-1.5">
                  {t.h1_2}
                </span>
              </h1>
            </div>

            {/* ИНПУТ С ЗАГОРАЮЩЕЙСЯ ПЛАНЕТОЙ И СИНЕЙ АНИМАЦИЕЙ */}
            <form onSubmit={handleStartScan} className="max-w-xl mx-auto w-full relative">
              
              {/* Синяя аура: разгорается ярче, когда ссылка вставлена */}
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
                  
                  {/* ПЛАНЕТКА: ЗАГОРАЕТСЯ СИНИМ ОГНЕМ, КОГДА ВСТАВЛЕНА ССЫЛКА */}
                  <div className="flex-1 w-full flex items-center gap-3 px-3">
                    <div className="relative flex items-center justify-center shrink-0">
                      
                      {/* Ореол сияния позади планеты */}
                      <div 
                        className={`absolute inset-0 rounded-full bg-[#0071E3] blur-md transition-all duration-500 ${
                          hasUrl 
                            ? 'scale-150 opacity-90 animate-pulse' 
                            : 'scale-50 opacity-0'
                        }`} 
                      />
                      
                      {/* Сама планета */}
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

                  {/* Кнопка запуска */}
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
        )}

        {/* ================= ЛОАДЕР (ЭКРАН 2) ================= */}
        {stage === 'scanning' && (
          <div className="max-w-md mx-auto w-full p-8 rounded-3xl bg-white/95 border border-black/[0.06] shadow-xl backdrop-blur-xl space-y-6 text-center animate-fade-in">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-[#0071E3]/20 border-t-[#0071E3] animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#0071E3] animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                Нейросеть сканирует сайт
              </h3>
              <p className="text-xs text-[#0071E3] font-medium truncate">
                {url}
              </p>
            </div>

            <div className="w-full bg-black/[0.05] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#0071E3] to-[#38BDF8] h-full transition-all duration-500 rounded-full"
                style={{ width: `${((scanStep + 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ================= ТИЗЕР И ПЕЙВОЛЛ €19 (ЭКРАН 3) ================= */}
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
                    <span>Рекламный бюджет</span>
                    <Lock className="w-3.5 h-3.5 text-[#86868B]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1D1D1F]">Слив ~35% заявок</h4>
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

      {/* ================= ФУТЕР APPLE ================= */}
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