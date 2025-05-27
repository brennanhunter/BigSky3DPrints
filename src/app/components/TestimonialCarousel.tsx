'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Linda H.',
    date: '2 weeks ago',
    stars: 5,
    text: "I asked for a mini model of my dog. What I got was somehow *more loyal* than the real one. Dane might be a wizard.",
  },
  {
    name: 'Mark S.',
    date: 'last month',
    stars: 5,
    text: "I said I wanted a keychain. Dane made me a functional replica of the Death Star. I fear him now.",
  },
  {
    name: 'Jason T.',
    date: 'yesterday',
    stars: 5,
    text: "Service was fast, friendly, and disturbingly accurate. I think Dane 3D-printed a copy of me before I even ordered.",
  },
  {
    name: 'Ava R.',
    date: '3 days ago',
    stars: 5,
    text: "He once printed a tiny chair for my hamster. Now the hamster won’t sit anywhere else. Thanks a lot, Dane.",
  },
  {
    name: 'Trevor B.',
    date: '5 minutes ago',
    stars: 5,
    text: "Honestly I just came for the free coffee. Stayed for the printers. Dane’s alright I guess.",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
<section className="bg-gradient-to-b from-[#ccc] to-ink py-20 text-linen text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">What Customers Are Saying</h2>
      <p className="text-sm text-gray-500 mb-8">These are just examples — this section can auto-update with real Google reviews.</p>

      <div className="relative max-w-xl mx-auto min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 px-6"
          >
            <div className="mb-4">
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <p className="text-lg italic mb-4">“{current.text}”</p>
            <p className="text-sm text-gray-700">— {current.name}, {current.date}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
