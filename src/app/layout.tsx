'use client';

import { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Trading Bootcamp</title>
        <meta name="description" content="Master Trading The Structured Way" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-gray-950 text-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
