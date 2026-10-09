import LegalDocument from '../../components/LegalDocument';

export default function AvisoLegalPage() {
  return (
    <LegalDocument title="Aviso legal">
      <section>
        <h2>1. Datos identificativos del titular</h2>
        <p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de que este sitio web, accesible desde <strong>https://audit2revenue.es</strong>, es titularidad de:</p>
        <ul>
          <li><strong>Titular o razón social:</strong> <span className="placeholder">[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]</span></li>
          <li><strong>NIF/NIE/CIF:</strong> <span className="placeholder">[NÚMERO DE IDENTIFICACIÓN FISCAL]</span></li>
          <li><strong>Domicilio:</strong> <span className="placeholder">[DOMICILIO COMPLETO]</span></li>
          <li><strong>Correo electrónico de contacto:</strong> <span className="placeholder">[EMAIL DE CONTACTO]</span></li>
          <li><strong>Datos registrales:</strong> <span className="placeholder">[SOLO SI PROCEDE; EN CASO CONTRARIO, ELIMINAR ESTE PUNTO]</span></li>
        </ul>
        <p><strong>No publiques esta página hasta sustituir todos los campos entre corchetes.</strong> Si el servicio lo presta una persona física, identifica a esa persona; no presentes una sociedad inexistente como titular.</p>
      </section>
      <section>
        <h2>2. Estado actual: prototipo en demostración</h2>
        <p>En la versión visible actual, Audit2Revenue es un prototipo de interfaz. Los importes y botones de precio se muestran únicamente con fines demostrativos; la interfaz no acepta pedidos ni inicia un checkout desde esos botones. Los resultados del escaneo y del informe pueden estar simulados y no deben interpretarse como hallazgos verificados de un análisis real.</p>
      </section>
      <section>
        <h2>3. Objeto del sitio web</h2>
        <p>Audit2Revenue ofrece información sobre herramientas de diagnóstico automatizado de sitios web y, cuando esté contratado y disponible, la generación de informes digitales sobre aspectos técnicos, comerciales y de presencia online. Las características concretas de cada servicio, su precio y sus condiciones se mostrarán antes de la contratación.</p>
      </section>
      <section>
        <h2>4. Condiciones de uso</h2>
        <p>La persona usuaria se compromete a utilizar el sitio de forma lícita, sin vulnerar derechos de terceros ni interferir en la seguridad, disponibilidad o funcionamiento de la plataforma. Solo debe enviar URLs cuyo análisis esté autorizado o sea legítimo y no debe introducir contraseñas, credenciales ni información confidencial en los campos del sitio.</p>
      </section>
      <section>
        <h2>5. Naturaleza automatizada de los resultados</h2>
        <p>Los resultados generados mediante procesos automatizados o inteligencia artificial pueden ser incompletos, contener errores o depender de la información pública disponible en el momento del análisis. Salvo que se contrate expresamente un servicio profesional distinto, un informe automatizado no constituye una auditoría jurídica, una certificación de ciberseguridad, asesoramiento fiscal ni una garantía de resultados comerciales. Las decisiones importantes deben contrastarse con profesionales cualificados.</p>
        <p>Esta cláusula no limita los derechos irrenunciables de las personas consumidoras ni excluye responsabilidades que legalmente no puedan excluirse.</p>
      </section>
      <section>
        <h2>6. Propiedad intelectual e industrial</h2>
        <p>Los elementos propios del sitio, incluidos el diseño, los textos, los signos distintivos y el código, están protegidos por la normativa aplicable en la medida en que pertenezcan al titular o este tenga autorización para utilizarlos. No se permite su reproducción o explotación fuera de los límites legales sin autorización del titular de los derechos.</p>
      </section>
      <section>
        <h2>7. Enlaces y servicios de terceros</h2>
        <p>El sitio puede enlazar con servicios de terceros, por ejemplo, una plataforma externa de pago. Cada tercero responde de sus propios servicios y de la información legal publicada en sus plataformas. Antes de publicar esta página, el titular debe comprobar que la descripción coincide con las integraciones efectivamente activas.</p>
      </section>
      <section>
        <h2>8. Legislación aplicable</h2>
        <p>Este aviso se rige por la legislación española y de la Unión Europea que resulte aplicable. Cuando la persona usuaria tenga la condición legal de consumidora, se respetarán las normas imperativas de protección al consumidor y las reglas de competencia judicial que le correspondan.</p>
      </section>
    </LegalDocument>
  );
}
