export type MCQ = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  note?: string;
  mcqs: MCQ[];
  isTest?: boolean;
};

export type LessonGroup = Lesson[];
export type InstructorLessons = { [level: string]: LessonGroup };
export type LessonsMap = { [instructor: string]: InstructorLessons };

const deepClone = <T>(v: T): T => {
  if (typeof (globalThis as any).structuredClone === "function") return (globalThis as any).structuredClone(v);
  return JSON.parse(JSON.stringify(v));
};

export const lessons: LessonsMap = {
  adarsh: {
    beginner: [
      {
        id: "adarsh-beg-01",
        title: "Forex Foundation Part 1",
        videoUrl: "https://www.youtube.com/embed/HU4XdX6OpxY?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/HU4XdX6OpxY?si=nHBtRugdKnWHJPKe",
        mcqs: [
          {
            question: "What is the primary goal of Forex Foundation?",
            options: [
              "Predict stock prices",
              "Understand currency markets",
              "Learn programming",
              "Trade commodities"
            ],
            correctIndex: 1
          },
          {
            question: "Which market does Forex Foundation focus on?",
            options: ["Cryptocurrency", "Forex", "Real Estate", "Stocks"],
            correctIndex: 1
          },
          {
            question: "Forex refers to trading in what?",
            options: ["Bonds", "Currencies", "Stocks", "Indices"],
            correctIndex: 1
          },
          {
            question: "The Forex Foundation helps traders understand:",
            options: ["Weather patterns", "Currency pairs", "Movie ratings", "Football scores"],
            correctIndex: 1
          },
          {
            question: "A key concept in Forex is:",
            options: ["P/E Ratio", "Currency exchange", "Dividend payout", "Book value"],
            correctIndex: 1
          }
        ]
      },

      {
        id: "adarsh-beg-02",
        title: "Forex Foundation Part 2",
        videoUrl: "https://www.youtube.com/embed/z1E7P9vdSyI?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/z1E7P9vdSyI?si=MkW09Blx9AE4JVJk",
        mcqs: [
          {
            question: "What continues from Foundation Part 1?",
            options: ["Advanced coding", "Forex basics", "Cooking tips", "Math puzzles"],
            correctIndex: 1
          },
          {
            question: "Which term is key in Forex Part 2?",
            options: ["Pip", "CAGR", "EPS", "EBITDA"],
            correctIndex: 0
          },
          {
            question: "A pip is used to measure:",
            options: ["Stocks", "Price movement in Forex", "Real Estate", "Options"],
            correctIndex: 1
          },
          {
            question: "Forex Part 2 teaches about:",
            options: ["Sports", "Traders’ mindset", "Market mechanics", "Geometry"],
            correctIndex: 2
          },
          {
            question: "Which is likely explained in this video?",
            options: ["Currency pairs", "Baking recipes", "Foreign languages", "Poetry"],
            correctIndex: 0
          }
        ]
      },

      {
        id: "adarsh-beg-03",
        title: "RISK MANAGEMENT AND PSYCHOLOGY",
        videoUrl: "https://www.youtube.com/embed/pOTnCxIK1VE?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/pOTnCxIK1VE?si=jNEfU4ldepFqsYjt",
        mcqs: [
          {
            question: "Risk Management in trading helps to:",
            options: ["Lose more money", "Protect capital", "Write essays", "None"],
            correctIndex: 1
          },
          {
            question: "Trader psychology influences:",
            options: ["Execution of trades", "Weather", "Phone battery", "Car speed"],
            correctIndex: 0
          },
          {
            question: "A tool in risk management is:",
            options: ["Stop loss", "Bookmark", "Calendar", "Alarm"],
            correctIndex: 0
          },
          {
            question: "Fear and greed are part of:",
            options: ["Economics", "Trader psychology", "Cooking", "Physics"],
            correctIndex: 1
          },
          {
            question: "Which reduces risk?",
            options: ["Risk management", "Ignoring charts", "Sleeping", "Random trades"],
            correctIndex: 0
          }
        ]
      },

      {
        id: "adarsh-beg-04",
        title: "PSYCHOLOGY trading (NP STORY)",
        videoUrl: "https://www.youtube.com/embed/_-6KeVqVTPA?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/_-6KeVqVTPA?si=UeZ0aBIcTM-RJ7WT",
        mcqs: [
          {
            question: "Trader psychology mainly deals with:",
            options: ["Emotions in trading", "Coding", "Music", "Biology"],
            correctIndex: 0
          },
          {
            question: "NP Story likely illustrates:",
            options: ["A psychological concept", "Sports game", "Recipe", "Movie summary"],
            correctIndex: 0
          },
          {
            question: "Controlling emotions helps a trader to:",
            options: ["Trade better", "Sleep worse", "Eat faster", "Watch TV"],
            correctIndex: 0
          },
          {
            question: "Fear of losing might cause:",
            options: ["Better decisions", "Hesitation", "Running", "Singing"],
            correctIndex: 1
          },
          {
            question: "Greed affects a trader by:",
            options: ["Improving psychology", "Affecting decisions", "Ignoring the market", "Listening to songs"],
            correctIndex: 1
          }
        ]
      },

      {
        id: "adarsh-beg-05",
        title: "ECONOMIC NEWS",
        videoUrl: "https://www.youtube.com/embed/G-A2ns19Gq0?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/_-6KeVqVTPA?si=kRhoYGuNeKKDy9fm (note: external link in source matches EP4; listing may be duplicated)",
        mcqs: [
          {
            question: "Economic news impacts:",
            options: ["Music charts", "Financial markets", "Movie ratings", "Weather"],
            correctIndex: 1
          },
          {
            question: "An example of economic news is:",
            options: ["GDP data", "Sports score", "Song release", "TV show"],
            correctIndex: 0
          },
          {
            question: "Traders watch news to:",
            options: ["Predict moves", "Eat food", "Sleep", "Drink coffee"],
            correctIndex: 0
          },
          {
            question: "News affects:",
            options: ["Price volatility", "Car speed", "Phone apps", "Fitness"],
            correctIndex: 0
          },
          {
            question: "Economic calendars list:",
            options: ["Events", "Movies", "Pets", "Games"],
            correctIndex: 0
          }
        ]
      },

      {
        id: "adarsh-beg-06",
        title: "TRADING VIEW",
        videoUrl: "https://www.youtube.com/embed/BcQOSppk8_Q?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/BcQOSppk8_Q?si=Uf6-Re613_rlYy1u",
        mcqs: [
          { question: "TradingView is used to:", options: ["Draw charts", "Play games", "Edit videos", "Cook food"], correctIndex: 0 },
          { question: "A primary feature of TradingView is:", options: ["Charting", "Listening to music", "Text editing", "Painting"], correctIndex: 0 },
          { question: "You can analyze markets using:", options: ["TradingView", "Calculator", "TV", "Camera"], correctIndex: 0 },
          { question: "TradingView helps traders with:", options: ["Indicators", "Sports", "Cooking", "Math tests"], correctIndex: 0 },
          { question: "A trader view shows:", options: ["Price charts", "Weather", "News films", "Songs"], correctIndex: 0 }
        ]
      },

      {
        id: "adarsh-beg-07",
        title: "MT5 PART 1",
        videoUrl: "https://www.youtube.com/embed/Uizutfordds?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/Uizutfordds?si=PvzY9giL5wzc9P65",
        mcqs: [
          { question: "MT5 stands for:", options: ["MetaTrader 5", "Movie Title 5", "Music Team 5", "None"], correctIndex: 0 },
          { question: "MT5 is used for:", options: ["Trading", "Cooking", "Driving", "Swimming"], correctIndex: 0 },
          { question: "Part 1 teaches:", options: ["Platform basics", "Geography", "History", "Biology"], correctIndex: 0 },
          { question: "MT5 displays:", options: ["Charts", "Maps", "Movies", "Photos"], correctIndex: 0 },
          { question: "Traders use MT5 to:", options: ["Place trades", "Sing songs", "Sleep", "Shop online"], correctIndex: 0 }
        ]
      },

      {
        id: "adarsh-beg-08",
        title: "MT5 PART 2",
        videoUrl: "https://www.youtube.com/embed/Cc_Zhh0QPoE?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/Cc_Zhh0QPoE?si=ARTo4f6UBDJkiWDu",
        mcqs: [
          { question: "MT5 Part 2 likely continues:", options: ["Advanced MT5 features", "Gardening", "Painting", "Reading"], correctIndex: 0 },
          { question: "MT5 can place:", options: ["Orders", "Photos", "Videos", "Emails"], correctIndex: 0 },
          { question: "Risk tools in MT5 are:", options: ["Stop loss", "Music", "Stories", "Books"], correctIndex: 0 },
          { question: "MT5 allows:", options: ["Indicators", "Temperature", "Games", "Maps"], correctIndex: 0 },
          { question: "MT5 Part 2 helps traders:", options: ["Trade effectively", "Dance", "Fly", "Cook"], correctIndex: 0 }
        ]
      },

      {
        id: "adarsh-beg-09",
        title: "MT5 PART 3",
        videoUrl: "https://www.youtube.com/embed/WSJxtIlRJpU?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/WSJxtIlRJpU?si=GoASZaK6NP1O4OxM",
        mcqs: [
          { question: "MT5 Part 3 likely focuses on:", options: ["More advanced tools", "Art", "Dancing", "Geography"], correctIndex: 0 },
          { question: "In MT5 you can:", options: ["Analyze charts", "Track only clocks", "Draw random art", "Eat food"], correctIndex: 0 },
          { question: "MT5 helps traders:", options: ["Evaluate signals", "Read novels", "Sleep", "Paint"], correctIndex: 0 },
          { question: "Stop losses are used to:", options: ["Limit risk", "Drive cars", "Sing", "Draw"], correctIndex: 0 },
          { question: "Part 3 advances the user’s:", options: ["Skills", "Watch list", "School grade", "Height"], correctIndex: 0 }
        ]
      },

      {
        id: "adarsh-beg-10",
        title: "Candlestick",
        videoUrl: "https://www.youtube.com/embed/H_FpKZu9Lmg?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/H_FpKZu9Lmg?si=e-iZ5_U0EJi9mRDw",
        mcqs: [
          { question: "Candlesticks show:", options: ["Price action", "Weather", "Sports", "Music"], correctIndex: 0 },
          { question: "A bullish candle means:", options: ["Price up", "Price down", "Flat", "None"], correctIndex: 0 },
          { question: "Wicks show:", options: ["Highs/lows", "Volume", "Time", "Colors"], correctIndex: 0 },
          { question: "Candlestick patterns help:", options: ["Predict moves", "Cook food", "Drive cars", "Watch movies"], correctIndex: 0 },
          { question: "A candle’s body shows:", options: ["Open-close range", "Weather", "Songs", "Maps"], correctIndex: 0 }
        ]
      },

      {
        id: "adarsh-beg-11",
        title: "Market Structure",
        videoUrl: "https://www.youtube.com/embed/G9z7elC9fas?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/G9z7elC9fas?si=B1VGNP7FFEe2WBIG",
        mcqs: [
          { question: "Market structure shows:", options: ["Trend direction", "Weather", "History", "Music"], correctIndex: 0 },
          { question: "Higher highs indicate:", options: ["Uptrend", "Downtrend", "Flat", "None"], correctIndex: 0 },
          { question: "Lower lows indicate:", options: ["Downtrend", "Uptrend", "Flat", "Sports"], correctIndex: 0 },
          { question: "Support is:", options: ["Price floor", "Ceiling", "Weather", "Music"], correctIndex: 0 },
          { question: "Resistance is:", options: ["Price ceiling", "Floor", "Rain", "News"], correctIndex: 0 }
        ]
      },

      {
        id: "adarsh-beg-12",
        title: "Structure Part 2",
        videoUrl: "https://www.youtube.com/embed/RLjCeoXJsFA?list=PLoSqqEgXbjCMYHWYiwZgh0ovLibM_IncV",
        note: "https://youtu.be/RLjCeoXJsFA?si=SMKEHMkmIxUgDLNv",
        mcqs: [
          { question: "Structure Part 2 continues:", options: ["Market structure concepts", "Movies", "Games", "Biology"], correctIndex: 0 },
          { question: "Trends help traders:", options: ["Find direction", "Cook", "Paint", "Run"], correctIndex: 0 },
          { question: "Structure Part 2 likely covers:", options: ["Zones", "Music", "Cars", "Travel"], correctIndex: 0 },
          { question: "Zones help define:", options: ["Breakouts", "Recipes", "Songs", "Weather"], correctIndex: 0 },
          { question: "Understanding structure helps:", options: ["Trading decisions", "Sleeping", "Texting", "Gaming"], correctIndex: 0 }
        ]
      }
    ],

    test: [
      {
        id: "adarsh-test-01",
        title: "Adarsh Test Section",
        videoUrl: "https://www.youtube.com/embed/HU4XdX6OpxY",
        mcqs: [
          {
            question: "What is the primary goal of Forex Foundation?",
            options: ["Predict stock prices", "Understand currency markets", "Learn programming", "Trade commodities"],
            correctIndex: 1
          },
          {
            question: "Which term is key in Forex Part 2?",
            options: ["Pip", "CAGR", "EPS", "EBITDA"],
            correctIndex: 0
          },
          {
            question: "A tool in risk management is:",
            options: ["Stop loss", "Bookmark", "Calendar", "Alarm"],
            correctIndex: 0
          },
          {
            question: "TradingView is used to:",
            options: ["Draw charts", "Play games", "Edit videos", "Cook food"],
            correctIndex: 0
          },
          {
            question: "Candlesticks show:",
            options: ["Price action", "Weather", "Sports", "Music"],
            correctIndex: 0
          }
        ],
        isTest: true
      }
    ]
  }
};

export function getLessonById(id: string): Lesson | undefined {
  for (const instructorKey of Object.keys(lessons)) {
    const levels = lessons[instructorKey];
    for (const levelKey of Object.keys(levels)) {
      const found = levels[levelKey].find((l) => l.id === id);
      if (found) return deepClone(found);
    }
  }
  return undefined;
}

export function getLessonsForInstructor(instructor: string): InstructorLessons | undefined {
  const v = lessons[instructor];
  return v ? deepClone(v) : undefined;
}

/**
 * Register lessons for an instructor. Throws if the instructor key already exists.
 * This prevents accidental merging of instructor content when importing.
 */
export function registerInstructorLessons(instructor: string, data: InstructorLessons) {
  if (lessons[instructor]) {
    throw new Error(`Instructor '${instructor}' already exists. Use a different key or merge intentionally.`);
  }
  // assign a deep cloned copy to avoid external mutation
  (lessons as any)[instructor] = deepClone(data);
}

export default lessons;
