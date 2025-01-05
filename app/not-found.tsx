"use client";

import { Link } from "@/components/Link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-lg space-y-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="relative"
        >
          <div className="animate-[gradient_8s_linear_infinite] bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-[180px] font-bold text-transparent">
            404
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-gray-800 md:text-3xl"
        >
          Üzgünüz, aradığınız sayfa bulunamadı
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Anasayfaya Dön
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
