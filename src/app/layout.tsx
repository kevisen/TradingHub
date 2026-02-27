'use client';

import { ReactNode } from 'react';
import './globals.css';
import RouteTransitionOverlay from '@/components/animations/RouteTransitionOverlay';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
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
