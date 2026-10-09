'use client';

import LegalDocument from '../../components/LegalDocument';

export default function PoliticaCookiesPage() {
  return (
    <LegalDocument
      titles={{
        es: 'Política de cookies',
        en: 'Cookie Policy',
        ru: 'Политика использования cookies',
      }}
      content={{
        ru: (
          <>
            <section>
              <h2>1. Какие технологии использует сайт</h2>
              <p>Сайт сохраняет выбор пользователя относительно согласия на обработку данных в локальном хранилище браузера (localStorage) под ключом <code>a2r_cookie_consent</code>. Локальное хранилище не передаётся на сервер с каждым HTTP-запросом, однако в соответствии с директивой ePrivacy и нормами AEPD требует прозрачного информирования.</p>
            </section>
            <section>
              <h2>2. Зафиксированное локальное хранилище</h2>
              <ul>
                <li><strong>Ключ:</strong> <code>a2r_cookie_consent</code>.</li>
                <li><strong>Тип:</strong> localStorage браузера.</li>
                <li><strong>Назначение:</strong> запоминание выбора («Принять все» или «Только необходимые»).</li>
                <li><strong>Срок хранения:</strong> до очистки кэша пользователем или обновления версии платформой.</li>
              </ul>
            </section>
            <section>
              <h2>3. Сторонние cookies и платёжные сервисы</h2>
              <p>При переходе к внешней платёжной системе (например, Stripe) провайдер может применять собственные файлы cookie, необходимые для предотвращения мошенничества (3D Secure). Рекомендуется ознакомиться с политикой конфиденциальности соответствующего платёжного шлюза.</p>
            </section>
            <section>
              <h2>4. Управление и отзыв согласия</h2>
              <p>Пользователь может в любой момент отозвать или изменить согласие, нажав кнопку «Настройки cookies» в футере сайта, либо очистив локальные данные в настройках своего браузера.</p>
            </section>
          </>
        ),
        en: (
          <>
            <section>
              <h2>1. Technologies Used by This Website</h2>
              <p>This website stores user consent preferences directly in the browser's local storage under the key <code>a2r_cookie_consent</code>. Although browser localStorage is technically distinct from HTTP cookies, transparency is provided in full compliance with European ePrivacy and AEPD guidelines.</p>
            </section>
            <section>
              <h2>2. Identified Local Storage</h2>
              <ul>
                <li><strong>Key:</strong> <code>a2r_cookie_consent</code>.</li>
                <li><strong>Type:</strong> Browser localStorage.</li>
                <li><strong>Purpose:</strong> Memorizes user selection (Accept All vs. Necessary Only).</li>
                <li><strong>Duration:</strong> Persistent until cleared by user or modified by application.</li>
              </ul>
            </section>
            <section>
              <h2>3. Third-Party and Payment Cookies</h2>
              <p>When redirecting to external payment processors such as Stripe, third-party cookies may be deployed by the provider for essential fraud prevention and secure 3D Secure authentication.</p>
            </section>
            <section>
              <h2>4. Managing and Revoking Consent</h2>
              <p>Users can adjust or revoke their preferences at any time by clicking "Cookie Settings" in the website footer or by clearing browser storage.</p>
            </section>
          </>
        ),
        es: (
          <>
            <section>
              <h2>1. Qué tecnologías utiliza el sitio</h2>
              <p>Según el componente frontend revisado, el sitio guarda en el almacenamiento local del navegador la preferencia seleccionada en el aviso de privacidad bajo la clave <code>a2r_cookie_consent</code>. El almacenamiento local del navegador no es técnicamente una cookie HTTP, aunque también debe describirse con transparencia cuando se utiliza para recordar una elección.</p>
            </section>
            <section>
              <h2>2. Almacenamiento observado</h2>
              <ul>
                <li><strong>Clave:</strong> <code>a2r_cookie_consent</code>.</li>
                <li><strong>Tipo:</strong> almacenamiento local del navegador (localStorage).</li>
                <li><strong>Finalidad:</strong> recordar si la persona eligió aceptar todas las opciones ofrecidas o limitarse a las necesarias.</li>
                <li><strong>Duración:</strong> hasta que la persona lo elimine desde el navegador o el valor sea actualizado por el sitio.</li>
              </ul>
            </section>
            <section>
              <h2>3. Cookies de terceros y pago</h2>
              <p>Al abrir una plataforma externa de pago, como Stripe si está activa, esa plataforma puede usar sus propias cookies o tecnologías antifraude.</p>
            </section>
            <section>
              <h2>4. Consentimiento y configuración</h2>
              <p>La persona usuaria puede retirar o cambiar su elección mediante el botón de configuración de cookies en el pie de página o eliminando los datos del sitio desde su navegador.</p>
            </section>
          </>
        ),
      }}
    />
  );
}