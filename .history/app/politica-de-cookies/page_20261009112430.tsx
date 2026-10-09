import LegalDocument from '../../components/LegalDocument';

export default function PoliticaCookiesPage() {
  return (
    <LegalDocument title="Política de cookies">
      <section>
        <h2>1. Qué tecnologías utiliza el sitio</h2>
        <p>Según el componente frontend revisado, el sitio guarda en el almacenamiento local del navegador la preferencia seleccionada en el aviso de privacidad bajo la clave <code>a2r_cookie_consent</code>. El almacenamiento local del navegador no es técnicamente una cookie HTTP, aunque también debe describirse con transparencia cuando se utiliza para recordar una elección.</p>
        <p>En el componente revisado no se observa la carga directa de herramientas de analítica o publicidad. Esta afirmación debe comprobarse en la web publicada, incluyendo etiquetas de terceros, infraestructura, scripts y el flujo de pago. Si se añaden cookies o tecnologías no necesarias, esta política y el mecanismo de consentimiento deberán actualizarse antes de activarlas.</p>
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
        <p>Al abrir una plataforma externa de pago, como Stripe si está activa, esa plataforma puede usar sus propias cookies o tecnologías. Consulta la información de privacidad y cookies del proveedor en su propio sitio. El titular debe verificar qué tecnologías se activan en el flujo real antes de publicar una lista definitiva.</p>
      </section>
      <section>
        <h2>4. Consentimiento y configuración</h2>
        <p>Las tecnologías no necesarias que requieran consentimiento deben permanecer desactivadas hasta obtenerlo. Las opciones de aceptar y rechazar deben presentarse al mismo tiempo, en el mismo nivel y con visibilidad equivalente. La persona usuaria también debe poder retirar o cambiar su elección mediante un mecanismo accesible.</p>
        <p>Para cambiar las preferencias de almacenamiento local, puede borrar los datos del sitio desde la configuración del navegador. Cuando existan cookies no necesarias o etiquetas de terceros, el sitio debe ofrecer además controles adecuados para cambiar o retirar el consentimiento.</p>
      </section>
      <section>
        <h2>5. Cómo contactar</h2>
        <p>Para dudas sobre esta política, escribe a <span className="placeholder">[EMAIL DE CONTACTO]</span>.</p>
      </section>
    </LegalDocument>
  );
}
