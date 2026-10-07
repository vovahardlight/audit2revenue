'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Sparkles, 
  Activity, 
  Cpu, 
  MapPin, 
  MessageCircle, 
  FileWarning, 
  Check, 
  Loader2, 
  PhoneOff 
} from 'lucide-react';

export default function AwwwardsCinematicLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [country, setCountry] = useState('ES');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Мышиный спотлайт
  const [mousePos, setMousePos] = useState({ x: 600, y: 300 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scanSteps = [
    'Инициализация виртуального браузера Puppeteer (Node Madrid)...',
    'Проверка ст. 10 закона LSSI-CE и соответствия нормам AEPD...',
    'Анализ Meta Pixel и воронки быстрого захвата в WhatsApp...',
    'Сентимент-анализ профиля и скрытых жалоб в Google Maps...',
    'Формирование матрицы упущенной выгоды и скоринга...'
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
        body: JSON.stringify({ targetUrl: url, country }),
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
    <div 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#030508] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200"
    >
      
      {/* ================= 1. БЕЛЫЙ КИНЕМАТОГРАФИЧЕСКИЙ ЗАНАВЕС ================= */}
      {/* Стартует чистым белым цветом и плавно растворяется в темноту, исключая любые рывки */}
      <div className="fixed inset-0 z-50 bg-white pointer-events-none animate-white-dissolve" />

      {/* ================= СТИЛИ АНИМАЦИИ ================= */}
      <style jsx global>{`
        :root {
          --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Плавное затухание белого экрана в темноту */
        @keyframes white-dissolve {
          0% {
            opacity: 1;
            visibility: visible;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        .animate-white-dissolve {
          animation: white-dissolve 1.1s var(--ease-cinematic) forwards;
        }

        /* Мягкое появление элементов из тени */
        @keyframes cinematic-reveal {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* Применяем анимацию появления с сохранением финального состояния */
        .reveal-node {
          animation: cinematic-reveal 1s var(--ease-cinematic) forwards;
        }

        /* Задержки, выверенные точно под растворение белого экрана */
        .delay-nav { animation-delay: 350ms; }
        .delay-ticker { animation-delay: 500ms; }
        .delay-h1 { animation-delay: 650ms; }
        .delay-p { animation-delay: 800ms; }
        .delay-input { animation-delay: 950ms; }
        .delay-bento { animation-delay: 1100ms; }
        .delay-trust { animation-delay: 1250ms; }

        /* Перламутровый луч по тексту */
        @keyframes text-light-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg, 
            #ffffff 0%, 
            #ffffff 35%, 
            #fda4af 50%, 
            #ffffff 65%, 
            #ffffff 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          animation: text-light-sweep 7s ease-in-out infinite;
        }

        /* Вращение фотонного луча на Command Bar */
        @keyframes border-beam-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .border-beam-container {
          position: relative;
          overflow: hidden;
        }
        .border-beam {
          position: absolute;
          width: 170%;
          height: 400%;
          top: -150%;
          left: -35%;
          background: conic-gradient(
            transparent 0deg,
            transparent 280deg,
            #f43f5e 320deg,
            #fbbf24 350deg,
            transparent 360deg
          );
          animation: border-beam-rotate 4s linear infinite;
        }
      `}</style>

      {/* Фоновый интерактивный спотлайт */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(244, 63, 94, 0.08), transparent 80%)`,
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:32px_32px] opacity-70 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#030508]/70 to-[#030508] z-0" />

      {/* ================= ШАПКА ================= */}
      <header className="relative z-20 border-b border-white/[0.06] backdrop-blur-xl bg-[#030508]/60 px-6 py-4 opacity-0 reveal-node delay-nav">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 p-[1px] shadow-lg shadow-rose-950/50">
              <div className="w-full h-full bg-[#06090E] rounded-[7px] flex items-center justify-center font-black text-xs text-white">
                A2R
              </div>
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-sm">
                Audit<span className="text-rose-500">2</span>Revenue
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-300">
                Spain Node 2.6
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">Кластер активен (Madrid Datacenter)</span>
          </div>
        </div>
      </header>

      {/* ================= ОСНОВНОЙ КОНТЕНТ ================= */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col justify-center">

        {/* ===================== ЭКРАН 1: ГЛАВНЫЙ ЭКРАН ===================== */}
        {stage === 'idle' && (
          <div className="space-y-12 text-center">
            
            {/* 1. Живой тикер */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl text-xs text-slate-300 shadow-inner opacity-0 reveal-node delay-ticker hover:border-white/20 transition">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Только что проверен:</span>
              <span className="text-white font-medium">clinica-dental***.es (Madrid)</span>
              <span className="text-rose-400 font-mono text-[11px]">— найдено €2,100 утечки</span>
            </div>

            {/* 2. Заголовок H1 */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] opacity-0 reveal-node delay-h1">
                <span className="shimmer-text block">Анатомия скрытых утечек:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
                  сколько евро теряет ваш сайт каждый день?
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed opacity-0 reveal-node delay-p">
                Глубокий ИИ-скан соответствия закону <strong className="text-slate-200">LSSI-CE</strong>, эффективности рекламы Meta/Google и недозвонов в Google Maps за 10 секунд.
              </p>
            </div>

            {/* 3. COMMAND BAR: АНИМИРОВАННОЕ СИЯНИЕ И ЗАГОРАЮЩАЯСЯ ПЛАНЕТА */}
            <form onSubmit={handleStartScan} className="max-w-2xl mx-auto w-full relative opacity-0 reveal-node delay-input">
              
              {/* Внешнее глубокое неоновое сияние (разгорается при фокусе) */}
              <div 
                className={`absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600 blur-xl transition-all duration-700 pointer-events-none ${
                  isInputFocused 
                    ? 'opacity-85 scale-[1.03] shadow-[0_0_80px_rgba(244,63,94,0.45)]' 
                    : 'opacity-0 scale-95'
                }`} 
              />

              {/* Контейнер поля с фотонным лучом */}
              <div className="border-beam-container p-[1px] rounded-2xl relative z-10 transition-shadow duration-500">
                <div className={`border-beam transition-opacity duration-500 ${isInputFocused ? 'opacity-100' : 'opacity-60'}`} />
                
                <div className={`relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-[#06080D] border backdrop-blur-2xl transition-colors duration-500 ${
                  isInputFocused ? 'border-rose-500/60 shadow-[inset_0_0_20px_rgba(244,63,94,0.15)]' : 'border-white/10'
                }`}>
                  
                  {/* Область планеты и ввода URL */}
                  <div className="flex-1 w-full flex items-center gap-3 px-3">
                    
                    {/* ЗАГОРАЮЩАЯСЯ ПЛАНЕТА */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <div 
                        className={`absolute inset-0 rounded-full bg-rose-500/50 blur-md transition-all duration-500 ${
                          isInputFocused ? 'scale-150 opacity-100 animate-pulse' : 'scale-50 opacity-0'
                        }`} 
                      />
                      
                      <Globe 
                        className={`relative z-10 w-5 h-5 transition-all duration-500 ${
                          isInputFocused 
                            ? 'text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.95)] scale-110 rotate-12' 
                            : 'text-slate-500'
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
                      className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-medium"
                    />

                    {url.length > 5 && (
                      <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        DETECTED
                      </span>
                    )}
                  </div>

                  {/* Страна и кнопка запуска */}
                  <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      aria-label="Страна юрисдикции"
                      className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer py-2 font-mono"
                    >
                      <option value="ES" className="bg-slate-900 text-white">🇪🇸 España (LSSI-CE)</option>
                      <option value="MX" className="bg-slate-900 text-white">🇲🇽 México</option>
                      <option value="EU" className="bg-slate-900 text-white">🇪🇺 Другая (EU)</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-rose-950/50 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                    >
                      <span>Экспресс-скан</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
                <span>🔒 Изолированный sandbox Puppeteer</span>
                <span>•</span>
                <span>⚡ Без установки скриптов</span>
                <span>•</span>
                <span>🇪🇸 Стандарт AEPD 2026</span>
              </div>
            </form>

            {/* ================= 4. BENTO-ПУЛЬТ ТЕЛЕМЕТРИИ ================= */}
            <div className="pt-8 max-w-5xl mx-auto opacity-0 reveal-node delay-bento">
              
              <div className="flex items-center justify-between pb-3 px-1 border-b border-white/5 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>ДИАГНОСТИЧЕСКАЯ МАТРИЦА // 4 ВЕКТОРА АУДИТА</span>
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  STANDBY // ГОТОВ К ИНСПЕКЦИИ САЙТА
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-left">
                
                {/* 1. LSSI-CE & AEPD */}
                <div className="p-4 rounded-2xl bg-[#070A10]/90 border border-white/10 hover:border-rose-500/40 transition-all duration-300 group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FileWarning className="w-3.5 h-3.5" /> Закон LSSI-CE
                    </span>
                    <span className="text-[9px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 px-1.5 py-0.5 rounded">
                      Art. 10 Ley 34/2002
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">Риск штрафов AEPD</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    Проверка NIF/CIF, юридического адреса и согласий Cookie.
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>SSL Handshake:</span>
                      <span className="text-emerald-400">✓ TLS 1.3</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>NIF/CIF в футере:</span>
                      <span className="text-rose-400 font-bold">НЕТ ⚠️</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-500 flex justify-between items-center">
                    <span>Штраф регулятора:</span>
                    <span className="text-rose-400 font-bold font-mono">До €30,000</span>
                  </div>
                </div>

                {/* 2. META ADS & WHATSAPP */}
                <div className="p-4 rounded-2xl bg-[#070A10]/90 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" /> Слив Трафика
                    </span>
                    <span className="text-[9px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">
                      Meta Pixel
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">Отсутствие WhatsApp</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    78% испанцев уходят, если на сайте нет быстрой связи в мессенджере.
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Форма на сайте:</span>
                      <span className="text-slate-500">~2.4% conv</span>
                    </div>
                    <div className="flex items-center justify-between text-amber-300 font-bold">
                      <span>Прямой WhatsApp:</span>
                      <span className="text-emerald-400">~8.9% conv</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-500 flex justify-between items-center">
                    <span>Утечка бюджета:</span>
                    <span className="text-amber-400 font-bold font-mono">~35-40% лидов</span>
                  </div>
                </div>

                {/* 3. GOOGLE MAPS */}
                <div className="p-4 rounded-2xl bg-[#070A10]/90 border border-white/10 hover:border-blue-500/40 transition-all duration-300 group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Репутация Maps
                    </span>
                    <span className="text-[9px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20 px-1.5 py-0.5 rounded">
                      Places API
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">Жалобы на недозвон</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    Скрытые причины, почему клиенты не доходят до бронирования.
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Рейтинг Google:</span>
                      <span className="text-amber-400">4.8 ★ (280+)</span>
                    </div>
                    <div className="flex items-center justify-between text-rose-300">
                      <span className="flex items-center gap-1"><PhoneOff className="w-3 h-3" /> «Не ответили»:</span>
                      <span className="font-bold">7 жалоб</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-500 flex justify-between items-center">
                    <span>Узкое горлышко:</span>
                    <span className="text-rose-400 font-bold font-mono">Потеря звонков</span>
                  </div>
                </div>

                {/* 4. DOM & КОД */}
                <div className="p-4 rounded-2xl bg-[#070A10]/90 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> Код & Скорость
                    </span>
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      Core Web Vitals
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">Mixed Content & JS</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    Поиск блокирующих скриптов и ошибок верстки на смартфонах iOS.
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Сервер TTFB:</span>
                      <span className="text-emerald-400">142ms</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Смешанный HTTP:</span>
                      <span className="text-rose-400 font-bold">Отказ ~22%</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-500 flex justify-between items-center">
                    <span>Инспекция:</span>
                    <span className="text-emerald-400 font-bold font-mono">Retina 390px</span>
                  </div>
                </div>

              </div>

            </div>

            {/* 5. Trust Badges */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-xs font-mono grayscale opacity-70 opacity-0 reveal-node delay-trust">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Puppeteer v22</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Google Places Verified</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> OpenAI GPT-4o Intelligence</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Stripe 256-bit Encrypted</span>
            </div>

          </div>
        )}

        {/* ===================== ЭКРАН 2: ТЕЛЕМЕТРИЯ СКАНЕРА ===================== */}
        {stage === 'scanning' && (
          <div className="max-w-lg mx-auto w-full p-8 rounded-3xl bg-[#090D15]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6 text-center animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 animate-ping" />
              <div className="w-20 h-20 rounded-full border-4 border-rose-500 border-t-transparent animate-spin flex items-center justify-center">
                <Cpu className="w-7 h-7 text-rose-400" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                ИИ-диагностика цифровой инфраструктуры
              </h3>
              <p className="text-xs text-slate-400 font-mono truncate">
                Цель: <span className="text-amber-400">{url}</span>
              </p>
            </div>

            <div className="space-y-3 text-left pt-2">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 h-full transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                />
              </div>

              <div className="space-y-2 pt-2">
                {scanSteps.map((step, idx) => {
                  const isDone = idx < scanStep;
                  const isCurrent = idx === scanStep;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-3 text-xs transition duration-300 ${
                        isDone ? 'text-slate-400' : isCurrent ? 'text-white font-medium' : 'text-slate-600'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <span className="truncate">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================== ЭКРАН 3: ТИЗЕР И PAYWALL €19 ===================== */}
        {stage === 'teaser' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-950/20 to-black/60 border border-rose-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 shrink-0">
                    <ShieldAlert className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                      КРИТИЧЕСКИЙ СТАТУС СКАНЕРА
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Обнаружено 3 зоны системной потери выручки
                    </h2>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  Упущенная выручка: ~€1,800/мес
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-5 rounded-2xl bg-black/60 border border-rose-500/20 relative group hover:border-rose-500/40 transition">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Штрафы AEPD
                    </span>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Ley LSSI-CE: Нарушение ст. 10</h4>
                  <div className="mt-2 space-y-1">
                    <div className="h-3 bg-white/10 rounded filter blur-[3px]" />
                    <div className="h-3 w-4/5 bg-white/10 rounded filter blur-[3px]" />
                  </div>
                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Риск проверки</span>
                    <span className="text-rose-400 font-mono font-semibold">До €30,000 🔒</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-rose-500/20 relative group hover:border-rose-500/40 transition">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Слив Рекламы
                    </span>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Утечка ~35% лидов из Meta Ads</h4>
                  <div className="mt-2 space-y-1">
                    <div className="h-3 bg-white/10 rounded filter blur-[3px]" />
                    <div className="h-3 w-3/5 bg-white/10 rounded filter blur-[3px]" />
                  </div>
                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>WhatsApp-воронка</span>
                    <span className="text-rose-400 font-mono font-semibold">Отсутствует 🔒</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-rose-500/20 relative group hover:border-rose-500/40 transition">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Репутация Maps
                    </span>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Жалобы на недозвон клиентов</h4>
                  <div className="mt-2 space-y-1">
                    <div className="h-3 bg-white/10 rounded filter blur-[3px]" />
                    <div className="h-3 w-5/6 bg-white/10 rounded filter blur-[3px]" />
                  </div>
                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Цитаты и скрины</span>
                    <span className="text-rose-400 font-mono font-semibold">Скрыто 🔒</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-amber-500/30 backdrop-blur-2xl shadow-2xl relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Полный 12-страничный экспертный аудит</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    Разблокируйте полный технический отчет с готовым планом устранения
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Готовый документ для передачи разработчику или юристу. Содержит точные куски кода, юридические тексты и расчет недозвонов.
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-1">
                    {[
                      'Юридический аудит соответствия LSSI-CE и RGPD (готовый текст Aviso Legal)',
                      'Точные ошибки кода: смешанный контент HTTP/HTTPS и битые переменные JS',
                      'Выгрузка жалоб клиентов из Google Maps с точным расчетом недозвонов',
                      'Калькулятор упущенных записей от отсутствия быстрого чата WhatsApp'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 p-6 rounded-2xl bg-black/70 border border-white/10 text-center space-y-4 shadow-2xl">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-widest text-slate-400 font-mono">
                      ЕДИНОВРЕМЕННЫЙ ПЛАТЕЖ
                    </span>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white">€19</span>
                      <span className="text-base text-slate-500 line-through">€150</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium block">
                      ✓ Мгновенный доступ + PDF копия
                    </span>
                  </div>

                  <button
                    onClick={handleStripeCheckout}
                    disabled={isRedirecting}
                    className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200 shadow-xl shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Переход к Stripe...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-current" />
                        <span>Разблокировать отчет за €19</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-slate-500 space-y-1 font-mono">
                    <p>💳 Apple Pay • Google Pay • Карты ЕС</p>
                    <p>Мгновенная генерация через Puppeteer + GPT-4o</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= ФУТЕР ================= */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-slate-600 font-mono opacity-0 reveal-node delay-trust">
        <p>© 2026 Audit2Revenue.es — Autonomous Telemetry & Site Intelligence Engine.</p>
      </footer>

    </div>
  );
}