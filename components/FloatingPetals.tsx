"use client";

import { motion } from "framer-motion";

export default function FloatingPetals() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="
            fixed
            rounded-full
            bg-pink-200
            opacity-30
            pointer-events-none
          "
          style={{
            width: 12,
            height: 12,
            left: `${10 + i * 10}%`,
            top: "-20px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: 15 + i,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}