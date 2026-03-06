"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MAX_HISTORY = 30;

type CardValue = 1 | 0 | -1;

function getCountColor(count: number): string {
  if (count > 3) return "#166534";
  if (count < -3) return "#991b1b";
  return "#0f172a";
}

function formatCount(count: number): string {
  if (count > 0) return `+${count}`;
  return `${count}`;
}

export default function Home() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<CardValue[]>([]);

  function hit(value: CardValue) {
    setCount((c) => c + value);
    setHistory((h) => [...h.slice(-MAX_HISTORY + 1), value]);
  }

  function undo() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setCount((c) => c - last);
    setHistory((h) => h.slice(0, -1));
  }

  function reset() {
    setCount(0);
    setHistory([]);
  }

  const canUndo = history.length > 0;
  const countColor = getCountColor(count);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100dvh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "390px",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "10px",
          boxSizing: "border-box",
        }}
      >
        {/* Count display */}
        <div
          style={{
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0 16px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "90px",
              fontWeight: 700,
              letterSpacing: "-5px",
              lineHeight: 1,
              color: countColor,
              transition: "color 0.2s ease",
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
              userSelect: "none",
            }}
          >
            {formatCount(count)}
          </span>
        </div>

        {/* Main buttons */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => hit(1)}
          style={{
            flex: 1,
            background: "rgba(220,252,231,0.7)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: "26px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            WebkitAppearance: "none",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#166534",
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
              userSelect: "none",
            }}
          >
            2 — 6
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => hit(0)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: "26px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            WebkitAppearance: "none",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#64748b",
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
              userSelect: "none",
            }}
          >
            7 — 9
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => hit(-1)}
          style={{
            flex: 1,
            background: "rgba(254,226,226,0.7)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: "26px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            WebkitAppearance: "none",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#991b1b",
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
              userSelect: "none",
            }}
          >
            10 — A
          </span>
        </motion.button>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <motion.button
            whileTap={{ scale: canUndo ? 0.94 : 1 }}
            onClick={undo}
            disabled={!canUndo}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: "26px",
              cursor: canUndo ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 0",
              outline: "none",
              WebkitAppearance: "none",
              opacity: canUndo ? 1 : 0.35,
              transition: "opacity 0.2s ease",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                color: "#0f172a",
                userSelect: "none",
              }}
            >
              ↩
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={reset}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: "26px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 0",
              outline: "none",
              WebkitAppearance: "none",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                color: "#0f172a",
                userSelect: "none",
              }}
            >
              ✕
            </span>
          </motion.button>
        </div>
      </div>
    </main>
  );
}
