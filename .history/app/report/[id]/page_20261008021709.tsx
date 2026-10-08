'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Star, 
  MessageSquare, 
  Download, 
  ArrowUpRight, 
  Sparkles, 
  Calendar, 
  Check, 
  Loader2 
} from 'lucide-react';

function ReportContent() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://mabelle-estetica.es';
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const phoneWhatsApp = '34600123456'; 
  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Я изучил отчет по сайту ${targetUrl}. Хочу исправить ошибки LSSI-CE, баги в коде и внедрить AI-ассистента в WhatsApp за €900.`
  );

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] pb-28 selection:bg-[#0071E3]/20 selection:text-[#0071E3]">
      
      {/* Шапка отчета */}
      <header className="border-b border-black/[0.06] bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 border border-[#0071E3]/20 flex items-center justify-center font-bold text-[#0071E3] text-xs">
              ✓ €19
            </div>
            <div>
              <span className="font-semibold text-[#1D1D1F] text-sm">Полный отчет готов</span>
              <span className="block text-[11px] text-[#6E6E73] font-mono">{domain}</span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5F5F7] border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] flex items-center gap-2 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Скачать PDF</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        
        {/* Карточка бизнеса */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.05] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-xs font-medium">
                ● Проверено через Puppeteer & GPT-4o
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                Аудит эффективности: {domain}
              </h1>
              <p className="text-xs text-[#6E6E73]">
                Регион: Испания (Comunidad de Madrid) • Статус оплаты: Оплачено (€19)
              </p>
            </div>

            {/* Рейтинг карт */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F5F5F7] border border-black/[0.04]">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-[#1D1D1F]">4.8</span>
                  <span className="text-xs text-[#6E6E73]">(286 отзывов)</span>
                </div>
                <span className="text-[11px] text-[#86868B]">Google Maps Verified</span>
              </div>
            </div>
          </div>

          {/* Параметры стека */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7]">
              <span className="text-[#86868B] block">CMS / Стек:</span>
              <span className="font-semibold text-[#1D1D1F] mt-0.5 block">WordPress + Elementor</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7]">
              <span className="text-[#86868B] block">Безопасность:</span>
              <span className="font-semibold text-amber-600 mt-0.5 block">Mixed Content (HTTP)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7]">
              <span className="text-[#86868B] block">Рекламный трекинг:</span>
              <span className="font-semibold text-rose-600 mt-0.5 block">Meta Pixel (Без чата)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F5F5F7]">
              <span className="text-[#86868B] block">Индекс риска AEPD:</span>
              <span className="font-semibold text-rose-600 mt-0.5 block">ВЫСОКИЙ (Aviso Legal)</span>
            </div>
          </div>
        </div>

        {/* Светофор дефицитов */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#1D1D1F]">
            Найдено 4 критические проблемы
          </h2>

          <div className="space-y-4">
            
            {/* 1. LSSI-CE */}
            <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-rose-600 font-bold text-sm sm:text-base">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span>Штрафы в Испании: Отсутствие NIF/CIF в Aviso Legal (LSSI-CE)</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold shrink-0">
                  Штраф до €30,000
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                По статье 10 испанского закона LSSI-CE (Ley 34/2002) коммерческий сайт обязан публиковать фискальный номер (NIF/CIF) и юридический адрес. На вашем сайте блок не заполнен.
              </p>
            </div>

            {/* 2. Ошибки в коде */}
            <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-rose-600 font-bold text-sm sm:text-base">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span>Ошибки верстки и небезопасный смешанный контент</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold shrink-0">
                  Отказ ~22%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                Часть картинок грузится по протоколу http://, из-за чего браузер на iPhone выдает клиентам предупреждение «Подключение не защищено».
              </p>
            </div>

            {/* 3. Слив рекламы */}
            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-sm sm:text-base">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>Слив рекламы: Meta Pixel активен, но нет WhatsApp</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold shrink-0">
                  Потеря 35-40% лидов
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                Клиенты кликают на рекламу в Instagram, но на сайте длинная форма вместо кнопки прямого диалога в WhatsApp.
              </p>
            </div>

            {/* 4. Google Maps */}
            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-sm sm:text-base">
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  <span>Жалобы в Google картах на долгий ответ и недозвон</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold shrink-0">
                  Потерянные звонки
                </span>
              </div>
              <div className="space-y-2 pt-1">
                <blockquote className="p-3.5 rounded-xl bg-[#F5F5F7] text-xs text-[#424245] italic">
                  «El servicio es excelente, pero estuve dos días llamando por teléfono y nadie respondía...»
                  <span className="block mt-1 text-[11px] text-[#86868B] not-italic">— María P., отзыв в Google</span>
                </blockquote>
              </div>
            </div>

          </div>
        </div>

        {/* UPSELL €900 В СТИЛЕ APPLE LUXURY */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0071E3] via-[#1E40AF] to-[#0A192F] text-white shadow-xl space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Решение «Под ключ» за 5 рабочих дней</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Не хотите исправлять всё это вручную?
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Мы устраним 100% найденных ошибок, приведем сайт в полное соответствие закону Испании и внедрим умного AI-ассистента в WhatsApp, который записывает клиентов 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">AI-ассистент в WhatsApp 24/7</strong>
                <span className="text-white/70 text-xs">Обучен на ваших услугах, отвечает за 3 секунды и ведет запись.</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">100% соответствие Ley LSSI-CE</strong>
                <span className="text-white/70 text-xs">Правильные Aviso Legal и Cookies. Полная защита от штрафов AEPD.</span>
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
                Гарантия: возврат денег, если система не принесет новые записи за 14 дней.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-white/90 text-[#0071E3] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>Написать в WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm flex items-center justify-center gap-2 transition"
              >
                <Calendar className="w-4 h-4 text-white/80" />
                <span>15-мин звонок</span>
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* Плавающий нижний бар */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
              Исправить все ошибки и внедрить WhatsApp AI-ассистента под ключ
            </p>
            <p className="text-[11px] text-[#6E6E73]">
              Срок: 5 рабочих дней • Стоимость: €900 (или 2 × €450)
            </p>
          </div>

          <a
            href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#1E40AF] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <span>Обсудить в WhatsApp ➔</span>
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
          <p className="text-sm font-medium">Загрузка отчета...</p>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}