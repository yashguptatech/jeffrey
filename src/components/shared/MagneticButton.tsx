"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function MagneticButton({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      className={`magnetic rounded-full border px-5 py-3 text-sm uppercase tracking-[0.26em] ${className ?? ""}`}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.18,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.18,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      type="button"
    >
      {children}
    </motion.button>
  );
}
