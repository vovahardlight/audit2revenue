'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Sparkles, 
  Check, 
  Loader2, 
  ShieldAlert, 
  Lock 
} from 'lucide-react';

export default function AppleMinimalThreeLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Реф для 3D-холста Three.js
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ================= 3D АНИМАЦИЯ THREE.JS (APPLE FLUID PARTICLES) =================
  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Сцена, камера и рендерер
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 18, 38);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Создание сетки волны из частиц в цветах Apple Blue
    const countX = 55;
    const countY = 55;
    const numParticles = countX * countY;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    const baseColor = new THREE.Color(0x0071e3); // Apple Blue
    const lightColor = new THREE.Color(0x38bdf8); // Sky Cyan

    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const u = ix / countX;
        const v = iy / countY;
        positions[i] = (ix - countX / 2) * 1.5;
        positions[i + 1] = 0;
        positions[i + 2] = (iy - countY / 2) * 1.5;

        const mixedColor = baseColor.clone().lerp(lightColor, (u + v) * 0.5);
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;
        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Текстура круглой мягкой точки
    const canvasPoint = document.createElement('canvas');
    canvasPoint.width = 32;
    canvasPoint.height = 32;
    const ctx = canvasPoint.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(0, 113, 227, 1)');
      gradient.addColorStop(0.5, 'rgba(0, 113, 227, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 113, 227, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const pointTexture = new THREE.CanvasTexture(canvasPoint);

    const material = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      map: pointTexture,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Интерактивность мыши
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 4. Цикл анимации (плавная синусоидальная волна)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * 0.8;

      const positionAttribute = geometry.attributes.position;
      const posArray = positionAttribute.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < countX; ix++) {
        for (let iy = 0; iy < countY; iy++) {
          const x = posArray[idx];
          const z = posArray[idx + 2];
          // Формула органической волны Apple
          posArray[idx + 1] =
            Math.sin(x * 0.12 + elapsedTime) * 2.2 +
            Math.cos(z * 0.14 + elapsedTime * 1.1) * 2.2;
          idx += 3;
        }
      }
      positionAttribute.needsUpdate = true;

      // Мягкий наклон камеры за курсором
      camera.position.x += (mouseX * 25 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 20 + 18 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // 5. Обработка ресайза окна
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const scanSteps = [
    'Проверяем доступность сайта и мобильную версию на iPhone...',
    'Ищем утечки рекламного бюджета и проверяем связь в WhatsApp...',
    'Проверяем обязательные юридические данные для Испании (NIF/CIF)...',
    'Анализируем отзывы в картах: почему клиенты не доходят до звонка...',
    'Формируем список упущенной выручки и готовый отчет...'
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
    setScanStep(0);
  };

  useEffect(() => {
    if (stage === 'scanning') {
      const interval = setInterval(() => {
        setScanStep((prev) => {
          if (prev < scanSteps.length - 1) {
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
  }, [stage, scanSteps.length]);

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
      
      {/* 3D ХОЛСТ THREE.JS НА ФОНЕ */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* СТИЛИ АНИМАЦИИ И ЛУЧА */}
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3] flex items-center justify-center font-bold text-xs text-white shadow-md shadow-[#0071E3]/25">
              A2R
            </div>
            <div>
              <span className="font-semibold tracking-tight text-[#1D1D1F] text-sm">
                Audit<span className="text-[#0071E3]">2</span>Revenue
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#86868B]">
            <a href="#products" className="hover:text-[#1D1D1F] transition hidden sm:inline">Экосистема</a>
            <a href="#about" className="hover:text-[#1D1D1F] transition hidden sm:inline">Как это работает</a>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
              <span className="font-medium text-[#1D1D1F]">Испания (ES)</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= ГЛАВНЫЙ ЭКРАН ================= */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 py-16 md:py-28 flex flex-col justify-center text-center">
        
        {stage === 'idle' && (
          <div className="space-y-10">
            
            {/* Трастовый бейдж */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/[0.06] backdrop-blur-md shadow-sm text-xs text-[#424245]">
              <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Проверено более 1 400 сайтов и сервисов в Испании</span>
            </div>

            {/* ЗАГОЛОВОК H1 */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.14] text-[#1D1D1F]">
                <span>Найдите проблемы на сайте,</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-[#2563EB] to-[#0284C7] mt-1">
                  которые мешают вам зарабатывать.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#6E6E73] max-w-xl mx-auto leading-relaxed">
                Бесплатная проверка за 10 секунд. Покажем простыми словами, где вы теряете клиентов и как вернуть продажи.
              </p>
            </div>

            {/* СТРОКА ВВОДА С СИНЕЙ АНИМАЦИЕЙ (БЕЗ ВЫБОРА СТРАНЫ) */}
            <form onSubmit={handleStartScan} className="max-w-xl mx-auto w-full relative">
              
              {/* Синяя аура при фокусе */}
              <div 
                className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#0071E3] via-[#38BDF8] to-[#2563EB] blur-xl transition-all duration-700 pointer-events-none ${
                  isInputFocused 
                    ? 'opacity-40 scale-[1.02]' 
                    : 'opacity-0 scale-95'
                }`} 
              />

              {/* Сама форма ввода с лучом */}
              <div className="border-beam-container p-[1px] rounded-2xl relative z-10 bg-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className={`blue-border-beam transition-opacity duration-500 ${isInputFocused ? 'opacity-100' : 'opacity-40'}`} />
                
                <div className={`relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white/95 backdrop-blur-xl transition-all duration-500 ${
                  isInputFocused ? 'shadow-[0_0_0_2px_#0071E3]' : 'shadow-none'
                }`}>
                  
                  {/* Загорающаяся синяя планета */}
                  <div className="flex-1 w-full flex items-center gap-3 px-3">
                    <div className="relative flex items-center justify-center shrink-0">
                      <div 
                        className={`absolute inset-0 rounded-full bg-[#0071E3]/30 blur-md transition-all duration-500 ${
                          isInputFocused ? 'scale-150 opacity-100 animate-pulse' : 'scale-50 opacity-0'
                        }`} 
                      />
                      <Globe 
                        className={`relative z-10 w-5 h-5 transition-all duration-500 ${
                          isInputFocused 
                            ? 'text-[#0071E3] drop-shadow-[0_0_10px_rgba(0,113,227,0.8)] scale-110 rotate-12' 
                            : 'text-[#86868B]'
                        }`} 
                      />
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="https://vash-salon-ili-klinika.es"
                      value={url}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent text-sm sm:text-base text-[#1D1D1F] placeholder-[#86868B] focus:outline-none font-medium"
                    />
                  </div>

                  {/* Кнопка отправки */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-[#0071E3]/25 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>Проверить сайт</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-center gap-4 text-xs text-[#86868B]">
                <span>✓ Без доступа к админке</span>
                <span>•</span>
                <span>✓ Без установки кодов</span>
                <span>•</span>
                <span>✓ Результат за 10 секунд</span>
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
                <Globe className="w-6 h-6 text-[#0071E3]" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#1D1D1F]">
                Проверяем ваш сайт
              </h3>
              <p className="text-xs text-[#6E6E73] truncate">
                Цель: <span className="text-[#0071E3] font-medium">{url}</span>
              </p>
            </div>

            <div className="space-y-3 text-left pt-2">
              <div className="w-full bg-black/[0.05] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#0071E3] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                />
              </div>

              <div className="space-y-2.5 pt-2">
                {scanSteps.map((step, idx) => {
                  const isDone = idx < scanStep;
                  const isCurrent = idx === scanStep;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-3 text-xs transition duration-300 ${
                        isDone ? 'text-[#86868B]' : isCurrent ? 'text-[#1D1D1F] font-semibold' : 'text-[#AEAEB2]'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-[#0071E3] animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#D1D1D6] shrink-0" />
                      )}
                      <span className="truncate">{step}</span>
                    </div>
                  );
                })}
              </div>
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
                    className="w-full py-4 px-5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-[#0071E3]/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
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

      {/* ================= МНОГОКОЛОНОЧНЫЙ ФУТЕР APPLE С ДРУГИМИ ПРОДУКТАМИ ================= */}
      <footer className="relative z-10 border-t border-black/[0.06] bg-[#F5F5F7]/80 backdrop-blur-lg pt-14 pb-10 px-6 text-xs text-[#6E6E73]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Сетка колонок */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Колонка 1: Продукты */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F] tracking-tight">Экосистема</h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071E3] transition">Audit2Revenue Core</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">WhatsApp AI-Ассистент 24/7</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">LSSI-CE Монитор соответствия</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Google Maps Reputation Shield</a></li>
              </ul>
            </div>

            {/* Колонка 2: Решения по нишам */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F] tracking-tight">Решения</h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071E3] transition">Клиникам и салонам красоты</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Юридическим и консалтинговым бюро</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Локальным сервисам в Испании</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Для маркетинговых агентств</a></li>
              </ul>
            </div>

            {/* Колонка 3: Компания и ресурсы */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F] tracking-tight">Платформа</h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071E3] transition">О технологии Puppeteer & AI</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Реальные кейсы в Испании</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">База знаний AEPD & RGPD</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Поддержка клиентов</a></li>
              </ul>
            </div>

            {/* Колонка 4: Правовая информация */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#1D1D1F] tracking-tight">Законодательство ES</h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-[#0071E3] transition">Aviso Legal & Términos</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Política de Cookies</a></li>
                <li><a href="#" className="hover:text-[#0071E3] transition">Ley LSSI-CE 34/2002 Compliance</a></li>
              </ul>
            </div>

          </div>

          {/* Нижняя строчка копирайта */}
          <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#86868B]">
            <p>© 2026 Audit2Revenue.es — Сервис проверки и увеличения отдачи сайтов в Испании.</p>
            <div className="flex items-center gap-6">
              <span>Испания (Comunidad de Madrid)</span>
              <span>•</span>
              <span>Безопасные платежи Stripe</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}