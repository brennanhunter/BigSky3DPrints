'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '../Images/logo.png';

export default function Header() {
  const [angle, setAngle] = useState(0);

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
    <header className="sticky top-0 z-50 w-full h-[220px] overflow-visible bg-transparent">
      {/* Raised & Swaying Clouds */}
      <div
        className="absolute top-[-200px] left-[-120px] scale-[1.6] opacity-90"
        style={{ transform: `translateX(${Math.sin(angle) * 0.8}px)` }}
      >
        <Image src="/cloud-3d.png" alt="Cloud Left" width={400} height={200} />
      </div>
      <div
        className="absolute top-[-220px] left-[10%] scale-x-[-1] scale-[1.9] opacity-85"
        style={{ transform: `translateX(${Math.sin(angle + 1) * 0.6}px)` }}
      >
        <Image src="/cloud-3d.png" alt="Cloud Inner Left" width={430} height={220} />
      </div>
      <div
        className="absolute top-[-215px] left-[50%] -translate-x-1/2 scale-[2] opacity-95"
        style={{ transform: `translateX(${Math.sin(angle + 2) * 0.5}px)` }}
      >
        <Image src="/cloud-3d.png" alt="Cloud Center" width={500} height={250} />
      </div>
      <div
        className="absolute top-[-220px] right-[10%] scale-[1.85] opacity-80"
        style={{ transform: `translateX(${Math.sin(angle + 3) * 0.6}px)` }}
      >
        <Image src="/cloud-3d.png" alt="Cloud Inner Right" width={430} height={220} />
      </div>
      <div
        className="absolute top-[-200px] right-[-120px] scale-[1.7] opacity-90"
        style={{ transform: `translateX(${Math.sin(angle + 4) * 0.8}px)` }}
      >
        <Image src="/cloud-3d.png" alt="Cloud Right" width={400} height={200} />
      </div>

      {/* Foreground Content: Enlarged & Shifted Logo */}
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
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
