import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./a2r-design-overrides.css";

const geistSans = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audit2Revenue — аудит сайта и точки роста",
  description:
    "Найдите технические проблемы сайта, точки потери заявок и возможности для роста выручки.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('a2r-js');window.setTimeout(function(){var root=document.documentElement;if(!root.classList.contains('a2r-reveals-ready')){root.classList.remove('a2r-js');root.classList.add('a2r-js-fallback')}},10000);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
