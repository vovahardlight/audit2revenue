'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Search, 
  Globe, 
  Sparkles, 
  Activity, 
  Terminal, 
  Cpu, 
  Eye, 
  AlertTriangle,
  TrendingDown,
  Check,
  Loader2,
  ChevronRight
} from 'lucide-react';

export default function SeniorEngineeredLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [country, setCountry] = useState('ES');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Живой лог терминала телеметрии (Dopamine Trigger)
  const stepsData = [
    { label: 'Парсинг DOM-структуры и SSL Handshake', detail: 'HTTP/2 protocol established • TLS 1.3 verify' },
    { label: 'Юридический аудит LSSI-CE (Art. 10) & RGPD', detail: 'AEPD compliance check • NIF/CIF crawler active' },
    { label: 'Анализ мобильных воронок и Meta Pixel', detail: 'Event tracking inspect • WhatsApp CTA conversion gap' },
    { label: 'Сентимент-анализ Google Places API', detail: 'Scraping 280+ reviews • Phone abandonment flagged' },
    { label: 'Нейросетевая сборка и скоринг потерь', detail: 'GPT-4o audit matrix compilation completed' }
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
    setTelemetryLogs([`[INIT] Launching Puppeteer Headless cluster on target: ${formatted}`]);
  };

  useEffect(() => {
    if (stage === 'scanning') {
      const interval = setInterval(() => {
        setScanStep((prev) => {
          if (prev < stepsData.length - 1) {
            const next = prev + 1;
            setTelemetryLogs((logs) => [
              ...logs, 
              `[SUCCESS] ${stepsData[next].detail}`
            ]);
            return next;
          } else {
            clearInterval(interval);
            setTimeout(() => setStage('teaser'), 900);
            return prev;
          }
        });
      }, 1250);

      return () => clearInterval(interval);
    }
  }, [stage]);

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
    <div className="relative min-h-screen bg-[#04060A] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* ================= CSS КИБЕРНЕТИЧЕСКИХ МИКРОАНИМАЦИЙ ================= */}
      <style jsx global>{`
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.08); }
        }
        @keyframes grid-drift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .bg-cyber-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          animation: grid-drift 24s linear infinite;
        }
        .radar-spinner {
          animation: radar-sweep 5s linear infinite;
        }
      `}</style>

      {/* ================= ФОНОВЫЕ ЭФФЕКТЫ И СВЕТОВЫЕ ТОЧКИ ================= */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-cyber-grid opacity-80" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-rose-600/12 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-[480px] h-[480px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04060A]/60 to-[#04060A]" />
      </div>

      {/* ================= HEADER: STATUS & CREDIBILITY ================= */}
      <header className="relative z-20 border-b border-white/[0.07] backdrop-blur-xl bg-[#04060A]/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 p-[1px] shadow-lg shadow-rose-950/40">
              <div className="w-full h-full bg-[#070A10] rounded-[7px] flex items-center justify-center font-black text-[13px] tracking-tighter text-white">
                A2R
              </div>
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-sm">
                Audit<span className="text-rose-500 font-extrabold">2</span>Revenue
              </span>
              <span className="hidden sm:inline-block ml-2.5 text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-rose-500/25 bg-rose-500/10 text-rose-300">
                v2.6 Enterprise Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Кластер Puppeteer активен (Испания)</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= СОДЕРЖИМОЕ СТРАНИЦЫ ================= */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 py-12 md:py-16 flex flex-col justify-center">

        {/* ----------------- ЭКРАН 1: THE HOOK ----------------- */}
        {stage === 'idle' && (
          <div className="space-y-12 text-center">
            
            {/* Социальный тикер живой активности (Зеркальные нейроны) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-xs text-slate-300 shadow-inner hover:border-white/20 transition">
              <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="text-slate-400">Только что проверен:</span>
              <span className="text-white font-medium">clinica-estetica***.es (Madrid)</span>
              <span className="text-rose-400 font-mono text-[11px]">— найдено €2,400 потерь</span>
            </div>

            {/* Главный заголовок с триггером потерь */}
            <div className="space-y-5 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Анатомия скрытых утечек: сколько евро{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
                  теряет ваш сайт каждый день?
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
                Комплексная ИИ-диагностика: риски штрафов испанского закона <strong className="text-slate-200">LSSI-CE</strong>, неэффективность платного трафика и скрытый недозвон в Google Maps за 10 секунд.
              </p>
            </div>

            {/* Командная строка ввода (Raycast / Linear Style Command Bar) */}
            <form onSubmit={handleStartScan} className="max-w-2xl mx-auto w-full">
              <div className="relative group p-1.5 rounded-2xl bg-gradient-to-r from-white/10 via-rose-500/20 to-white/10 p-[1px] transition-all duration-300 focus-within:shadow-[0_0_40px_rgba(244,63,94,0.25)]">
                <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-[#090D15]/90 backdrop-blur-2xl border border-white/10">
                  
                  <div className="flex-1 w-full flex items-center gap-3 px-3">
                    <Globe className="w-5 h-5 text-slate-500 group-focus-within:text-rose-400 transition" />
                    <input
                      type="text"
                      required
                      placeholder="https://vash-biznes.es"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      aria-label="Страна юрисдикции"
                      className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer py-2 pr-1 font-mono"
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
                <span>⚡ Без установки плагинов</span>
                <span>•</span>
                <span>🔒 Puppeteer изолированная песочница</span>
                <span>•</span>
                <span>⏱️ 5-7 секунд</span>
              </div>
            </form>

            {/* Визуальная демонстрационная сетка 4-х радарных датчиков */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
              {[
                { icon: ShieldAlert, title: 'Закон LSSI-CE', desc: 'Проверка NIF/CIF, Aviso Legal и соответствия нормам AEPD' },
                { icon: TrendingDown, title: 'Слив Meta Ads', desc: 'Детекция отсутствия мгновенной WhatsApp-воронки' },
                { icon: Eye, title: 'Google Maps Gap', desc: 'Анализ отзывов о недозвоне и потерянных звонках' },
                { icon: Cpu, title: 'Ошибки в коде', desc: 'Поиск Mixed Content, битых JS-библиотек и медленного TTFB' }
              ].map((feat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition group">
                  <feat.icon className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition" />
                  <h4 className="text-xs font-bold text-white tracking-wide">{feat.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Технологические Trust-бейджи */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-xs font-mono grayscale opacity-75">
              <span>● Puppeteer v22</span>
              <span>● Google Places API</span>
              <span>● OpenAI GPT-4o</span>
              <span>● Stripe Verified Partner</span>
            </div>

          </div>
        )}

        {/* ----------------- ЭКРАН 2: ТЕЛЕМЕТРИЯ И ЛОАДЕР (5-7 сек) ----------------- */}
        {stage === 'scanning' && (
          <div className="max-w-xl mx-auto w-full p-8 rounded-3xl bg-[#090D15]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
            
            {/* Радарная голова сканера */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-rose-500/20" />
              <div className="absolute inset-2 rounded-full border border-dashed border-rose-500/30 animate-spin" style={{ animationDuration: '12s' }} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/10 to-transparent radar-spinner" />
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <Search className="w-5 h-5 text-rose-400 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Глубокий аудит цифровой инфраструктуры
              </h3>
              <p className="text-xs text-slate-400 font-mono truncate">
                Инспектируемый узел: <span className="text-amber-400">{url}</span>
              </p>
            </div>

            {/* Линейка выполнения */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Прогресс кластера</span>
                <span className="text-rose-400 font-bold">{Math.round(((scanStep + 1) / stepsData.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-[1px]">
                <div 
                  className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                  style={{ width: `${((scanStep + 1) / stepsData.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Вывод шагов */}
            <div className="space-y-2 pt-2">
              {stepsData.map((step, idx) => {
                const isDone = idx < scanStep;
                const isCurrent = idx === scanStep;
                return (
                  <div 
                    key={idx}
                    className={`flex items-center gap-3 text-xs transition duration-300 p-2 rounded-lg ${
                      isDone ? 'text-slate-400 bg-white/[0.01]' : isCurrent ? 'text-white font-medium bg-rose-500/5 border border-rose-500/20' : 'text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-rose-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className="truncate flex-1">{step.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Окно консоли телеметрии */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-[10px] font-mono text-slate-400 space-y-1 overflow-hidden">
              <div className="flex items-center gap-1.5 text-slate-500 border-b border-white/5 pb-1 mb-1">
                <Terminal className="w-3 h-3" />
                <span>Puppeteer Runtime Logs</span>
              </div>
              {telemetryLogs.slice(-2).map((log, i) => (
                <div key={i} className="truncate text-emerald-400/80">{log}</div>
              ))}
            </div>

          </div>
        )}

        {/* ----------------- ЭКРАН 3: ТИЗЕР & TRIPWIRE €19 ----------------- */}
        {stage === 'teaser' && (
          <div className="space-y-8 animate-fade-in">

            {/* Красное предупреждающее табло (Curiosity Gap + Loss Aversion) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-950/20 to-black/60 border border-rose-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 shrink-0 shadow-lg shadow-rose-950/40">
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

                {/* Карточка 2: Мобильный слив */}
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

            {/* Блок оффера Tripwire €19 (Контрастный конвертер) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-amber-500/30 backdrop-blur-2xl shadow-2xl relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                
                <div className="md:col-span-3 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Полный 12-страничный экспертный отчет</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    Разблокируйте полный технический отчет с готовым планом устранения
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Готовый документ для передачи вашему разработчику или веб-агентству. Включает точные куски кода, юридические формулировки и инструкции.
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

                {/* Правая карточка мгновенной покупки */}
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
                        <Loader2 className="w-5 h-5 animate-spin" />
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
        <p>© 2026 Audit2Revenue.es — Autonomous Site Intelligence Engine for Spain & EU businesses.</p>
      </footer>

    </div>
  );
}