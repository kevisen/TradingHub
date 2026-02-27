"use client";

import { useEffect, useMemo, useState } from 'react';

type TrendRound = {
  candles: number[];
  expected: 'Long' | 'Short';
};

function buildTrendRound(): TrendRound {
  const bias = Math.random() > 0.5 ? 1 : -1;
  const candles = Array.from({ length: 7 }, () => {
    const base = Math.floor(Math.random() * 3) + 1;
    const noise = Math.random() > 0.8 ? -bias : bias;
    return base * noise;
  });

  const momentum = candles.reduce((sum, value) => sum + value, 0);
  return {
    candles,
    expected: momentum >= 0 ? 'Long' : 'Short',
  };
}

function candleClass(value: number): string {
  return value >= 0
    ? 'bg-green-500/80 border border-green-400/60'
    : 'bg-red-500/80 border border-red-400/60';
}

export function TrendSnapGame() {
  const [round, setRound] = useState<TrendRound>({
    candles: [1, 2, 1, -1, 2, -1, 1],
    expected: 'Long',
  });
  const [feedback, setFeedback] = useState<string>('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    setRound(buildTrendRound());
  }, []);

  function choose(side: 'Long' | 'Short') {
    const correct = side === round.expected;
    setFeedback(correct ? 'Correct read ✅' : `Not this time. Best answer: ${round.expected}`);
    if (correct) setScore((prev) => prev + 1);
  }

  function nextRound() {
    setRound(buildTrendRound());
    setFeedback('');
  }

  return (
    <div className="space-y-4 text-center">
      <div className="flex items-end justify-center gap-2 min-h-20">
        {round.candles.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className={`w-4 rounded-sm ${candleClass(value)}`}
            style={{ height: `${Math.max(16, Math.abs(value) * 10)}px` }}
            title={value >= 0 ? 'Bullish candle' : 'Bearish candle'}
          />
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button className="button-outline px-4 py-2 text-sm" onClick={() => choose('Long')}>
          Long
        </button>
        <button className="button-outline px-4 py-2 text-sm" onClick={() => choose('Short')}>
          Short
        </button>
        <button className="button-primary px-4 py-2 text-sm" onClick={nextRound}>
          New Set
        </button>
      </div>

      <p className="text-xs text-gray-300">Score: {score}</p>
      <p className="text-xs text-gray-300 min-h-5">{feedback}</p>
    </div>
  );
}

type RiskRound = {
  entry: number;
  stop: number;
  target: number;
  answer: string;
  options: string[];
};

function shuffle<T>(values: T[]): T[] {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRiskRound(): RiskRound {
  const risk = [10, 15, 20][Math.floor(Math.random() * 3)];
  const rewardMult = [1.5, 2, 2.5, 3][Math.floor(Math.random() * 4)];
  const entry = [100, 120, 150, 180][Math.floor(Math.random() * 4)];
  const stop = entry - risk;
  const target = entry + risk * rewardMult;
  const answer = `1:${rewardMult}`;

  const options = shuffle(['1:1', '1:1.5', '1:2', '1:2.5', '1:3'])
    .filter((opt, idx, arr) => arr.indexOf(opt) === idx)
    .slice(0, 3);

  if (!options.includes(answer)) {
    options[Math.floor(Math.random() * options.length)] = answer;
  }

  return {
    entry,
    stop,
    target,
    answer,
    options: shuffle(options),
  };
}

export function RiskRewardGame() {
  const [round, setRound] = useState<RiskRound>({
    entry: 120,
    stop: 105,
    target: 150,
    answer: '1:2',
    options: ['1:1', '1:2', '1:3'],
  });
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setRound(buildRiskRound());
  }, []);

  function pick(option: string) {
    const correct = option === round.answer;
    setFeedback(correct ? 'Nice. R:R is correct ✅' : `Correct ratio is ${round.answer}`);
  }

  return (
    <div className="space-y-4 text-center">
      <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-gray-200">
        Entry: {round.entry} · Stop: {round.stop} · Target: {round.target}
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {round.options.map((option) => (
          <button key={option} className="button-outline px-4 py-2 text-sm" onClick={() => pick(option)}>
            {option}
          </button>
        ))}
        <button className="button-primary px-4 py-2 text-sm" onClick={() => { setRound(buildRiskRound()); setFeedback(''); }}>
          New Setup
        </button>
      </div>

      <p className="text-xs text-gray-300 min-h-5">{feedback}</p>
    </div>
  );
}

type PositionRound = {
  balance: number;
  riskPct: number;
  answer: number;
  options: number[];
};

function buildPositionRound(): PositionRound {
  const balance = [1000, 2000, 5000, 10000][Math.floor(Math.random() * 4)];
  const riskPct = [1, 2, 3][Math.floor(Math.random() * 3)];
  const answer = Math.round((balance * riskPct) / 100);
  const wrongA = answer + (Math.random() > 0.5 ? 10 : 20);
  const wrongB = Math.max(5, answer - (Math.random() > 0.5 ? 10 : 20));
  const options = shuffle([answer, wrongA, wrongB]);

  return { balance, riskPct, answer, options };
}

export function PositionSizeGame() {
  const [round, setRound] = useState<PositionRound>({
    balance: 2000,
    riskPct: 2,
    answer: 40,
    options: [30, 40, 50],
  });
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setRound(buildPositionRound());
  }, []);

  const prompt = useMemo(
    () => `Account $${round.balance}, risk ${round.riskPct}% per trade. Max loss?`,
    [round],
  );

  function select(amount: number) {
    const correct = amount === round.answer;
    setFeedback(correct ? 'Great risk discipline ✅' : `Right amount is $${round.answer}`);
  }

  return (
    <div className="space-y-4 text-center">
      <p className="text-sm text-gray-200">{prompt}</p>

      <div className="flex justify-center gap-2 flex-wrap">
        {round.options.map((amount) => (
          <button key={amount} className="button-outline px-4 py-2 text-sm" onClick={() => select(amount)}>
            ${amount}
          </button>
        ))}
        <button className="button-primary px-4 py-2 text-sm" onClick={() => { setRound(buildPositionRound()); setFeedback(''); }}>
          New Quiz
        </button>
      </div>

      <p className="text-xs text-gray-300 min-h-5">{feedback}</p>
    </div>
  );
}
