"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type Phase = "question" | "answer" | "welcome" | "surprise";

const FLOATING_EMOJIS = ["💖", "✨", "🥰", "💕", "🌸", "💫", "😄", "💗"];

const PLACEHOLDER_CARDS = [
  { number: "01", icon: "💌", title: "A little surprise", text: "Your first special card will go here." },
  { number: "02", icon: "🌷", title: "A little more love", text: "A lovely message is waiting to be added." },
  { number: "03", icon: "✨", title: "One last treat", text: "Your final surprise will go here." },
];

interface NoPosition {
  x: number;
  y: number;
  rotation: number;
}

interface DragState {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
}

function getNoPosition(previous: NoPosition | null): NoPosition {
  const margin = 88;
  const minX = Math.min(margin, window.innerWidth / 2);
  const maxX = Math.max(minX, window.innerWidth - margin);
  const minY = Math.min(margin, window.innerHeight / 2);
  const maxY = Math.max(minY, window.innerHeight - margin);
  let x = minX;
  let y = minY;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    x = minX + Math.random() * (maxX - minX);
    y = minY + Math.random() * (maxY - minY);
    if (!previous || Math.hypot(x - previous.x, y - previous.y) > 140) break;
  }

  return { x, y, rotation: Math.round(Math.random() * 30 - 15) };
}

export default function LovePageExperience() {
  const [phase, setPhase] = useState<Phase>("question");
  const [noPosition, setNoPosition] = useState<NoPosition | null>(null);
  const [triedNo, setTriedNo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  const dodgeNoButton = () => {
    setTriedNo(true);
    setNoPosition((previous) => getNoPosition(previous));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const cards = cardsRef.current;
    if (!cards) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: cards.scrollLeft,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === "mouse") event.preventDefault();
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const cards = cardsRef.current;
    if (!drag || !cards || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    cards.scrollLeft = drag.startScrollLeft - delta;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
  };

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const cards = cardsRef.current;
    const firstCard = cards?.querySelector<HTMLElement>(".love-page-card");
    if (!cards || !firstCard) return;

    cards.scrollBy({
      left: (firstCard.offsetWidth + 20) * (event.key === "ArrowRight" ? 1 : -1),
      behavior: "smooth",
    });
  };

  return (
    <main className="love-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 text-white">
      <div className="love-page-glow love-page-glow-one" aria-hidden="true" />
      <div className="love-page-glow love-page-glow-two" aria-hidden="true" />
      <div className="love-page-glow love-page-glow-three" aria-hidden="true" />

      <div className="love-page-hearts" aria-hidden="true">
        {FLOATING_EMOJIS.map((emoji, index) => (
          <span
            className="love-page-heart"
            key={`${emoji}-${index}`}
            style={{ left: `${8 + index * 12}%`, animationDelay: `${index * -1.7}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {phase === "question" && (
        <section className="love-page-panel love-page-enter relative z-10 w-full max-w-xl rounded-[2rem] border border-white/15 px-6 py-10 text-center shadow-2xl sm:px-12 sm:py-14">
          <p className="text-sm font-semibold tracking-[0.3em] text-pink-200/80 uppercase">
            A tiny question for you
          </p>
          <h1 className="love-page-title mt-5 font-display text-5xl font-bold italic sm:text-7xl">
            Are you ready?
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-white/75 sm:text-lg">
            There&apos;s a little surprise waiting just for you.
          </p>

          <div className="relative mt-9 flex min-h-16 items-center justify-center gap-4">
            <button
              className="love-page-button love-page-yes"
              onClick={() => setPhase(triedNo ? "answer" : "welcome")}
              type="button"
            >
              Yes <span aria-hidden="true">💖</span>
            </button>
            {!noPosition && (
              <button
                className="love-page-button love-page-no"
                onClick={dodgeNoButton}
                onPointerDown={dodgeNoButton}
                onPointerEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                type="button"
              >
                No <span aria-hidden="true">🙈</span>
              </button>
            )}
          </div>
        </section>
      )}

      {phase === "answer" && (
        <section className="love-page-panel love-page-enter relative z-10 w-full max-w-xl rounded-[2rem] border border-white/15 px-6 py-10 text-center shadow-2xl sm:px-12 sm:py-14">
          <div className="love-page-celebration mb-5 text-5xl sm:text-6xl" aria-hidden="true">
            😂 🤭 😄 💖
          </div>
          <p className="text-sm font-semibold tracking-[0.3em] text-pink-200/80 uppercase">
            I knew you would say yes!
          </p>
          <div className="love-page-message mt-5 rounded-3xl border border-white/15 bg-white/10 px-5 py-7 shadow-xl backdrop-blur-md sm:px-8">
            <span className="mb-3 block text-3xl" aria-hidden="true">😂 💌 😂</span>
            <h1 className="font-display text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
              Mujhe pata tha aap Yes par hi click karengi! Thank you so much! 😄
            </h1>
          </div>
          <button
            className="love-page-button love-page-continue mt-8"
            onClick={() => setPhase("welcome")}
            type="button"
          >
            Continue <span aria-hidden="true">✨</span>
          </button>
        </section>
      )}

      {phase === "welcome" && (
        <section className="love-page-panel love-page-enter relative z-10 w-full max-w-xl rounded-[2rem] border border-white/15 px-6 py-10 text-center shadow-2xl sm:px-12 sm:py-14">
          <div className="love-page-celebration mb-5 text-5xl sm:text-6xl" aria-hidden="true">
            💖 🥰 💌
          </div>
          <div className="love-page-message rounded-3xl border border-white/15 bg-white/10 px-5 py-8 shadow-xl backdrop-blur-md sm:px-8">
            <p className="text-sm font-semibold tracking-[0.25em] text-pink-200/80 uppercase">
              A warm welcome
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-relaxed text-white sm:text-4xl">
              Welcome, my dear sweet heart jaan 💕
            </h1>
            <p className="mt-4 text-lg text-pink-100 sm:text-xl">
              I have something for you…
            </p>
          </div>
          <button
            className="love-page-button love-page-continue mt-8"
            onClick={() => setPhase("surprise")}
            type="button"
          >
            Show me <span aria-hidden="true">✨</span>
          </button>
        </section>
      )}

      {phase === "surprise" && (
        <section className="love-page-enter relative z-10 w-full max-w-5xl text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-pink-200/80 uppercase">
            Your next little surprise
          </p>
          <h1 className="love-page-title love-page-title-drift mt-4 font-display text-4xl font-bold italic sm:text-6xl">
            A little box of happiness
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Three little cards, each waiting to hold something special. Drag or swipe to explore them.
          </p>

          <div
            aria-label="Three surprise cards. Drag or swipe left and right to explore."
            className={`love-page-card-track mt-9 ${isDragging ? "is-dragging" : ""}`}
            onLostPointerCapture={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onKeyDown={handleTrackKeyDown}
            ref={cardsRef}
            role="region"
            tabIndex={0}
          >
            {PLACEHOLDER_CARDS.map((card, index) => (
              <article
                className="love-page-card"
                key={card.number}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className="love-page-card-number">{card.number}</span>
                <span className="love-page-card-icon" aria-hidden="true">{card.icon}</span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{card.text}</p>
                <span className="mt-6 text-xs font-medium tracking-widest text-pink-200/80 uppercase">
                  A surprise awaits
                </span>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/55">← Drag or swipe the cards →</p>
        </section>
      )}

      {phase === "question" && noPosition && (
        <button
          className="love-page-button love-page-no love-page-no-running"
          onClick={dodgeNoButton}
          onPointerDown={dodgeNoButton}
          onPointerEnter={dodgeNoButton}
          onTouchStart={dodgeNoButton}
          style={{
            left: noPosition.x,
            top: noPosition.y,
            transform: `translate(-50%, -50%) rotate(${noPosition.rotation}deg)`,
          }}
          type="button"
        >
          No <span aria-hidden="true">🙈</span>
        </button>
      )}
    </main>
  );
}
