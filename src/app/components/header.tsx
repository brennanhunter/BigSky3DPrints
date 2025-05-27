'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const Logo = '/images/logo.png'; // Adjust path as needed

export default function Header() {
  const [angle, setAngle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const update = () => {
      setAngle(prev => (prev + 0.0025) % (Math.PI * 2));
      requestAnimationFrame(update);
    };
    update();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const maxScroll = 1000; // slow cloud reaction range
const scrollProgress = Math.min(scrollY / maxScroll, 1);
const easedProgress = Math.pow(scrollProgress, 2.2); // more easing = slower ramp-up

const cloudLift = easedProgress * 60; // gentle rise
const cloudDarkness = 1 - easedProgress * 0.25; // darkens less aggressively


  return (
    <header className="fixed top-0 z-50 w-full h-[220px] overflow-visible bg-transparent">
      {/* Floating Clouds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none">
        <div
          className="absolute left-[-15%] scale-[1.2] sm:scale-[1.5] opacity-90"
          style={{
            top: `${-235 - cloudLift}px`,
            transform: `translateX(${Math.sin(angle) * 0.8}px)`,
            filter: `brightness(${cloudDarkness})`,
          }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Left" width={400} height={200} />
        </div>
        <div
          className="absolute left-[5%] scale-x-[-1] scale-[1.4] sm:scale-[1.7] opacity-85"
          style={{
            top: `${-255 - cloudLift}px`,
            transform: `translateX(${Math.sin(angle + 1) * 0.6}px)`,
            filter: `brightness(${cloudDarkness})`,
          }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Inner Left" width={430} height={220} />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 scale-[1.6] sm:scale-[2] opacity-95"
          style={{
            top: `${-250 - cloudLift}px`,
            transform: `translateX(${Math.sin(angle + 2) * 0.5}px)`,
            filter: `brightness(${cloudDarkness})`,
          }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Center" width={500} height={250} />
        </div>
        <div
          className="absolute right-[5%] scale-[1.4] sm:scale-[1.7] opacity-80"
          style={{
            top: `${-255 - cloudLift}px`,
            transform: `translateX(${Math.sin(angle + 3) * 0.6}px)`,
            filter: `brightness(${cloudDarkness})`,
          }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Inner Right" width={430} height={220} />
        </div>
        <div
          className="absolute right-[-15%] scale-[1.2] sm:scale-[1.5] opacity-90"
          style={{
            top: `${-235 - cloudLift}px`,
            transform: `translateX(${Math.sin(angle + 4) * 0.8}px)`,
            filter: `brightness(${cloudDarkness})`,
          }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Right" width={400} height={200} />
        </div>
      </div>

      {/* Logo + Nav */}
      <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-12 text-ink">
        <div className="flex items-center ml-4">
          <Link href="/" className="block">
            <Image
              src={Logo}
              alt="Big Sky 3D Logo"
              width={112}
              height={112}
              className="rounded-full shadow-lg"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl focus:outline-none"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ scale: 0.2, opacity: 0, borderRadius: '100%' }}
            animate={{ scale: 1, opacity: 1, borderRadius: '30px' }}
            exit={{ scale: 0.2, opacity: 0, borderRadius: '100%' }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="absolute top-[100%] right-4 mt-4 w-[85vw] sm:w-80 p-6 bg-white text-ink shadow-xl rounded-3xl z-40
                       flex flex-col items-start text-lg gap-4 origin-top-right"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="w-full hover:underline">
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="w-full hover:underline">
              About
            </Link>
            <Link href="/shop" onClick={() => setIsOpen(false)} className="w-full hover:underline">
              Shop
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full hover:underline">
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
