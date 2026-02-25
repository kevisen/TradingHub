"use client";

import React, { useRef, useEffect, useState } from "react";

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const CANVAS_W = CELL * COLS;
const CANVAS_H = CELL * ROWS;

type Point = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>(() => randomFood([{ x: 8, y: 10 }]));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowUp" && dir.y === 0) setDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && dir.y === 0) setDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && dir.x === 0) setDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && dir.x === 0) setDir({ x: 1, y: 0 });
      if (e.key === " ") setRunning((r) => !r);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dir]);

  // Touch handlers for mobile (swipe)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    }

    function onTouchEnd(e: TouchEvent) {
      const start = touchStartRef.current;
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 30; // px
      if (absX < threshold && absY < threshold) {
        // tap — toggle play
        setRunning((r) => !r);
      } else if (absX > absY) {
        if (dx > 0 && dir.x === 0) setDir({ x: 1, y: 0 });
        if (dx < 0 && dir.x === 0) setDir({ x: -1, y: 0 });
      } else {
        if (dy > 0 && dir.y === 0) setDir({ x: 0, y: 1 });
        if (dy < 0 && dir.y === 0) setDir({ x: 0, y: -1 });
      }
      touchStartRef.current = null;
    }

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart as any);
      canvas.removeEventListener("touchend", onTouchEnd as any);
    };
  }, [dir]);

  useEffect(() => {
    let t: number | null = null;
    if (running) {
      t = window.setInterval(() => step(), speed);
    }
    return () => {
      if (t) window.clearInterval(t);
    };
  }, [running, snake, dir, speed]);

  useEffect(() => {
    draw();
  }, [snake, food]);

  function step() {
    setSnake((prev) => {
      const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
      // wrap
      head.x = (head.x + COLS) % COLS;
      head.y = (head.y + ROWS) % ROWS;

      // collision with self
      if (prev.some((p) => p.x === head.x && p.y === head.y)) {
        setRunning(false);
        return prev;
      }

      const ate = head.x === food.x && head.y === food.y;
      const newSnake = [head, ...prev.slice(0, ate ? prev.length : prev.length - 1)];
      if (ate) {
        setFood(randomFood(newSnake));
      }
      return newSnake;
    });
  }

  function draw() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // grid
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    for (let x = 0; x <= CANVAS_W; x += CELL) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_H);
      ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_H; y += CELL) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_W, y);
      ctx.stroke();
    }

    // food
    ctx.fillStyle = "#e11d48";
    ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);

    // snake
    ctx.fillStyle = "#8b5cf6";
    for (let i = 0; i < snake.length; i++) {
      const p = snake[i];
      ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2);
    }
  }

  function reset() {
    setSnake([{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }]);
    setDir({ x: 1, y: 0 });
    setFood(randomFood([{ x: 8, y: 10 }]));
    setRunning(false);
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="mx-auto rounded-lg shadow-md border border-white/10 touch-none"
        />
      </div>

      <div className="flex items-center justify-center gap-3 mb-3">
        <button className="button-primary" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Start"}
        </button>
        <button className="button-outline" onClick={reset}>
          Reset
        </button>
        <div className="ml-2 text-sm text-gray-300">Use arrow keys or swipe to play</div>
      </div>

      {/* On-screen touch controls for mobile */}
      <div className="mt-2 sm:hidden">
        <div className="flex justify-center gap-3 mb-2">
          <button aria-label="Up" onTouchStart={() => dir.y === 0 && setDir({ x: 0, y: -1 })} onClick={() => dir.y === 0 && setDir({ x: 0, y: -1 })} className="button-outline">Up</button>
        </div>
        <div className="flex justify-center gap-3">
          <button aria-label="Left" onTouchStart={() => dir.x === 0 && setDir({ x: -1, y: 0 })} onClick={() => dir.x === 0 && setDir({ x: -1, y: 0 })} className="button-outline">Left</button>
          <button aria-label="Down" onTouchStart={() => dir.y === 0 && setDir({ x: 0, y: 1 })} onClick={() => dir.y === 0 && setDir({ x: 0, y: 1 })} className="button-outline">Down</button>
          <button aria-label="Right" onTouchStart={() => dir.x === 0 && setDir({ x: 1, y: 0 })} onClick={() => dir.x === 0 && setDir({ x: 1, y: 0 })} className="button-outline">Right</button>
        </div>
      </div>
    </div>
  );
}

function randomFood(occupied: Point[]) {
  while (true) {
    const p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!occupied.some((o) => o.x === p.x && o.y === p.y)) return p;
  }
}
