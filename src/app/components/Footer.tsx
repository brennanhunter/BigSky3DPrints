'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';

const ideas = [
  'a spaghetti-powered jetpack 🍝🚀',
  'a squirrel-sized unicycle 🐿️🚴‍♂️',
  'a self-watering chia helmet 🌱🪖',
  'an interdimensional dice tower 🎲🌀',
  'a time-traveling toaster ⏰🍞',
  'cat armor. Definitely cat armor. 🐱🛡️'
];

export default function Footer() {
  const [surprise, setSurprise] = useState('');

  const handleEasterEgg = () => {
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setSurprise(`You should print… ${randomIdea}`);
  };

  return (
    <footer className="bg-mist text-ink px-6 py-10 text-center border-t border-clay mt-20 text-sm">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        {/* Site Links */}
        <div>
          <h4 className="font-semibold mb-2">Navigation</h4>
          <ul className="space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>
            <a href="mailto:danedmp267@gmail.com" className="underline hover:text-blue-700">
              danedmp267@gmail.com
            </a>
          </p>
          <p className="mt-2">Great Falls, Montana</p>
        </div>

        {/* Social + Easter Egg */}
        <div>
          <h4 className="font-semibold mb-2">Connect</h4>
          <a
            href="https://www.facebook.com/BigSky3DPrint"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 hover:text-blue-700"
          >
            <FaFacebook />
            <span>Facebook</span>
          </a>

          <div className="mt-4 cursor-pointer select-none" onClick={handleEasterEgg}>
            <span role="img" aria-label="3D Printer" className="text-2xl">
              🖨️
            </span>
            {surprise && (
              <p className="text-sm mt-2 text-honeyrose animate-bounce transition-opacity duration-500">
                {surprise}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-1 text-clay">
        <p>© {new Date().getFullYear()} Big Sky 3D Prints. All rights reserved.</p>
        <p className="text-xs">
          <a
            href="https://xtremery.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse hover:animate-shimmer"
          >
            3D-printed and pixel-polished by Xtremery · Deland, FL
          </a>
        </p>
      </div>
    </footer>
  );
}
