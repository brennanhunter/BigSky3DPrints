'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhatYouCanGet() {
  return (
    <section className="py-20 bg-gradient-to-b from-mist to-[#ccc]
 text-center px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-ink"
      >
        What You Can Get
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Practical Prints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white border border-clay rounded-xl p-6 shadow-md"
        >
          <Image
            src="/images/purple-vase.png"
            alt="Purple Vase"
            width={400}
            height={300}
            className="rounded-md mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-ink mb-2">Practical Prints</h3>
          <p className="text-ink/80 text-sm">
            Vases, cable organizers, shelf brackets, mounts, hooks — things that solve real problems.
          </p>
        </motion.div>

        {/* Toys & Collectibles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white border border-clay rounded-xl p-6 shadow-md"
        >
          <Image
            src="/images/chess-king.png"
            alt="Sci-Fi Chess King"
            width={400}
            height={300}
            className="rounded-md mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-ink mb-2">Toys & Collectibles</h3>
          <p className="text-ink/80 text-sm">
            Chess pieces, Articulated dragons, fantasy props, desk toys — prints that spark joy or curiosity.
          </p>
        </motion.div>

        {/* Custom Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white border border-clay rounded-xl p-6 shadow-md"
        >
          <Image
            src="/images/custom-request.png"
            alt="Custom Print"
            width={400}
            height={300}
            className="rounded-md mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-ink mb-2">Custom Work</h3>
          <p className="text-ink/80 text-sm">
            Want something unique? Reach out to request a special item — we’ll see what’s possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
