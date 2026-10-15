// lib/auditDemo.ts
// Единый источник демо-данных: лендинг (тизер) и страница отчёта читают отсюда,
// поэтому индекс и суммы совпадают на каждом шаге воронки.
// Когда появится бэкенд, заменяется только getDemoChecks: он начнёт возвращать
// проверки из API, а остальной код не изменится.

import { score, type Check } from '@/app/report/demo-audit/AuditVisuals'; // поправьте путь под свою структуру

export type Lang = 'ru' | 'es' | 'en';

// Числа, которые должны совпадать на лендинге, в тизере и в отчёте
export const DEMO = {
  price: 900,
  adLossMin: 1200,
  adLossMax: 1600,
  leadLossPct: 40,
  titular: 'Dra. Esther González de la Vega',
};

// 14 проверок: 5 — «Закон и техника» (01), 4 — «WhatsApp и запись» (02), 5 — «Реклама и карты» (03)
export function getDemoChecks(lang: Lang): Check[] {
  const tr = (ru: string, es: string, en: string) => (lang === 'ru' ? ru : lang === 'es' ? es : en);
  const titular = DEMO.titular;

  return [
    // ───── 01 Закон и техника ─────
    {
      id: 'lssi-cif',
      pillar: '01',
      status: 'critical',
      title: tr('Публикация NIF/CIF (ст. 10 Ley LSSI-CE)', 'Publicación NIF/CIF (art. 10 Ley LSSI-CE)', 'NIF/CIF Publication (Art. 10 LSSI-CE)'),
      metric: tr('Штраф до €30,000', 'Multa hasta 30.000 €', 'Fines up to €30,000'),
      desc: tr(
        'В футере Aviso Legal оставлена тестовая заглушка темы без фискального CIF/NIF. Прямое нарушение требований AEPD.',
        'En el Aviso Legal figura una plantilla sin el CIF/NIF de la empresa. Infracción directamente sancionable por la AEPD.',
        'Legal notice footer holds developer placeholder text without tax NIF/CIF. Direct violation of AEPD requirements.'
      ),
      action: tr(
        'Прописать официальный CIF компании в Aviso Legal и футере.',
        'Añadir el CIF legal de la sociedad en pie y Aviso Legal.',
        'Add official corporate tax CIF into footer and Legal Notice.'
      ),
    },
    {
      id: 'ssl-security',
      pillar: '01',
      status: 'ok',
      title: 'SSL / TLS 1.3 Encryption',
      metric: tr('Защищено (TLS 1.3)', 'Protegido (TLS 1.3)', 'Secure (TLS 1.3)'),
      desc: tr(
        'Соединение зашифровано современным сертификатом, HTTPS активен на всех страницах.',
        'Conexión cifrada con certificado moderno, HTTPS activo en todo el dominio.',
        'Modern encrypted connection, strict HTTPS active across all pages.'
      ),
      action: tr('Поддерживать автообновление SSL.', 'Mantener renovación automática de SSL.', 'Keep SSL auto-renewal active.'),
    },
    {
      id: 'cookie-banner',
      pillar: '01',
      status: 'warning',
      title: tr('Политика согласия Cookies (Guía AEPD)', 'Gestor de Cookies (Guía AEPD)', 'Cookie Consent Banner (AEPD Guide)'),
      metric: tr('Неполный отказ', 'Rechazo incompleto', 'Incomplete Opt-out'),
      desc: tr(
        'Баннер не содержит равнозначной кнопки «Отклонить все» на первом уровне, что противоречит директивам AEPD.',
        'El banner carece de botón visible de "Rechazar todo" en primera capa, contraviniendo la guía de la AEPD.',
        'Cookie banner lacks a direct "Reject all" button on the first layer, breaching AEPD guidelines.'
      ),
      action: tr(
        'Добавить кнопку отказа от cookies первого уровня.',
        'Añadir botón de rechazo en la primera capa del banner.',
        'Add equal 1-click reject button on the first layer.'
      ),
    },
    {
      id: 'ttfb-speed',
      pillar: '01',
      status: 'ok',
      title: tr('Отклик сервера (TTFB & Core Web Vitals)', 'Respuesta del servidor (TTFB)', 'Server Response (TTFB & Web Vitals)'),
      metric: tr('160 мс (отлично)', '160 ms (excelente)', '160 ms (excellent)'),
      desc: tr(
        'Сервер в Испании отвечает за 160 мс, кэширование Elementor настроено корректно.',
        'El servidor responde en 160 ms con caché de Elementor bien configurada.',
        'Server in Spain responds in 160ms, Elementor caching configured properly.'
      ),
      action: tr(
        'Оптимизировать сжатие WebP для новых фото.',
        'Mantener compresión WebP en nuevas imágenes.',
        'Maintain WebP compression on new media.'
      ),
    },
    {
      id: 'mixed-content',
      pillar: '01',
      status: 'critical',
      title: tr('Смешанный контент HTTP/HTTPS', 'Contenido mixto HTTP/HTTPS', 'Mixed content HTTP/HTTPS'),
      metric: tr('Предупреждение в Safari', 'Aviso "No seguro" en iOS', 'Warning in Safari iOS'),
      desc: tr(
        '3 изображения галереи подгружаются по http://, вызывая значок «Небезопасно» на iPhone.',
        '3 imágenes de la galería cargan por http://, mostrando advertencia en Safari móvil.',
        '3 gallery assets load via http://, triggering "Not secure" badges on mobile Safari.'
      ),
      action: tr(
        'Заменить ссылки http:// в базе данных через Search & Replace.',
        'Ejecutar Search & Replace para forzar URLs relativas https://.',
        'Run database Search & Replace to enforce https:// URLs.'
      ),
    },

    // ───── 02 WhatsApp и запись ─────
    {
      id: 'whatsapp-funnel',
      pillar: '02',
      status: 'critical',
      title: tr('Прямой контакт WhatsApp в 1 клик', 'Contacto directo por WhatsApp (1 clic)', 'Direct 1-Click WhatsApp Booking'),
      metric: tr(`Слив до ${DEMO.leadLossPct}% лидов`, `Fuga de hasta ${DEMO.leadLossPct}% de leads`, `Losing up to ${DEMO.leadLossPct}% leads`),
      desc: tr(
        'На смартфонах нет кнопки быстрого чата. 78% переходов с мобильной рекламы уходят без звонка.',
        'Sin botón flotante de WhatsApp. El 78% del tráfico móvil desde anuncios se va sin llamar.',
        'No floating WhatsApp chat button. 78% of mobile ad visitors bounce without dialling.'
      ),
      action: tr(
        'Разместить плавающий виджет wa.me с шаблоном записи.',
        'Integrar widget wa.me con mensaje inicial predeterminado.',
        'Deploy floating wa.me widget with appointment template.'
      ),
    },
    {
      id: 'phone-bottleneck',
      pillar: '02',
      status: 'critical',
      title: tr('Обработка пропущенных звонков', 'Atención telefónica en hora punta', 'Missed Call Bottleneck'),
      metric: tr('Потеря ~16 записей/мес', 'Pérdida de ~16 citas/mes', '~16 lost clients/mo'),
      desc: tr(
        'В отзывах найдены жалобы на сброс звонков по вечерам. Нет автопереадресации на WhatsApp.',
        'Reseñas negativas por llamadas no contestadas por las tardes. Sin desvío automático a WhatsApp.',
        'Repeated reviews complaining of unanswered calls in the evening. No WhatsApp auto-routing.'
      ),
      action: tr(
        'Настроить авто-сообщение в WhatsApp при пропущенном звонке.',
        'Activar desvío con mensaje instantáneo de WhatsApp en llamadas perdidas.',
        'Set up instant WhatsApp follow-up for unanswered calls.'
      ),
    },
    {
      id: 'booking-widget',
      pillar: '02',
      status: 'critical',
      title: tr('Кнопка Cita Previa в каталоге услуг', 'Botón de Cita Previa en catálogo', 'Cita Previa Button in Catalog'),
      metric: tr('Отсутствует в прайсе', 'Ausente en tarifas', 'Missing in Pricing'),
      desc: tr(
        'В каталоге 46 услуг с ценами, но нет кнопки прямой записи в 1 клик.',
        'El catálogo muestra 46 tratamientos con precios, pero sin botón de cita directa.',
        'Catalog lists 46 priced treatments but lacks an instant booking link.'
      ),
      action: tr(
        'Добавить кнопку бронирования к каждой процедуре.',
        'Añadir enlace directo de cita previa bajo cada tarifa.',
        'Add 1-click booking link under each treatment row.'
      ),
    },
    {
      id: 'form-friction',
      pillar: '02',
      status: 'warning',
      title: tr('Количество полей в форме заявки', 'Longitud del formulario móvil', 'Mobile Form Field Friction'),
      metric: tr('5 полей (отказ ~24%)', '5 campos (abandono ~24%)', '5 fields (~24% drop-off)'),
      desc: tr(
        'Форма требует имя, фамилию, email, телефон и комментарий. Четверть пользователей бросают ввод.',
        'El formulario exige 5 campos obligatorios. Un 24% de usuarios móvil lo abandona sin enviar.',
        'Form requires 5 mandatory fields, causing roughly 24% of mobile users to abandon.'
      ),
      action: tr(
        'Сократить форму до 2 полей (Имя + Телефон) или заменить на WhatsApp.',
        'Reducir a 2 campos (Nombre y Teléfono) o sustituir por WhatsApp.',
        'Simplify to 2 fields (Name + Phone) or switch to WhatsApp.'
      ),
    },

    // ───── 03 Реклама и карты ─────
    {
      id: 'meta-pixel',
      pillar: '03',
      status: 'ok',
      title: 'Meta Ads Pixel & CAPI Event',
      metric: tr('Активен (ID: 4819***)', 'Activo (ID: 4819***)', 'Active (ID: 4819***)'),
      desc: tr(
        'Пиксель отслеживает просмотры страниц и переходы, реклама в Instagram фиксируется.',
        'El píxel registra visitas a páginas correctamente para campañas de Instagram.',
        'Pixel tracks page views and campaign clicks properly for Instagram ads.'
      ),
      action: tr(
        'Добавить отслеживание клика по кнопке WhatsApp.',
        'Configurar evento de conversión para clics en WhatsApp.',
        'Set up custom conversion event on WhatsApp clicks.'
      ),
    },
    {
      id: 'google-ads',
      pillar: '03',
      status: 'ok',
      title: 'Google Ads Remarketing Tag',
      metric: tr('Активен (AW-***)', 'Activo (AW-***)', 'Active (AW-***)'),
      desc: tr(
        'Тег ремаркетинга Google активен, собирает аудитории для поисковой рекламы.',
        'La etiqueta de Google Ads funciona y recopila listas de remarketing.',
        'Google remarketing tag is active and gathering remarketing audiences.'
      ),
      action: tr(
        'Проверить фиксацию конверсий звонков.',
        'Verificar medición de conversiones de llamada.',
        'Verify click-to-call conversion tracking.'
      ),
    },
    {
      id: 'google-rating',
      pillar: '03',
      status: 'ok',
      title: tr('Репутационный капитал в Google Maps', 'Reputación en Google Maps', 'Google Maps Social Proof'),
      metric: tr('4.8★ (384 отзыва)', '4.8★ (384 reseñas)', '4.8★ (384 reviews)'),
      desc: tr(
        'Отличный рейтинг и признательность пациентов за качество процедур.',
        'Excelente valoración y fidelidad de pacientes por la calidad asistencial.',
        'Outstanding rating and patient appreciation for medical quality.'
      ),
      action: tr(
        'Отрабатывать негативные отзывы о недозвоне.',
        'Responder a las quejas por llamadas perdidas.',
        'Actively reply to complaints regarding missed calls.'
      ),
    },
    {
      id: 'schema-local',
      pillar: '03',
      status: 'warning',
      title: 'Schema.org MedicalBusiness Microdata',
      metric: tr('Не настроена', 'Sin microdatos', 'Missing Schema'),
      desc: tr(
        'В коде отсутствует разметка MedicalBusiness. Поисковик хуже ранжирует клинику по локальным запросам в Мадриде.',
        'Faltan microdatos estructurados de MedicalBusiness para destacar en búsquedas locales de Madrid.',
        'Missing MedicalBusiness structured schema data, weakening Google local search ranking in Madrid.'
      ),
      action: tr(
        'Внедрить JSON-LD разметку с адресом, часами и врачами.',
        'Insertar bloque JSON-LD con dirección, horario y especialidades.',
        'Add JSON-LD MedicalBusiness structured data.'
      ),
    },
    {
      id: 'owner-id',
      pillar: '03',
      status: 'ok',
      title: tr('Идентификация главного врача (ЛПР)', 'Identificación médica titular', 'Medical Director Identity'),
      metric: tr('Подтверждено', 'Verificado', 'Verified'),
      desc: tr(
        `Главный врач указан: ${titular} (Коллегиальный номер в наличии).`,
        `Titular médica confirmada: ${titular} (Nº de colegiada visible).`,
        `Medical director confirmed: ${titular} (License number visible).`
      ),
      action: tr('Поддерживать актуальность дипломов и лицензий.', 'Mantener titulaciones visibles.', 'Keep certifications up to date.'),
    },
  ];
}

// ───────────── Тизер на лендинге ─────────────
// Три кнопки «Смоделировать исправление» на лендинге закрывают три реальные проверки отчёта.
const TEASER_CHECK_IDS = ['lssi-cif', 'whatsapp-funnel', 'phone-bottleneck'];

/** Индекс тизера. fixed: id кнопок тизера (0, 1, 2), которые пользователь «исправил». */
export function teaserScore(checks: Check[], fixed: number[]): number {
  const ids = fixed.map((i) => TEASER_CHECK_IDS[i]);
  return score(checks, (c) => (ids.includes(c.id) ? 'ok' : c.status));
}

/** Сколько баллов даёт одна кнопка тизера. */
export function teaserPoints(checks: Check[], issueId: number): number {
  return teaserScore(checks, [issueId]) - teaserScore(checks, []);
}
