'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        description: "Jagged peaks piercing endless skies, where ancient glaciers carved dramatic silhouettes against Montana's horizon."
      },
      creation: {
        image: "/images/mountainlamp.png",
        title: "Peak Series Lighting",
        description: "Angular lamp designs inspired by mountain silhouettes, casting dramatic shadows that echo Montana's rugged beauty in your living space."
      }
    },
    {
      landscape: {
        image: "/images/prairie.jpeg",
        title: "Eastern Montana Grasslands",
        description: "Endless waves of prairie grass flowing like an ocean under Montana's vast sky, creating gentle, minimalist horizons."
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
        description: "The Missouri's serpentine path through Montana, carving graceful curves through valleys and creating natural art."
      },
      creation: {
        image: "/images/riverabstract.png",
        title: "River Current Series",
        description: "Organic sculptures that mirror the fluid motion of Montana's rivers, capturing the essence of water's eternal dance."
      }
    },
    {
      landscape: {
        image: "/images/wildflowers.jpg",
        title: "Spring Blooms",
        description: "Vibrant wildflower carpets painting Montana's meadows in brilliant colors each spring, nature's own masterpiece."
      },
      creation: {
        image: "/images/wildflowerplanters.png",
        title: "Bloom Collection",
        description: "Textured planters inspired by wildflower patterns, bringing Montana's natural garden aesthetic to your home."
      }
    }
  ];

  useLayoutEffect(() => {
    // Clear all existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const ctx = gsap.context(() => {
      // HERO SECTION ANIMATION (your working code)
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        x: '-100%',
        opacity: 0
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=1200vh', // Much longer to match the extended timeline
          scrub: 8, // Slower scrubbing for the longer distance
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // More detailed logging
            console.log(`HERO: Progress: ${Math.round(self.progress * 100)}%, ScrollY: ${window.scrollY}`);
            
            if (self.progress > 0.02 && blockerRef.current) {
              gsap.to(blockerRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3
              });
            }
          },
          onEnter: () => console.log('HERO: Entered'),
          onLeave: () => console.log('HERO: Left'),
          onEnterBack: () => console.log('HERO: Entered back'),
          onLeaveBack: () => console.log('HERO: Left back')
        },
      });

      heroTl
        .to(line1Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4, // Much longer to fill the scroll space
          ease: 'power2.out'
        })
        .to(line1Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4 // Much longer hold
        })
        .to(line1Ref.current, { 
          x: '100%', 
          opacity: 0, 
          duration: 4, // Much longer exit
          ease: 'power2.in'
        })
        .to(line2Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4, // Much longer
          ease: 'power2.out'
        }, '<1') // Larger overlap
        .to(line2Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4 // Much longer hold
        })
        .to(line2Ref.current, { 
          x: '100%', 
          opacity: 0, 
          duration: 4, // Much longer exit
          ease: 'power2.in'
        })
        .to(line3Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 4, // Much longer
          ease: 'power2.out'
        }, '<1') // Larger overlap
        .to(line3Ref.current, { 
          x: '0%', 
          opacity: 1, 
          duration: 8 // Extra long final hold to fill remaining scroll space
        });

      // MONTANA INSPIRATION SECTION - EXTREMELY slow transitions for testing
      gsap.set([landscapeCardRef.current, creationCardRef.current], {
        y: 100,
        opacity: 0
      });

      gsap.set(pairIndicatorsRef.current, {
        opacity: 0
      });

      // Separate ScrollTrigger for inspiration section
      ScrollTrigger.create({
        trigger: inspirationSectionRef.current,
        start: "top top",
        end: `+=${inspirationPairs.length * 400}vh`, // EXTREME: 4 full screens per pair!
        scrub: 5, // VERY slow scrubbing
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalPairs = inspirationPairs.length;
          
          // Calculate which pair should be shown based on progress
          const pairProgress = progress * totalPairs;
          const newPairIndex = Math.min(Math.floor(pairProgress), totalPairs - 1);
          
          // Update the pair index - this will work for both up and down scrolling
          setCurrentPair(newPairIndex);
          
          // Animate cards into view
          gsap.to([landscapeCardRef.current, creationCardRef.current], {
            y: 0,
            opacity: 1,
            duration: 0.6
          });
          
          // Show indicators when section is active
          gsap.to(pairIndicatorsRef.current, {
            opacity: 1,
            duration: 0.6
          });
          
          // Debug logging to see if it's working
          console.log(`Progress: ${Math.round(progress * 100)}%, Pair: ${newPairIndex}`);
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
    <main className="text-white font-sans">
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
        <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply z-10" />

        <div
          ref={blockerRef}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="text-center">
            <span className="text-white text-xl md:text-2xl font-bold animate-pulse block mb-4">
              Scroll to Begin
            </span>
            <div className="w-6 h-10 border-2 border-white rounded-full mx-auto opacity-75">
              <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <h1 
            ref={line1Ref} 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 whitespace-nowrap"
          >
            Big Sky 3D Prints
          </h1>
          <h2 
            ref={line2Ref} 
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 whitespace-nowrap"
          >
            Born beneath Montana's endless skies
          </h2>
          <h3 
            ref={line3Ref} 
            className="text-2xl md:text-4xl lg:text-5xl font-medium max-w-4xl mx-auto leading-tight"
          >
            We turn ideas into reality through 3D printing
          </h3>
        </div>
      </section>

      {/* MONTANA INSPIRATION SECTION */}
      <section 
        ref={inspirationSectionRef}
        className="relative bg-gradient-to-b from-slate-900 to-slate-800 h-screen"
      >
        {/* Section Header */}
        <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 drop-shadow-lg">
            Montana Inspiration
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
            Where Big Sky Country meets bold design — every landscape tells a story, every print captures that story
          </p>
        </div>

        {/* Split Content */}
        <div className="flex w-full h-full">
          {/* Landscape Side */}
          <div className="w-1/2 h-full relative flex items-center justify-center bg-gradient-to-br from-emerald-800/30 to-emerald-900/30">
            <div 
              ref={landscapeCardRef}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 m-8 max-w-lg shadow-2xl border-l-8 border-emerald-600"
            >
              <div className="w-full h-64 rounded-2xl mb-5 shadow-lg overflow-hidden">
                <Image
                  src={currentPairData.landscape.image}
                  alt={currentPairData.landscape.title}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {currentPairData.landscape.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-5">
                {currentPairData.landscape.description}
              </p>
              <div className="text-4xl text-orange-500 animate-pulse">→</div>
            </div>
          </div>

          {/* Creation Side */}
          <div className="w-1/2 h-full relative flex items-center justify-center bg-gradient-to-bl from-orange-800/30 to-orange-900/30">
            <div 
              ref={creationCardRef}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 m-8 max-w-lg shadow-2xl border-l-8 border-orange-500"
            >
              <div className="w-full h-64 rounded-2xl mb-5 shadow-lg overflow-hidden">
                <Image
                  src={currentPairData.creation.image}
                  alt={currentPairData.creation.title}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {currentPairData.creation.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {currentPairData.creation.description}
              </p>
            </div>
          </div>
        </div>

        {/* Pair Indicators */}
        <div 
          ref={pairIndicatorsRef}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4 flex-wrap justify-center max-w-4xl"
        >
          {['Mountains → Lamps', 'Plains → Vases', 'Rivers → Sculptures', 'Wildflowers → Planters'].map((label, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full text-sm backdrop-blur-sm border transition-all duration-500 ${
                index === currentPair 
                  ? 'bg-orange-500 text-white scale-110 shadow-lg border-orange-400' 
                  : 'bg-white/20 text-white hover:bg-white/30 border-white/30'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* MEET DANE SECTION */}
      <section className="relative bg-clay text-ink py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div
            ref={imageRef}
            className="rounded-full overflow-hidden w-64 h-64 shadow-xl border border-white/50"
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
            <h2 className="text-3xl font-bold mb-4">Meet Dane Patch</h2>
            <p className="text-lg mb-4">
              Dane's been building things since he could walk. With a love for the outdoors and a knack for design,
              he founded Big Sky 3D Prints to bring handcrafted creativity into the digital age.
            </p>
            <p className="italic">"I just like making cool stuff people actually use."</p>
          </div>
        </div>
      </section>
    </main>
  );
}