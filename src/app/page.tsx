"use client";

import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import Lightbox from '@/components/Lightbox';
import GsapPageEffects from '@/components/animations/GsapPageEffects';
import {
  PositionSizeGame,
  RiskRewardGame,
  TrendSnapGame,
} from '@/components/chill-zone/TradingMiniGames';
import { InstructorCard } from '@/components/InstructorCard';
import { ChevronRight, Upload } from 'lucide-react';

const instructors = [
  {
    id: 'ash',
    name: 'Ash',
    title: 'Professional CRT Strategist | 15+ Years of Experience',
    description: 'With over 15 years mastering CRT and market structure, Ash has helped traders decode price action with precision and confidence. Learn how to read the market like a professional — identify high-probability setups, understand liquidity movements, and trade with clarity instead of emotion.',
  },
  {
    id: 'adarsh',
    name: 'Adarsh',
    title: 'SMC & Institutional Concepts Expert',
    description: 'Adarsh specializes in Smart Money Concepts (SMC), teaching traders how institutions truly move the market. Discover liquidity sweeps, order blocks, mitigation, and advanced market manipulation models used by professionals to stay ahead of retail traders.',
  },
  {
    id: 'jean-mastan',
    name: 'Jean-Mastan',
    title: 'Stock Market Investor & Risk Strategist',
    description: 'Jean brings real-world investing experience from the stock market, focusing on long-term growth, capital preservation, and disciplined execution. Learn how to think like an investor, manage risk intelligently, and build sustainable wealth over time.',
  },
];

const learningPath = [
  {
    level: 'Beginner',
    subtitle: 'Start with the fundamentals',
    points: ['Basic concepts', 'Price action', 'Setup identification'],
  },
  {
    level: 'Intermediate',
    subtitle: 'Build your trading skills',
    points: ['Advanced strategies', 'Market dynamics', 'Risk management'],
  },
  {
    level: 'Advanced',
    subtitle: 'Master professional trading',
    points: ['Institutional tactics', 'Confluence', 'Psychology'],
  },
];

const markets = [
  {
    name: 'Forex Market',
    description: 'Currency pairs traded globally.',
    focus: ['Liquidity', 'Volatility', 'Macroeconomic influence'],
    examples: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'Gold (XAU/USD)', 'USD/CAD'],
  },
  {
    name: 'Stock Market',
    description: 'Ownership in companies.',
    focus: ['Earnings', 'Institutional investment', 'Long-term growth'],
    examples: ['Apple', 'Tesla', 'Amazon', 'S&P 500', 'NASDAQ'],
  },
  {
    name: 'Cryptocurrency Market',
    description: 'Digital decentralized assets.',
    focus: ['Volatility', 'Liquidity cycles', 'Market sentiment'],
    examples: ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana', 'XRP', 'Binance Coin'],
  },
  {
    name: 'Indices Market',
    description: 'Market performance benchmarks.',
    focus: ['Economic reflection', 'Sector weighting', 'Institutional flow'],
    examples: ['S&P 500', 'NASDAQ 100', 'Dow Jones', 'FTSE 100', 'DAX'],
  },
];

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { src: '/visuals/candlestick.webp', alt: 'Candlestick patterns' },
    { src: '/visuals/marketstructure.webp', alt: 'Market structure diagrams' },
    { src: '/visuals/breakofstructure.webp', alt: 'Break of structure examples' },
    { src: '/visuals/liquiditysweep.webp', alt: 'Liquidity sweeps' },
    { src: '/visuals/orderblock.webp', alt: 'Order blocks' },
  ];

  const openLightboxAt = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <GsapPageEffects marketState="neutral" streak={2} className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section data-gsap-reveal className="hero-section relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Mauritian pas mandiant li,
              <span className="block">Apran trade la</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              A complete bootcamp designed to develop technical precision, risk discipline, and market awareness across all major financial markets.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.a
                href="#instructors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-gsap-button
                className="button-primary-glow px-10 py-4 rounded-lg font-bold text-lg"
              >
                Meet The Instructors
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={images} initialIndex={lightboxIndex} onClose={closeLightbox} />
      )}

      {/* LEARNING PATH SECTION removed per request */}

      {/* INSTRUCTORS SECTION */}
      <section id="instructors" data-gsap-reveal className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Learn From Experienced Traders</h2>
          </motion.div>

          {/* Instructor Cards Grid */}
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, idx) => (
              <motion.div
                key={instructor.id}
                data-gsap-stagger-item
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <InstructorCard {...instructor} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISUAL LEARNING SECTION */}
      <section data-gsap-reveal className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Understanding Market Structure Visually</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Trading is visual. Structure, liquidity, and candlestick behavior must be seen to be understood.
            </p>
          </motion.div>

          {/* Image Grid */}
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: 'Candlestick patterns', src: '/visuals/candlestick.webp' },
              { label: 'Market structure diagrams', src: '/visuals/marketstructure.webp' },
              { label: 'Break of structure examples', src: '/visuals/breakofstructure.webp' },
              { label: 'Liquidity sweeps', src: '/visuals/liquiditysweep.webp' },
              { label: 'Order blocks', src: '/visuals/orderblock.webp' },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                data-gsap-stagger-item
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightboxAt(idx)}
                  onKeyDown={(e) => e.key === 'Enter' && openLightboxAt(idx)}
                  className="tilt-card relative h-64 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md group-hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                >
                  <img src={item.src} alt={item.label} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  <div data-tilt-glow className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
                    }}>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
                    <p className="text-sm font-semibold text-gray-200">{item.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox state and rendering */}
          
        </div>
      </section>

      {/* MARKET TEST CTA SECTION */}
      <section data-gsap-reveal className="relative py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Trust Your Gut – Take the Market Test
            </h2>
            <p className="text-gray-400 text-lg mt-4 mb-8">
              Instincts matter in trading. Swipe fast, score harder, and see where you really stand.
            </p>
            <motion.a
              href="/market-test"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-gsap-button
              className="button-primary-glow px-10 py-4 rounded-lg font-bold text-lg"
            >
              Find your babe
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CHILL ZONE - MINI GAMES SECTION */}
      <section id="mini-games" data-gsap-reveal className="loop-grid-34 relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Chill Zone – Mini Games</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Train your trading instincts with short simulation games between lessons.
            </p>
          </motion.div>

          {/* Mini Games Grid */}
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Game 1: Trend Snap */}
            <motion.div
              data-gsap-stagger-item
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="tilt-card relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-white/10">
                <div data-tilt-glow className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                  }}>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">📈 Trend Snap</h3>
                  <p className="text-gray-400 text-sm mb-4">Read candle momentum and call long or short fast.</p>
                  <div className="bg-black/40 rounded-lg p-4">
                    <TrendSnapGame />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Game 2: Risk Reward */}
            <motion.div
              data-gsap-stagger-item
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="tilt-card relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-white/10">
                <div data-tilt-glow className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                  }}>
                </div>
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold mb-2">⚖️ Risk-Reward Match</h3>
                  <p className="text-gray-400 text-sm mb-4">Find the correct R:R from entry, stop, and target.</p>
                  <div className="bg-black/40 rounded-lg p-4">
                    <RiskRewardGame />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Game 3: Position Size */}
            <motion.div
              data-gsap-stagger-item
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="tilt-card relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-white/10">
                <div data-tilt-glow className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                  }}>
                </div>
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold mb-2">💼 Position Size Quiz</h3>
                  <p className="text-gray-400 text-sm mb-4">Practice fixed-percent risk sizing like a pro.</p>
                  <div className="bg-black/40 rounded-lg p-4">
                    <PositionSizeGame />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARKET TYPES SECTION */}
      <section data-gsap-reveal className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Markets Covered in the Bootcamp</h2>
          </motion.div>

          {/* Markets Grid */}
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {markets.map((market, idx) => (
              <motion.div
                key={market.name}
                data-gsap-stagger-item
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="tilt-card relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 overflow-hidden transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-white/10">
                  {/* Glow on hover */}
                  <div data-tilt-glow className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                    }}>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">{market.name}</h3>
                    <p className="text-gray-400 text-sm mb-6">{market.description}</p>

                    {/* Examples */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-purple-300 mb-3">Examples:</p>
                      <div className="flex flex-wrap gap-2">
                        {market.examples.map((example) => (
                          <span key={example} className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/50 text-xs text-purple-200">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div>
                      <p className="text-xs font-semibold text-purple-300 mb-3">Focus:</p>
                      <ul className="space-y-2">
                        {market.focus.map((focus) => (
                          <li key={focus} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="text-purple-400 font-bold">▪</span>
                            <span>{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section data-gsap-reveal className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Trading Community</h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Continue learning, ask questions, and engage with other serious traders inside our private community.
            </p>

            <motion.a
              href="https://discord.gg/mauritius"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-gsap-button
              className="button-cta-glow px-10 py-4 rounded-lg font-bold text-lg inline-block"
            >
              Join Our Discord
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer data-gsap-reveal className="relative border-t border-white/10 bg-black/50 backdrop-blur mt-24">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center text-gray-500 text-sm">
          <p>
            © 2024 Trading Bootcamp. All rights reserved. | No registration. No database. Pure learning.
          </p>
        </div>
      </footer>
    </GsapPageEffects>
  );
}
