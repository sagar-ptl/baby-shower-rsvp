"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const footprints = [
  {
    left: "42%",
    top: "80%",
    image: "/icons/baby-foot-pink.png",
    rotate: 0,
    delay: 0,
  },
  {
    left: "57%",
    top: "73%",
    image: "/icons/baby-foot-blue.png",
    rotate: 0,
    delay: 0.5,
  },

  {
    left: "42%",
    top: "65%",
    image: "/icons/baby-foot-pink.png",
    rotate: 0,
    delay: 1,
  },
  {
    left: "57%",
    top: "58%",
    image: "/icons/baby-foot-blue.png",
    rotate: 0,
    delay: 1.5,
  },

  {
    left: "42%",
    top: "50%",
    image: "/icons/baby-foot-pink.png",
    rotate: 0,
    delay: 2,
  },
  {
    left: "57%",
    top: "42%",
    image: "/icons/baby-foot-blue.png",
    rotate: 0,
    delay: 2.5,
  },

  {
    left: "42%",
    top: "32%",
    image: "/icons/baby-foot-pink.png",
    rotate: 0,
    delay: 3,
  },

  {
    left: "57%",
    top: "22%",
    image: "/icons/baby-foot-blue.png",
    rotate: 0,
    delay: 3.5,
  },

  

  {
    left: "45%",
    top: "12%",
    image: "/icons/baby-foot-pink.png",
    rotate: 0,
    delay: 4,
  },

  {
    left: "55%",
    top: "2%",
    image: "/icons/baby-foot-blue.png",
    rotate: 0,
    delay: 4.5,
  },
];

export default function BabyFootprints() {
  console.log("I'm in babyFootprints");
  return (
    <>
      {footprints.map((foot, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            y: 10,
          }}
          animate={{
  opacity: [0, 1, 0],
  scale: [0, 1.2, 1],
}}
transition={{
  delay: foot.delay,
  duration: 2,
  repeatDelay: 5,
}}
          className="absolute"
          style={{
            left: foot.left,
            top: foot.top,
            transform: `rotate(${foot.rotate}deg)`,
          }}
        >
          <Image
            src={foot.image}
            alt="baby footprint"
            width={48}
            height={48}
            priority
          />
        </motion.div>
      ))}
    </>
  );
}