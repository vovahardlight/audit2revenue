'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Eye, 
  TrendingDown, 
  Radio,
  Scan,
  MapPin,
  MessageCircle,
  FileWarning,
  Check,
  Loader2
} from 'lucide-react';

export default function AwwwardsEngineeredLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [country, setCountry] = useState('ES');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [hexDecryption, setHexDecryption] = useState('0x7F2A... INIT');
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Извлекаем чистый домен для HUD-телеметрии
  const cleanDomain = useMemo(() => {
    try {
      return new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    } catch {
      return 'target-domain.es';
    }
  }, [url]);

  // Фазы аудита для HUD
  const auditPhases = [
    { title: 'DNS & SSL HANDSHAKE', tag: 'PORT 443' },
    { title: 'LSSI-CE & AEPD REGULATORY', tag: 'LEGAL PROTOCOL' },
    { title: 'META PIXEL & WHATSAPP GAP', tag: 'CONVERSION FLOW' },
    { title: 'GOOGLE MAPS SENTIMENT RADAR', tag: 'REPUTATION MATRIX' },
    { title: 'AI REVENUE LEAK SYNTHESIS', tag: 'GPT-4o DEEP CORE' }
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
    setActivePhase(0);
  };

  // 6-секундная кинематографическая временная шкала с плавным тиком
  useEffect(() => {
    if (stage === 'scanning') {
      const startTime = Date.now();
      const totalDuration = 6200; // 6.2 секунды

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
        setProgress(currentProgress);

        // Расчет активной фазы
        const phaseIndex = Math.min(Math.floor((currentProgress / 100) * auditPhases.length), auditPhases.length - 1);
        setActivePhase(phaseIndex);

        // Генерация случайных шестнадцатеричных хэшей для эффекта дешифровки
        const randomHex = `0x${Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0')}`;
        setHexDecryption(`${randomHex} • ${auditPhases[phaseIndex].tag}`);

        if (elapsed >= totalDuration) {
          clearInterval(timer);
          setTimeout(() => setStage('teaser'), 600);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [stage, auditPhases]);

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
    <div className="relative min-h-screen bg-[#030508] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* ================= СТИЛИ AWWWARDS АНИМАЦИЙ ================= */}
      <style jsx global>{`
        /* Сетка с эффектом бесконечной глубины */
        .cyber-matrix-grid {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* 3D Изометрическая сцена смартфона */
        .viewport-3d-scene {
          perspective: 1200px;
        }
        .viewport-mockup {
          transform: rotateX(18deg) rotateY(-14deg) rotateZ(4deg);
          transform-style: preserve-3d;
          box-shadow: 
            -25px 35px 70px -15px rgba(0, 0, 0, 0.9),
            0 0 50px rgba(244, 63, 94, 0.12);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Лазерный LIDAR-луч сканера */
        @keyframes lidar-sweep {
          0% { top: -5%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        .lidar-beam {
          animation: lidar-sweep 2.4s ease-in-out infinite;
        }

        /* Осциллограф волны данных */
        @keyframes wave-flow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .oscilloscope-path {
          animation: wave-flow 3s linear infinite;
        }
      `}</style>

      {/* Фоновые градиенты */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 cyber-matrix-grid opacity-70" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-600/10 blur-[170px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030508]/60 to-[#030508]" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="relative z-20 border-b border-white/[0.06] backdrop-blur-xl bg-[#030508]/70 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 p-[1px]">
              <div className="w-full h-full bg-[#06090E] rounded-[7px] flex items-center justify-center font-black text-xs text-white">
                A2R
              </div>
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-sm">
                Audit<span className="text-rose-500">2</span>Revenue
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-300">
                Spain Telemetry Node
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">LSSI-CE Neural Inspector Online</span>
          </div>
        </div>
      </header>

      {/* ================= ГЛАВНЫЙ БЛОК ================= */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-14 flex flex-col justify-center">

        {/* ----------------- ЭКРАН 1: THE HOOK ----------------- */}
        {stage === 'idle' && (
          <div className="space-y-12 text-center animate-fade-in">
            {/* Трастовый бейдж */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl text-xs text-slate-300 shadow-inner">
              <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Проверено 1 420 сайтов в Испании (Madrid, BCN, Valencia)</span>
            </div>

            <div className="space-y-5 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Анатомия скрытых утечек: сколько евро{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
                  теряет ваш сайт каждый день?
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Глубокий ИИ-аудит нарушений испанского закона <strong className="text-white">LSSI-CE</strong>, неэффективности Meta Ads и скрытых жалоб на недозвон в Google Maps за 10 секунд.
              </p>
            </div>

            {/* Командная строка ввода (Linear Command Bar) */}
            <form onSubmit={handleStartScan} className="max-w-2xl mx-auto w-full">
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-white/10 via-rose-500/25 to-white/10 focus-within:shadow-[0_0_40px_rgba(244,63,94,0.3)] transition-all">
                <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-[#070A10]/95 backdrop-blur-2xl border border-white/10">
                  <div className="flex-1 w-full flex items-center gap-3 px-3">
                    <Globe className="w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="https://vash-salon-ili-klinika.es"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      aria-label="Страна проверки"
                      className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer py-2 font-mono"
                    >
                      <option value="ES" className="bg-slate-900 text-white">🇪🇸 España (LSSI-CE)</option>
                      <option value="MX" className="bg-slate-900 text-white">🇲🇽 México</option>
                      <option value="EU" className="bg-slate-900 text-white">🇪🇺 Другая (EU)</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-rose-950/50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Экспресс-скан</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Карточки 4-х сканеров */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
              {[
                { icon: ShieldAlert, title: 'Закон LSSI-CE', desc: 'Проверка NIF/CIF и Aviso Legal на риски AEPD' },
                { icon: TrendingDown, title: 'Слив Meta Ads', desc: 'Утечка ~35% лидов при отсутствии WhatsApp' },
                { icon: Eye, title: 'Google Maps Gap', desc: 'Анализ недозвона и негатива в реальных отзывах' },
                { icon: Cpu, title: 'Код и Скорость', desc: 'Детекция смешанного HTTP-трафика и ошибок JS' }
              ].map((feat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition">
                  <feat.icon className="w-5 h-5 text-rose-400 mb-2" />
                  <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- ЭКРАН 2: AWWWARDS SPATIAL LIDAR СКАНЕР ----------------- */}
        {stage === 'scanning' && (
          <div className="max-w-4xl mx-auto w-full space-y-6 animate-fade-in">
            
            {/* HUD Панель управления и метаданных */}
            <div className="p-4 rounded-2xl bg-[#070A10]/80 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <Scan className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <div className="text-white font-bold tracking-wider flex items-center gap-2">
                    <span>LIDAR OPTICAL SCANNER ACTIVE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                    TARGET: <span className="text-amber-400">{cleanDomain}</span>
                  </div>
                </div>
              </div>

              {/* Правый блок телеметрии */}
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <div className="hidden sm:block text-right">
                  <div className="text-emerald-400 font-bold">{hexDecryption}</div>
                  <div>LATENCY: 14ms (Node ES-MAD-01)</div>
                </div>
                <div className="text-3xl font-black text-white tracking-tighter">
                  {progress}<span className="text-xs font-normal text-rose-500">%</span>
                </div>
              </div>
            </div>

            {/* ОСНОВНАЯ СЦЕНА 3D-ДИАГНОСТИКИ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* ЛЕВАЯ КОЛОНКА: 3D Изометрический Видоискатель Сайта */}
              <div className="md:col-span-7 viewport-3d-scene flex justify-center py-4">
                <div className="viewport-mockup relative w-[280px] sm:w-[320px] h-[460px] rounded-[36px] bg-[#0A0E17] border-2 border-white/20 p-3 overflow-hidden shadow-2xl">
                  
                  {/* Стекло экрана и блик */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none z-20" />
                  
                  {/* Динамик / Dynamic Island */}
                  <div className="w-24 h-4 bg-black/80 border border-white/10 rounded-full mx-auto mb-3 z-30 relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse mr-2" />
                    <span className="text-[8px] font-mono text-slate-500">DOM 390x844</span>
                  </div>

                  {/* СКЕЛЕТОН САЙТА, РЕАГИРУЮЩИЙ НА ЛУЧ */}
                  <div className="space-y-3 relative z-10">
                    
                    {/* Header: SSL Verified */}
                    <div className={`p-2.5 rounded-xl border transition-all duration-500 ${
                      progress > 15 ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/5 text-slate-600'
                    }`}>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-3 h-3" /> TLS 1.3 SECURE
                        </span>
                        <span className="text-[8px] opacity-75">HTTPS OK</span>
                      </div>
                    </div>

                    {/* Hero Banner Mockup */}
                    <div className="h-24 rounded-xl bg-white/[0.03] border border-white/5 p-3 flex flex-col justify-between relative overflow-hidden">
                      <div className="space-y-1.5">
                        <div className="w-3/4 h-2.5 bg-white/20 rounded" />
                        <div className="w-1/2 h-2 bg-white/10 rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-16 h-4 bg-rose-500/20 border border-rose-500/40 rounded-md" />
                        <span className="text-[8px] font-mono text-slate-500">Viewport Render</span>
                      </div>
                    </div>

                    {/* Google Maps Reputation Module */}
                    <div className={`p-2.5 rounded-xl border transition-all duration-500 ${
                      progress > 60 ? 'bg-amber-500/10 border-amber-500/40' : 'bg-white/5 border-white/5'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-bold">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>Google Maps: 4.8★</span>
                        </div>
                        <span className="text-[9px] font-mono text-rose-400 animate-pulse">2 Жалобы связи</span>
                      </div>
                    </div>

                    {/* Missing WhatsApp CTA Module */}
                    <div className={`p-2.5 rounded-xl border border-dashed transition-all duration-500 ${
                      progress > 40 ? 'bg-rose-500/15 border-rose-500/50 text-rose-300' : 'bg-white/5 border-white/10 text-slate-600'
                    }`}>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-1.5 font-mono">
                          <MessageCircle className="w-3 h-3 text-rose-400" /> WhatsApp Direct CTA
                        </span>
                        <span className="text-[9px] font-bold text-rose-400 uppercase">ОТСУТСТВУЕТ</span>
                      </div>
                    </div>

                    {/* Footer / Aviso Legal Violation: ALARM! */}
                    <div className={`p-2.5 rounded-xl border transition-all duration-500 ${
                      progress > 30 ? 'bg-rose-600/20 border-rose-500 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-white/5 border-white/5 text-slate-600'
                    }`}>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-1.5 font-bold">
                          <FileWarning className="w-3.5 h-3.5 text-rose-400 animate-bounce" /> Ley LSSI-CE Art. 10
                        </span>
                        <span className="text-[8px] font-mono bg-rose-500 text-black px-1 rounded font-black">
                          AEPD РИСК
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* ОПТИЧЕСКИЙ ЛАЗЕРНЫЙ LIDAR-ЛУЧ (Scans top to bottom) */}
                  <div className="lidar-beam absolute left-0 right-0 h-10 pointer-events-none z-30">
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_20px_#f43f5e]" />
                    <div className="h-full bg-gradient-to-b from-rose-500/20 to-transparent" />
                  </div>

                </div>
              </div>

              {/* ПРАВАЯ КОЛОНКА: Осциллограф и Индикаторы Фаз */}
              <div className="md:col-span-5 space-y-4">
                
                {/* Осциллограф передачи данных */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-rose-400 animate-ping" /> REAL-TIME DOM TELEMETRY
                    </span>
                    <span className="text-emerald-400 font-bold">HTTP/2 STREAM</span>
                  </div>

                  {/* SVG Волна пакетов */}
                  <div className="h-12 w-full overflow-hidden relative">
                    <svg className="h-12 w-[200%] oscilloscope-path text-rose-500/60" viewBox="0 0 400 40" fill="none" stroke="currentColor">
                      <path 
                        d="M0 20 Q20 5 40 20 T80 20 T120 5 T160 35 T200 20 T240 5 T280 20 T320 35 T360 20 T400 20" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Пошаговые индикаторы кластера */}
                <div className="space-y-2">
                  {auditPhases.map((phase, idx) => {
                    const isDone = idx < activePhase;
                    const isCurrent = idx === activePhase;
                    return (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border text-xs font-mono transition-all duration-300 flex items-center justify-between ${
                          isDone 
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300' 
                            : isCurrent 
                              ? 'bg-rose-500/10 border-rose-500/50 text-white shadow-lg shadow-rose-950/30' 
                              : 'bg-white/[0.01] border-white/5 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isDone ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : isCurrent ? (
                            <Loader2 className="w-3.5 h-3.5 text-rose-400 animate-spin" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                          )}
                          <span className="font-semibold tracking-wide">{phase.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{phase.tag}</span>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ----------------- ЭКРАН 3: ТИЗЕР & TRIPWIRE €19 ----------------- */}
        {stage === 'teaser' && (
          <div className="space-y-8 animate-fade-in">

            {/* Красное табло алертов с обнаруженными утечками */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-rose-950/30 via-[#070A10] to-black border border-rose-500/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 shrink-0">
                    <ShieldAlert className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                      ОПТИЧЕСКИЙ СКАНЕР ЗАВЕРШИЛ АНАЛИЗ
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Обнаружено 3 критические зоны потери выручки
                    </h2>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  Упущенная выручка: ~€1,800/мес
                </div>
              </div>

              {/* 3 закрытые Redacted-карточки */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                
                {/* Карточка 1: LSSI-CE */}
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

                {/* Карточка 2: Слив рекламы */}
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

                {/* Карточка 3: Google Maps */}
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
                    Готовое заключение для разработчика или юриста: точные участки кода, юридические тексты для Испании и расчет упущенной прибыли.
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

                {/* Карточка быстрой покупки */}
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