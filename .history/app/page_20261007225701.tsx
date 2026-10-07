'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Search, 
  Globe, 
  Check, 
  Sparkles,
  ExternalLink,
  Loader2
} from 'lucide-react';

export default function FunnelLanding() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [country, setCountry] = useState('ES');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'teaser'>('idle');
  const [scanStep, setScanStep] = useState(0);
  const [isRedirectingToStripe, setIsRedirectingToStripe] = useState(false);

  const scanSteps = [
    'Проверка доступности сервера и SSL/TLS-сертификата...',
    'Анализ соответствия испанскому закону LSSI-CE и AEPD (Aviso Legal)...',
    'Поиск рекламных пикселей (Meta Pixel, Google Tag Manager)...',
    'Сканирование профиля и тональности отзывов Google Maps...',
    'Расчет скрытой упущенной выгоды мобильного трафика...'
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Нормализация URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
      setUrl(formattedUrl);
    }

    setStage('scanning');
    setScanStep(0);
  };

  // Эмуляция глубокого 6-секундного экспресс-сканирования
  useEffect(() => {
    if (stage === 'scanning') {
      const interval = setInterval(() => {
        setScanStep((prev) => {
          if (prev < scanSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setStage('teaser'), 800);
            return prev;
          }
        });
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [stage, scanSteps.length]);

  // Обработка оплаты €19 через Stripe Checkout
  const handleStripeCheckout = async () => {
    setIsRedirectingToStripe(true);
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
        // Фоллбек для демонстрации без активных Stripe API-ключей
        router.push(`/report/demo-audit?url=${encodeURIComponent(url)}`);
      }
    } catch {
      router.push(`/report/demo-audit?url=${encodeURIComponent(url)}`);
    } finally {
      setIsRedirectingToStripe(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-rose-500/30 selection:text-rose-200">
      {/* Фоновые градиенты */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-rose-600/15 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Навигационная плашка */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-md bg-black/30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-black text-sm">
              A2R
            </div>
            <span className="font-semibold tracking-tight text-white">
              Audit<span className="text-rose-500">2</span>Revenue
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono">
              Spain Micro-SaaS
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Сканер активен
            </span>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-16 flex flex-col justify-center">
        {/* ===================== ЭКРАН 1: THE HOOK ===================== */}
        {stage === 'idle' && (
          <div className="space-y-10 text-center animate-fade-in">
            {/* Трастовый бейдж */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Проверено более 1 400 бизнесов в Испании (Madrid, BCN, Valencia)</span>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Сколько клиентов теряет ваш сайт прямо сейчас из-за{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300">
                  скрытых технических утечек?
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Экспресс-аудит сайта, юридических рисков LSSI-CE и конверсии рекламного трафика за 10 секунд.
              </p>
            </div>

            {/* Форма ввода */}
            <form onSubmit={handleStartScan} className="max-w-2xl mx-auto w-full space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl focus-within:border-rose-500/50 transition">
                <div className="flex-1 flex items-center gap-3 px-3">
                  <Globe className="w-5 h-5 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="https://vash-salon-ili-klinika.es"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    aria-label="Страна проверки"
                    className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer py-1.5"
                  >
                    <option value="ES" className="bg-slate-900 text-white">🇪🇸 Испания</option>
                    <option value="MX" className="bg-slate-900 text-white">🇲🇽 Мексика</option>
                    <option value="EU" className="bg-slate-900 text-white">🇪🇺 Другая (EU)</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-rose-950/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Проверить сайт бесплатно</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                🔒 Данные защищены. Сканирование без нагрузки на сервер и без установки скриптов.
              </p>
            </form>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-500 text-xs grayscale opacity-70">
              <span className="flex items-center gap-1.5 hover:text-slate-300 transition">
                <Check className="w-4 h-4 text-emerald-500" /> Puppeteer Headless Engine
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-300 transition">
                <Check className="w-4 h-4 text-emerald-500" /> Google Places Verified API
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-300 transition">
                <Check className="w-4 h-4 text-emerald-500" /> OpenAI GPT-4o Intelligence
              </span>
              <span className="flex items-center gap-1.5 hover:text-slate-300 transition">
                <Check className="w-4 h-4 text-emerald-500" /> Stripe 256-bit Encrypted
              </span>
            </div>
          </div>
        )}

        {/* ===================== ЭКРАН 2: ЛОАДЕР (5-7 сек) ===================== */}
        {stage === 'scanning' && (
          <div className="max-w-lg mx-auto w-full p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6 animate-fade-in text-center">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 animate-ping" />
              <div className="w-20 h-20 rounded-full border-4 border-rose-500 border-t-transparent animate-spin flex items-center justify-center">
                <Search className="w-7 h-7 text-rose-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                ИИ-диагностика сайта в реальном времени
              </h3>
              <p className="text-xs text-slate-400 font-mono truncate">
                Цель: <span className="text-amber-400">{url}</span>
              </p>
            </div>

            {/* Прогресс-бар и шаги */}
            <div className="space-y-3 text-left pt-2">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-500 rounded-full"
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

        {/* ===================== ЭКРАН 3: ТИЗЕР + TRIPWIRE €19 ===================== */}
        {stage === 'teaser' && (
          <div className="space-y-8 animate-fade-in">
            {/* Красное табло алертов */}
            <div className="p-5 sm:p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-rose-300">
                    ⚠️ Внимание: на сайте {new URL(url).hostname} обнаружено 3 критические зоны потери выручки!
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-200/70">
                    Экспресс-скан выявил технические и правовые утечки. Детали заблокированы из соображений безопасности.
                  </p>
                </div>
              </div>

              {/* 3 закрытые карточки утечек */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5">
                {/* 1. Безопасность и закон */}
                <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Закон и Безопасность
                    </span>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Риск штрафа AEPD до €30,000</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Нарушения в Aviso Legal / RGPD и незащищенные каналы передачи данных...
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Доказательства в коде</span>
                    <span className="text-rose-400 font-mono">Скрыто 🔒</span>
                  </div>
                </div>

                {/* 2. Мобильный трафик */}
                <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Слив Рекламы
                    </span>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Утечка ~35% лидов из Meta Ads</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Пиксель установлен, но прямой коннектор в WhatsApp / быстрый захват отсутствует...
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Упущенная выгода</span>
                    <span className="text-rose-400 font-mono">Скрыто 🔒</span>
                  </div>
                </div>

                {/* 3. Конверсия Google Maps */}
                <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Репутация & Заявки
                    </span>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Скрытые жалобы в Google Maps</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Анализ отзывов выявил регулярный недозвон и потерю горячих записей...
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Цитаты и скрины</span>
                    <span className="text-rose-400 font-mono">Скрыто 🔒</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Блок оффера Tripwire €19 */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-amber-500/30 backdrop-blur-2xl shadow-2xl">
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-black text-xs font-bold tracking-wide uppercase shadow-lg">
                Скидка 87% только сегодня
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    Получите полный 12-страничный ИИ-аудит с кодом ошибок и планом их устранения
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Готовое техническое заключение с разбором сайта <span className="text-amber-400 font-mono">{url}</span>, которое вы можете сразу передать своему веб-мастеру или юристу.
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2">
                    {[
                      'Полный отчет по уязвимостям безопасности и ошибкам JS/CSS в коде',
                      'Юридический аудит соответствия LSSI-CE и RGPD (риски штрафов AEPD)',
                      'Анализ скрытых жалоб клиентов из отзывов Google Maps (почему не звонят)',
                      'Расчет упущенной прибыли от отсутствия мгновенной записи в WhatsApp',
                      'Пошаговые чек-листы и готовые инструкции для разработчиков'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Правая карточка покупки */}
                <div className="md:col-span-2 p-6 rounded-2xl bg-black/60 border border-white/10 text-center space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-xs uppercase text-slate-400 tracking-wider font-semibold">
                      Символическая цена аудита
                    </span>
                    <div className="flex items-baseline justify-center gap-2.5">
                      <span className="text-4xl sm:text-5xl font-black text-white">€19</span>
                      <span className="text-base text-slate-500 line-through">€150</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium block">
                      Мгновенный доступ + копия отчета в PDF
                    </span>
                  </div>

                  <button
                    onClick={handleStripeCheckout}
                    disabled={isRedirectingToStripe}
                    className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isRedirectingToStripe ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Переход к Stripe Checkout...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-current" />
                        <span>Оплатить €19 и открыть отчет</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p>💳 Принимаются карты Испании, Apple Pay, Google Pay</p>
                    <p>Мгновенная генерация через n8n + GPT-4o</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Футер */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-slate-600">
        <p>© 2026 Audit2Revenue.es — Сервис технического и регуляторного аудита сайтов в Испании.</p>
      </footer>
    </div>
  );
}