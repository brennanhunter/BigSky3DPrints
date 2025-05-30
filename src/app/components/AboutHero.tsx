'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLHeadingElement | null>(null);
  const line2Ref = useRef<HTMLHeadingElement | null>(null);
  const line3Ref = useRef<HTMLHeadingElement | null>(null);
  const blockerRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  
  const [hasStarted, setHasStarted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        y: 100,
        opacity: 0
      });

      // Simple entrance animations - no complex pinning
      const tl = gsap.timeline({ 
        delay: 0.5,
        onStart: () => setHasStarted(true)
      });

      tl
        .to(line1Ref.current, { 
          y: 0,
          opacity: 1, 
          duration: 1.5,
          ease: 'power2.out'
        })
        .to(line2Ref.current, { 
          y: 0,
          opacity: 1, 
          duration: 1.5,
          ease: 'power2.out'
        }, '-=0.8')
        .to(line3Ref.current, { 
          y: 0,
          opacity: 1, 
          duration: 1.5,
          ease: 'power2.out'
        }, '-=0.8');

    });

    return () => ctx.revert();
  }, []);

  const handleScrollStart = () => {
    if (blockerRef.current) {
      gsap.to(blockerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  };

  return (
    <section ref={heroSectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-clay/40 to-mist/30 z-10" />

      {/* Scroll to Begin Blocker */}
      <div
        ref={blockerRef}
        className="absolute inset-0 z-30 flex items-center justify-center bg-ink/60 backdrop-blur-sm cursor-pointer"
        onClick={handleScrollStart}
      >
        <div className="text-center">
          <span className="text-linen text-xl md:text-2xl font-bold animate-pulse block mb-4">
            Scroll to Begin
          </span>
          <div className="w-6 h-10 border-2 border-linen rounded-full mx-auto opacity-75">
            <div className="w-1 h-3 bg-linen rounded-full mx-auto mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div
        ref={containerRef}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <h1 
          ref={line1Ref} 
          className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-8 px-4 text-center bg-gradient-to-r from-ink via-clay to-honeyrose bg-clip-text text-transparent drop-shadow-2xl"
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          BIG SKY 3D PRINTS
        </h1>
        
        <h2 
          ref={line2Ref} 
          className="text-xl sm:text-3xl md:text-6xl lg:text-8xl font-bold mb-8 px-4 text-center bg-gradient-to-r from-skylight via-mist to-linen bg-clip-text text-transparent drop-shadow-2xl"
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          Born beneath Montana&apos;s endless skies
        </h2>
        
        <h3 
          ref={line3Ref} 
          className="text-lg sm:text-2xl md:text-5xl lg:text-7xl font-bold max-w-5xl mx-auto leading-tight px-4 py-4 sm:px-8 sm:py-6 bg-linen/20 backdrop-blur-md rounded-3xl border-2 border-clay/30 bg-gradient-to-r from-honeyrose via-clay to-ink bg-clip-text text-transparent text-center"
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          We turn ideas into reality through 3D printing
        </h3>
      </div>
    </section>
  );
}