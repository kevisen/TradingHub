"use client";

import React from 'react';
import GsapPageEffects from '@/components/animations/GsapPageEffects';

const games = [
  'Pip Snake',
  'Chart Runner',
  'Candle Dash',
  'Risk Dodge',
  'Equity Escape',
  'Breakout Tap',
  'Trend Rider',
  'Spread Sprint',
  'Liquidity Hunt',
  'Stop Loss Survival',
  'Flash Scalper',
  'Volatility Rush',
  'Market Maze',
  'Trade Tetris',
  'Calm the Charts',
];

export default function ChillZone() {
  return (
    <GsapPageEffects marketState="neutral" streak={1} className="min-h-screen bg-black text-white py-20 px-4">
      <div data-gsap-reveal className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Chill Zone</h1>
        <p className="text-gray-400 mb-8">Choose a mini-game to unwind and sharpen instincts.</p>

        <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((g) => {
            const slug = g.toLowerCase().replace(/\s+/g, '-');
            return (
              <a
                key={slug}
                href={`/chill-zone/${slug}`}
                data-gsap-stagger-item
                data-gsap-button
                className="tilt-card relative block p-6 rounded-xl border border-white/10 bg-white/5 hover:border-purple-400/50 hover:bg-white/10 transition overflow-hidden"
              >
                <div
                  data-tilt-glow
                  className="pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.18) 0%, transparent 70%)',
                  }}
                />
                <h3 className="text-xl font-semibold mb-2">{g}</h3>
                <p className="text-sm text-gray-300">Quick playable mini-experience.</p>
              </a>
            );
          })}
        </div>
      </div>
    </GsapPageEffects>
  );
}
