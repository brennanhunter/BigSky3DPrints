'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
const logoPath = '/images/logo.png';

export default function Hero3D() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center text-ink bg-gradient-to-b from-skylight to-white overflow-hidden">
      {/* Logo + Brand */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-6"
      >
        <Image
  src={logoPath}
  alt="Big Sky 3D Prints Logo"
  width={250}
  height={250}
  className="w-48 md:w-60 rounded-xl shadow-lg border border-white/50"
/>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
      >
        Precision Prints. Nature-Inspired. <br />
        <span className="text-clay">Made Just for You.</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-lg md:text-xl max-w-xl mb-8"
      >
        Discover handcrafted 3D prints blending creativity and craft—built in the Big Sky State.
      </motion.p>

      {/* Call to Action */}
      <motion.a
        href="#services"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-3 bg-clay hover:bg-clay/90 text-white rounded-full text-lg transition shadow-md"
      >
        Explore Our Work
      </motion.a>

      {/* Decorative 3D Printer Outline or Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-0 w-full max-w-5xl opacity-20 pointer-events-none"
      >
        <Image
  src="/images/printer-outline-transparent.png"
  alt="3D Printer Decorative Graphic"
  width={1000}
  height={600}
  className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 opacity-10 pointer-events-none select-none"
/>

      </motion.div>
    </section>
  );
}
