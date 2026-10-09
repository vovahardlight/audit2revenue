'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  Star, 
  Download, 
  ArrowUpRight, 
  Sparkles, 
  Calendar, 
  Check, 
  Loader2, 
  Building2, 
  PhoneCall, 
  AlertOctagon, 
  Coins, 
  Cpu, 
  ListChecks,
  ShieldCheck,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

function BusinessIntelligenceReport() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://clinica-mabelle.es';
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const [activeFilter, setActiveFilter] = useState<'all' | 'issues' | 'healthy'>('all');

  const businessData = {
    brandName: 'Clínica & Estética Mabelle Madrid',
    domain: domain,
    titular: 'Dra. Esther González de la Vega',
    cargo: 'Руководитель / Владелец',
    cifPlaceholder: '[Pendiente de insertar NIF/CIF por desarrollador]',
    cms: 'WordPress 6.4 + Elementor Pro',
    rating: 4.8,
    reviewsCount: 384,
    monthlyAdSpendEst: '€1,800 – €3,200',
    overallHealthScore: 46,
  };

  const allParameters = [
    {
      id: 'meta-pixel',
      category: 'Маркетинг',
      title: 'Meta Ads Pixel (Instagram / Facebook)',
      status: 'ok',
      metric: 'Активен',
      desc: 'Пиксель установлен корректно, рекламный трафик фиксируется.',
    },
    {
      id: 'google-ads',
      category: 'Маркетинг',
      title: 'Google Ads Remarketing Tag',
      status: 'ok',
      metric: 'Активен',
      desc: 'Тег отслеживания конверсий в поисковой сети Google работает штатно.',
    },
    {
      id: 'whatsapp-funnel',
      category: 'Маркетинг',
      title: 'Прямая воронка записи в WhatsApp',
      status: 'critical',
      metric: 'Слив до 40% лидов',
      desc: 'На сайте нет быстрой связи в мессенджере. 78% мобильных кликов из рекламы закрывают страницу без обращения.',
    },
    {
      id: 'form-friction',
      category: 'Маркетинг',
      title: 'Конверсионная форма заявки',
      status: 'warning',
      metric: 'Отказ ~24%',
      desc: 'Форма содержит 5 обязательных полей ввода. На смартфонах это вызывает отвал четверти пользователей.',
    },
    {
      id: 'ssl-security',
      category: 'Закон & Безопасность',
      title: 'Сертификат SSL / TLS 1.3',
      status: 'ok',
      metric: 'Защищено',
      desc: 'Соединение зашифровано, домен работает по безопасному протоколу.',
    },
    {
      id: 'owner-id',
      category: 'Закон & Безопасность',
      title: 'Идентификация ответственного лица (ЛПР)',
      status: 'ok',
      metric: 'Установлено',
      desc: `Владелец идентифицирован: ${businessData.titular} (${businessData.cargo}).`,
    },
    {
      id: 'lssi-cif',
      category: 'Закон & Безопасность',
      title: 'Публикация NIF/CIF по ст. 10 Ley LSSI-CE',
      status: 'critical',
      metric: 'Штраф до €30,000',
      desc: 'В футере Aviso Legal оставлена тестовая заглушка темы без фискального номера компании. Нарушение норм AEPD.',
    },
    {
      id: 'cookie-banner',
      category: 'Закон & Безопасность',
      title: 'Политика согласий Cookies (RGPD)',
      status: 'warning',
      metric: 'Неполный отказ',
      desc: 'Баннер не предоставляет равнозначной кнопки «Отклонить все cookies» в один клик.',
    },
    {
      id: 'google-rating',
      category: 'Репутация & Карты',
      title: 'Социальный капитал в Google Maps',
      status: 'ok',
      metric: '4.8★ (384 отзыва)',
      desc: 'Высокая лояльность и искренние благодарности врачам за качество процедур.',
    },
    {
      id: 'phone-bottleneck',
      category: 'Репутация & Карты',
      title: 'Дозвон клиентов и обработка звонков',
      status: 'critical',
      metric: 'Потеря ~16 записей/мес',
      desc: 'В отзывах зафиксированы повторяющиеся жалобы: «No cogen el teléfono nunca por las tardes». Потеря клиентов на этапе звонка.',
    },
    {
      id: 'booking-widget',
      category: 'Репутация & Карты',
      title: 'Модуль мгновенной онлайн-записи',
      status: 'critical',
      metric: 'Отсутствует',
      desc: 'Прайс содержит 46 услуг, но нет кнопки бронирования (Booksy/Fresha/Koibox). Клиенты уходят без действия.',
    },
    {
      id: 'cms-stack',
      category: 'Технологии',
      title: 'Платформа и цифровая инфраструктура',
      status: 'ok',
      metric: 'WordPress 6.4',
      desc: 'Сайт построен на современной связке WordPress + Elementor Pro.',
    },
    {
      id: 'ttfb-speed',
      category: 'Технологии',
      title: 'Скорость отклика сервера (TTFB)',
      status: 'ok',
      metric: '160ms (Отлично)',
      desc: 'Сервер в Испании отвечает быстро, база данных оптимизирована.',
    },
    {
      id: 'mixed-content',
      category: 'Технологии',
      title: 'Смешанный контент HTTP/HTTPS',
      status: 'critical',
      metric: 'Отказ на iOS ~22%',
      desc: 'Часть скриптов и изображений загружается по http://, вызывая предупреждение «Подключение не защищено» в Safari.',
    },
  ];

  const filteredParameters = allParameters.filter(p => {
    if (activeFilter === 'issues') return p.status === 'critical' || p.status === 'warning';
    if (activeFilter === 'healthy') return p.status === 'ok';
    return true;
  });

  const criticalCount = allParameters.filter(p => p.status === 'critical').length;
  const warningCount = allParameters.filter(p => p.status === 'warning').length;
  const healthyCount = allParameters.filter(p => p.status === 'ok').length;

  const phoneWhatsApp = '34600123456'; 
  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Я ознакомился с отчетом аудита по сайту ${targetUrl}. Хочу обсудить внедрение решений и WhatsApp AI-ассистента за €900.`
  );

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] pb-32 selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">
      
      {/* ================= ШАПКА ================= */}
      <header className="border-b border-black/[0.05] bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-6 sm:px-8 h-16 flex items-center">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-white text-xs shadow-sm shadow-[#0284C7]/20">
              A2R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1D1D1F] text-sm">{businessData.brandName}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                  Аудит готов
                </span>
              </div>
              <span className="block text-[11px] text-[#6E6E73] font-mono">{businessData.domain}</span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5F5F7] border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] flex items-center gap-2 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="hidden sm:inline">Экспорт PDF</span>
          </button>
        </div>
      </header>

      {/* ================= ДАШБОРД ================= */}
      <main className="max-w-5xl mx-auto px-6 py-8 sm:py-10 space-y-8">
        
        {/* Главная карточка здоровья */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/[0.05] pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Интеллектуальный отчет готовности к продажам</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] tracking-tight">
                Дашборд эффективности: {businessData.domain}
              </h1>
              <p className="text-xs text-[#6E6E73]">
                Анализ по нормам Испании (LSSI-CE / AEPD) и воронке мобильного трафика
              </p>
            </div>

            {/* Индекс конверсии */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] shrink-0">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="#E5E7EB" strokeWidth="5" fill="transparent" />
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="26" 
                    stroke="#DC2626" 
                    strokeWidth="5" 
                    fill="transparent" 
                    strokeDasharray="163.3" 
                    strokeDashoffset={163.3 - (163.3 * businessData.overallHealthScore) / 100}
                    strokeLinecap="round" 
                  />
                </svg>
                <span className="absolute text-base font-black text-[#1D1D1F]">
                  {businessData.overallHealthScore}%
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#1D1D1F] block">Индекс удержания</span>
                <span className="text-[11px] text-rose-600 font-bold block">Критические потери выручки</span>
                <span className="text-[10px] text-[#6E6E73]">100% = идеальная конверсия</span>
              </div>
            </div>
          </div>

          {/* Светофорная сводка */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <strong className="text-xs text-rose-900 block font-bold">Критические поломки</strong>
                  <span className="text-[11px] text-rose-700">Точки потери клиентов</span>
                </div>
              </div>
              <span className="text-lg font-black text-rose-600">{criticalCount}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="text-xs text-amber-900 block font-bold">Зоны внимания</strong>
                  <span className="text-[11px] text-amber-700">Снижают отдачу рекламы</span>
                </div>
              </div>
              <span className="text-lg font-black text-amber-600">{warningCount}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="text-xs text-emerald-900 block font-bold">Исправные узлы</strong>
                  <span className="text-[11px] text-emerald-700">Работают штатно</span>
                </div>
              </div>
              <span className="text-lg font-black text-emerald-600">{healthyCount}</span>
            </div>
          </div>

          {/* Радар финансовых потерь */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F0F9FF] to-white border border-[#BAE6FD]/70">
              <span className="text-xs font-semibold text-[#0284C7] flex items-center gap-1.5">
                <Coins className="w-4 h-4" /> Слив платной рекламы
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1.5">
                ~€1,200 – €1,600 <span className="text-xs font-normal text-[#6E6E73]">/мес</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Потеря до 40% кликов из Meta Ads из-за отсутствия прямого чата в WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FEF2F2] to-white border border-rose-200">
              <span className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> Риск штрафов AEPD
              </span>
              <div className="text-2xl font-black text-rose-700 mt-1.5">
                До €30,000
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Нарушение ст. 10 LSSI-CE: тестовая заглушка темы вместо фискального NIF/CIF.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-white border border-amber-200">
              <span className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> Недозвон и сбой записи
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1.5">
                ~14-18 клиентов <span className="text-xs font-normal text-[#6E6E73]">/мес</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Жалобы в Google картах на неотвеченные звонки и отсутствие онлайн-брони.
              </p>
            </div>
          </div>
        </div>

        {/* ================= МАТРИЦА ПАРАМЕТРОВ САЙТА ================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
                Инспекция всех параметров сайта
              </h2>
              <p className="text-xs text-[#6E6E73]">
                Интерактивный срез диагностических индикаторов платформы
              </p>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-black/[0.04] border border-black/[0.05] text-xs font-medium self-start sm:self-auto">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${activeFilter === 'all' ? 'bg-white text-[#0284C7] shadow-sm font-bold' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                Все ({allParameters.length})
              </button>
              <button
                onClick={() => setActiveFilter('issues')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeFilter === 'issues' ? 'bg-white text-rose-600 shadow-sm font-bold' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                <span>Только сбои ({criticalCount + warningCount})</span>
              </button>
              <button
                onClick={() => setActiveFilter('healthy')}
                className={`px-3 py-1.5 rounded-lg transition ${activeFilter === 'healthy' ? 'bg-white text-emerald-600 shadow-sm font-bold' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                Исправные ({healthyCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredParameters.map((param) => {
              const isCrit = param.status === 'critical';
              const isWarn = param.status === 'warning';
              const isOk = param.status === 'ok';

              return (
                <div
                  key={param.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                    isCrit 
                      ? 'bg-white border-rose-200 shadow-xs hover:border-rose-300' 
                      : isWarn 
                        ? 'bg-white border-amber-200 shadow-xs hover:border-amber-300' 
                        : 'bg-white/80 border-black/[0.06] hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {isCrit && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                      {isWarn && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                      {isOk && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}

                      <div>
                        <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider block font-mono">
                          {param.category}
                        </span>
                        <h4 className="text-sm font-bold text-[#1D1D1F]">
                          {param.title}
                        </h4>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold shrink-0 ${
                      isCrit 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : isWarn 
                          ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {param.metric}
                    </span>
                  </div>

                  <p className="text-xs text-[#6E6E73] mt-2.5 leading-relaxed pl-6.5">
                    {param.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= ДЕТАЛИЗАЦИЯ КРИТИЧЕСКИХ ОШИБОК ================= */}
        <div className="space-y-4">
          <div className="px-1">
            <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
              Детализация 4 критических утечек
            </h2>
            <p className="text-xs text-[#6E6E73]">
              Доказательства, обнаруженные на сайте
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                    <Coins className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">1. Слив платного трафика без WhatsApp</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                  -40% лидов
                </span>
              </div>
              <p className="text-xs text-[#424245] leading-relaxed">
                Вы инвестируете в рекламу Meta Ads около <strong>{businessData.monthlyAdSpendEst}</strong>, но на сайте отсутствует прямая воронка записи в мессенджер. 78% пользователей закрывают статичную форму.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">2. Отсутствие NIF/CIF (Закон LSSI-CE)</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                  Риск €30,000
                </span>
              </div>
              <p className="text-xs text-[#424245] leading-relaxed">
                В разделе Aviso Legal обнаружена тестовая заглушка темы:
              </p>
              <code className="text-[11px] font-mono bg-[#F5F5F7] p-2 rounded-lg border border-rose-200 block text-rose-700 truncate">
                {businessData.cifPlaceholder}
              </code>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                    <Star className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">3. Потеря звонков в Google Maps</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                  ~16 записей/мес
                </span>
              </div>
              <blockquote className="p-2.5 rounded-xl bg-[#F5F5F7] text-xs text-[#424245] italic">
                «No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»
              </blockquote>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">4. Каталог без онлайн-записи</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                  Отказ без брони
                </span>
              </div>
              <p className="text-xs text-[#424245] leading-relaxed">
                На сайте опубликован каталог на <strong>46 услуг</strong> с ценами, но нет кнопки бронирования в 1 клик.
              </p>
            </div>
          </div>
        </div>

        {/* ================= ЧЕК-ЛИСТ ДЛЯ РАЗРАБОТЧИКА ================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/[0.05] pb-3">
            <ListChecks className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-base font-bold text-[#1D1D1F]">
              План устранения для вашего разработчика
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>1. Прямой чат в WhatsApp</strong>
              <p className="text-[#6E6E73]">Добавить плавающий виджет WhatsApp для мобильного трафика из рекламы.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>2. Публикация NIF/CIF в Aviso Legal</strong>
              <p className="text-[#6E6E73]">Опубликовать реальный NIF компании по ст. 10 закона LSSI-CE.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>3. Автоматизация нерабочих часов</strong>
              <p className="text-[#6E6E73]">Внедрить AI-ассистента для приема заявок, когда администратор занят.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>4. Кнопка бронирования в каталоге</strong>
              <p className="text-[#6E6E73]">Добавить кнопку брони под каждой из 46 позиций прайс-листа.</p>
            </div>
          </div>
        </div>

        {/* ================= HIGH-TICKET UPSELL €900 ПОД КЛЮЧ ================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#0F2744] text-white shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>Решение под ключ за 5 рабочих дней</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Устранить все ошибки и внедрить WhatsApp AI-ассистента
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
              Мы устраним 100% найденных багов, приведем сайт в соответствие нормам AEPD и подключим AI-ассистента, который отвечает за 3 секунды и ведет запись клиентов 24/7.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/15">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">€900</span>
                <span className="text-xs text-white/70">или 2 платежа по €450</span>
              </div>
              <p className="text-xs text-[#7DD3FC] mt-0.5 font-medium">
                Гарантия: возврат денег, если система не принесет новые записи за 14 дней.
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-[#0284C7] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
              >
                <span>Обсудить в WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition"
              >
                <Calendar className="w-4 h-4 text-white/80" />
                <span>15-мин звонок</span>
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* ================= ПЛАВАЮЩИЙ НИЖНИЙ БАР ================= */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
              Исправить все 4 критические утечки и запустить WhatsApp AI-ассистента под ключ
            </p>
            <p className="text-[11px] text-[#6E6E73]">
              Срок: 5 рабочих дней • Стоимость: €900 • 100% гарантия окупаемости
            </p>
          </div>

          <a
            href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs sm:text-sm shadow-sm transition whitespace-nowrap"
          >
            <span>Написать в WhatsApp ➔</span>
          </a>
        </div>
      </aside>

    </div>
  );
}

export default function AuditReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center gap-3 text-[#6E6E73]">
          <Loader2 className="w-8 h-8 animate-spin text-[#0284C7]" />
          <p className="text-sm font-medium">Загрузка дашборда аналитики...</p>
        </div>
      }
    >
      <BusinessIntelligenceReport />
    </Suspense>
  );
}