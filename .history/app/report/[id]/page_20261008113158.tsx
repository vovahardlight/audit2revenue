'use client';

import React, { Suspense } from 'react';
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
  Heart, 
  ListChecks,
  ShieldCheck
} from 'lucide-react';

function BusinessIntelligenceReport() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://clinica-mabelle.es';
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const businessData = {
    brandName: 'Clínica & Estética Mabelle Madrid',
    domain: domain,
    titular: 'Dra. Esther González de la Vega',
    cargo: 'Руководитель / Владелец',
    cifPlaceholder: '[Pendiente de insertar NIF/CIF por desarrollador]',
    cms: 'WordPress 6.4 + Elementor Pro',
    rating: 4.8,
    reviewsCount: 384,
    monthlyAdSpendEst: '€1,800 – €3,200 / мес',
    deficiencyScore: 82,
  };

  const phoneWhatsApp = '34600123456'; 
  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Я ознакомился с полным отчетом по сайту ${targetUrl}. Хочу внедрить устранение всех 4 зон утечек и подключить WhatsApp AI-ассистента под ключ за €900.`
  );

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] pb-28 selection:bg-[#0284C7]/20 selection:text-[#0284C7] font-sans antialiased">
      
      {/* Шапка отчета Nordic Glacier */}
      <header className="border-b border-black/[0.05] bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-6 sm:px-8 h-16 flex items-center">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] flex items-center justify-center font-bold text-white text-xs shadow-sm">
              A2R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1D1D1F] text-sm">{businessData.brandName}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
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
            <span className="hidden sm:inline">Скачать PDF</span>
          </button>
        </div>
      </header>

      {/* Основной контейнер с выверенными пропорциями */}
      <main className="max-w-5xl mx-auto px-6 py-8 sm:py-10 space-y-6 sm:space-y-8">
        
        {/* Карточка потерь и скоринга */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/[0.05] pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Персональный разбор для владельца</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] tracking-tight">
                Где сайт теряет заявки и выручку прямо сейчас
              </h1>
              <p className="text-xs text-[#6E6E73]">
                Анализ по законам Испании (LSSI-CE / AEPD) и мобильного трафика
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] shrink-0">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="23" stroke="#E5E7EB" strokeWidth="4.5" fill="transparent" />
                  <circle 
                    cx="28" 
                    cy="28" 
                    r="23" 
                    stroke="#0284C7" 
                    strokeWidth="4.5" 
                    fill="transparent" 
                    strokeDasharray="144.5" 
                    strokeDashoffset={144.5 - (144.5 * businessData.deficiencyScore) / 100}
                    strokeLinecap="round" 
                  />
                </svg>
                <span className="absolute text-sm font-black text-[#1D1D1F]">
                  {businessData.deficiencyScore}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#1D1D1F] block">Индекс утечки</span>
                <span className="text-[11px] text-rose-600 font-semibold block">Высокий уровень потерь</span>
                <span className="text-[10px] text-[#6E6E73]">0 = идеально • 100 = критично</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD]/60">
              <span className="text-xs font-semibold text-[#0284C7] flex items-center gap-1.5">
                <Coins className="w-4 h-4" /> Слив рекламы
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1">
                ~€1,200 – €1,600 <span className="text-xs font-normal text-[#6E6E73]">/мес</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Сгорает до 40% платных кликов без прямого WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-rose-200">
              <span className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> Риск штрафа AEPD
              </span>
              <div className="text-2xl font-black text-rose-700 mt-1">
                До €30,000
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Нарушение LSSI-CE: тестовая заглушка вместо NIF/CIF.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200">
              <span className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> Недозвон клиентов
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1">
                ~14-18 записей <span className="text-xs font-normal text-[#6E6E73]">/мес</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Жалобы в Google на долгие ответы и пропущенные звонки.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Зоны утечек */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0284C7]/10 text-[#0284C7]">
                  <Coins className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1D1D1F]">1. Реклама и мобильные заявки</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                Пиксели активны
              </span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              Вы инвестируете в рекламу <strong>{businessData.monthlyAdSpendEst}</strong>, но на сайте нет прямой кнопки WhatsApp. В Испании 78% целевых клиентов со смартфонов закрывают страницу, отказываясь заполнять классическую форму.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0F2744]/10 text-[#0F2744]">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1D1D1F]">2. Юридическая чистота сайта</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-bold">
                Риск штрафа
              </span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              В Aviso Legal обнаружена тестовая заглушка <code>{businessData.cifPlaceholder}</code>. Статья 10 закона LSSI-CE требует обязательной публикации NIF/CIF компании, иначе AEPD выписывает санкции до €30,000.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0284C7]/10 text-[#0284C7]">
                  <Star className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1D1D1F]">3. Анализ отзывов Google</h3>
              </div>
              <span className="text-xs font-bold text-[#1D1D1F] flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {businessData.rating} ({businessData.reviewsCount})
              </span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              Клиенты хвалят качество услуг, но жалуются: <em>«No cogen el teléfono nunca por las tardes...»</em>. Проблема бизнеса — не в качестве, а в потере клиентов на этапе первичного звонка.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#7DD3FC]/25 text-[#0284C7]">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1D1D1F]">4. Удобство записи</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[11px] font-bold">
                {businessData.cms.split(' ')[0]}
              </span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              На сайте размещен подробный каталог услуг с ценами, но нет быстрой онлайн-записи. Клиенты просматривают прайс, не находят мгновенной кнопки «Записаться» и уходят к конкурентам.
            </p>
          </div>
        </div>

        {/* Чек-лист для веб-мастера */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/[0.05] pb-3">
            <ListChecks className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-base font-bold text-[#1D1D1F]">
              План устранения для вашего разработчика
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>1. Прямая воронка в WhatsApp</strong>
              <p className="text-[#6E6E73]">Добавить плавающий виджет WhatsApp для мобильного трафика из рекламы.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>2. Реквизиты LSSI-CE</strong>
              <p className="text-[#6E6E73]">Опубликовать реальный NIF/CIF компании в разделе Aviso Legal.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>3. Ответы в нерабочие часы</strong>
              <p className="text-[#6E6E73]">Внедрить AI-ассистента для фиксации заявок в нерабочее время.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
              <strong>4. Связка каталога с бронью</strong>
              <p className="text-[#6E6E73]">Добавить кнопку бронирования под каждой позицией прайса.</p>
            </div>
          </div>
        </div>

        {/* Upsell €900 Nordic Glacier */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#0F2744] text-white shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
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
              <p className="text-xs text-[#7DD3FC] mt-0.5">
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
                <span>Написать в WhatsApp</span>
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

      {/* Плавающий нижний бар */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
              Исправить все утечки и внедрить WhatsApp AI-ассистента под ключ
            </p>
            <p className="text-[11px] text-[#6E6E73]">
              Срок: 5 дней • Стоимость: €900 • 100% гарантия окупаемости
            </p>
          </div>

          <a
            href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs sm:text-sm shadow-sm transition"
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
          <p className="text-sm font-medium">Загрузка картины отчета...</p>
        </div>
      }
    >
      <BusinessIntelligenceReport />
    </Suspense>
  );
}