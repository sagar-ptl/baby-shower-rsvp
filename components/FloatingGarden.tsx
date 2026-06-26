"use client";

import { motion } from "framer-motion";

type ParticleType =
  | "flower"
  | "flower2"
  | "flower3"
  | "flower4"
  | "leaf"
  | "feather";

const particleAssets = {
  flower: "🌸",
  flower2:"🪷",
  flower3:"🌻",
  flower4:"🌼",
  leaf: "🍃",
  feather: "🦚",
};

const particles = Array.from({ length: 20 }).map((_, i) => {
  const types: ParticleType[] = [
    "flower",
    "flower2",
    "flower3",
    "flower4",
    "leaf",
    "feather",
  ];

  const type =
    types[Math.floor(Math.random() * types.length)];

  return {
    id: i,
    type,
    left: Math.random() * 100,
    duration: 18 + Math.random() * 12,
    delay: Math.random() * 8,
    size: 32,

    // Store original position for calculations
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  };
});

type PointerPosition = {
  x: number;
  y: number;
} | null;

function Particle({
  particle
}: {
  particle: any;
  pointer: PointerPosition;
}) {
  let offsetX = 0;
  let offsetY = 0;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${particle.left}%`,
        top: "-10%",
      }}
      animate={{
        y: ["0vh", "120vh"],
        x: [offsetX],
        rotate: [0, 180, 360],
      }}
      transition={{
        x: {
          type: "spring",
          stiffness: 20,
          damping: 25,
        },
        y: {
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "linear",
        },
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <div className="text-4xl md:text-4xl font-bold">{particleAssets[particle.type]}</div>
    </motion.div>
  );
}

export default function FloatingGarden() {

  return (
    <div
      className="fixed inset-0 overflow-hidden z-0"
    >
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          particle={particle}
        />
      ))}
    </div>
  );
}