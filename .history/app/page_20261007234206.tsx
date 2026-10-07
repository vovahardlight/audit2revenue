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
  Terminal, 
  Cpu, 
  Radio,
  MapPin,
  MessageCircle,
  FileWarning,
  Check,
  Loader2,
  CornerDownLeft,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

export default function AwwwardsHeroLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [country, setCountry] = useState('ES');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [activeHoverNode, setActiveHoverNode] = useState<number | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Мышиный спотлайт (Mouse Spotlight Tracking)
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Шаги сканирования для экрана 2
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

  // 4 диагностических спутника для интерактивного артефакта
  const diagnosticNodes = [
    {
      id: 0,
      title: 'LSSI-CE & AEPD',
      badge: 'Юридический аудит',
      desc: 'Поиск NIF/CIF, проверка Aviso Legal и рисков штрафов до €30,000',
      metric: '92% сайтов с ошибками',
      color: 'from-rose-500 to-red-600',
      icon: FileWarning,
      pos: 'top-left',
    },
    {
      id: 1,
      title: 'WhatsApp Воронка',
      badge: 'Слив трафика',
      desc: 'Детекция разрыва между рекламой Meta/Google и прямым бронированием',
      metric: 'Потеря ~35% лидов',
      color: 'from-amber-500 to-orange-600',
      icon: MessageCircle,
      pos: 'top-right',
    },
    {
      id: 2,
      title: 'Google Maps Radar',
      badge: 'Репутация & Дозвон',
      desc: 'Анализ отзывов на жалобы о неотвеченных звонках и медленном сервисе',
      metric: '280+ отзывов в секунду',
      color: 'from-blue-500 to-indigo-600',
      icon: MapPin,
      pos: 'bottom-left',
    },
    {
      id: 3,
      title: 'DOM & Скорость',
      badge: 'Код & Безопасность',
      desc: 'Поиск Mixed Content (HTTP/HTTPS), битых скриптов и отвала на iOS',
      metric: 'TTFB < 200ms',
      color: 'from-emerald-500 to-teal-600',
      icon: Cpu,
      pos: 'bottom-right',
    },
  ];

  return (
    <div 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#030508] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200"
    >
      
      {/* ================= AWWWARDS CSS ЭФФЕКТЫ ================= */}
      <style jsx global>{`
        /* Сетка с глубиной */
        .bg-mesh-grid {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.08) 1px, transparent 0);
          background-size: 32px 32px;
        }

        /* Бегущий луч по периметру Command Bar */
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
          width: 150%;
          height: 350%;
          top: -125%;
          left: -25%;
          background: conic-gradient(
            transparent 0deg,
            transparent 280deg,
            #f43f5e 320deg,
            #fbbf24 350deg,
            transparent 360deg
          );
          animation: border-beam-rotate 4s linear infinite;
        }

        /* Пульсирующие световые импульсы по оптоволокну */
        @keyframes flow-pulse {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .pulse-path {
          stroke-dasharray: 20, 180;
          animation: flow-pulse 3s linear infinite;
        }
      `}</style>

      {/* ================= ИНТЕРАКТИВНЫЙ МЫШИНЫЙ СПОТЛАЙТ ================= */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(244, 63, 94, 0.07), transparent 80%)`,
        }}
      />
      
      <div className="fixed inset-0 pointer-events-none bg-mesh-grid opacity-60 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#030508]/70 to-[#030508] z-0" />

      {/* ================= ШАПКА ================= */}
      <header className="relative z-20 border-b border-white/[0.06] backdrop-blur-xl bg-[#030508]/60 px-6 py-4">
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

        {/* ===================== ЭКРАН 1: ГЛАВНЫЙ ЭКРАН (AWWWARDS HERO) ===================== */}
        {stage === 'idle' && (
          <div className="space-y-12 animate-fade-in text-center">
            
            {/* 1. Живой тикер активности испанского рынка (Нейро-триггер социального доказательства) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl text-xs text-slate-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Только что проверен:</span>
              <span className="text-white font-medium">clinica-dental***.es (Madrid)</span>
              <span className="text-rose-400 font-mono text-[11px]">— найдено €2,100 утечки</span>
            </div>

            {/* 2. Заголовок H1 с нейромаркетинговой иерархией */}
            <div className="space-y-5 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Анатомия скрытых утечек: сколько евро{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
                  теряет ваш сайт каждый день?
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Глубокий ИИ-скан соответствия закону <strong className="text-slate-200">LSSI-CE</strong>, эффективности рекламы Meta/Google и недозвонов в Google Maps за 10 секунд.
              </p>
            </div>

            {/* 3. AWWWARDS COMMAND BAR (Световой вращающийся луч + детекция ввода) */}
            <form onSubmit={handleStartScan} className="max-w-2xl mx-auto w-full">
              <div className="border-beam-container p-[1px] rounded-2xl shadow-[0_0_50px_rgba(244,63,94,0.15)] transition-all">
                <div className="border-beam" />
                <div className="relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-[#070A10] border border-white/10 backdrop-blur-2xl">
                  
                  <div className="flex-1 w-full flex items-center gap-3 px-3">
                    <Globe className="w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="https://vash-salon-ili-klinika.es"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-medium"
                    />
                    {url.length > 5 && (
                      <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        DETECTED
                      </span>
                    )}
                  </div>

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
                <span>⚡ Без установки кодов и скриптов</span>
                <span>•</span>
                <span>🇪🇸 Соответствие стандарту AEPD</span>
              </div>
            </form>

            {/* 4. AWWWARDS ЦЕНТРАЛЬНЫЙ АРТЕФАКТ: ИНТЕРАКТИВНОЕ ЯДРО ДИАГНОСТИКИ (Neural Diagnostic Core) */}
            <div className="pt-6 max-w-4xl mx-auto">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.015] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
                
                {/* SVG Оптоволоконные световые линии, соединяющие ядро и сенсоры */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
                  <line x1="50%" y1="50%" x2="25%" y2="28%" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="75%" y2="28%" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="25%" y2="72%" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="75%" y2="72%" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1" />

                  {/* Бегущие импульсы данных */}
                  <line x1="50%" y1="50%" x2="25%" y2="28%" stroke="#f43f5e" strokeWidth="2" className="pulse-path" />
                  <line x1="50%" y1="50%" x2="75%" y2="28%" stroke="#fbbf24" strokeWidth="2" className="pulse-path" />
                  <line x1="50%" y1="50%" x2="25%" y2="72%" stroke="#60a5fa" strokeWidth="2" className="pulse-path" />
                  <line x1="50%" y1="50%" x2="75%" y2="72%" stroke="#34d399" strokeWidth="2" className="pulse-path" />
                </svg>

                {/* Центральный чип / Пульсирующее ядро */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-black to-amber-500/20 border border-white/20 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.25)]">
                  <Activity className="w-7 h-7 text-rose-400 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-slate-300 mt-1">CORE 4.0</span>
                </div>

                {/* 4 Интерактивных спутниковых сенсора */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left relative z-10">
                  {diagnosticNodes.map((node) => {
                    const Icon = node.icon;
                    const isHovered = activeHoverNode === node.id;
                    return (
                      <div
                        key={node.id}
                        onMouseEnter={() => setActiveHoverNode(node.id)}
                        onMouseLeave={() => setActiveHoverNode(null)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isHovered 
                            ? 'bg-white/[0.06] border-rose-500/50 shadow-xl shadow-rose-950/40 scale-[1.03]' 
                            : 'bg-black/40 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${node.color} text-white shadow-md`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">{node.badge}</span>
                        </div>

                        <h4 className="text-sm font-bold text-white tracking-tight">{node.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-snug line-clamp-2">{node.desc}</p>

                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-500">Метрика:</span>
                          <span className="text-rose-400 font-semibold">{node.metric}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* 5. Trust Badges */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-xs font-mono grayscale opacity-70">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Puppeteer v22</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Google Places Verified</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> OpenAI GPT-4o Intelligence</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Stripe 256-bit Encrypted</span>
            </div>

          </div>
        )}

        {/* ===================== ЭКРАН 2: ТЕЛЕМЕТРИЯ СКАНЕРА (5-7 сек) ===================== */}
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

            {/* Прогресс-бар и шаги */}
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
            {/* Красное табло алертов */}
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

              {/* 3 закрытые Redacted-карточки */}
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

            {/* Блок оффера Tripwire €19 */}
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
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-slate-600 font-mono">
        <p>© 2026 Audit2Revenue.es — Autonomous Telemetry & Site Intelligence Engine.</p>
      </footer>

    </div>
  );
}