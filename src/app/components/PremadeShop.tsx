'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FirefliesLayer from './FirefliesLayer';

const items = [
  {
    id: 1,
    name: 'Sunflower Planter',
    price: '$12.00',
    description: 'A vibrant little pot perfect for herbs or succulents. Looks great on windowsills and patios.',
  },
  {
    id: 2,
    name: 'Dragon Dice Tower',
    price: '$18.50',
    description: 'Roll with style. This fantasy-inspired dice tower is a must-have for tabletop gamers.',
  },
  {
    id: 3,
    name: 'Hex Vent Cover',
    price: '$9.75',
    description: 'Functional and aesthetic. Custom-designed vent cover that actually improves airflow.',
  },
  {
    id: 4,
    name: 'Mini Tool Rack',
    price: '$7.25',
    description: 'Tidy up your desk or workbench with this modular rack for tools, pens, or brushes.',
  },
  {
    id: 5,
    name: 'Wobble Turtle Toy',
    price: '$6.00',
    description: 'A fan favorite. This wobbly turtle brings charm to any desk or shelf. Great gift item.',
  },
  {
    id: 6,
    name: 'Mountain Ring Stand',
    price: '$11.00',
    description: 'A minimalist ring holder shaped like a mountain peak. Practical and pretty.',
  },
];

export default function PremadeShop() {
  const [selected, setSelected] = useState<null | typeof items[0]>(null);

  return (
    <section className="relative bg-gradient-to-b from-ink to-skylight py-20 px-4 text-linen overflow-hidden">
        <FirefliesLayer />
      {/* ✨ Firefly glow layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-60 blur-md animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Premade Designs</h2>
      <p className="text-center text-sm text-clay mb-12">Our best-selling ready-to-print items. Click any to learn more.</p>

      {/* Card Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="bg-white rounded-xl border border-clay shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_18px_rgba(255,255,200,0.5)] hover:scale-[1.03] cursor-pointer"
          >
            <Image
              src="/images/logo.png"
              alt={item.name}
              width={200}
              height={150}
              className="mb-4 rounded bg-linen"
            />
            <h3 className="text-lg font-semibold mb-1 text-ink">{item.name}</h3>
            <p className="text-ink font-semibold text-base mb-1">{item.price}</p>
            <p className="text-sm text-gray-600 text-center">View details</p>
          </button>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/shop"
          className="inline-block bg-linen text-ink px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-white transition"
        >
          Go to Full Shop
        </a>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative border border-clay"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-4 text-gray-400 hover:text-gray-800 text-2xl"
              >
                ×
              </button>

              <Image
                src="/images/logo.png"
                alt={selected.name}
                width={300}
                height={200}
                className="mb-4 rounded bg-linen mx-auto"
              />

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-ink">{selected.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{selected.description}</p>
                <p className="text-xl font-semibold text-ink mb-6">{selected.price}</p>

                <button
                  className="w-full bg-ink text-linen py-3 rounded-md font-semibold hover:bg-ink/90 transition text-lg"
                  onClick={() => alert('Pretend this added to cart')}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
