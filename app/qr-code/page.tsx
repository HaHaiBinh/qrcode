/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";

const ACTIVATION_TOP = "78%";
const ACTIVATION_SIZE = "20%";
const ANIMATION_DURATION = 1700;
const HOLD_LOOP_INTERVAL = 1450;
const SEQUENCE_DURATION = 10000;
const ROAD_GLOW_LINES = [
  { left: "-10%", top: "86%", width: "50%", rotate: "-7deg", delay: "0s" },
  { left: "-14%", top: "87%", width: "50%", rotate: "-7deg", delay: "0s" },
  { left: "-8%", top: "91%", width: "50%", rotate: "-15deg", delay: "0s" },
  { left: "-8.5%", top: "91.5%", width: "50%", rotate: "-15.5deg", delay: "0s" },
  { left: "-10%", top: "94%", width: "50%", rotate: "-20deg", delay: "0s" },
  { left: "0%", top: "98%", width: "50%", rotate: "-30deg", delay: "0s" },
  { left: "13%", top: "99.7%", width: "28%", rotate: "-44deg", delay: "0s" },
  { left: "30%", top: "99.7%", width: "20%", rotate: "-60deg", delay: "0s" },

  { left: "63%", top: "83.3%", width: "37%", rotate: "3.5deg", delay: "0s" },
  { left: "63%", top: "83.2%", width: "37%", rotate: "10.5deg", delay: "0s" },
  { left: "60%", top: "83.5%", width: "42%", rotate: "14.5deg", delay: "0s" },
  { left: "61.5%", top: "84%", width: "42%", rotate: "16deg", delay: "0s" },
  { left: "56%", top: "83%", width: "50%", rotate: "27deg", delay: "0s" },
  { left: "66%", top: "87%", width: "40%", rotate: "33deg", delay: "0s" },
  { left: "68%", top: "90.5%", width: "25%", rotate: "41deg", delay: "0s" },
  { left: "60%", top: "90.3%", width: "20%", rotate: "57deg", delay: "0s" },
];

const QRCodePage = () => {
  const [activeBurst, setActiveBurst] = useState<number | null>(null);
  const isSequenceRunningRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const loopTimerRef = useRef<number | null>(null);
  const cleanupTimerRef = useRef<number | null>(null);
  const sequenceTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (loopTimerRef.current) {
      window.clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }

    if (cleanupTimerRef.current) {
      window.clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }

    if (sequenceTimerRef.current) {
      window.clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
  };

  const triggerBurst = () => {
    const id = Date.now() + Math.random();
    setActiveBurst(id);

    if (cleanupTimerRef.current) {
      window.clearTimeout(cleanupTimerRef.current);
    }

    cleanupTimerRef.current = null;
  };

  const stopAnimationSequence = () => {
    isSequenceRunningRef.current = false;

    if (loopTimerRef.current) {
      window.clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }

    cleanupTimerRef.current = window.setTimeout(() => {
      setActiveBurst(null);
      cleanupTimerRef.current = null;
    }, ANIMATION_DURATION);
  };

  const startAnimationSequence = () => {
    if (isSequenceRunningRef.current) return;

    isSequenceRunningRef.current = true;
    triggerBurst();
    loopTimerRef.current = window.setInterval(
      triggerBurst,
      HOLD_LOOP_INTERVAL,
    );

    sequenceTimerRef.current = window.setTimeout(() => {
      sequenceTimerRef.current = null;

      if (isPointerDownRef.current) {
        isSequenceRunningRef.current = false;
        if (loopTimerRef.current) {
          window.clearInterval(loopTimerRef.current);
          loopTimerRef.current = null;
        }
        startAnimationSequence();
        return;
      }

      stopAnimationSequence();
    }, SEQUENCE_DURATION);
  };

  const handlePointerDown = () => {
    isPointerDownRef.current = true;
    startAnimationSequence();
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  useEffect(() => clearTimers, []);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-black">
      <div className="relative w-full">
        <img src="/BTN.jpg" alt="QR code" className="block h-auto w-full" />

        <button
          type="button"
          aria-label="Activate green energy"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={startAnimationSequence}
          className="absolute left-1/2 z-10 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
          style={{ top: ACTIVATION_TOP, width: ACTIVATION_SIZE }}
        >
          <span className="pointer-events-none absolute inset-[20%] rounded-full bg-lime-300/0 transition duration-300 active:bg-lime-200/15" />
        </button>

        <div
          className="pointer-events-none absolute left-1/2 z-20 aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ top: ACTIVATION_TOP, width: ACTIVATION_SIZE }}
        >
          {activeBurst !== null && (
            <div key={activeBurst} className="absolute inset-0">
              <span className="qr-energy-halo" />
              <span className="qr-energy-ring qr-energy-ring-1" />
              <span className="qr-energy-ring qr-energy-ring-2" />
              <span className="qr-energy-ring qr-energy-ring-3" />
              <span className="qr-energy-ring qr-energy-ring-4" />
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          {/* {ROAD_GLOW_LINES.map((line, index) => (
            <span
              key={`preview-${index}`}
              className="qr-road-glow-line qr-road-glow-line-preview"
              style={
                {
                  left: line.left,
                  top: line.top,
                  width: line.width,
                  "--line-rotate": line.rotate,
                  "--line-delay": line.delay,
                } as React.CSSProperties
              }
            />
          ))} */}

          {activeBurst !== null && (
            <div key={activeBurst} className="absolute inset-0">
              {ROAD_GLOW_LINES.map((line, index) => (
                <span
                  key={index}
                  className="qr-road-glow-line"
                  style={
                    {
                      left: line.left,
                      top: line.top,
                      width: line.width,
                      "--line-rotate": line.rotate,
                      "--line-delay": line.delay,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .qr-energy-halo,
        .qr-energy-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          aspect-ratio: 1;
          border-radius: 9999px;
          mix-blend-mode: screen;
        }

        .qr-energy-halo {
          width: 118%;
          background: radial-gradient(
            circle,
            transparent 44%,
            rgba(220, 255, 130, 0.24) 49%,
            rgba(117, 255, 64, 0.18) 58%,
            transparent 72%
          );
          filter: blur(4px);
          animation: qr-soft-halo 1.15s ease-out forwards;
        }

        .qr-energy-ring {
          width: 112%;
          border: 2px solid rgba(226, 255, 135, 0.92);
          box-shadow:
            0 0 12px rgba(226, 255, 135, 0.9),
            0 0 34px rgba(80, 255, 90, 0.55),
            inset 0 0 18px rgba(139, 255, 84, 0.35);
          animation: qr-outside-wave 1.28s ease-out forwards;
        }

        .qr-energy-ring-2 {
          animation-delay: 0.14s;
        }

        .qr-energy-ring-3 {
          animation-delay: 0.28s;
        }

        .qr-energy-ring-4 {
          animation-delay: 0.42s;
          border-color: rgba(255, 255, 190, 0.75);
        }

        .qr-road-glow-line {
          position: absolute;
          height: 4px;
          border-radius: 9999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(77, 255, 66, 0.22) 12%,
            rgba(164, 255, 68, 0.95) 42%,
            rgba(255, 255, 210, 1) 52%,
            rgba(93, 255, 67, 0.85) 64%,
            transparent
          );
          box-shadow:
            0 0 8px rgba(224, 255, 134, 0.95),
            0 0 18px rgba(77, 255, 66, 0.82),
            0 0 42px rgba(82, 255, 76, 0.48);
          opacity: 0;
          transform: rotate(var(--line-rotate)) scaleX(0.18);
          transform-origin: left center;
          mix-blend-mode: screen;
          animation: qr-road-line-flash 1.45s ease-out forwards;
          animation-delay: var(--line-delay);
        }

        .qr-road-glow-line::before {
          content: "";
          position: absolute;
          inset: -10px 0;
          border-radius: 9999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(117, 255, 68, 0.32),
            rgba(255, 255, 205, 0.42),
            transparent
          );
          filter: blur(8px);
        }

        .qr-road-glow-line::after {
          content: "";
          position: absolute;
          left: 8%;
          top: 50%;
          width: 28%;
          height: 180%;
          border-radius: 9999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(132, 255, 77, 0.42),
            rgba(255, 255, 215, 0.9),
            rgba(132, 255, 77, 0.42),
            transparent
          );
          box-shadow:
            0 0 12px rgba(192, 255, 112, 0.78),
            0 0 28px rgba(87, 255, 66, 0.58);
          filter: blur(2px);
          transform: translateY(-50%);
          animation: qr-road-sweep 1.45s ease-out forwards;
          animation-delay: var(--line-delay);
        }

        .qr-road-glow-line-preview {
          opacity: 0.68;
          transform: rotate(var(--line-rotate)) scaleX(1);
          animation: qr-road-line-preview 1.9s ease-in-out infinite;
          animation-delay: var(--line-delay);
        }

        .qr-road-glow-line-preview::after {
          opacity: 0.8;
          animation: qr-road-sweep-preview 1.9s ease-in-out infinite;
          animation-delay: var(--line-delay);
        }

        @keyframes qr-outside-wave {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.92);
          }
          14% {
            opacity: 1;
          }
          72% {
            opacity: 0.72;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.65);
          }
        }

        @keyframes qr-soft-halo {
          0% {
            opacity: 0.78;
            transform: translate(-50%, -50%) scale(0.98);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.05);
          }
        }

        @keyframes qr-road-line-flash {
          0% {
            opacity: 0;
            filter: brightness(0.9) blur(0.4px);
            transform: rotate(var(--line-rotate)) scaleX(0.12);
          }
          24% {
            opacity: 1;
            filter: brightness(1.85) blur(0);
            transform: rotate(var(--line-rotate)) scaleX(1);
          }
          62% {
            opacity: 0.62;
            filter: brightness(1.25) blur(0.2px);
            transform: rotate(var(--line-rotate)) scaleX(0.95);
          }
          100% {
            opacity: 0;
            filter: brightness(0.8);
            transform: rotate(var(--line-rotate)) scaleX(0.55);
          }
        }

        @keyframes qr-road-sweep {
          0% {
            opacity: 0;
            left: -18%;
          }
          28% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            left: 92%;
          }
        }

        @keyframes qr-road-line-preview {
          0%,
          100% {
            opacity: 0.36;
            filter: brightness(0.95) blur(0.4px);
          }
          50% {
            opacity: 0.78;
            filter: brightness(1.55) blur(0);
          }
        }

        @keyframes qr-road-sweep-preview {
          0%,
          100% {
            opacity: 0.35;
            left: -12%;
          }
          50% {
            opacity: 0.85;
            left: 76%;
          }
        }
      `}</style>
    </main>
  );
};

export default QRCodePage;
