'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '../images/logo.png';

export default function Header() {
  const [angle, setAngle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      setAngle(prev => (prev + 0.0025) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full h-[220px] overflow-visible bg-transparent">
      {/* Floating Clouds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none">
        <div
          className="absolute top-[-160px] left-[-15%] scale-[1.2] sm:scale-[1.5] opacity-90"
          style={{ transform: `translateX(${Math.sin(angle) * 0.8}px)` }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Left" width={400} height={200} />
        </div>
        <div
          className="absolute top-[-180px] left-[5%] scale-x-[-1] scale-[1.4] sm:scale-[1.7] opacity-85"
          style={{ transform: `translateX(${Math.sin(angle + 1) * 0.6}px)` }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Inner Left" width={430} height={220} />
        </div>
        <div
          className="absolute top-[-175px] left-1/2 -translate-x-1/2 scale-[1.6] sm:scale-[2] opacity-95"
          style={{ transform: `translateX(${Math.sin(angle + 2) * 0.5}px)` }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Center" width={500} height={250} />
        </div>
        <div
          className="absolute top-[-180px] right-[5%] scale-[1.4] sm:scale-[1.7] opacity-80"
          style={{ transform: `translateX(${Math.sin(angle + 3) * 0.6}px)` }}
        >
          <Image src="/cloud-3d.png" alt="Cloud Inner Right" width={430} height={220} />
        </div>
        <div
          className="absolute top-[-160px] right-[-15%] scale-[1.2] sm:scale-[1.5] opacity-90"
          style={{ transform: `translateX(${Math.sin(angle + 4) * 0.8}px)` }}
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
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start px-6 py-4 md:hidden text-ink text-lg font-medium z-40">
          <Link href="/" className="py-2 w-full" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="py-2 w-full" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/shop" className="py-2 w-full" onClick={() => setIsOpen(false)}>
            Shop
          </Link>
          <Link href="/contact" className="py-2 w-full" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
