import Link from 'next/link';
import type { ReactNode } from 'react';

export default function LegalDocument({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] antialiased">
      <header className="border-b border-black/[0.06] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0F2744] via-[#0284C7] to-[#7DD3FC] text-xs font-bold text-white">A2R</span>
            <span className="text-sm font-semibold tracking-tight text-[#1D1D1F]">Audit<span className="text-[#0284C7]">2</span>Revenue</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-[#0284C7] hover:text-[#0F2744]">Volver a la web</Link>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0284C7]">Audit2Revenue.es</p>
        <h1 className="mb-3 text-3xl font-black tracking-[-0.035em] text-[#0F2744] sm:text-4xl">{title}</h1>
        <p className="mb-6 text-xs text-[#86868B]">Última actualización: 9 de octubre de 2026</p>
        <aside className="mb-9 rounded-2xl border border-[#CBEAF7] bg-[#EFF9FD] p-4 sm:p-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0284C7]">Documentación preliminar · prototipo</p>
          <p className="mt-2 text-sm leading-6 text-[#0F2744]">El sitio se encuentra en fase de demostración. Este texto es un borrador de trabajo: los campos destacados deben completarse y el contenido debe verificarse frente a los proveedores y procesos reales antes de activar el servicio comercial.</p>
        </aside>
        <article className="legal-content space-y-8 text-sm leading-7 text-[#454B54]">{children}</article>
        <nav aria-label="Información legal" className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/[0.08] pt-5 text-xs font-medium text-[#0284C7]">
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/politica-de-cookies">Política de cookies</Link>
          <Link href="/condiciones-de-contratacion">Condiciones de contratación</Link>
        </nav>
      </div>
      <style>{`
        .legal-content h2 { color: #0F2744; font-size: 1.05rem; line-height: 1.5; font-weight: 750; letter-spacing: -0.015em; margin-bottom: .6rem; }
        .legal-content h3 { color: #0F2744; font-size: .95rem; font-weight: 700; margin-bottom: .35rem; }
        .legal-content p { margin-top: .45rem; }
        .legal-content ul { list-style: disc; padding-left: 1.35rem; margin-top: .5rem; }
        .legal-content li { margin: .3rem 0; }
        .legal-content a { color: #0284C7; text-decoration: underline; text-underline-offset: 3px; }
        .legal-content strong { color: #1D1D1F; font-weight: 650; }
        .legal-content .placeholder { color: #9A3412; background: #FFF7ED; border-radius: .3rem; padding: .05rem .25rem; font-weight: 700; }
      `}</style>
    </main>
  );
}
