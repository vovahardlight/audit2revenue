import LegalDocument from '../../components/LegalDocument';

export default function PoliticaPrivacidadPage() {
  return (
    <LegalDocument title="Política de privacidad">
      <section>
        <h2>Estado actual del prototipo</h2>
        <p>La interfaz pública actual se presenta como una demostración: los botones de precio están desactivados y no inician el proceso de checkout desde esta página. Esta nota describe la interfaz visible y no sustituye la comprobación de los endpoints de servidor, los proveedores conectados ni los registros que realmente se generen. Antes de lanzar el servicio, esta política debe ajustarse a los tratamientos de datos que estén efectivamente activos.</p>
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
          <li>Los datos de contacto que la persona facilite al contactar con el titular o solicitar un servicio.</li>
          <li>Los datos necesarios para gestionar un pedido, su estado, facturación y soporte. Los datos completos de tarjeta se introducen en la plataforma de pago y, si así está configurado el servicio, no se almacenan directamente en este sitio.</li>
          <li>Datos técnicos y registros de seguridad que genere la infraestructura utilizada para entregar el sitio y el servicio.</li>
          <li>La preferencia de cookies/almacenamiento técnico elegida por la persona usuaria.</li>
        </ul>
        <p>No introduzcas datos sensibles, credenciales, información privada de clientes ni contenido que no estés autorizado a compartir. Una URL puede contener datos personales; evita incluirlos innecesariamente.</p>
      </section>
      <section>
        <h2>3. Finalidades y bases jurídicas</h2>
        <ul>
          <li><strong>Atender una solicitud de análisis y generar el resultado:</strong> aplicación de medidas precontractuales solicitadas por la persona usuaria o ejecución del contrato, cuando corresponda.</li>
          <li><strong>Procesar el pago, gestionar pedidos, prestar soporte y emitir documentación de la operación:</strong> ejecución contractual y cumplimiento de obligaciones legales aplicables.</li>
          <li><strong>Mantener la seguridad, prevenir abusos y resolver incidencias:</strong> interés legítimo del responsable, previa ponderación de derechos y expectativas de las personas afectadas, o cumplimiento de obligaciones legales cuando corresponda.</li>
          <li><strong>Analítica, publicidad u otras tecnologías no necesarias:</strong> solo si se incorporan y cuando corresponda exista consentimiento previo válido.</li>
        </ul>
      </section>
      <section>
        <h2>4. Proveedores y destinatarios</h2>
        <p>Los datos podrán ser tratados por proveedores que sean necesarios para alojar el sitio, procesar pagos, generar el informe, enviar comunicaciones solicitadas y proteger la infraestructura. Antes de publicar esta política, el titular debe completar y verificar la lista real:</p>
        <ul>
          <li><span className="placeholder">[PROVEEDOR DE HOSTING Y PAÍS DE ALOJAMIENTO]</span>.</li>
          <li><span className="placeholder">[STRIPE U OTRO PROVEEDOR DE PAGO, SI ESTÁ ACTIVO]</span>.</li>
          <li><span className="placeholder">[PROVEEDOR DE IA/ANÁLISIS Y SI RECIBE URLS O CONTENIDO DEL SITIO]</span>.</li>
          <li><span className="placeholder">[PROVEEDORES DE EMAIL, ANALÍTICA U OTROS, SOLO SI SE UTILIZAN]</span>.</li>
        </ul>
        <p>No mantengas proveedores que no uses ni omitas servicios que efectivamente reciban datos. Deben revisarse los contratos de tratamiento, las condiciones de cada proveedor y, cuando corresponda, las garantías para transferencias internacionales.</p>
      </section>
      <section>
        <h2>5. Conservación</h2>
        <p>Los datos se conservarán durante el tiempo necesario para gestionar la solicitud y prestar el servicio. Los datos relacionados con transacciones y facturación se conservarán durante los plazos legalmente exigibles. Los registros de seguridad se conservarán durante un plazo limitado y proporcionado a su finalidad.</p>
        <p>El titular debe concretar los plazos o criterios de conservación según los sistemas y obligaciones que realmente utilice: <span className="placeholder">[DEFINIR PLAZOS REALES PARA URLs/INFORMES, SOPORTE Y LOGS]</span>.</p>
      </section>
      <section>
        <h2>6. Derechos de las personas</h2>
        <p>La persona interesada puede solicitar, cuando proceda, el acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar un consentimiento sin que ello afecte a la licitud del tratamiento anterior. Para ejercer estos derechos, escribe a <span className="placeholder">[EMAIL DE PRIVACIDAD]</span> e indica qué derecho deseas ejercer. Podrá solicitarse información razonable para verificar la identidad.</p>
        <p>También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es/" target="_blank" rel="noreferrer">www.aepd.es</a>).</p>
      </section>
      <section>
        <h2>7. Transferencias internacionales</h2>
        <p>Si alguno de los proveedores trata datos fuera del Espacio Económico Europeo, el responsable debe identificar los países o categorías de destinatarios pertinentes e informar de la base de transferencia aplicable y de cómo obtener información sobre las garantías utilizadas. Completar según los proveedores reales: <span className="placeholder">[DETALLES O INDICAR QUE NO EXISTEN TRANSFERENCIAS INTERNACIONALES, SOLO TRAS VERIFICARLO]</span>.</p>
      </section>
      <section>
        <h2>8. Cambios en la política</h2>
        <p>Esta política se actualizará cuando cambien las finalidades, proveedores o características del tratamiento. La versión vigente estará disponible en esta página.</p>
      </section>
    </LegalDocument>
  );
}
