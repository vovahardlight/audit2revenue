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
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

function BusinessIntelligenceReport() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://clinica-mabelle.es';
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Распознанные данные бизнеса
  const businessData = {
    brandName: 'Clínica & Estética Mabelle Madrid',
    domain: domain,
    titular: 'Dra. Esther González de la Vega',
    cargo: 'Руководитель / Владелец',
    cifPlaceholder: '[Pendiente de insertar NIF/CIF por desarrollador]',
    cms: 'WordPress 6.4 + Elementor Pro',
    rating: 4.8,
    reviewsCount: 384,
    priceLevel: '€€€ (Премиум-сегмент)',
    monthlyAdSpendEst: '€1,800 – €3,200 / мес',
    deficiencyScore: 82, // 0-100
  };

  const phoneWhatsApp = '34600123456'; 
  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Я ознакомился с полным отчетом по сайту ${targetUrl}. Хочу внедрить устранение всех 4 зон утечек и подключить WhatsApp AI-ассистента под ключ за €900.`
  );

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] pb-32 selection:bg-[#0071E3]/20 selection:text-[#0071E3]">
      
      {/* ================= ШАПКА ОТЧЕТА ================= */}
      <header className="border-b border-black/[0.06] bg-white/85 backdrop-blur-xl sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071E3] via-[#1E40AF] to-[#38BDF8] flex items-center justify-center font-bold text-white text-xs shadow-md shadow-[#0071E3]/20">
              A2R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1D1D1F] text-sm">{businessData.brandName}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                  Полный аудит разблокирован
                </span>
              </div>
              <span className="block text-[11px] text-[#6E6E73] font-mono">{businessData.domain}</span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5F5F7] border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] flex items-center gap-2 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5 text-[#0071E3]" />
            <span className="hidden sm:inline">Скачать PDF отчет</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* ================= ГЛАВНАЯ СВОДКА ПОТЕРЬ И СКОРИНГ ================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/[0.06] pb-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0071E3] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Персональный разбор сайта для владельца</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] tracking-tight">
                Где именно ваш сайт теряет заявки и выручку прямо сейчас
              </h1>
              <p className="text-xs text-[#6E6E73]">
                Анализ проведен по стандартам юрисдикции Испании (LSSI-CE / AEPD) и мобильного трафика
              </p>
            </div>

            {/* Круговой индикатор боли (Deficiency Score) */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="#E5E7EB" strokeWidth="5" fill="transparent" />
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="26" 
                    stroke="#0071E3" 
                    strokeWidth="5" 
                    fill="transparent" 
                    strokeDasharray="163.3" 
                    strokeDashoffset={163.3 - (163.3 * businessData.deficiencyScore) / 100}
                    strokeLinecap="round" 
                  />
                </svg>
                <span className="absolute text-sm font-black text-[#1D1D1F]">
                  {businessData.deficiencyScore}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#1D1D1F] block">Индекс утечки прибыли</span>
                <span className="text-[11px] text-rose-600 font-semibold block">Высокий уровень потерь</span>
                <span className="text-[10px] text-[#6E6E73]">0 = идеально • 100 = критично</span>
              </div>
            </div>

          </div>

          {/* 3 главных финансовых показателя */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F0F9FF] to-white border border-[#BAE6FD]/60">
              <span className="text-xs font-semibold text-[#0071E3] flex items-center gap-1.5">
                <Coins className="w-4 h-4" /> Слив рекламного бюджета
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1">
                ~€1,200 – €1,600 <span className="text-xs font-normal text-[#6E6E73]">/мес</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Сгорает до 40% оплаченных переходов из-за отсутствия прямого чата в WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FEF2F2] to-white border border-rose-200">
              <span className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> Юридический риск AEPD
              </span>
              <div className="text-2xl font-black text-rose-700 mt-1">
                До €30,000
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Нарушение ст. 10 LSSI-CE: заглушка разработчика вместо налогового NIF/CIF компании.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-white border border-amber-200">
              <span className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> Недозвон и потеря записей
              </span>
              <div className="text-2xl font-black text-[#1D1D1F] mt-1">
                ~14-18 клиентов <span className="text-xs font-normal text-[#6E6E73]">/мес</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] mt-1">
                Жалобы в отзывах Google на долгий ответ и отсутствие мгновенной онлайн-записи.
              </p>
            </div>

          </div>
        </div>

        {/* ================= 4 ДИАГНОСТИЧЕСКИХ БЛОКА ВЫРУЧКИ ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. РЕКЛАМНЫЙ БЮДЖЕТ */}
          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#0071E3]/10 text-[#0071E3]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">1. Реклама и мобильные заявки</h3>
                  <span className="text-[11px] text-[#6E6E73]">Инвестиции в маркетинг и точки схода</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                Пиксели активны
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#F5F5F7] space-y-2">
                <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block">
                  Активные рекламные трекеры на сайте:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-black/[0.06] text-xs font-medium text-[#1D1D1F] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3]" /> Meta Ads Pixel (Instagram/FB)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-black/[0.06] text-xs font-medium text-[#1D1D1F] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3]" /> Google Ads Tag
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-rose-200 space-y-1.5">
                <div className="flex items-center justify-between text-rose-700 text-xs font-bold">
                  <span>🚨 Слив платного трафика</span>
                  <span>-40% лидов</span>
                </div>
                <p className="text-xs text-[#424245] leading-relaxed">
                  Вы инвестируете в рекламу ориентировочно <strong>{businessData.monthlyAdSpendEst}</strong>, но на сайте нет прямой кнопки перехода в WhatsApp. В Испании 78% целевых клиентов со смартфонов закрывают страницу, отказываясь заполнять классическую форму.
                </p>
              </div>
            </div>
          </div>

          {/* 2. ЮРИДИЧЕСКИЙ КОНТУР И LSSI-CE */}
          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#1E40AF]/10 text-[#1E40AF]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">2. Юридическая чистота сайта</h3>
                  <span className="text-[11px] text-[#6E6E73]">Соответствие закону Испании LSSI-CE (Ley 34/2002)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold">
                Риск штрафа
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-1">
                <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block">
                  Юридическое лицо и ответственный:
                </span>
                <strong className="text-sm text-[#1D1D1F] block">{businessData.titular}</strong>
                <span className="text-xs text-[#0071E3]">{businessData.cargo}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs font-bold text-amber-800 block">
                  ⚠️ Обнаружена тестовая заглушка в Aviso Legal:
                </span>
                <code className="text-[11px] font-mono bg-white p-1.5 rounded border border-amber-300 block text-rose-600 truncate">
                  {businessData.cifPlaceholder}
                </code>
                <p className="text-[11px] text-[#424245] mt-1">
                  Статья 10 закона LSSI-CE требует обязательной публикации NIF/CIF компании. Отсутствие этих данных подпадает под санкции AEPD до €30,000.
                </p>
              </div>
            </div>
          </div>

          {/* 3. ОТЗЫВЫ И GOOGLE MAPS */}
          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#0284C7]/10 text-[#0284C7]">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">3. Анализ репутации и сервиса</h3>
                  <span className="text-[11px] text-[#6E6E73]">Скрытые причины отказов из Google Places</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#1D1D1F]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{businessData.rating}</span>
                <span className="text-[#86868B]">({businessData.reviewsCount} отзывов)</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-rose-200 space-y-2">
                <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" /> Жалобы клиентов на звонки:
                </span>
                <div className="space-y-1.5 text-[11px] text-[#424245] italic">
                  <p className="p-2 rounded-lg bg-white/80 border border-rose-100">
                    «No cogen el teléfono nunca por las tardes, tuve que ir en persona para cambiar la cita...»
                  </p>
                  <p className="p-2 rounded-lg bg-white/80 border border-rose-100">
                    «Tardan muchísimo en responder a las dudas por el formulario...»
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1">
                  <Heart className="w-3.5 h-3.5 text-emerald-600 fill-current" /> Ваши главные сильные стороны:
                </span>
                <p className="text-xs text-[#424245]">
                  Клиенты в восторге от лазерных процедур и отношения персонала. Проблема бизнеса — не в качестве услуг, а в скорости первичного приема заявок.
                </p>
              </div>
            </div>
          </div>

          {/* 4. ТЕХНИЧЕСКИЙ СТЕК И БРОНИРОВАНИЕ */}
          <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/[0.05] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#38BDF8]/20 text-[#0071E3]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">4. Технические барьеры сайта</h3>
                  <span className="text-[11px] text-[#6E6E73]">Инфраструктура и удобство бронирования</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0071E3] text-xs font-bold">
                CMS: WordPress
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#F5F5F7] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6E6E73]">Движок сайта:</span>
                  <span className="font-semibold text-[#1D1D1F]">{businessData.cms}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6E6E73]">Онлайн-запись в 1 клик:</span>
                  <span className="font-bold text-rose-600">ОТСУТСТВУЕТ ⚠️</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                <span className="text-xs font-bold text-amber-800 block">
                  Узкое горлышко в каталоге услуг:
                </span>
                <p className="text-xs text-[#424245] leading-relaxed">
                  На сайте размещен подробный каталог на <strong>46 позиций</strong>, но нет автоматического модуля записи (Booksy, Treatwell, Koibox). Клиенты просматривают цены, не находят мгновенной кнопки «Записаться» и уходят к конкурентам.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= ЧЕК-ЛИСТ ДЛЯ ВЛАДЕЛЬЦА САЙТА ================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 border-b border-black/[0.05] pb-4">
            <ListChecks className="w-5 h-5 text-[#0071E3]" />
            <div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">
                Что нужно исправить: пошаговый план действий
              </h3>
              <p className="text-xs text-[#6E6E73]">
                Чек-лист для передачи вашему веб-мастеру или юристу
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#F5F5F7] space-y-1">
              <div className="font-bold text-[#1D1D1F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-xs">1</span>
                Подключить прямую воронку в WhatsApp
              </div>
              <p className="text-[#6E6E73] pl-7">
                Добавить плавающий виджет чата WhatsApp для мобильного трафика из Meta Ads.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F5F7] space-y-1">
              <div className="font-bold text-[#1D1D1F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-xs">2</span>
                Заполнить реквизиты по закону LSSI-CE
              </div>
              <p className="text-[#6E6E73] pl-7">
                Убрать тестовую заглушку и опубликовать реальный NIF/CIF в разделе Aviso Legal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F5F7] space-y-1">
              <div className="font-bold text-[#1D1D1F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-xs">3</span>
                Решить проблему с ответами в нерабочие часы
              </div>
              <p className="text-[#6E6E73] pl-7">
                Внедрить автоответчик или AI-ассистента, который берет контакты, пока администратор занят.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F5F7] space-y-1">
              <div className="font-bold text-[#1D1D1F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-xs">4</span>
                Связать каталог услуг с быстрой записью
              </div>
              <p className="text-[#6E6E73] pl-7">
                Поставить кнопку прямой брони под каждой из 46 позиций прайс-листа.
              </p>
            </div>
          </div>
        </div>

        {/* ================= HIGH-TICKET UPSELL €900 ================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0071E3] via-[#1E40AF] to-[#0A192F] text-white shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Решение «Под ключ» за 5 рабочих дней</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Не хотите разбираться в коде и настраивать всё вручную?
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Мы устраним 100% найденных утечек, защитим сайт от штрафов AEPD и внедрим умного AI-ассистента в WhatsApp, который отвечает клиентам за 3 секунды и записывает их 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white text-sm">Умный AI-ассистент в WhatsApp 24/7</strong>
                <span className="text-white/70 text-xs">Обучен на ваших услугах, ценах и графике. Отвечает мгновенно и бронирует клиентов.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white text-sm">100% соответствие законам LSSI-CE & RGPD</strong>
                <span className="text-white/70 text-xs">Составление корректного Aviso Legal, политики Cookies и защита от штрафов AEPD.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">€900</span>
                <span className="text-xs text-white/70">или 2 платежа по €450</span>
              </div>
              <p className="text-xs text-[#38BDF8] mt-1 font-medium">
                Гарантия: если за 14 дней система не принесет новые записи — возврат 100% денег.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-white/90 text-[#0071E3] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>Обсудить внедрение в WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm flex items-center justify-center gap-2 transition"
              >
                <Calendar className="w-4 h-4 text-white/80" />
                <span>Забронировать 15-мин звонок</span>
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* ================= ПЛАВАЮЩИЙ НИЖНИЙ БАР ================= */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
              Исправить все 4 зоны утечек выручки и запустить WhatsApp AI-ассистента
            </p>
            <p className="text-[11px] text-[#6E6E73]">
              Срок: 5 рабочих дней • €900 (или 2 × €450) • Полная гарантия окупаемости
            </p>
          </div>

          <a
            href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#1E40AF] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
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
          <Loader2 className="w-8 h-8 animate-spin text-[#0071E3]" />
          <p className="text-sm font-medium">Формирование отчета аудита...</p>
        </div>
      }
    >
      <BusinessIntelligenceReport />
    </Suspense>
  );
}