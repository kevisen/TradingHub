const fs = require('fs');
const path = require('path');

// All 32 lessons for ash beginner
const lessons = [
  {
    id: "ash-beg-01",
    title: "Intro",
    videoUrl: "https://www.youtube.com/watch?v=qtqP8dXl1Fo&t=3s",
    mcqs: [
      {
        question: "What is the primary objective of a trading bootcamp?",
        options: ["Entertainment", "Structured skill development", "Gambling practice", "Fast profit only"],
        correctIndex: 1
      },
      {
        question: "A trader should first focus on:",
        options: ["Strategy understanding", "Buying signals", "High leverage", "Copying others"],
        correctIndex: 0
      },
      {
        question: "Consistency in trading comes from:",
        options: ["Luck", "Discipline and rules", "News guessing", "Random entries"],
        correctIndex: 1
      },
      {
        question: "The foundation of trading success is:",
        options: ["Indicators", "Psychology + Risk Management", "Social media", "AI bots"],
        correctIndex: 1
      },
      {
        question: "Learning before earning means:",
        options: ["Trade immediately", "Master basics first", "Borrow capital", "Ignore risk"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-02",
    title: "Investing vs. Trading: What's the Difference?",
    videoUrl: "https://youtu.be/_sdO55lkc_Q",
    mcqs: [
      {
        question: "Trading usually focuses on:",
        options: ["Long-term holding", "Short-term price movement", "Dividends", "Real estate"],
        correctIndex: 1
      },
      {
        question: "Investing typically involves:",
        options: ["Scalping", "Long-term growth", "Tick trading", "Intraday news spikes"],
        correctIndex: 1
      },
      {
        question: "Traders rely heavily on:",
        options: ["Technical analysis", "Property valuation", "Rental yield", "Farming"],
        correctIndex: 0
      },
      {
        question: "Investors are more concerned about:",
        options: ["Macro fundamentals", "1-minute candles", "Spread size", "Tick imbalance"],
        correctIndex: 0
      },
      {
        question: "Time horizon difference mainly affects:",
        options: ["Risk style", "Laptop brand", "Chart color", "Internet speed"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-03",
    title: "How to Choose the Right Market",
    videoUrl: "https://youtu.be/13tkhWLTvTg",
    mcqs: [
      {
        question: "Forex market trades:",
        options: ["Stocks", "Commodities", "Currency pairs", "NFTs"],
        correctIndex: 2
      },
      {
        question: "Crypto markets are known for:",
        options: ["Low volatility", "High volatility", "No movement", "Fixed pricing"],
        correctIndex: 1
      },
      {
        question: "Futures contracts are traded on:",
        options: ["Centralized exchanges", "WhatsApp", "Instagram", "Forums"],
        correctIndex: 0
      },
      {
        question: "Choosing a market depends on:",
        options: ["Personality and schedule", "Random choice", "Friend's advice", "Logo design"],
        correctIndex: 0
      },
      {
        question: "Liquidity affects:",
        options: ["Execution speed", "Chart theme", "Screen size", "Mouse DPI"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-04",
    title: "Ash Training Day 1.1",
    videoUrl: "https://youtu.be/HZ3ktZh8xMI",
    mcqs: [
      {
        question: "What is market structure based on?",
        options: ["Random candles", "Highs and lows", "Volume only", "News only"],
        correctIndex: 1
      },
      {
        question: "An uptrend forms when price makes:",
        options: ["Lower highs", "Equal highs", "Higher highs and higher lows", "Flat lines"],
        correctIndex: 2
      },
      {
        question: "A break of structure signals:",
        options: ["Trend continuation or shift", "Weather change", "Broker issue", "Spread widening"],
        correctIndex: 0
      },
      {
        question: "Liquidity often sits above:",
        options: ["Random price", "Equal highs/lows", "News candles", "Indicators"],
        correctIndex: 1
      },
      {
        question: "Patience in trading means:",
        options: ["Forcing entries", "Waiting for confirmation", "Trading daily", "Increasing lot size"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-05",
    title: "Ash Training Day 1.2",
    videoUrl: "https://youtu.be/iGgk1dMjs24",
    mcqs: [
      {
        question: "What confirms a valid breakout?",
        options: ["One wick", "Strong body close beyond level", "Small doji", "Volume drop"],
        correctIndex: 1
      },
      {
        question: "Inducement in trading means:",
        options: ["Random movement", "Luring traders before reversal", "News spike", "Weekend gap"],
        correctIndex: 1
      },
      {
        question: "Internal structure refers to:",
        options: ["Lower timeframe movement", "Broker policy", "Hardware specs", "Internet lag"],
        correctIndex: 0
      },
      {
        question: "Reaction from HTF zone suggests:",
        options: ["Strong interest area", "Weak chart", "Bad broker", "Spread widening"],
        correctIndex: 0
      },
      {
        question: "Confirmation reduces:",
        options: ["Risk exposure", "Profit", "Screen time", "Charts"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-06",
    title: "Ash - Day 2 Part 1",
    videoUrl: "https://youtu.be/tRQTV_8tt7w",
    mcqs: [
      {
        question: "What is risk per trade usually measured in?",
        options: ["Pips or percentage", "Candles", "Colors", "Minutes"],
        correctIndex: 0
      },
      {
        question: "A 1:2 RR means:",
        options: ["Risk 2 to gain 1", "Risk 1 to gain 2", "Equal risk", "No risk"],
        correctIndex: 1
      },
      {
        question: "Overleveraging causes:",
        options: ["Stability", "Account blow risk", "Discipline", "Consistency"],
        correctIndex: 1
      },
      {
        question: "Stop loss protects:",
        options: ["Ego", "Capital", "Indicators", "News"],
        correctIndex: 1
      },
      {
        question: "Position sizing depends on:",
        options: ["Account size", "Mood", "Market rumor", "Candle color"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-07",
    title: "Ash Training DAY 2.2",
    videoUrl: "https://youtu.be/CHcRnMl11Ew",
    mcqs: [
      {
        question: "What is draw on liquidity?",
        options: ["Random entry", "Price moving toward liquidity pools", "Indicator crossover", "Spread widening"],
        correctIndex: 1
      },
      {
        question: "Liquidity is commonly found at:",
        options: ["Equal highs and lows", "Random candles", "Mid-chart areas", "Broker zones"],
        correctIndex: 0
      },
      {
        question: "Smart money often targets:",
        options: ["Retail stop losses", "News headlines", "Indicators", "Fibonacci only"],
        correctIndex: 0
      },
      {
        question: "A liquidity sweep usually:",
        options: ["Ends trend immediately", "Grabs stops before reversal", "Closes market", "Freezes spreads"],
        correctIndex: 1
      },
      {
        question: "Understanding liquidity improves:",
        options: ["Entry timing", "Laptop speed", "Chart color", "Internet signal"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-08",
    title: "Ash Training Day 3",
    videoUrl: "https://youtu.be/AY7ffE_0CfE",
    mcqs: [
      {
        question: "What defines a strong impulse move?",
        options: ["Small candles", "Consecutive strong bodies", "Equal highs", "Low volume"],
        correctIndex: 1
      },
      {
        question: "Consolidation typically represents:",
        options: ["Distribution or accumulation", "Trend confirmation", "Stop loss", "News spike"],
        correctIndex: 0
      },
      {
        question: "Expansion follows:",
        options: ["Randomness", "Compression phase", "Broker updates", "Indicator lag"],
        correctIndex: 1
      },
      {
        question: "Momentum shift may signal:",
        options: ["Continuation only", "Possible reversal", "Chart error", "Spread issue"],
        correctIndex: 1
      },
      {
        question: "Price delivery is:",
        options: ["Random movement", "Structured movement from level to level", "News only", "Weekend gap"],
        correctIndex: 1
      }
    ]
  }
];

// Lessons 9-16
const lessons2 = [
  {
    id: "ash-beg-09",
    title: "ASH TRAINING DAY 4",
    videoUrl: "https://youtu.be/87lFjto6HXI",
    mcqs: [
      {
        question: "What is imbalance in trading?",
        options: ["Equal buyers and sellers", "Inefficient price movement", "Broker manipulation", "Spread increase"],
        correctIndex: 1
      },
      {
        question: "Fair Value Gap (FVG) represents:",
        options: ["Balanced price", "Unfilled price inefficiency", "Support line", "Indicator crossover"],
        correctIndex: 1
      },
      {
        question: "Price often returns to FVG to:",
        options: ["Ignore it", "Rebalance inefficiency", "Close market", "Create spread"],
        correctIndex: 1
      },
      {
        question: "A valid FVG must:",
        options: ["Be visible on structure", "Be random", "Be small only", "Have no context"],
        correctIndex: 0
      },
      {
        question: "Imbalance trading focuses on:",
        options: ["Structure + inefficiency", "Random signals", "News only", "Social media"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-10",
    title: "Ash Training Day 5 Part 1",
    videoUrl: "https://youtu.be/9fD4CFKTHTE",
    mcqs: [
      {
        question: "Bias in trading means:",
        options: ["Emotional opinion", "Directional expectation", "Random guess", "Indicator color"],
        correctIndex: 1
      },
      {
        question: "Daily bias helps:",
        options: ["Lower timeframe entries", "Laptop performance", "Spread reduction", "Internet speed"],
        correctIndex: 0
      },
      {
        question: "HTF bias overrides:",
        options: ["Minor LTF noise", "Broker spread", "Indicators", "Chart theme"],
        correctIndex: 0
      },
      {
        question: "A wrong bias leads to:",
        options: ["Clear entries", "Forced trades", "Perfect RR", "Guaranteed wins"],
        correctIndex: 1
      },
      {
        question: "Bias should be based on:",
        options: ["Structure and liquidity", "Feelings", "News only", "Random choice"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-11",
    title: "Ash Training Day 5 Part 2",
    videoUrl: "https://youtu.be/exZUGTWdbB4",
    mcqs: [
      {
        question: "PO3 consists of:",
        options: ["Accumulation, Manipulation, Distribution", "Buy, Sell, Hold", "Trend, Range, Flat", "News, Volatility, Gap"],
        correctIndex: 0
      },
      {
        question: "Manipulation phase usually:",
        options: ["Traps traders", "Closes market", "Low volatility only", "No movement"],
        correctIndex: 0
      },
      {
        question: "Distribution phase follows:",
        options: ["Accumulation", "Manipulation", "Both A and B", "News event"],
        correctIndex: 2
      },
      {
        question: "Accumulation forms:",
        options: ["During high volatility", "Before expansion", "After trend end only", "Randomly"],
        correctIndex: 1
      },
      {
        question: "PO3 model improves:",
        options: ["Timing precision", "Screen brightness", "Spread", "Broker choice"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-12",
    title: "Ash Training Day 5 Part 3",
    videoUrl: "https://youtu.be/Uzi0b5tipLc",
    mcqs: [
      {
        question: "Session timing affects:",
        options: ["Liquidity", "Candle color", "Internet", "Hardware"],
        correctIndex: 0
      },
      {
        question: "London session is known for:",
        options: ["Increased volatility", "No movement", "Weekend gap", "Low liquidity"],
        correctIndex: 0
      },
      {
        question: "NY session overlap creates:",
        options: ["Higher liquidity", "Flat market", "No trades", "Spread freeze"],
        correctIndex: 0
      },
      {
        question: "Session bias must align with:",
        options: ["Higher timeframe bias", "Emotions", "Random entries", "Indicators only"],
        correctIndex: 0
      },
      {
        question: "Time-based models depend on:",
        options: ["Kill zones", "Laptop brand", "Mouse DPI", "Chart color"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-13",
    title: "Day 6 FAQ - WARM UP",
    videoUrl: "https://youtu.be/KaLcCgYhPnk",
    mcqs: [
      {
        question: "Warm-up before trading helps improve:",
        options: ["Emotional control", "Internet speed", "Broker leverage", "Spread size"],
        correctIndex: 0
      },
      {
        question: "Reviewing previous trades improves:",
        options: ["Screen brightness", "Pattern recognition", "Mouse accuracy", "Chart theme"],
        correctIndex: 1
      },
      {
        question: "A trading routine builds:",
        options: ["Randomness", "Consistency", "Overtrading", "Fear"],
        correctIndex: 1
      },
      {
        question: "Journaling helps identify:",
        options: ["Chart colors", "Behavioral mistakes", "Broker fees", "Candle size"],
        correctIndex: 1
      },
      {
        question: "Preparation reduces:",
        options: ["Risk awareness", "Emotional impulsiveness", "Liquidity", "Volatility"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-14",
    title: "Day 6 Part 2",
    videoUrl: "https://youtu.be/Wd0WWHGZm8s",
    mcqs: [
      {
        question: "Confirmation entry improves:",
        options: ["Accuracy", "Random trades", "Overleveraging", "Noise"],
        correctIndex: 0
      },
      {
        question: "A retracement entry aims to:",
        options: ["Enter at premium/discount", "Enter at random", "Trade without bias", "Avoid structure"],
        correctIndex: 0
      },
      {
        question: "Premium zone is typically:",
        options: ["Above equilibrium", "Below equilibrium", "Random level", "News candle"],
        correctIndex: 0
      },
      {
        question: "Discount zone is:",
        options: ["Above range", "Below equilibrium", "Spread zone", "Weekend gap"],
        correctIndex: 1
      },
      {
        question: "Equilibrium represents:",
        options: ["50% of range", "Stop loss", "Resistance only", "Indicator signal"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-15",
    title: "Decoding Market Structure Part 1 Bonus",
    videoUrl: "https://youtu.be/U2LmyigJRPo",
    mcqs: [
      {
        question: "External structure refers to:",
        options: ["Higher timeframe swing", "1-minute chart", "Indicator crossover", "News event"],
        correctIndex: 0
      },
      {
        question: "Internal structure helps refine:",
        options: ["Entry timing", "Bias only", "Spread", "Broker selection"],
        correctIndex: 0
      },
      {
        question: "Break of structure (BOS) confirms:",
        options: ["Continuation", "Random move", "Chart glitch", "Flat market"],
        correctIndex: 0
      },
      {
        question: "Change of character (CHOCH) signals:",
        options: ["Possible shift", "Volume spike only", "Spread widening", "Broker issue"],
        correctIndex: 0
      },
      {
        question: "Structural analysis prevents:",
        options: ["Blind entries", "Profit", "Liquidity", "Volatility"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-16",
    title: "Decoding Market Structure Part 2 Bonus",
    videoUrl: "https://youtu.be/ZIy6vxdg1ZA",
    mcqs: [
      {
        question: "Inducement often appears before:",
        options: ["Major move", "Weekend", "Flat market", "Indicator lag"],
        correctIndex: 0
      },
      {
        question: "Liquidity raid confirms:",
        options: ["Stop hunt", "Broker shutdown", "Spread freeze", "News halt"],
        correctIndex: 0
      },
      {
        question: "Structural shift requires:",
        options: ["Candle close confirmation", "Wick only", "Volume drop", "Gap open"],
        correctIndex: 0
      },
      {
        question: "Higher timeframe liquidity is:",
        options: ["Stronger target", "Irrelevant", "Random", "Weak zone"],
        correctIndex: 0
      },
      {
        question: "Structure alignment improves:",
        options: ["Probability", "Emotions", "Randomness", "Risk exposure"],
        correctIndex: 0
      }
    ]
  }
];

// Lessons 17-32
const lessons3 = [
  {
    id: "ash-beg-17",
    title: "DAY 7 - TS Intro",
    videoUrl: "https://youtu.be/Vex1hb5PvDc",
    mcqs: [
      {
        question: "A trading system (TS) must include:",
        options: ["Entry, SL, TP rules", "Random ideas", "News only", "Social media tips"],
        correctIndex: 0
      },
      {
        question: "Backtesting a system checks:",
        options: ["Historical performance", "Laptop speed", "Broker quality", "Chart layout"],
        correctIndex: 0
      },
      {
        question: "A valid TS removes:",
        options: ["Emotions", "Structure", "Risk control", "Bias"],
        correctIndex: 0
      },
      {
        question: "Rules-based trading creates:",
        options: ["Consistency", "Overtrading", "Confusion", "Random entries"],
        correctIndex: 0
      },
      {
        question: "System refinement improves:",
        options: ["Edge", "Spread", "Volatility", "Broker leverage"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-18",
    title: "DAY 8 - LIVE ACCOUNTS VS PROP FIRM",
    videoUrl: "https://youtu.be/PXAQycTAkkE",
    mcqs: [
      {
        question: "Prop firms provide:",
        options: ["Funded capital", "Guaranteed profit", "No rules", "Free leverage"],
        correctIndex: 0
      },
      {
        question: "Evaluation phase tests:",
        options: ["Discipline", "Internet speed", "Chart theme", "Indicator color"],
        correctIndex: 0
      },
      {
        question: "Live account risk is:",
        options: ["Personal capital", "Demo balance", "Free capital", "Virtual money"],
        correctIndex: 0
      },
      {
        question: "Drawdown rules are:",
        options: ["Risk limits", "Indicator signals", "Bias model", "Session timing"],
        correctIndex: 0
      },
      {
        question: "Prop trading requires:",
        options: ["Strict risk control", "Overleveraging", "Gambling", "Random trades"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-19",
    title: "Decoding Market Structure Unveiling Secrets Part 1",
    videoUrl: "https://youtu.be/U2LmyigJRPo",
    mcqs: [
      {
        question: "External structure is defined by:",
        options: ["Minor pullbacks", "Major swing highs and lows", "Indicator signals", "Volume spikes"],
        correctIndex: 1
      },
      {
        question: "Internal structure helps refine:",
        options: ["Emotional bias", "Entry precision", "Spread size", "Random entries"],
        correctIndex: 1
      },
      {
        question: "Break of Structure (BOS) confirms:",
        options: ["Trend continuation", "Range only", "News spike", "Spread shift"],
        correctIndex: 0
      },
      {
        question: "Change of Character (CHOCH) signals:",
        options: ["Guaranteed reversal", "Possible directional shift", "Consolidation only", "Liquidity removal"],
        correctIndex: 1
      },
      {
        question: "Multi-timeframe alignment increases:",
        options: ["Randomness", "Probability", "Emotional bias", "Spread"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-20",
    title: "Decoding Market Structure Part 2 (Updated)",
    videoUrl: "https://youtu.be/ZIy6vxdg1ZA",
    mcqs: [
      {
        question: "Equal highs typically hold:",
        options: ["Resistance only", "Stop liquidity", "Indicator signals", "Discount zone"],
        correctIndex: 1
      },
      {
        question: "Inducement is used to:",
        options: ["Confirm breakout", "Trap early traders", "Reduce volatility", "Flatten market"],
        correctIndex: 1
      },
      {
        question: "Valid structural shift requires:",
        options: ["Wick break", "Strong body close", "Volume drop", "Small candles"],
        correctIndex: 1
      },
      {
        question: "Liquidity sweep often leads to:",
        options: ["Expansion", "Flat range", "Market close", "Spread freeze"],
        correctIndex: 0
      },
      {
        question: "Structure + liquidity confluence reduces:",
        options: ["Discipline", "Uncertainty", "Volatility", "Range"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-21",
    title: "DAY 9 - TS Model 1",
    videoUrl: "https://youtu.be/OQ6vlYS35bs",
    mcqs: [
      {
        question: "A trading model must define:",
        options: ["Entry", "Stop Loss", "Target", "All of the above"],
        correctIndex: 3
      },
      {
        question: "Backtesting measures:",
        options: ["Spread", "Historical edge", "News impact", "Volume only"],
        correctIndex: 1
      },
      {
        question: "Risk per trade should be:",
        options: ["Fixed %", "Random", "Increasing daily", "Based on mood"],
        correctIndex: 0
      },
      {
        question: "A model fails when:",
        options: ["Loss occurs", "Rules are broken", "Spread widens", "News hits"],
        correctIndex: 1
      },
      {
        question: "System consistency depends on:",
        options: ["Discipline", "Indicators", "News", "Volume"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-22",
    title: "DAY 12 - Validation CRT and Invalidation CRT",
    videoUrl: "https://youtu.be/mLXW82-Oaxk",
    mcqs: [
      {
        question: "CRT validation requires:",
        options: ["Liquidity alignment", "Indicator crossover", "Random breakout", "Volume drop"],
        correctIndex: 0
      },
      {
        question: "Invalidation occurs when:",
        options: ["Opposite structure breaks", "Spread narrows", "Candle small", "Market flat"],
        correctIndex: 0
      },
      {
        question: "Confirmation candle must:",
        options: ["Close decisively", "Wick only", "Be doji", "Be equal high"],
        correctIndex: 0
      },
      {
        question: "Bias formation depends on:",
        options: ["Structure + Liquidity", "Indicator only", "News only", "Volume only"],
        correctIndex: 0
      },
      {
        question: "Ignoring invalidation leads to:",
        options: ["Better RR", "Larger losses", "Higher accuracy", "Discipline"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-23",
    title: "DAY 13 - Orderflow, HTF, Liquidity",
    videoUrl: "https://youtu.be/yKgStMsTQow",
    mcqs: [
      {
        question: "Displacement indicates:",
        options: ["Institutional momentum", "Weak participation", "Flat range", "Spread freeze"],
        correctIndex: 0
      },
      {
        question: "Fair Value Gap forms due to:",
        options: ["Price inefficiency", "Equal highs", "Volume drop", "News halt"],
        correctIndex: 0
      },
      {
        question: "HTF liquidity acts as:",
        options: ["Major draw on price", "Minor level", "Indicator", "Random zone"],
        correctIndex: 0
      },
      {
        question: "Orderflow shift signals:",
        options: ["Momentum change", "Spread widening", "Indicator cross", "Flat session"],
        correctIndex: 0
      },
      {
        question: "Alignment between HTF and LTF improves:",
        options: ["Execution precision", "Emotional bias", "Risk exposure", "Random entries"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-24",
    title: "DAY 15 - Silver Bullet Model",
    videoUrl: "https://youtu.be/VkgLJH6ONjg",
    mcqs: [
      {
        question: "Silver Bullet focuses on:",
        options: ["Specific time windows", "Random entries", "Indicators only", "News trading"],
        correctIndex: 0
      },
      {
        question: "Entry requires:",
        options: ["Structure + FVG", "RSI cross", "Volume spike", "Equal highs"],
        correctIndex: 0
      },
      {
        question: "Kill zones provide:",
        options: ["High volatility window", "Flat market", "Spread freeze", "Low liquidity"],
        correctIndex: 0
      },
      {
        question: "Model success requires:",
        options: ["Strict execution", "Guessing", "Overleveraging", "Emotional bias"],
        correctIndex: 0
      },
      {
        question: "Silver Bullet is based on:",
        options: ["Time + Liquidity", "Indicators", "News only", "Volume only"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-25",
    title: "DAY 20 - Cracking The Code (CRT Bias)",
    videoUrl: "https://youtu.be/U_vwyn-ALCY",
    mcqs: [
      {
        question: "Bias should align with:",
        options: ["Higher timeframe structure", "Emotions", "News", "Indicators"],
        correctIndex: 0
      },
      {
        question: "Bias invalidates when:",
        options: ["Opposing BOS forms", "Volume drops", "Spread narrows", "Candle small"],
        correctIndex: 0
      },
      {
        question: "Daily bias helps refine:",
        options: ["LTF entries", "Random trades", "High leverage", "Emotional execution"],
        correctIndex: 0
      },
      {
        question: "Bias without liquidity context is:",
        options: ["Strong", "Weak", "Guaranteed", "Precise"],
        correctIndex: 1
      },
      {
        question: "Bias alignment improves:",
        options: ["Probability", "Spread", "Volatility", "Randomness"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-26",
    title: "Backtesting CRT - Good and Bad Confirmation",
    videoUrl: "https://youtu.be/vz_yL1oM5_M",
    mcqs: [
      {
        question: "A valid backtest must include:",
        options: ["Random trades", "Defined model rules", "Emotional bias", "News reactions only"],
        correctIndex: 1
      },
      {
        question: "Good confirmation in CRT typically includes:",
        options: ["Weak displacement", "Liquidity sweep + structure shift", "Equal highs only", "Small candles"],
        correctIndex: 1
      },
      {
        question: "Bad confirmation often shows:",
        options: ["Strong momentum", "No displacement after entry", "HTF alignment", "Clean BOS"],
        correctIndex: 1
      },
      {
        question: "Backtesting primarily measures:",
        options: ["Historical probability", "Broker spread", "Indicator lag", "Social sentiment"],
        correctIndex: 0
      },
      {
        question: "Purpose of identifying bad confirmations is to:",
        options: ["Increase lot size", "Filter low-quality setups", "Trade more frequently", "Ignore risk"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-27",
    title: "Final Method - Midnight Open Bias",
    videoUrl: "https://youtu.be/GMQx_yVFsi4",
    mcqs: [
      {
        question: "Midnight Open is used to determine:",
        options: ["Weekly bias", "Intraday directional bias", "Indicator setup", "Volume spike"],
        correctIndex: 1
      },
      {
        question: "Price above midnight open suggests:",
        options: ["Bearish bias", "Bullish bias", "Consolidation", "No bias"],
        correctIndex: 1
      },
      {
        question: "Model works best when combined with:",
        options: ["Liquidity targets", "RSI", "Moving averages", "News only"],
        correctIndex: 0
      },
      {
        question: "Bias failure occurs when:",
        options: ["Structure confirms opposite direction", "Candle closes strong", "Spread tightens", "Volume rises"],
        correctIndex: 0
      },
      {
        question: "Midnight model is mainly applied for:",
        options: ["Long-term investing", "Intraday trading", "Swing trading only", "Scalping crypto only"],
        correctIndex: 1
      }
    ]
  },
  {
    id: "ash-beg-28",
    title: "Orderflow Setup A+ - The ICT Reaper (Bitcoin & ETH)",
    videoUrl: "https://youtu.be/1JqELMubt9w",
    mcqs: [
      {
        question: "An A+ setup requires:",
        options: ["Random breakout", "Clear liquidity sweep + displacement", "Indicator crossover", "News spike"],
        correctIndex: 1
      },
      {
        question: "Orderflow shift is identified by:",
        options: ["Weak candles", "Strong impulsive move", "Equal highs", "Small range"],
        correctIndex: 1
      },
      {
        question: "Crypto volatility requires:",
        options: ["Wider stop placement logic", "No stop loss", "Emotional trading", "High leverage only"],
        correctIndex: 0
      },
      {
        question: "A true reaper entry occurs after:",
        options: ["Liquidity grab", "Consolidation", "Spread widening", "Indicator cross"],
        correctIndex: 0
      },
      {
        question: "HTF confluence improves:",
        options: ["Accuracy", "Randomness", "Spread", "Fear"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-29",
    title: "Daily Bias Explained - PO3 + Tips",
    videoUrl: "https://youtu.be/KuvcXxTBgnE",
    mcqs: [
      {
        question: "PO3 stands for:",
        options: ["Pattern of 3", "Power of Three", "Price of 3", "Phase of 3"],
        correctIndex: 1
      },
      {
        question: "PO3 phases are:",
        options: ["Accumulation, Manipulation, Distribution", "Buy, Sell, Hold", "Trend, Range, Break", "Entry, Stop, Exit"],
        correctIndex: 0
      },
      {
        question: "Manipulation phase usually:",
        options: ["Sweeps liquidity", "Trends cleanly", "Moves randomly", "Closes market"],
        correctIndex: 0
      },
      {
        question: "Distribution phase delivers:",
        options: ["Main expansion move", "Consolidation", "Spread freeze", "Volume drop"],
        correctIndex: 0
      },
      {
        question: "Daily bias combined with PO3 improves:",
        options: ["Timing precision", "Emotional trading", "Random entries", "Overexposure"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-30",
    title: "ICT 2024 MACRO 09:30 - FVG / IFVG (CME)",
    videoUrl: "https://youtu.be/TvY8DvCiVvw",
    mcqs: [
      {
        question: "09:30 macro refers to:",
        options: ["London open", "NY session open", "Asia open", "Market close"],
        correctIndex: 1
      },
      {
        question: "FVG represents:",
        options: ["Price inefficiency", "Equal highs", "Indicator signal", "Volume drop"],
        correctIndex: 0
      },
      {
        question: "IFVG forms when:",
        options: ["Gap is respected opposite direction", "Volume rises", "Spread narrows", "Candle small"],
        correctIndex: 0
      },
      {
        question: "Macro windows are important because:",
        options: ["Institutions execute orders", "Spread freezes", "Volume low", "Market closed"],
        correctIndex: 0
      },
      {
        question: "Combining macro time + FVG increases:",
        options: ["Precision", "Random entries", "Emotional bias", "Overtrading"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-31",
    title: "ICT 2024 Asia Model / ATM Machine",
    videoUrl: "https://youtu.be/OsffqHknJnA",
    mcqs: [
      {
        question: "Asia model focuses on:",
        options: ["Asian session range", "News trading", "Indicators", "Weekly swing"],
        correctIndex: 0
      },
      {
        question: "Range manipulation during Asia often:",
        options: ["Builds liquidity", "Ends trend", "Closes market", "Reduces volatility"],
        correctIndex: 0
      },
      {
        question: "Expansion typically happens during:",
        options: ["London/NY session", "Midnight", "Weekend", "Holiday"],
        correctIndex: 0
      },
      {
        question: "ATM concept is linked to:",
        options: ["Gap magnet logic", "RSI divergence", "Volume spike", "Equal lows"],
        correctIndex: 0
      },
      {
        question: "Asia high/low acts as:",
        options: ["Liquidity pool", "Indicator", "Random zone", "Spread level"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "ash-beg-32",
    title: "ICT ATM Model - Open Gap Magnet Concept",
    videoUrl: "https://youtu.be/Hh_1rF6ABJU",
    mcqs: [
      {
        question: "Gap magnet concept implies price is drawn to:",
        options: ["Open gap imbalance", "Equal highs", "Indicator cross", "Volume spike"],
        correctIndex: 0
      },
      {
        question: "Open gap typically forms between:",
        options: ["Sessions", "Candles", "Indicators", "Brokers"],
        correctIndex: 0
      },
      {
        question: "Gap fill probability increases when:",
        options: ["Liquidity aligns", "Volume drops", "Spread narrows", "Candle small"],
        correctIndex: 0
      },
      {
        question: "Trading the gap requires:",
        options: ["Structure confirmation", "Blind entry", "No stop", "News spike"],
        correctIndex: 0
      },
      {
        question: "Gap magnet works best with:",
        options: ["Time-based model", "RSI", "Moving average", "Random breakout"],
        correctIndex: 0
      }
    ]
  }
];

// Combine all lessons
const allLessons = [...lessons, ...lessons2, ...lessons3];

// Create directory if it doesn't exist
const dir = path.join(__dirname, '..', 'content', 'ash', 'beginner');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Write each lesson to a file
allLessons.forEach(lesson => {
  const filePath = path.join(dir, `${lesson.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2));
  console.log(`✓ Created: ${lesson.id}.json`);
});

console.log(`\n✅ Successfully created ${allLessons.length} lesson files!`);
