"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

// Kar tanesi komponenti
const Snowflake = ({ delay = 0 }: { delay?: number }) => {
  const [xPosition] = useState(Math.random() * 100); // Random başlangıç X pozisyonu

  return (
    <motion.div
      className="absolute text-white/30"
      initial={{
        top: -10,
        left: `${xPosition}%`,
        scale: Math.random() * 0.5 + 0.5, // Random boyut
      }}
      animate={{
        top: "100%",
        left: [`${xPosition}%`, `${xPosition + (Math.random() * 10 - 5)}%`],
      }}
      transition={{
        duration: Math.random() * 3 + 4, // Random düşme hızı
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: "4px",
        height: "4px",
        background: "white",
        borderRadius: "50%",
        filter: "blur(1px)",
      }}
    />
  );
};

function LoadingSkeleton() {
  return (
    <div className="relative w-full overflow-hidden animate-pulse bg-gradient-to-r from-pink-500/40 via-red-500/40 to-pink-500/40">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 px-4 py-2">
          <div className="w-4 h-4 rounded-full bg-pink-200/50" />
          <div className="w-64 h-5 rounded-full bg-pink-200/50" />
          <div className="w-4 h-4 rounded-full bg-pink-200/50" />
        </div>
      </div>
    </div>
  );
}

export default function ValentinesBanner() {
  const [snowflakes] = useState(() => Array.from({ length: 30 }, (_, i) => i));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative w-full text-white bg-gradient-to-r from-pink-500 via-red-500 to-pink-500">
      {/* Kar efekti */}
      {snowflakes.map((_, i) => (
        <Snowflake key={i} delay={i * 0.2} />
      ))}

      <div className="container relative z-10 mx-auto">
        <div className="flex items-center justify-center gap-2 px-4 py-2">
          <Heart
            className="w-4 h-4 text-pink-200 animate-pulse"
            aria-hidden="true"
          />
          <p className="text-sm font-medium">Sevgililer gününüz kutlu olsun!</p>
          <Heart
            className="w-4 h-4 text-pink-200 animate-pulse"
            aria-hidden="true"
          />
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-8 h-8 -translate-y-1/2 rounded-full -left-4 top-1/2 bg-pink-300/20" />
        <div className="absolute w-8 h-8 -translate-y-1/2 rounded-full -right-4 top-1/2 bg-pink-300/20" />
      </div>
    </div>
  );
}
