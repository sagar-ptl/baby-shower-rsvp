"use client";

import { motion } from "framer-motion";
import BabyFootprints from "./BabyFootprints";

export default function SplashScreen({
  onEnter,
}: {
  onEnter: () => void;
}) {
  console.log("I'min SplashScreen");
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/baby-krishna-yashoda-radha.png')",
          filter: "blur(12px)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Golden sunrise glow */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(201,164,76,.35),transparent_70%)]
        "
      />

      <BabyFootprints />

      <div
        className="
          relative
          z-10
          h-full
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-8
        "
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 1,
          }}
          className="
            text-white
            text-4xl
            font-bold
          "
        >
          A New Blessing
          <br />
          Is On The Way
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.7,
            duration: 1,
          }}
          className="
            text-white/90
            text-xl
            mt-6
          "
        >
          Mohini & Sagar
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.7,
            duration: 1,
          }}
          onClick={onEnter}
          className="
            mt-10
            px-8
            py-4
            rounded-full
            bg-[#4F6F52]
            text-white
            shadow-xl
          "
        >
          ✨ Open Invitation
        </motion.button>
      </div>
    </div>
  );
}