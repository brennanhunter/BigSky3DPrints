'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurProcess() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Consultation",
      subtitle: "Understanding Your Vision",
      description: "We start with a conversation. Whether you have detailed plans or just a rough idea, we'll discuss your goals, requirements, timeline, and budget. This helps us understand exactly what you're looking to create.",
      details: [
        "Free initial consultation (phone, email, or in-person)",
        "Project scope and requirements gathering",
        "Timeline and budget discussion",
        "Technical feasibility assessment"
      ],
      icon: "💡",
      color: "clay"
    },
    {
      number: "02", 
      title: "Design & Prototyping",
      subtitle: "Bringing Ideas to Life",
      description: "Our design phase transforms your concept into a 3D model. We create detailed digital prototypes, allowing you to visualize and refine the design before any printing begins.",
      details: [
        "3D modeling and design development",
        "Digital mockups and renderings",
        "Design revisions based on your feedback",
        "Technical optimization for 3D printing"
      ],
      icon: "🎨",
      color: "honeyrose"
    },
    {
      number: "03",
      title: "Material Selection",
      subtitle: "Choosing the Right Foundation", 
      description: "Different projects need different materials. We'll guide you through options based on your specific needs - whether that's durability, flexibility, color, or special properties.",
      details: [
        "Material recommendations based on use case",
        "Color and finish options",
        "Strength and durability considerations", 
        "Cost and timeline implications"
      ],
      icon: "🧱",
      color: "ink"
    },
    {
      number: "04",
      title: "Printing & Production",
      subtitle: "Precision Manufacturing",
      description: "This is where the magic happens. Using professional-grade 3D printers and carefully calibrated settings, we bring your design into the physical world with precision and care.",
      details: [
        "Professional FDM and resin printing",
        "Quality monitoring throughout production",
        "Multiple size and complexity capabilities",
        "Regular progress updates"
      ],
      icon: "🖨️",
      color: "skylight"
    },
    {
      number: "05",
      title: "Finishing & Quality Control",
      subtitle: "Perfecting Every Detail",
      description: "Every print gets individual attention. We carefully remove support material, sand surfaces smooth, and apply any requested finishes. Each piece is inspected to ensure it meets our quality standards.",
      details: [
        "Support removal and surface preparation",
        "Sanding, polishing, and finishing",
        "Quality inspection and testing",
        "Packaging for safe delivery"
      ],
      icon: "✨",
      color: "mist"
    },
    {
      number: "06",
      title: "Delivery & Support", 
      subtitle: "Getting It Into Your Hands",
      description: "We offer flexible delivery options and don't just disappear after handoff. If you need adjustments, have questions, or want to create something new, we're here to help.",
      details: [
        "Local pickup or secure shipping",
        "Installation guidance if needed",
        "30-day satisfaction guarantee",
        "Ongoing support and future modifications"
      ],
      icon: "📦",
      color: "clay"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple entrance animation for header (no ScrollTrigger)
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power2.out',
          delay: 0.2 // Start shortly after component mounts
        }
      );

      // Simple staggered entrance animation for step cards (no ScrollTrigger)
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      if (stepCards) {
        gsap.fromTo(stepCards,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.15,
            ease: 'power2.out',
            delay: 0.5 // Start after header animation
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      clay: 'border-clay bg-clay/10 text-clay',
      honeyrose: 'border-honeyrose bg-honeyrose/10 text-honeyrose', 
      ink: 'border-ink bg-ink/10 text-ink',
      skylight: 'border-skylight bg-skylight/20 text-skylight',
      mist: 'border-mist bg-mist/20 text-mist'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.clay;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-mist via-white to-skylight py-16 px-4"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-10 w-40 h-40 border-2 border-clay rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-32 h-32 border-2 border-honeyrose rounded-full animate-bounce" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-ink rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
            Our Process
          </h2>
          <p className="text-lg md:text-xl text-ink/80 max-w-3xl mx-auto leading-relaxed">
            From your first idea to the finished product in your hands, here&apos;s exactly how we work together to create something amazing.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="space-y-8">
          {processSteps.map((step, index) => (
            <div 
              key={step.number}
              className={`step-card relative ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex gap-8 items-center group hover:scale-[1.02] transition-all duration-500`}
            >
              {/* Step Number & Icon */}
              <div className="flex-shrink-0 relative">
                <div className="w-32 h-32 bg-white rounded-full shadow-2xl border-4 border-clay/20 flex flex-col items-center justify-center group-hover:shadow-3xl group-hover:scale-110 transition-all duration-300 group-hover:border-honeyrose/40">
                  <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                  <div className="text-lg font-bold text-ink group-hover:text-clay transition-colors duration-300">{step.number}</div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-clay/50 to-transparent"></div>
                )}
              </div>

              {/* Content Card */}
              <div className={`flex-1 bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-l-8 ${
                getColorClasses(step.color).split(' ')[0]
              } max-w-2xl group-hover:shadow-2xl group-hover:bg-white transition-all duration-300`}>
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-ink mb-2 group-hover:text-clay transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className={`text-lg font-semibold ${
                    getColorClasses(step.color).split(' ')[2]
                  } mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    {step.subtitle}
                  </p>
                  <p className="text-ink/80 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Details List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-ink mb-3">What&apos;s Included:</h4>
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        getColorClasses(step.color).split(' ')[1]
                      }`}></div>
                      <p className="text-ink/70 text-sm leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-ink/5 via-clay/10 to-honeyrose/5 backdrop-blur-sm rounded-3xl p-8 border border-clay/20">
            <h3 className="text-2xl font-bold text-ink mb-4">
              Typical Timeline: 1-3 Weeks
            </h3>
            <p className="text-ink/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Most projects move from concept to completion in 1-3 weeks, depending on complexity and current workload. 
              Rush jobs and simple designs can often be completed faster.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-clay/30 text-clay px-4 py-2 rounded-full font-semibold">Simple designs: 3-7 days</span>
              <span className="bg-white/90 text-ink border-2 border-honeyrose px-4 py-2 rounded-full font-semibold">Custom projects: 1-2 weeks</span>
              <span className="bg-ink/90 text-linen px-4 py-2 rounded-full font-semibold">Complex designs: 2-3 weeks</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-clay/30">
            <h3 className="text-xl font-bold text-ink mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-ink/80 mb-6">
              The best way to understand our process is to experience it. Let&apos;s talk about your idea.
            </p>
            <button className="bg-gradient-to-r from-ink to-clay text-linen px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get Your Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}