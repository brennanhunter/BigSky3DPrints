'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for products
const allProducts = [
  // New Releases
  { id: 1, name: 'Crystal Lamp Base', price: 24.99, category: 'new releases', description: 'Geometric crystal-inspired lamp base with LED compatibility. Perfect for modern decor.', dateAdded: '2024-01-15' },
  { id: 2, name: 'Floating Shelf Bracket', price: 15.50, category: 'new releases', description: 'Invisible mounting system for a clean, floating shelf look.', dateAdded: '2024-01-12' },
  { id: 3, name: 'Phone Stand Pro', price: 19.75, category: 'new releases', description: 'Adjustable phone stand with cable management. Works with all devices.', dateAdded: '2024-01-10' },
  
  // Planters
  { id: 4, name: 'Sunflower Planter', price: 12.00, category: 'planters', description: 'A vibrant little pot perfect for herbs or succulents. Looks great on windowsills and patios.', dateAdded: '2023-12-20' },
  { id: 5, name: 'Geometric Succulent Pot', price: 16.25, category: 'planters', description: 'Modern geometric design perfect for small succulents and air plants.', dateAdded: '2023-12-18' },
  { id: 6, name: 'Hanging Garden Pod', price: 22.00, category: 'planters', description: 'Space-saving hanging planter with built-in drainage system.', dateAdded: '2023-12-15' },
  { id: 7, name: 'Window Herb Garden', price: 28.50, category: 'planters', description: 'Triple-tier herb garden designed to fit standard window sills.', dateAdded: '2023-12-10' },
  { id: 8, name: 'Mini Cactus Collection', price: 18.75, category: 'planters', description: 'Set of 4 tiny planters perfect for a desktop cactus garden.', dateAdded: '2023-12-05' },
  
  // Models
  { id: 9, name: 'Dragon Dice Tower', price: 18.50, category: 'models', description: 'Roll with style. This fantasy-inspired dice tower is a must-have for tabletop gamers.', dateAdded: '2023-11-28' },
  { id: 10, name: 'Articulated Dragon', price: 35.00, category: 'models', description: 'Fully articulated dragon figure with moveable joints. No assembly required.', dateAdded: '2023-11-25' },
  { id: 11, name: 'Castle Miniature', price: 42.75, category: 'models', description: 'Detailed medieval castle perfect for D&D campaigns or display.', dateAdded: '2023-11-20' },
  { id: 12, name: 'Spaceship Model Kit', price: 31.25, category: 'models', description: 'Sci-fi spaceship with removable panels to show interior details.', dateAdded: '2023-11-15' },
  { id: 13, name: 'Flexi Octopus', price: 14.50, category: 'models', description: 'Flexible octopus that can wrap around objects. Great fidget toy.', dateAdded: '2023-11-10' },
  
  // Toys
  { id: 14, name: 'Wobble Turtle Toy', price: 6.00, category: 'toys', description: 'A fan favorite. This wobbly turtle brings charm to any desk or shelf. Great gift item.', dateAdded: '2023-11-05' },
  { id: 15, name: 'Puzzle Box Challenge', price: 13.75, category: 'toys', description: 'Brain-teasing puzzle box with hidden compartment. Great for all ages.', dateAdded: '2023-11-01' },
  { id: 16, name: 'Spinning Top Collection', price: 11.25, category: 'toys', description: 'Set of 3 precision-balanced spinning tops with unique designs.', dateAdded: '2023-10-28' },
  { id: 17, name: 'Marble Run Starter', price: 26.50, category: 'toys', description: 'Modular marble run system. Expand with additional track pieces.', dateAdded: '2023-10-25' },
  { id: 18, name: 'Wind-Up Robot', price: 9.75, category: 'toys', description: 'Classic wind-up robot that walks and lights up. No batteries needed.', dateAdded: '2023-10-20' },
  
  // Accessories
  { id: 19, name: 'Hex Vent Cover', price: 9.75, category: 'accessories', description: 'Functional and aesthetic. Custom-designed vent cover that actually improves airflow.', dateAdded: '2023-10-15' },
  { id: 20, name: 'Mini Tool Rack', price: 7.25, category: 'accessories', description: 'Tidy up your desk or workbench with this modular rack for tools, pens, or brushes.', dateAdded: '2023-10-10' },
  { id: 21, name: 'Mountain Ring Stand', price: 11.00, category: 'accessories', description: 'A minimalist ring holder shaped like a mountain peak. Practical and pretty.', dateAdded: '2023-10-05' },
  { id: 22, name: 'Cable Management Kit', price: 8.50, category: 'accessories', description: 'Set of clips and organizers to keep your desk cables tidy.', dateAdded: '2023-10-01' },
  { id: 23, name: 'Pen Holder Trio', price: 12.75, category: 'accessories', description: 'Three connected pen holders in different sizes for optimal organization.', dateAdded: '2023-09-28' },
  { id: 24, name: 'Desk Organizer Plus', price: 21.00, category: 'accessories', description: 'Multi-compartment organizer with slots for phone, pens, and small items.', dateAdded: '2023-09-25' }
];

// Fireflies Layer Component (recreated based on your usage)
const FirefliesLayer = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {[...Array(12)].map((_, i) => (
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
  );
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  dateAdded: string;
};

export default function FullShop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['all', 'new releases', 'planters', 'models', 'toys', 'accessories'];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? allProducts 
      : allProducts.filter(product => product.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'oldest':
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [selectedCategory, sortBy]);

  return (
    <section className="relative bg-gradient-to-b from-ink to-skylight min-h-screen pt-32 pb-20 px-4 text-linen overflow-hidden">
      <FirefliesLayer />
      
      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-[126px]">3D Print Shop</h1>
        <p className="text-center text-clay mb-12 max-w-2xl mx-auto">
          Discover our complete collection of ready-to-print designs. From practical accessories to decorative pieces, find the perfect 3D printed item for any project.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center items-center">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-linen text-ink px-4 py-2 rounded-full font-semibold shadow-md border border-clay cursor-pointer hover:bg-white transition capitalize min-w-[160px]"
            >
              {categories.map(category => (
                <option key={category} value={category} className="capitalize">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-linen text-ink px-4 py-2 rounded-full font-semibold shadow-md border border-clay cursor-pointer hover:bg-white transition min-w-[160px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-center text-clay mb-8">
          Showing {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </p>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredAndSortedProducts.map((product) => (
              <motion.button
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-xl border border-clay shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_18px_rgba(255,255,200,0.5)] cursor-pointer group"
              >
                {/* Logo Image */}
                <Image
                  src="/images/logo.png"
                  alt={product.name}
                  width={200}
                  height={160}
                  className="mb-4 rounded bg-linen w-full h-40 object-cover"
                />
                
                <h3 className="text-lg font-semibold mb-2 text-ink text-center">{product.name}</h3>
                <p className="text-ink font-bold text-lg mb-2">${product.price}</p>
                <span className="text-xs text-clay bg-gray-100 px-2 py-1 rounded-full capitalize">
                  {product.category}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-clay mb-4">No products found</p>
            <p className="text-clay">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative border border-clay max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl z-10"
              >
                ×
              </button>

              {/* Product Image */}
              <Image
                src="/images/logo.png"
                alt={selectedProduct.name}
                width={400}
                height={240}
                className="mb-6 rounded bg-linen mx-auto w-full h-60 object-cover"
              />

              <div className="text-center">
                <span className="text-xs text-clay bg-gray-100 px-3 py-1 rounded-full capitalize mb-3 inline-block">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-ink">{selectedProduct.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{selectedProduct.description}</p>
                <p className="text-3xl font-bold text-ink mb-8">${selectedProduct.price}</p>

                <div className="space-y-3">
                  <button
                    className="w-full bg-ink text-linen py-3 rounded-lg font-semibold hover:bg-ink/90 transition text-lg"
                    onClick={() => alert(`Added ${selectedProduct.name} to cart!`)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-full bg-gray-100 text-ink py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                    onClick={() => alert('View 3D preview coming soon!')}
                  >
                    View 3D Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}