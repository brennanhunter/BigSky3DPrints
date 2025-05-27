'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    id: 1,
    name: 'Sunflower Planter',
    description: 'A vibrant little pot perfect for herbs or succulents. Looks great on windowsills and patios.',
    price: '$14.99'
  },
  {
    id: 2,
    name: 'Dragon Dice Tower',
    description: 'Roll with style. This fantasy-inspired dice tower is a must-have for tabletop gamers.',
    price: '$24.00'
  },
  {
    id: 3,
    name: 'Hex Vent Cover',
    description: 'Functional and aesthetic. Custom-designed vent cover that actually improves airflow.',
    price: '$9.50'
  },
  {
    id: 4,
    name: 'Mini Tool Rack',
    description: 'Tidy up your desk or workbench with this modular rack for tools, pens, or brushes.',
    price: '$11.25'
  },
  {
    id: 5,
    name: 'Wobble Turtle Toy',
    description: 'A fan favorite. This wobbly turtle brings charm to any desk or shelf. Great gift item.',
    price: '$7.99'
  },
  {
    id: 6,
    name: 'Mountain Ring Stand',
    description: 'A minimalist ring holder shaped like a mountain peak. Practical and pretty.',
    price: '$10.00'
  },
];

export default function PremadeShop() {
  const [selected, setSelected] = useState<null | typeof items[0]>(null);

  return (
    <section className="bg-gradient-to-b from-ink to-skylight py-20 px-4 text-linen">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Premade Designs</h2>
      <p className="text-center text-sm text-clay mb-12">Our best-selling ready-to-print items. Click any to learn more.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="bg-white rounded-xl border border-clay shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <Image src="/images/logo.png" alt={item.name} width={200} height={150} className="mb-4 rounded bg-linen" />
            <h3 className="text-lg font-semibold mb-1 text-ink">{item.name}</h3>
            <p className="text-sm text-gray-600 text-center">Click to view</p>
          </button>
        ))}
      </div>

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
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-1 text-ink">{selected.name}</h3>
              <p className="text-lg text-green-600 font-semibold mb-3">{selected.price}</p>
              <Image src="/images/logo.png" alt={selected.name} width={300} height={200} className="mb-4 rounded bg-linen" />
              <p className="text-sm text-gray-700 mb-6">{selected.description}</p>
              <button className="bg-ink text-linen px-4 py-2 rounded-lg hover:bg-clay hover:text-ink transition w-full font-semibold text-sm">Add to Print Queue</button>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
