"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RSVPButton({
  inviteId,
}: {
  inviteId: string;
}) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      animate={{
        boxShadow: [
          "0 0 0px rgba(167,139,250,.3)",
          "0 0 20px rgba(167,139,250,.6)",
          "0 0 0px rgba(167,139,250,.3)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      onClick={() =>
        router.push(
          `/invite/${inviteId}/rsvp`
        )
      }
      className="
        w-full
        mt-8
        bg-gradient-to-r
        from-[#4F6F52]
        to-[#7A9D8C]
        text-white
        py-5
        rounded-full
        text-lg
        font-bold
      "
    >
      ✨ RSVP ✨
    </motion.button>
  );
}