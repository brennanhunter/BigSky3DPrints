'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OurStory from '../components/OurStory';
import OurProcess from '../components/OurProcess';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLHeadingElement | null>(null);
  const line2Ref = useRef<HTMLHeadingElement | null>(null);
  const line3Ref = useRef<HTMLHeadingElement | null>(null);
  const blockerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  
  // Montana Inspiration refs
  const inspirationSectionRef = useRef<HTMLElement | null>(null);
  const landscapeCardRef = useRef<HTMLDivElement | null>(null);
  const creationCardRef = useRef<HTMLDivElement | null>(null);
  const pairIndicatorsRef = useRef<HTMLDivElement | null>(null);

  const [currentPair, setCurrentPair] = useState(0);

  // Updated with your actual image paths
  const inspirationPairs = [
    {
      landscape: {
        image: "/images/mountains.jpg",
        title: "Glacier National Park",
        description: "Jagged peaks piercing endless skies, where ancient glaciers carved dramatic silhouettes against Montana&apos;s horizon."
      },
      creation: {
        image: "/images/mountainlamp.png",
        title: "Peak Series Lighting",
        description: "Angular lamp designs inspired by mountain silhouettes, casting dramatic shadows that echo Montana&apos;s rugged beauty in your living space."
      }
    },
    {
      landscape: {
        image: "/images/prairie.jpeg",
        title: "Eastern Montana Grasslands",
        description: "Endless waves of prairie grass flowing like an ocean under Montana&apos;s vast sky, creating gentle, minimalist horizons."
      },
      creation: {
        image: "/images/wavevase.png",
        title: "Prairie Flow Collection",
        description: "Clean, flowing vases that capture the gentle undulation of Montana grasslands, bringing serene prairie aesthetics indoors."
      }
    },
    {
      landscape: {
        image: "/images/river.jpg",
        title: "Missouri River Bends",
        description: "The Missouri&apos;s serpentine path through Montana, carving graceful curves through valleys and creating natural art."
      },
      creation: {
        image: "/images/riverabstract.png",
        title: "River Current Series",
        description: "Organic sculptures that mirror the fluid motion of Montana&apos;s rivers, capturing the essence of water&apos;s eternal dance."
      }
    },
    {
      landscape: {
        image: "/images/wildflowers.jpg",
        title: "Spring Blooms",
        description: "Vibrant wildflower carpets painting Montana&apos;s meadows in brilliant colors each spring, nature&apos;s own masterpiece."
      },
      creation: {
        image: "/images/wildflowerplanters.png",
        title: "Bloom Collection",
        description: "Textured planters inspired by wildflower patterns, bringing Montana&apos;s natural garden aesthetic to your home."
      }
    }
  ];

  useLayoutEffect(() => {
    // Clear all existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const ctx = gsap.context(() => {
      // HERO SECTION ANIMATION
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        x: '-100%',
        opacity: 0
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=1200vh',
          scrub: 8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.02 && blockerRef.current) {
              gsap.to(blockerRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3
              });
            }
          }
        },
      });

      heroTl
        .to(line1Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4,
          ease: 'power2.out'
        })
        .to(line1Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4
        })
        .to(line1Ref.current, { 
          x: '100%', 
          opacity: 0, 
          duration: 4,
          ease: 'power2.in'
        })
        .to(line2Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4,
          ease: 'power2.out'
        }, '<1')
        .to(line2Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4
        })
        .to(line2Ref.current, { 
          x: '100%', 
          opacity: 0, 
          duration: 4,
          ease: 'power2.in'
        })
        .to(line3Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4,
          ease: 'power2.out'
        }, '<1')
        .to(line3Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 8
        });

      // MONTANA INSPIRATION SECTION
      gsap.set([landscapeCardRef.current, creationCardRef.current], {
        y: 100,
        opacity: 0
      });

      gsap.set(pairIndicatorsRef.current, {
        opacity: 0
      });

      ScrollTrigger.create({
        trigger: inspirationSectionRef.current,
        start: "top top",
        end: `+=${inspirationPairs.length * 400}vh`,
        scrub: 5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalPairs = inspirationPairs.length;
          
          const pairProgress = progress * totalPairs;
          const newPairIndex = Math.min(Math.floor(pairProgress), totalPairs - 1);
          
          setCurrentPair(newPairIndex);
          
          gsap.to([landscapeCardRef.current, creationCardRef.current], {
            y: 0,
            opacity: 1,
            duration: 0.6
          });
          
          gsap.to(pairIndicatorsRef.current, {
            opacity: 1,
            duration: 0.6
          });
        }
      });

      // MEET DANE SECTION
      gsap.fromTo(imageRef.current, 
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
        }
      );

      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const currentPairData = inspirationPairs[currentPair];

  return (
    <main className="text-ink font-sans">
      {/* HERO SECTION */}
      <section ref={heroSectionRef} className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-clay/40 to-mist/30 z-10" />

        <div
          ref={blockerRef}
          className="absolute inset-0 z-30 flex items-center justify-center bg-ink/60 backdrop-blur-sm"
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

      {/* MONTANA INSPIRATION SECTION */}
      <div className="relative">
        {/* Mobile Header - Outside pinned container */}
        <div className="md:hidden bg-gradient-to-b from-mist via-linen to-skylight py-16 px-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3 drop-shadow-lg">
              Montana Inspiration
            </h2>
            <p className="text-sm sm:text-base text-ink/80 max-w-2xl mx-auto px-2">
              Where Big Sky Country meets bold design — every landscape tells a story, every print captures that story
            </p>
          </div>
        </div>

        {/* Pinned Inspiration Container */}
        <section 
          ref={inspirationSectionRef}
          className="relative h-screen bg-gradient-to-b from-mist via-linen to-skylight"
        >
          {/* Desktop Header - Inside pinned container */}
          <div className="hidden md:block absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center z-10 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-ink mb-5 drop-shadow-lg">
              Montana Inspiration
            </h2>
            <p className="text-lg md:text-xl text-ink/80 max-w-2xl mx-auto px-4">
              Where Big Sky Country meets bold design — every landscape tells a story, every print captures that story
            </p>
          </div>

          {/* Content - Mobile Column, Desktop Side-by-Side */}
          <div className="flex flex-col md:flex-row w-full h-full md:pt-0">
            {/* Landscape Side */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center bg-gradient-to-br from-mist/40 to-skylight/30 py-4 md:py-0">
              <div 
                ref={landscapeCardRef}
                className="bg-linen/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 mx-4 md:m-8 max-w-lg shadow-2xl border-l-8 border-mist w-full md:w-auto"
              >
                <div className="w-full h-48 sm:h-56 md:h-64 rounded-2xl mb-4 md:mb-5 shadow-lg overflow-hidden">
                  <Image
                    src={currentPairData.landscape.image}
                    alt={currentPairData.landscape.title}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3 md:mb-4">
                  {currentPairData.landscape.title}
                </h3>
                <p className="text-sm sm:text-base text-ink/80 leading-relaxed mb-4 md:mb-5">
                  {currentPairData.landscape.description}
                </p>
                <div className="text-3xl md:text-4xl text-clay animate-pulse text-center md:text-left">→</div>
              </div>
            </div>

            {/* Creation Side */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center bg-gradient-to-bl from-honeyrose/30 to-clay/40 py-4 md:py-0">
              <div 
                ref={creationCardRef}
                className="bg-linen/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 mx-4 md:m-8 max-w-lg shadow-2xl border-l-8 border-honeyrose w-full md:w-auto"
              >
                <div className="w-full h-48 sm:h-56 md:h-64 rounded-2xl mb-4 md:mb-5 shadow-lg overflow-hidden">
                  <Image
                    src={currentPairData.creation.image}
                    alt={currentPairData.creation.title}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-3 md:mb-4">
                  {currentPairData.creation.title}
                </h3>
                <p className="text-sm sm:text-base text-ink/80 leading-relaxed">
                  {currentPairData.creation.description}
                </p>
              </div>
            </div>
          </div>

          {/* Pair Indicators - Hidden on Mobile */}
          <div 
            ref={pairIndicatorsRef}
            className="hidden md:flex absolute bottom-2 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex-wrap gap-2 sm:gap-4 justify-center max-w-4xl px-4"
          >
            {['Mountains → Lamps', 'Plains → Vases', 'Rivers → Sculptures', 'Wildflowers → Planters'].map((label, index) => (
              <div
                key={index}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm border transition-all duration-500 ${
                  index === currentPair 
                    ? 'bg-clay text-linen scale-110 shadow-lg border-honeyrose' 
                    : 'bg-linen/80 text-ink hover:scale-105 border-clay/50'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MEET DANE SECTION */}
      <section className="relative bg-gradient-to-b from-linen to-clay py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div
            ref={imageRef}
            className="rounded-full overflow-hidden w-64 h-64 shadow-xl border-4 border-mist"
          >
            <Image
              src="/images/dane-patch.png"
              alt="Dane Patch"
              width={256}
              height={256}
              className="object-cover w-full h-full"
            />
          </div>
          <div ref={textRef} className="text-left">
            <h2 className="text-3xl font-bold mb-4 text-ink">Meet Dane Patch</h2>
            <p className="text-lg mb-4 text-ink/90">
              Dane&apos;s been building things since he could walk. With a love for the outdoors and a knack for design,
              he founded Big Sky 3D Prints to bring handcrafted creativity into the digital age.
            </p>
            <p className="italic text-clay text-xl">&quot;I just like making cool stuff people actually use.&quot;</p>
          </div>
        </div>
        
        
      </section>
      <OurStory />
      <OurProcess />
    </main>
  );
}