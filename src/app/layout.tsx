'use client';

import { ReactNode, useEffect } from 'react';
import Script from 'next/script';
import './globals.css';
import RouteTransitionOverlay from '@/components/animations/RouteTransitionOverlay';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      window.location.assign('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1');
    };

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5TX1SV1XHC"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5TX1SV1XHC');
          `}
        </Script>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
        <title>Trading Bootcamp</title>
        <meta name="description" content="Master Trading The Structured Way" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased cursor-none" suppressHydrationWarning>
        <div className="min-h-screen bg-gray-950 text-gray-50">
          <CustomCursor />
          <RouteTransitionOverlay />
          {children}
        </div>
      </body>
    </html>
  );
}
