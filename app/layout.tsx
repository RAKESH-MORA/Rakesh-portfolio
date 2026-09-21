import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rakesh Mora — Full Stack Developer",
  description:
    "Software Engineer & Full Stack Developer building modern, scalable web applications with clean code and great UI/UX.",
  keywords: ["Rakesh Mora", "Full Stack Developer", "Software Engineer", "React", "Node.js", "Portfolio"],
  authors: [{ name: "Rakesh Mora" }],
  creator: "Rakesh Mora",
  openGraph: {
    title: "Rakesh Mora — Full Stack Developer",
    description: "Software Engineer & Full Stack Developer building modern, scalable web applications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0b" },
  ],
};

/**
 * Runs before first paint so the correct theme is applied with no flash.
 * Wrapped in try/catch because `localStorage` throws outright in Safari
 * private browsing and when cookies/site-data are blocked — previously that
 * threw and left the page on the wrong theme.
 */
const THEME_SCRIPT = `
(function () {
  var d = document.documentElement;
  function apply(t) {
    d.setAttribute('data-theme', t);
    try { d.style.colorScheme = t; } catch (e) {}
  }
  var theme = null;
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch (e) {}
  if (!theme) {
    try {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) { theme = 'dark'; }
  }
  apply(theme);
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/*
          Declares upfront, in the raw server HTML, that this page implements
          BOTH color schemes itself. Several Chromium-based browsers (Edge,
          Samsung Internet, Chrome on Android with "Force dark mode for web
          contents") auto-invert page colors whenever the OS is set to dark
          and they don't see this declared before first paint. Without it,
          those browsers can keep rendering a dark filter over the page even
          after your own script sets data-theme="light" — which is exactly
          the "light theme won't become light" symptom. The inline script
          below still owns which theme is actually active; this tag only
          stops the browser from second-guessing it.
        */}
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
