import LegalDocument from '../../components/LegalDocument';

export default function CondicionesContratacionPage() {
  return (
    <LegalDocument title="Condiciones de contratación">
      <section>
        <h2>Estado actual: contratación desactivada</h2>
        <p>Esta versión pública es una demostración del producto. El importe de 19 € y cualquier otro importe mostrado son referencias visuales de ejemplo, no una oferta disponible para contratar. Los botones de precio de esta interfaz están desactivados, no aceptan pedidos y no inician un proceso de pago. El texto restante es un borrador de condiciones para revisar y completar antes de habilitar la contratación.</p>
      </section>
      <section>
        <h2>1. Identificación del prestador</h2>
        <p>El servicio se ofrece por <span className="placeholder">[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]</span>, con NIF/NIE/CIF <span className="placeholder">[IDENTIFICACIÓN FISCAL]</span>, domicilio en <span className="placeholder">[DOMICILIO]</span> y correo de contacto <span className="placeholder">[EMAIL]</span>. No publiques las condiciones hasta completar estos datos.</p>
      </section>
      <section>
        <h2>2. Qué se contrata</h2>
        <p>La web puede ofrecer un análisis inicial gratuito y un informe digital de pago sobre un sitio web. El contenido exacto, las comprobaciones incluidas, el formato, las limitaciones y el plazo de entrega deben describirse en la oferta mostrada antes del pago.</p>
        <p>El análisis automatizado tiene carácter orientativo. No equivale por sí mismo a una auditoría jurídica, a una prueba de penetración, a una certificación de seguridad ni a una garantía de incremento de ingresos. No deben presentarse resultados de demostración o ejemplos predeterminados como hallazgos reales de la web del cliente.</p>
      </section>
      <section>
        <h2>3. Precio e impuestos</h2>
        <p>La interfaz de demostración muestra <strong>19 €</strong> como importe ilustrativo, no como precio actualmente disponible para contratar. Antes de activar las ventas, el prestador deberá fijar y confirmar el precio real del informe. Antes de activar las ventas, el titular debe confirmar si el precio incluye el IVA u otros impuestos aplicables, mostrar el precio total que pagará la persona consumidora y aclarar cualquier coste adicional, si lo hubiera.</p>
      </section>
      <section>
        <h2>4. Pedido y pago</h2>
        <p>Antes de activar la contratación, la persona usuaria deberá poder revisar las características principales del servicio, su precio total, las condiciones de prestación y la información sobre desistimiento. En esta interfaz de demostración no se inicia el checkout desde los botones visibles ni se aceptan pedidos.</p>
        <p>El titular debe asegurarse de que el botón final indique inequívocamente que el pedido implica una obligación de pago, de que se envía una confirmación del contrato en un soporte duradero y de que se conservan las evidencias que legalmente sean necesarias.</p>
      </section>
      <section>
        <h2>5. Entrega del informe y soporte</h2>
        <p>El informe se entregará de la forma y en el plazo que indique la oferta antes de pagar, por ejemplo, mediante acceso en pantalla o descarga digital si esas funciones están efectivamente disponibles. Si la generación falla, el usuario puede contactar con <span className="placeholder">[EMAIL DE SOPORTE]</span> indicando la referencia de la compra, sin enviar datos de tarjeta.</p>
      </section>
      <section>
        <h2>6. Derecho de desistimiento y reembolsos</h2>
        <p>Cuando la persona compradora tenga la condición de consumidora, se aplicará el derecho de desistimiento y sus excepciones conforme a la normativa vigente. Con carácter general, los contratos a distancia de servicios tienen un plazo de desistimiento de 14 días, salvo que se aplique una excepción legal.</p>
        <p>Si el cliente solicita que el servicio comience durante ese plazo, el proceso de contratación debe recoger las declaraciones expresas que exija la ley para el tipo de servicio concreto y enviar una confirmación de estas. En los supuestos legalmente previstos, la pérdida del derecho de desistimiento por la ejecución completa del servicio o por el inicio de contenido digital requiere cumplir condiciones específicas. No debe utilizarse una renuncia genérica ni una cláusula de “no hay devoluciones” para excluir derechos irrenunciables.</p>
        <p><strong>Antes de publicar:</strong> definir el procedimiento real de desistimiento, el canal de solicitud, los plazos de respuesta y reembolso, y los consentimientos separados que deban recogerse en el checkout: <span className="placeholder">[PROCEDIMIENTO DE DESISTIMIENTO Y REEMBOLSO, REVISADO LEGALMENTE]</span>.</p>
      </section>
      <section>
        <h2>7. Obligaciones del usuario</h2>
        <p>La persona usuaria declara que puede solicitar legítimamente el análisis de la URL introducida. No debe utilizar el servicio para escanear sistemas sin autorización, interferir con terceros ni introducir credenciales o datos personales innecesarios.</p>
      </section>
      <section>
        <h2>8. Reclamaciones y contacto</h2>
        <p>Para incidencias, soporte, facturación o reclamaciones, escribe a <span className="placeholder">[EMAIL DE SOPORTE]</span>. El prestador responderá dentro de un plazo razonable y respetará las vías de reclamación administrativa o extrajudicial que resulten aplicables.</p>
      </section>
      <section>
        <h2>9. Legislación aplicable</h2>
        <p>Estas condiciones se rigen por la normativa española y europea que resulte aplicable, sin perjuicio de los derechos imperativos que correspondan a las personas consumidoras. No se impondrá a una persona consumidora un fuero que la prive de la protección prevista legalmente.</p>
      </section>
    </LegalDocument>
  );
}
