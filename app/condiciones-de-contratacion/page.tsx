'use client';

import LegalDocument from '../../components/LegalDocument';

export default function CondicionesContratacionPage() {
  return (
    <LegalDocument
      titles={{
        es: 'Condiciones de contratación',
        en: 'Terms of Service',
        ru: 'Условия обслуживания',
      }}
      content={{
        ru: (
          <>
            <section>
              <h2>Текущий статус: приём коммерческих платежей отключен</h2>
              <p>Публичная версия сервиса является технической демонстрацией. Сумма €19 и любые другие тарифы приведены исключительно в качестве визуальных примеров интерфейса. Кнопки оплаты отключены, заказы не регистрируются. Ниже представлен предварительный текст договора-оферты.</p>
            </section>
            <section>
              <h2>1. Исполнитель услуг</h2>
              <p>Услуги предоставляются <span className="placeholder">[ФИО ИЛИ НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ]</span>, NIF/CIF <span className="placeholder">[НАЛОГОВЫЙ ИДЕНТИФИКАТОР]</span>, адрес: <span className="placeholder">[ЮРИДИЧЕСКИЙ АДРЕС]</span>, email: <span className="placeholder">[EMAIL ПОДДЕРЖКИ]</span>.</p>
            </section>
            <section>
              <h2>2. Предмет услуги</h2>
              <p>Сервис предоставляет автоматизированную цифровую диагностику веб-сайтов с формированием электронного отчёта. Экспресс-анализ носит рекомендательный характер и не заменяет лицензированный аудит безопасности.</p>
            </section>
            <section>
              <h2>3. Стоимость и налоги</h2>
              <p>Интерфейс показывает <strong>€19</strong> в качестве ориентировочной цены. До запуска приёма платежей исполнитель зафиксирует окончательную стоимость с указанием применимого НДС (IVA в Испании) и валюты расчётов.</p>
            </section>
            <section>
              <h2>4. Доставка цифрового контента</h2>
              <p>Готовый аналитический отчёт формируется в режиме онлайн и предоставляется пользователю в интерактивном формате на экране и в виде файла PDF.</p>
            </section>
            <section>
              <h2>5. Право на отказ от услуги (Desistimiento)</h2>
              <p>В отношении физических лиц (потребителей) применяются нормы Королевского законодательного указа Испании 1/2007 (LGDCU). При моментальном предоставлении цифрового контента с согласия заказчика право на 14-дневный отказ регулируется законодательными исключениями для цифровых услуг.</p>
            </section>
            <section>
              <h2>6. Применимое законодательство</h2>
              <p>Настоящие условия подчиняются законодательству Испании и директивам ЕС о защите прав потребителей.</p>
            </section>
          </>
        ),
        en: (
          <>
            <section>
              <h2>Current Status: Commercial Checkout Disabled</h2>
              <p>This public deployment is a technical product demo. The €19 price and any other displayed fees are illustrative references only. Price buttons are disabled and do not initiate monetary charges.</p>
            </section>
            <section>
              <h2>1. Service Provider</h2>
              <p>Services are offered by <span className="placeholder">[FULL NAME OR COMPANY NAME]</span>, Tax ID <span className="placeholder">[TAX ID]</span>, located at <span className="placeholder">[REGISTERED ADDRESS]</span>, contact: <span className="placeholder">[SUPPORT EMAIL]</span>.</p>
            </section>
            <section>
              <h2>2. Scope of Services</h2>
              <p>The platform provides automated digital website assessments and generated diagnostic reports. The automated evaluation is consultative and does not constitute a certified cybersecurity penetration audit.</p>
            </section>
            <section>
              <h2>3. Pricing and Taxes</h2>
              <p>The €19 fee displayed on the demo UI is an illustrative price. Prior to commercial activation, actual pricing including applicable Spanish VAT (IVA) will be disclosed prior to checkout.</p>
            </section>
            <section>
              <h2>4. Delivery of Digital Content</h2>
              <p>Reports are delivered digitally via secure on-screen dashboards and downloadable digital files.</p>
            </section>
            <section>
              <h2>5. Right of Withdrawal</h2>
              <p>Statutory consumer withdrawal rights apply under Spanish and EU consumer protection regulations (LGDCU), subject to standard legal exceptions for immediate digital content delivery.</p>
            </section>
            <section>
              <h2>6. Applicable Law</h2>
              <p>These terms are governed by Spanish and European Union legislation.</p>
            </section>
          </>
        ),
        es: (
          <>
            <section>
              <h2>Estado actual: contratación desactivada</h2>
              <p>Esta versión pública es una demostración del producto. El importe de 19 € y cualquier otro importe mostrado son referencias visuales de ejemplo, no una oferta disponible para contratar. Los botones de precio de esta interfaz están desactivados, no aceptan pedidos y no inician un proceso de pago.</p>
            </section>
            <section>
              <h2>1. Identificación del prestador</h2>
              <p>El servicio se ofrece por <span className="placeholder">[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]</span>, con NIF/NIE/CIF <span className="placeholder">[IDENTIFICACIÓN FISCAL]</span>, domicilio en <span className="placeholder">[DOMICILIO]</span> y correo de contacto <span className="placeholder">[EMAIL]</span>.</p>
            </section>
            <section>
              <h2>2. Qué se contrata</h2>
              <p>La web puede ofrecer un análisis inicial y un informe digital sobre un sitio web. El análisis automatizado tiene carácter orientativo y no equivale a una certificación formal de ciberseguridad.</p>
            </section>
            <section>
              <h2>3. Precio e impuestos</h2>
              <p>La interfaz de demostración muestra <strong>19 €</strong> como importe ilustrativo. Antes de activar las ventas, el prestador confirmará el precio final con IVA aplicable desglosado.</p>
            </section>
            <section>
              <h2>4. Entrega del informe</h2>
              <p>El informe se entregará mediante acceso directo en pantalla o descarga digital una vez procesada la solicitud.</p>
            </section>
            <section>
              <h2>5. Derecho de desistimiento</h2>
              <p>Conforme a la Ley General para la Defensa de los Consumidores y Usuarios (LGDCU), se contemplan las disposiciones y excepciones aplicables al suministro de contenido digital inmediato.</p>
            </section>
            <section>
              <h2>6. Legislación aplicable</h2>
              <p>Estas condiciones se rigen por la normativa española y europea aplicable.</p>
            </section>
          </>
        ),
      }}
    />
  );
}