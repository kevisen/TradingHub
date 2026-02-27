// src/lib/gifPool.ts

export const passGifs = [
  '/visuals/pass.gif',
  '/visuals/pass-1.gif',
  '/visuals/pass-2.gif',
  '/visuals/pass-3.gif',
  '/visuals/pass-4.gif',
];

export const failGifs = [
  '/visuals/fail-1.gif',
  '/visuals/fail-2.gif',
  '/visuals/fail-3.gif',
];

let lastPassIndex = -1;
let lastFailIndex = -1;

/**
 * Pick a random gif from the appropriate pool based on pass/fail boolean. Does not preload the entire pool.
 */
export function getRandomGif(passed: boolean): string {
  const pool = passed ? passGifs : failGifs;
  if (pool.length === 0) return '';
  if (pool.length === 1) return pool[0];

  const previousIndex = passed ? lastPassIndex : lastFailIndex;
  let index = Math.floor(Math.random() * pool.length);

  while (index === previousIndex) {
    index = Math.floor(Math.random() * pool.length);
  }

  if (passed) {
    lastPassIndex = index;
  } else {
    lastFailIndex = index;
  }

  return pool[index];
}
