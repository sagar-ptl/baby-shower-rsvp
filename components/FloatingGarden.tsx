"use client";

import { motion } from "framer-motion";

type ParticleType =
  | "flower"
  | "flower2"
  | "flower3"
  | "flower4"
  | "leaf"
  | "feather";

interface ParticleData {
  id: number;
  type: ParticleType;
  left: number;
  duration: number;
  delay: number;
}

const particleAssets: Record<ParticleType, string> = {
  flower: "🌸",
  flower2: "🌺",
  flower3: "🌼",
  flower4: "💮",
  leaf: "🍃",
  feather: "🦚",
};

const particleTypes: ParticleType[] = [
  "flower",
  "flower2",
  "flower3",
  "flower4",
  "leaf",
  "feather",
];

const particles: ParticleData[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i,
    type:
      particleTypes[
        Math.floor(Math.random() * particleTypes.length)
      ],
    left: Math.random() * 100,
    duration: 18 + Math.random() * 12,
    delay: Math.random() * 8,
  })
);

function Particle({
  particle,
}: {
  particle: ParticleData;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${particle.left}%`,
        top: "-10%",
      }}
      animate={{
        y: ["0vh", "120vh"],
        x: [0, 20, -20, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        y: {
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "linear",
        },
        x: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <div className="text-3xl md:text-4xl select-none">
        {particleAssets[particle.type]}
      </div>
    </motion.div>
  );
}

export default function FloatingGarden() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          particle={particle}
        />
      ))}
    </div>
  );
}