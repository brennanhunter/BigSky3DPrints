'use client';

import { useRef } from 'react';
import Image from 'next/image';

export default function OurStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const storyTextRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // NO GSAP - completely removed to avoid conflicts

  const timeline = [
    {
      year: "2019",
      title: "The First Print",
      description: "Dane's first 3D printer arrived in a small apartment in Bozeman. What started as weekend tinkering quickly became a passion."
    },
    {
      year: "2020",
      title: "Learning the Craft",
      description: "Hundreds of failed prints later, the first successful custom design emerged. Friends started asking for their own creations."
    },
    {
      year: "2021",
      title: "Montana Inspiration",
      description: "A hiking trip to Glacier National Park sparked the idea to translate Montana's landscapes into functional art."
    },
    {
      year: "2022",
      title: "Going Professional",
      description: "Big Sky 3D Prints officially launched with a focus on custom designs inspired by Montana's natural beauty."
    },
    {
      year: "2023",
      title: "Growing the Workshop",
      description: "Upgraded equipment and expanded capabilities to serve clients from concept to completion."
    },
    {
      year: "2024",
      title: "Building Community",
      description: "Partnering with local artists and businesses to bring unique 3D printed solutions to Big Sky Country."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-skylight via-linen to-mist py-16 px-4 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-clay rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-ink rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-honeyrose rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-clay rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 drop-shadow-lg">
            Our Story
          </h2>
          <p className="text-lg md:text-xl text-ink/80 max-w-3xl mx-auto leading-relaxed">
            Born from curiosity, shaped by Montana&apos;s wilderness, and driven by the belief that great design should serve real people.
          </p>
        </div>

        {/* Main Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div ref={storyTextRef} className="space-y-8">
            <div className="bg-linen/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-l-8 border-clay">
              <h3 className="text-2xl md:text-3xl font-bold text-ink mb-6">From Hobby to Passion</h3>
              <div className="space-y-4 text-ink/80 leading-relaxed">
                <p>
                  It all started with a broken phone case and a YouTube video about 3D printing. 
                  Dane figured he could print a replacement instead of buying one. That simple 
                  problem-solving moment sparked something bigger.
                </p>
                <p>
                  What began as weekend experimenting in a small Bozeman apartment soon consumed 
                  every free hour. Each successful print brought new possibilities, and each failure 
                  taught valuable lessons about materials, design, and patience.
                </p>
                <p>
                  Montana&apos;s landscapes became the ultimate design inspiration. The clean lines of 
                  mountain ridges, the organic curves of river valleys, the intricate patterns of 
                  wildflower meadows — all of it translated into functional art that people could 
                  hold, use, and enjoy in their daily lives.
                </p>
              </div>
            </div>

            <div className="bg-linen/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-l-8 border-honeyrose">
              <h3 className="text-2xl md:text-3xl font-bold text-ink mb-6">The Montana Difference</h3>
              <div className="space-y-4 text-ink/80 leading-relaxed">
                <p>
                  Living under Montana&apos;s big sky changes your perspective on design. There&apos;s 
                  something about the vastness, the raw beauty, and the honest simplicity of this 
                  place that demands authenticity in everything you create.
                </p>
                <p>
                  Every piece we design carries that Montana spirit — built to last, purposeful, 
                  and connected to the natural world. We&apos;re not just making objects; we&apos;re 
                  creating pieces of Big Sky Country that you can take anywhere.
                </p>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="bg-linen/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/mountains.jpg"
                  alt="Montana Workshop Inspiration"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-ink mb-2">Inspired by Nature</h4>
                <p className="text-ink/80">
                  Every Montana landscape tells a story — we translate those stories into designs you can live with.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-black mb-12">
            The Journey So Far
          </h3>
          
          <div ref={timelineRef} className="space-y-6">
            {timeline.map((item, index) => (
              <div 
                key={item.year}
                className="timeline-item bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-clay hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-honeyrose"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Year */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-clay to-honeyrose rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-ink mb-2 hover:text-clay transition-colors duration-300">{item.title}</h4>
                    <p className="text-ink/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center mt-12">
          <div className="bg-linen/95 backdrop-blur-sm rounded-3xl p-8 border border-clay/30 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-ink mb-4">
              The Story Continues
            </h3>
            <p className="text-base text-ink/80 max-w-2xl mx-auto leading-relaxed">
              Every new project adds another chapter to our story. Whether you&apos;re looking for 
              a custom solution, a unique gift, or help bringing an idea to life, you become 
              part of the Big Sky 3D Prints journey. Let&apos;s create something amazing together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}