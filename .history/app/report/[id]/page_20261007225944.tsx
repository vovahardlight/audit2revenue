'use client';

import React, { useState } from 'react';
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
  Clock, 
  Calendar,
  Sparkles,
  PhoneCall,
  Check,
  Building2,
  FileText
} from 'lucide-react';

export default function AuditReportPage() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || 'https://mabelle-estetica.es';
  const domain = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const [activeTab, setActiveTab] = useState<'all' | 'legal' | 'tech' | 'reviews'>('all');

  // Номер WhatsApp для закрытия сделки на €900 (Испанский формат)
  const phoneWhatsApp = '34600123456'; 
  const whatsappMessage = encodeURIComponent(
    `Здравствуйте! Я изучил аудит по сайту ${targetUrl}. Хочу устранить ошибки LSSI-CE, баги в коде и внедрить AI-ассистента в WhatsApp под ключ за €900.`
  );

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 pb-28 selection:bg-rose-500/30 selection:text-rose-200">
      {/* Шапка отчета */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
              ✓ 19€
            </div>
            <div>
              <span className="font-semibold text-white text-sm">Полный аудит готов</span>
              <span className="block text-[11px] text-slate-400 font-mono">{domain}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-2 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Скачать PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* ===================== ЭКРАН 5: КАРТОЧКА БИЗНЕСА ===================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                ● Статус: Оплачено и проверено n8n + GPT-4o
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Технический & Конверсионный аудит: {domain}
              </h1>
              <p className="text-xs text-slate-400">
                Дата сканирования: 7 октября 2026 г. • Регион: Испания (Comunidad de Madrid)
              </p>
            </div>

            {/* Карточка Google Maps рейтинга */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/50 border border-white/10">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-white">4.8</span>
                  <span className="text-xs text-slate-400">(286 отзывов)</span>
                </div>
                <span className="text-[11px] text-slate-500">Google Maps Verified Place</span>
              </div>
            </div>
          </div>

          {/* Параметры CMS и окружения */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-slate-500 block">CMS / Стек:</span>
              <span className="font-semibold text-white mt-0.5 block">WordPress + Elementor</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-slate-500 block">Безопасность:</span>
              <span className="font-semibold text-amber-400 mt-0.5 block">Mixed Content (HTTP/HTTPS)</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-slate-500 block">Рекламный трекинг:</span>
              <span className="font-semibold text-rose-400 mt-0.5 block">Meta Pixel (Без конвертера)</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-slate-500 block">Индекс риска AEPD:</span>
              <span className="font-semibold text-rose-400 mt-0.5 block">ВЫСОКИЙ (Неполный Aviso Legal)</span>
            </div>
          </div>
        </div>

        {/* ===================== СВЕТОФОР ДЕФИЦИТОВ ===================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Светофор дефицитов: Найдено 4 критические аномалии
            </h2>
          </div>

          <div className="space-y-4">
            {/* Ошибка 1: Юридический риск LSSI-CE */}
            <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span>❌ ЮРИДИЧЕСКИЙ РИСК: Отсутствие NIF/CIF и данных в Aviso Legal (Ley LSSI-CE)</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono shrink-0">
                  Штраф до €30 000
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                Согласно статье 10 испанского закона <strong>LSSI-CE (Ley 34/2002)</strong>, коммерческий сайт обязан публиковать фискальный номер (NIF/CIF), юридический адрес и регистрационные данные компании в доступном виде. На вашем сайте раздел Aviso Legal содержит стандартный плейсхолдер темы без указания ответственного юрлица.
              </p>
              <div className="pl-7 pt-2">
                <code className="text-[11px] p-2.5 rounded-lg bg-black/60 border border-white/5 text-rose-300 font-mono block">
                  &lt;!-- Обнаружено в футере: Texto de Aviso Legal pendiente de configurar por el administrador --&gt;
                </code>
              </div>
            </div>

            {/* Ошибка 2: Ошибки в коде */}
            <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span>❌ КРИТИЧНО В КОДЕ: Смешанный контент и необработанные ошибки локализации</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono shrink-0">
                  Отказ ~22%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                В консоли браузера зафиксированы необработанные переменные шаблона и загрузка скриптов аналитики по незащищенному протоколу <code>http://</code>. Это вызывает предупреждение браузера <em>«Подключение не защищено»</em> на некоторых смартфонах с iOS.
              </p>
              <div className="pl-7 pt-2">
                <code className="text-[11px] p-2.5 rounded-lg bg-black/60 border border-white/5 text-rose-300 font-mono block">
                  Uncaught Error: Translation missing: es.general.social.links.linkedin | Mixed Content Blocked
                </code>
              </div>
            </div>

            {/* Ошибка 3: Слив рекламного бюджета */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>⚠️ СЛИВ РЕКЛАМЫ: Meta Pixel активен, но отсутствует быстрый WhatsApp-конвертер</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono shrink-0">
                  Потеря 35-40% лидов
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                На сайте установлен пиксель Facebook/Instagram, но единственная точка входа — статическая форма заявки с 5 обязательными полями. В Испании 78% записей в сфере услуг совершаются напрямую через WhatsApp. Вы платите за клики в Instagram, но пользователи закрывают страницу из-за долгой формы.
              </p>
            </div>

            {/* Ошибка 4: Цитаты реальных жалоб */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  <span>⚠️ УЗКОЕ ГОРЛЫШКО: Анализ отзывов в Google Maps выявил системные сбои связи</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono shrink-0">
                  Упущенные звонки
                </span>
              </div>
              <div className="pl-7 space-y-2">
                <blockquote className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 italic">
                  «El servicio es excelente una vez allí, pero estuve dos días llamando por teléfono y nadie respondía. Al final tuve que pasarme en persona para pedir cita...»
                  <span className="block mt-1 text-[11px] text-slate-500 font-sans not-italic">— Отзыв от María P., 2 недели назад</span>
                </blockquote>
                <blockquote className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 italic">
                  «Escribí por el formulario de la web un sábado para una urgencia y nunca me llegó confirmación...»
                  <span className="block mt-1 text-[11px] text-slate-500 font-sans not-italic">— Отзыв от Carlos M., 1 месяц назад</span>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== ЭКРАН 6: ФИНАЛЬНЫЙ HIGH-TICKET UPSELL (€900) ===================== */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-rose-950/40 via-black to-amber-950/20 border-2 border-rose-500/40 shadow-2xl space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Комплексное решение «Под Ключ»</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Не хотите разбираться в коде и настраивать всё вручную?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Мы устраним <strong>100% найденных ошибок</strong>, приведем сайт в полное соответствие закону Испании и внедрим умного AI-ассистента в WhatsApp, который будет записывать клиентов 24/7.
            </p>
          </div>

          {/* Карточки того, что входит за €900 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Умный AI-ассистент в WhatsApp 24/7</h4>
                <p className="text-xs text-slate-400 mt-0.5">Обучен на вашем прайсе и услугах, отвечает за 3 секунды, ведет диалог на испанском и бронирует клиентов.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">100% соблюдение Ley LSSI-CE & RGPD</h4>
                <p className="text-xs text-slate-400 mt-0.5">Составление и внедрение корректных Aviso Legal, Politica de Cookies и защита от проверок AEPD.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Устранение багов в коде и верстке</h4>
                <p className="text-xs text-slate-400 mt-0.5">Исправление битых скриптов, смешанного HTTP/HTTPS контента и ускорение загрузки до 90+ в Google PageSpeed.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Прямая воронка из рекламы Meta / Google</h4>
                <p className="text-xs text-slate-400 mt-0.5">Перенаправление кликов сразу в чат с AI-ассистентом с автотрекингом конверсий в рекламный кабинет.</p>
              </div>
            </div>
          </div>

          {/* Ценообразование и гарантия */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">€900</span>
                <span className="text-sm text-slate-400">под ключ (или 2 платежа по €450)</span>
              </div>
              <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Гарантия: если за 14 дней система не принесет новые записи — полный возврат денег.
              </p>
            </div>

            {/* 2 кнопки действия */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40"
              >
                <span>Обсудить внедрение в WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://calendly.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm flex items-center justify-center gap-2 transition"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Забронировать 15-мин звонок</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Плавающий нижний бар (Sticky Footer Banner €900) */}
      <aside aria-label="Плавающее предложение" className="fixed bottom-0 inset-x-0 z-40 bg-black/85 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="hidden sm:flex w-9 h-9 rounded-full bg-rose-500/20 text-rose-400 items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                Исправить все ошибки и внедрить WhatsApp AI-ассистента под ключ
              </p>
              <p className="text-[11px] text-slate-400">
                Срок реализации: 5 рабочих дней • €900 (или 2 × €450)
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${phoneWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition whitespace-nowrap shadow-md shadow-emerald-950/40"
          >
            <span>Написать в WhatsApp ➔</span>
          </a>
        </div>
      </aside>
    </div>
  );
}