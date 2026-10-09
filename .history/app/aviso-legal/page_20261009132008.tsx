import LegalDocument from '../../components/LegalDocument';

export default function AvisoLegalPage() {
  return (
    <LegalDocument
      titles={{
        es: 'Aviso legal',
        en: 'Legal Notice',
        ru: 'Правовое уведомление',
      }}
    >
      {(lang) => {
        if (lang === 'ru') {
          return (
            <>
              <section>
                <h2>1. Идентификационные данные владельца</h2>
                <p>В соответствии со статьей 10 Закона Испании 34/2002 об услугах информационного общества и электронной коммерции (LSSI-CE), сообщается, что данный веб-сайт, доступный по адресу <strong>https://audit2revenue.es</strong>, принадлежит:</p>
                <ul>
                  <li><strong>Владелец / Юридическое лицо:</strong> <span className="placeholder">[ФИО ИЛИ НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ]</span></li>
                  <li><strong>NIF/NIE/CIF (Испанский налоговый номер):</strong> <span className="placeholder">[НАЛОГОВЫЙ ИДЕНТИФИКАТОР]</span></li>
                  <li><strong>Юридический адрес:</strong> <span className="placeholder">[ПОЛНЫЙ ЮРИДИЧЕСКИЙ АДРЕС В ИСПАНИИ]</span></li>
                  <li><strong>Контактный email:</strong> <span className="placeholder">[КОНТАКТНЫЙ EMAIL]</span></li>
                  <li><strong>Регистрационные данные:</strong> <span className="placeholder">[ТОЛЬКО ДЛЯ ЮРЛИЦ В ТОРГОВОМ РЕЕСТРЕ REGISTRO MERCANTIL]</span></li>
                </ul>
                <p><strong>Не публикуйте страницу до заполнения всех полей в скобках.</strong> Если услуга оказывается физическим лицом (Autónomo), необходимо указать его личные данные.</p>
              </section>
              <section>
                <h2>2. Текущий статус: прототип в демонстрационном режиме</h2>
                <p>В текущей публичной версии Audit2Revenue является техническим прототипом интерфейса. Цены и кнопки оплаты показаны исключительно в демонстрационных целях; интерфейс не принимает заказы и не проводит списания с банковских карт. Результаты сканирования могут моделироваться и не являются заверенными аудиторскими отчётами.</p>
              </section>
              <section>
                <h2>3. Предмет и назначение веб-сайта</h2>
                <p>Audit2Revenue информирует о цифровых инструментах автоматизированной экспресс-диагностики веб-сайтов и формировании цифровых отчётов по техническим, коммерческим и регуляторным аспектам присутствия бизнеса в Испании.</p>
              </section>
              <section>
                <h2>4. Условия использования</h2>
                <p>Пользователь обязуется использовать сайт добросовестно, не нарушая права третьих лиц и безопасность платформы. Разрешается отправлять на проверку только те URL, анализ которых санкционирован владельцем ресурса. Запрещено вводить пароли и конфиденциальные данные.</p>
              </section>
              <section>
                <h2>5. Автоматизированный характер результатов</h2>
                <p>Результаты сканирования формируются автоматически с применением алгоритмов и носят информационно-ориентировочный характер. Автоматический экспресс-скан не заменяет комплексный юридический аудит сертифицированного адвоката или сертификацию кибербезопасности.</p>
              </section>
              <section>
                <h2>6. Интеллектуальная собственность</h2>
                <p>Дизайн, программный код, графика и товарные знаки платформы защищены законодательством Испании и ЕС об интеллектуальной собственности.</p>
              </section>
              <section>
                <h2>7. Применимое право и юрисдикция</h2>
                <p>Настоящее уведомление регулируется законодательством Королевства Испания и нормами Европейского союза.</p>
              </section>
            </>
          );
        }

        if (lang === 'en') {
          return (
            <>
              <section>
                <h2>1. Service Provider Identification</h2>
                <p>In compliance with Article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), this website, accessible at <strong>https://audit2revenue.es</strong>, is operated by:</p>
                <ul>
                  <li><strong>Legal Name / Company:</strong> <span className="placeholder">[FULL NAME OR COMPANY NAME]</span></li>
                  <li><strong>Tax ID (NIF/NIE/CIF):</strong> <span className="placeholder">[SPANISH TAX IDENTIFICATION NUMBER]</span></li>
                  <li><strong>Registered Address:</strong> <span className="placeholder">[COMPLETE BUSINESS ADDRESS]</span></li>
                  <li><strong>Contact Email:</strong> <span className="placeholder">[CONTACT EMAIL]</span></li>
                  <li><strong>Commercial Registry Data:</strong> <span className="placeholder">[REGISTRO MERCANTIL DETAILS IF APPLICABLE]</span></li>
                </ul>
              </section>
              <section>
                <h2>2. Current Status: Technical Prototype Demo</h2>
                <p>In this visible public version, Audit2Revenue operates strictly as a technical interface prototype. Displayed prices and buttons are purely illustrative; the interface does not process orders or initiate commercial checkouts. Scan findings may be simulated for UI testing purposes.</p>
              </section>
              <section>
                <h2>3. Purpose of the Website</h2>
                <p>Audit2Revenue provides information regarding automated website audit diagnostic tools and performance optimization reports for commercial businesses operating in Spain.</p>
              </section>
              <section>
                <h2>4. Terms of Use</h2>
                <p>Users agree to use the platform lawfully and without compromising technical infrastructure. Users must only submit URLs they are legitimately authorized to inspect.</p>
              </section>
              <section>
                <h2>5. Automated Nature of Results</h2>
                <p>Automated diagnostics and AI analyses are orientative. They do not constitute formal legal counsel, tax advice, or cybersecurity certifications.</p>
              </section>
              <section>
                <h2>6. Intellectual Property</h2>
                <p>All design assets, code, brand elements, and interface components are protected under Spanish and EU intellectual property legislation.</p>
              </section>
              <section>
                <h2>7. Governing Law and Jurisdiction</h2>
                <p>This legal notice is governed by Spanish and European Union legislation.</p>
              </section>
            </>
          );
        }

        // ES (По умолчанию)
        return (
          <>
            <section>
              <h2>1. Datos identificativos del titular</h2>
              <p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de que este sitio web, accesible desde <strong>https://audit2revenue.es</strong>, es titularidad de:</p>
              <ul>
                <li><strong>Titular o razón social:</strong> <span className="placeholder">[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]</span></li>
                <li><strong>NIF/NIE/CIF:</strong> <span className="placeholder">[NÚMERO DE IDENTIFICACIÓN FISCAL]</span></li>
                <li><strong>Domicilio:</strong> <span className="placeholder">[DOMICILIO COMPLETO]</span></li>
                <li><strong>Correo electrónico de contacto:</strong> <span className="placeholder">[EMAIL DE CONTACTO]</span></li>
                <li><strong>Datos registrales:</strong> <span className="placeholder">[REGISTRO MERCANTIL SI PROCEDE]</span></li>
              </ul>
              <p><strong>No publiques esta página hasta sustituir todos los campos entre corchetes.</strong> Si el servicio lo presta una persona física, identifica a esa persona.</p>
            </section>
            <section>
              <h2>2. Estado actual: prototipo en demostración</h2>
              <p>En la versión visible actual, Audit2Revenue es un prototipo de interfaz. Los importes y botones de precio se muestran únicamente con fines demostrativos; la interfaz no acepta pedidos ni inicia un checkout desde esos botones. Los resultados del escaneo y del informe pueden estar simulados y no deben interpretarse como hallazgos verificados de un análisis real.</p>
            </section>
            <section>
              <h2>3. Objeto del sitio web</h2>
              <p>Audit2Revenue ofrece información sobre herramientas de diagnóstico automatizado de sitios web y, cuando esté contratado y disponible, la generación de informes digitales sobre aspectos técnicos, comerciales y de presencia online.</p>
            </section>
            <section>
              <h2>4. Condiciones de uso</h2>
              <p>La persona usuaria se compromete a utilizar el sitio de forma lícita, sin vulnerar derechos de terceros ni interferir en la seguridad, disponibilidad o funcionamiento de la plataforma. Solo debe enviar URLs cuyo análisis esté autorizado o sea legítimo.</p>
            </section>
            <section>
              <h2>5. Naturaleza automatizada de los resultados</h2>
              <p>Los resultados generados mediante procesos automatizados o inteligencia artificial pueden ser incompletos o depender de la información pública disponible en el momento del análisis. Un informe automatizado no constituye una auditoría jurídica, certificación de ciberseguridad ni garantía de resultados comerciales.</p>
            </section>
            <section>
              <h2>6. Propiedad intelectual e industrial</h2>
              <p>Los elementos propios del sitio, incluidos el diseño, los textos, los signos distintivos y el código, están protegidos por la normativa aplicable.</p>
            </section>
            <section>
              <h2>7. Legislación aplicable</h2>
              <p>Este aviso se rige por la legislación española y de la Unión Europea que resulte aplicable.</p>
            </section>
          </>
        );
      }}
    </LegalDocument>
  );
}