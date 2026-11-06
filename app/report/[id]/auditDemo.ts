// lib/auditDemo.ts
// Единый источник демонстрационных данных для тизера и страницы отчёта.
// Когда появится бэкенд, заменяется только getDemoChecks: он начнёт возвращать
// проверки из API, а остальной код не изменится.

import { score, type Check } from './AuditVisuals'; // поправьте путь под свою структуру

export type Lang = 'ru' | 'es' | 'en';

// Числа, которые должны совпадать на лендинге, в тизере и в отчёте
export const DEMO = {
  price: 900,
  adLossMin: 1200,
  adLossMax: 1600,
  titular: 'Dra. Esther González de la Vega',
};

// Демонстрационные проверки сайта и точек, которые могут мешать обращениям.
export function getDemoChecks(lang: Lang): Check[] {
  const tr = (ru: string, es: string, en: string) => (lang === 'ru' ? ru : lang === 'es' ? es : en);
  const titular = DEMO.titular;

  return [
    // ───── 01 Данные компании и безопасность ─────
    {
      id: 'lssi-cif',
      pillar: '01',
      status: 'critical',
      title: tr('Данные компании в правовой информации', 'Datos de la empresa en la información legal', 'Business details in the legal information'),
      metric: tr('Возможный правовой риск', 'Posible riesgo legal', 'Possible legal risk'),
      desc: tr(
        'В правовой информации сайта не указаны регистрационные данные компании.',
        'En la información legal de la web no aparecen los datos de identificación de la empresa.',
        'The website legal information does not show the company identification details.'
      ),
      action: tr(
        'Добавить необходимые данные компании в правовую информацию сайта.',
        'Añadir los datos necesarios de la empresa en la información legal de la web.',
        'Add the required company details to the website legal information.'
      ),
    },
    {
      id: 'ssl-security',
      pillar: '01',
      status: 'ok',
      title: tr('Защищённое соединение', 'Conexión segura', 'Secure connection'),
      metric: tr('Защищено', 'Protegida', 'Protected'),
      desc: tr(
        'Сайт использует защищённое соединение.',
        'La web utiliza una conexión segura.',
        'The website uses a secure connection.'
      ),
      action: tr('Следить, чтобы соединение оставалось защищённым.', 'Mantener la conexión protegida.', 'Keep the connection secure.'),
    },
    {
      id: 'cookie-banner',
      pillar: '01',
      status: 'warning',
      title: tr('Настройки файлов cookie', 'Aviso de cookies', 'Cookie choices'),
      metric: tr('Не все варианты показаны', 'Faltan opciones', 'Some choices are missing'),
      desc: tr(
        'Посетителю сложно отказаться от необязательных файлов cookie.',
        'A los visitantes les cuesta rechazar las cookies no esenciales.',
        'Visitors may find it hard to reject optional cookies.'
      ),
      action: tr(
        'Добавить заметную кнопку отказа от необязательных файлов cookie.',
        'Añadir un botón visible para rechazar las cookies no esenciales.',
        'Add a clear button to reject optional cookies.'
      ),
    },
    {
      id: 'mixed-content',
      pillar: '01',
      status: 'critical',
      title: tr('Небезопасные изображения на сайте', 'Imágenes no seguras en la web', 'Unsafe images on the website'),
      metric: tr('Предупреждение в браузере', 'Aviso en el navegador', 'Browser warning'),
      desc: tr(
        'Некоторые изображения загружаются через незащищённое соединение, что может вызвать предупреждение в браузере.',
        'Algunas imágenes se cargan mediante una conexión no segura y pueden mostrar un aviso en el navegador.',
        'Some images use an unsecure connection and may trigger a browser warning.'
      ),
      action: tr(
        'Заменить ссылки на изображения, чтобы они открывались через защищённое соединение.',
        'Cambiar los enlaces de las imágenes para que usen una conexión segura.',
        'Update the image links so they use a secure connection.'
      ),
    },

    // ───── 02 Связь и запись ─────
    {
      id: 'whatsapp-funnel',
      pillar: '02',
      status: 'critical',
      title: tr('Кнопка связи через WhatsApp', 'Botón de contacto por WhatsApp', 'WhatsApp contact button'),
      metric: tr('Возможны потерянные обращения', 'Posibles consultas perdidas', 'Potential lost enquiries'),
      desc: tr(
        'На сайте нет заметного способа сразу написать в WhatsApp. Часть посетителей может уйти, не связавшись с компанией.',
        'La web no ofrece una forma visible de escribir por WhatsApp. Algunos visitantes podrían irse sin contactar.',
        'The website has no clear way to start a WhatsApp chat. Some visitors may leave without getting in touch.'
      ),
      action: tr(
        'Añadir un botón visible para iniciar una conversación por WhatsApp.',
        'Añadir un botón visible para iniciar una conversación por WhatsApp.',
        'Add a visible button to start a WhatsApp conversation.'
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
      title: tr('Учёт обращений из Instagram', 'Registro de consultas de Instagram', 'Instagram enquiry tracking'),
      metric: tr('Работает', 'Activo', 'Active'),
      desc: tr(
        'Сайт учитывает переходы из рекламы в Instagram.',
        'La web registra las visitas que llegan desde anuncios de Instagram.',
        'The website records visits from Instagram ads.'
      ),
      action: tr(
        'Добавить учёт обращений через WhatsApp.',
        'Añadir el registro de consultas recibidas por WhatsApp.',
        'Add tracking for enquiries through WhatsApp.'
      ),
    },
    {
      id: 'google-ads',
      pillar: '03',
      status: 'ok',
      title: tr('Учёт переходов из Google Ads', 'Registro de visitas de Google Ads', 'Google Ads visit tracking'),
      metric: tr('Работает', 'Activo', 'Active'),
      desc: tr(
        'Сайт учитывает переходы из рекламы Google.',
        'La web registra las visitas que llegan desde anuncios de Google.',
        'The website records visits from Google ads.'
      ),
      action: tr(
        'Проверить, учитываются ли звонки с сайта.',
        'Comprobar si se registran las llamadas desde la web.',
        'Check whether calls from the website are recorded.'
      ),
    },
    {
      id: 'google-rating',
      pillar: '03',
      status: 'ok',
      title: tr('Отзывы в Google Maps', 'Opiniones en Google Maps', 'Google Maps reviews'),
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
      title: tr('Информация о компании для поиска Google', 'Información de la empresa para Google', 'Business details for Google Search'),
      metric: tr('Не добавлена', 'No añadida', 'Not added'),
      desc: tr(
        'На сайте не хватает структурированной информации о клинике, которая помогает поисковикам показывать сведения о ней.',
        'Falta información organizada sobre la clínica que ayuda a los buscadores a mostrar sus datos.',
        'The website is missing organized business information that helps search engines display its details.'
      ),
      action: tr(
        'Добавить на сайт адрес, часы работы и сведения о специалистах в подходящем формате.',
        'Añadir la dirección, el horario y la información de los profesionales en un formato adecuado.',
        'Add the address, opening hours, and staff details in a format search engines can read.'
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
