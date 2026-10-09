'use client';

import LegalDocument from '../../components/LegalDocument';

export default function PoliticaPrivacidadPage() {
  return (
    <LegalDocument
      titles={{
        es: 'Política de privacidad',
        en: 'Privacy Policy',
        ru: 'Политика конфиденциальности',
      }}
      content={{
        ru: (
          <>
            <section>
              <h2>Текущий статус прототипа</h2>
              <p>Интерфейс находится в демонстрационном режиме. Настоящая политика составлена в соответствии с Регламентом ЕС 2016/679 (RGPD) и Законом Испании LOPDGDD 3/2018.</p>
            </section>
            <section>
              <h2>1. Оператор обработки персональных данных</h2>
              <p><strong>Ответственное лицо:</strong> <span className="placeholder">[ФИО ИЛИ НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ]</span>.</p>
              <p><strong>NIF/CIF:</strong> <span className="placeholder">[НАЛОГОВЫЙ НОМЕР В ИСПАНИИ]</span>.</p>
              <p><strong>Адрес:</strong> <span className="placeholder">[ЮРИДИЧЕСКИЙ АДРЕС]</span>.</p>
              <p><strong>Email по вопросам конфиденциальности:</strong> <span className="placeholder">[EMAIL ДЛЯ ЗАПРОСОВ RGPD]</span>.</p>
            </section>
            <section>
              <h2>2. Какие данные обрабатываются</h2>
              <ul>
                <li>URL-адрес, введённый для проведения аудита.</li>
                <li>Контактные данные при обращении в поддержку или заказе внедрения решений.</li>
                <li>Технические журналы сервера и заголовки IP для обеспечения сетевой безопасности.</li>
                <li>Статус согласия с условиями использования cookies.</li>
              </ul>
            </section>
            <section>
              <h2>3. Правовые основания обработки (RGPD)</h2>
              <ul>
                <li><strong>Проведение экспресс-анализа URL:</strong> исполнение преддоговорных мер по запросу пользователя (ст. 6.1.b RGPD).</li>
                <li><strong>Обеспечение безопасности и предотвращение злоупотреблений:</strong> законный интерес оператора (ст. 6.1.f RGPD).</li>
                <li><strong>Бухгалтерский и налоговый учёт:</strong> исполнение законодательных обязанностей Королевства Испания (ст. 6.1.c RGPD).</li>
              </ul>
            </section>
            <section>
              <h2>4. Права субъектов данных</h2>
              <p>Пользователи имеют право на доступ, исправление, удаление данных (право на забвение), ограничение обработки и переносимость данных. Запросы направляются на email: <span className="placeholder">[EMAIL ДЛЯ ЗАПРОСОВ RGPD]</span>.</p>
              <p>Вы также имеете право подать жалобу в Испанское агентство по защите данных (<a href="https://www.aepd.es/" target="_blank" rel="noreferrer">AEPD — www.aepd.es</a>).</p>
            </section>
          </>
        ),
        en: (
          <>
            <section>
              <h2>Current Prototype Status</h2>
              <p>This interface operates as a technical demonstration. This privacy policy complies with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).</p>
            </section>
            <section>
              <h2>1. Data Controller</h2>
              <p><strong>Controller:</strong> <span className="placeholder">[FULL NAME OR LEGAL ENTITY]</span>.</p>
              <p><strong>Tax ID (NIF/CIF):</strong> <span className="placeholder">[SPANISH TAX ID]</span>.</p>
              <p><strong>Postal Address:</strong> <span className="placeholder">[COMPLETE ADDRESS]</span>.</p>
              <p><strong>Privacy Contact:</strong> <span className="placeholder">[DPO / PRIVACY EMAIL]</span>.</p>
            </section>
            <section>
              <h2>2. Categories of Data Processed</h2>
              <ul>
                <li>Target URL submitted for technical diagnostics.</li>
                <li>Contact details provided during inquiries or support requests.</li>
                <li>Technical connection logs and IP addresses processed for server security.</li>
                <li>Cookie consent preference selection.</li>
              </ul>
            </section>
            <section>
              <h2>3. Legal Bases for Processing (GDPR)</h2>
              <ul>
                <li><strong>Generating website audit:</strong> Pre-contractual steps requested by the user (Art. 6.1.b GDPR).</li>
                <li><strong>Security and abuse mitigation:</strong> Legitimate interest of the controller (Art. 6.1.f GDPR).</li>
                <li><strong>Fiscal records:</strong> Compliance with statutory legal obligations (Art. 6.1.c GDPR).</li>
              </ul>
            </section>
            <section>
              <h2>4. User Rights</h2>
              <p>Users are entitled to exercise their rights of access, rectification, erasure, restriction, objection, and data portability by writing to <span className="placeholder">[PRIVACY EMAIL]</span>.</p>
              <p>You also retain the right to lodge a formal complaint with the Spanish Data Protection Authority (<a href="https://www.aepd.es/" target="_blank" rel="noreferrer">AEPD — www.aepd.es</a>).</p>
            </section>
          </>
        ),
        es: (
          <>
            <section>
              <h2>Estado actual del prototipo</h2>
              <p>La interfaz pública actual se presenta como una demostración técnica conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).</p>
            </section>
            <section>
              <h2>1. Responsable del tratamiento</h2>
              <p><strong>Responsable:</strong> <span className="placeholder">[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]</span>.</p>
              <p><strong>NIF/NIE/CIF:</strong> <span className="placeholder">[IDENTIFICACIÓN FISCAL]</span>.</p>
              <p><strong>Dirección postal:</strong> <span className="placeholder">[DOMICILIO COMPLETO]</span>.</p>
              <p><strong>Contacto para privacidad:</strong> <span className="placeholder">[EMAIL DE PRIVACIDAD O CONTACTO]</span>.</p>
            </section>
            <section>
              <h2>2. Qué datos pueden tratarse</h2>
              <ul>
                <li>La URL que una persona introduce para solicitar un análisis.</li>
                <li>Los datos de contacto que la persona facilite al contactar con el titular.</li>
                <li>Datos técnicos y registros de seguridad que genere la infraestructura.</li>
                <li>La preferencia de cookies elegida por la persona usuaria.</li>
              </ul>
            </section>
            <section>
              <h2>3. Finalidades y bases jurídicas</h2>
              <ul>
                <li><strong>Atender una solicitud de análisis:</strong> medidas precontractuales solicitadas por la persona usuaria (art. 6.1.b RGPD).</li>
                <li><strong>Seguridad y prevención de abusos:</strong> interés legítimo del responsable (art. 6.1.f RGPD).</li>
                <li><strong>Obligaciones legales y fiscales:</strong> cumplimiento de obligaciones legales aplicables (art. 6.1.c RGPD).</li>
              </ul>
            </section>
            <section>
              <h2>4. Derechos de las personas</h2>
              <p>La persona interesada puede solicitar el acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <span className="placeholder">[EMAIL DE PRIVACIDAD]</span>.</p>
              <p>También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es/" target="_blank" rel="noreferrer">AEPD — www.aepd.es</a>).</p>
            </section>
          </>
        ),
      }}
    />
  );
}