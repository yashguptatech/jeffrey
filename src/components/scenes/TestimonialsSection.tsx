"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/story";

export default function TestimonialsSection() {
  return (
    <section className="section-pad bg-black/90">
      <div className="mx-auto max-w-6xl">
        <p className="kicker reveal">Testimonials</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((quote) => (
            <motion.article
              key={quote}
              className="reveal testimonial"
              whileHover={{ y: -8, rotateX: 4, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <p className="text-lg">“{quote}”</p>
              <p className="mt-6 text-xs uppercase tracking-[0.24em] text-zinc-400">
                Anonymous, definitely
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
