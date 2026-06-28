/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

const ACTIVATION_TOP = "78%";
const ACTIVATION_SIZE = "20%";
const RIPPLE_ZONES = [
  { left: "13%", top: "90%", size: "18%", delay: "0s" },
  { left: "50%", top: "95%", size: "15%", delay: "0.08s" },
  { left: "86%", top: "90%", size: "18%", delay: "0.16s" },
];

const QRCodePage = () => {
  const [bursts, setBursts] = useState<number[]>([]);

  const handleActivate = () => {
    const id = Date.now() + Math.random();
    setBursts((current) => [...current, id]);
    window.setTimeout(() => {
      setBursts((current) => current.filter((burstId) => burstId !== id));
    }, 1600);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-black">
      <div className="relative w-full">
        <img src="/BTN.jpg" alt="QR code" className="block h-auto w-full" />

        <button
          type="button"
          aria-label="Activate green energy"
          onClick={handleActivate}
          className="absolute left-1/2 z-10 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
          style={{ top: ACTIVATION_TOP, width: ACTIVATION_SIZE }}
        >
          <span className="pointer-events-none absolute inset-[20%] rounded-full bg-lime-300/0 transition duration-300 active:bg-lime-200/15" />
        </button>

        <div
          className="pointer-events-none absolute left-1/2 z-20 aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ top: ACTIVATION_TOP, width: ACTIVATION_SIZE }}
        >
          {bursts.map((burstId) => (
            <div key={burstId} className="absolute inset-0">
              <span className="qr-energy-halo" />
              <span className="qr-energy-ring qr-energy-ring-1" />
              <span className="qr-energy-ring qr-energy-ring-2" />
              <span className="qr-energy-ring qr-energy-ring-3" />
              <span className="qr-energy-ring qr-energy-ring-4" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          {bursts.map((burstId) =>
            RIPPLE_ZONES.map((zone, index) => (
              <div
                key={`${burstId}-${index}`}
                className="qr-ripple-zone"
                style={
                  {
                    left: zone.left,
                    top: zone.top,
                    width: zone.size,
                    "--zone-delay": zone.delay,
                  } as React.CSSProperties
                }
              >
                <span className="qr-ripple-circle qr-ripple-circle-1" />
                <span className="qr-ripple-circle qr-ripple-circle-2" />
                <span className="qr-ripple-circle qr-ripple-circle-3" />
              </div>
            )),
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

        .qr-ripple-zone {
          position: absolute;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          mix-blend-mode: screen;
        }

        .qr-ripple-marker {
          opacity: 0.9;
        }

        .qr-ripple-marker-ring {
          position: absolute;
          border-radius: 9999px;
          border: 2px dashed rgba(255, 47, 110, 0.95);
          background: rgba(255, 47, 110, 0.08);
          box-shadow: 0 0 18px rgba(255, 47, 110, 0.42);
        }

        .qr-ripple-marker-ring-1 {
          inset: 0;
        }

        .qr-ripple-marker-ring-2 {
          inset: 18%;
          border-color: rgba(255, 255, 120, 0.9);
          background: rgba(255, 255, 120, 0.06);
        }

        .qr-ripple-marker-ring-3 {
          inset: 35%;
          border-color: rgba(60, 255, 120, 0.9);
          background: rgba(60, 255, 120, 0.08);
        }

        .qr-ripple-circle {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid rgba(214, 255, 116, 0.92);
          box-shadow:
            0 0 10px rgba(222, 255, 137, 0.9),
            0 0 28px rgba(64, 255, 91, 0.5),
            inset 0 0 18px rgba(150, 255, 94, 0.3);
          opacity: 0;
          animation: qr-zone-ripple 1.35s ease-out forwards;
          animation-delay: var(--zone-delay);
        }

        .qr-ripple-circle-2 {
          animation-delay: calc(var(--zone-delay) + 0.16s);
          border-color: rgba(255, 255, 180, 0.8);
        }

        .qr-ripple-circle-3 {
          animation-delay: calc(var(--zone-delay) + 0.32s);
          border-color: rgba(118, 255, 89, 0.72);
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

        @keyframes qr-zone-ripple {
          0% {
            opacity: 0;
            transform: scale(0.18);
          }
          18% {
            opacity: 0.95;
          }
          70% {
            opacity: 0.55;
          }
          100% {
            opacity: 0;
            transform: scale(1.9);
          }
        }
      `}</style>
    </main>
  );
};

export default QRCodePage;