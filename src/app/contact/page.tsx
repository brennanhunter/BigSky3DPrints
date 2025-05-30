'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Fireflies Layer Component
const FirefliesLayer = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-40 blur-md animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function ContactPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const mapSectionRef = useRef<HTMLElement | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    budget: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(headerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form section animation
      gsap.fromTo(formSectionRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Map section animation
      gsap.fromTo(mapSectionRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
        budget: ''
      });
    }, 3000);
  };

  const projectTypes = [
    'Custom Design',
    'Prototype Development',
    'Miniatures & Models',
    'Functional Parts',
    'Decorative Items',
    'Educational Models',
    'Replacement Parts',
    'Other'
  ];

  return (
    <main className="text-ink font-sans">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative bg-gradient-to-b from-ink via-clay to-skylight min-h-screen flex items-center justify-center overflow-hidden">
        <FirefliesLayer />
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mountains.jpg"
            alt="Montana Landscape"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-clay/40 to-skylight/50" />
        </div>

        <div ref={headerRef} className="relative z-10 text-center px-4 pt-32">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-linen via-skylight to-white bg-clip-text text-transparent drop-shadow-2xl">
            Let&apos;s Create Together
          </h1>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-honeyrose via-clay to-linen bg-clip-text text-transparent drop-shadow-lg">
            Your vision, our 3D printing expertise
          </h2>
          <p className="text-lg sm:text-xl text-linen/90 max-w-3xl mx-auto leading-relaxed px-4 py-6 bg-linen/10 backdrop-blur-md rounded-3xl border border-clay/30">
            From concept to creation, we&apos;re here to bring your ideas to life. 
            Reach out and let&apos;s discuss your next project under Montana&apos;s big sky.
          </p>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section ref={formSectionRef} className="relative bg-gradient-to-b from-skylight via-linen to-mist py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-ink mb-6">Get In Touch</h3>
                <p className="text-lg text-ink/80 leading-relaxed mb-8">
                  Ready to turn your ideas into reality? Whether you need a custom design, 
                  prototype, or have questions about our 3D printing services, we&apos;re here to help.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-clay/30 shadow-lg">
                  <div className="w-12 h-12 bg-clay rounded-full flex items-center justify-center">
                    <span className="text-linen text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">Email</h4>
                    <p className="text-ink/70">hello@bigsky3dprints.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-clay/30 shadow-lg">
                  <div className="w-12 h-12 bg-clay rounded-full flex items-center justify-center">
                    <span className="text-linen text-xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">Phone</h4>
                    <p className="text-ink/70">(406) 555-PRINT</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-clay/30 shadow-lg">
                  <div className="w-12 h-12 bg-clay rounded-full flex items-center justify-center">
                    <span className="text-linen text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">Location</h4>
                    <p className="text-ink/70">Great Falls, Montana</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-clay/30 shadow-lg">
                  <div className="w-12 h-12 bg-clay rounded-full flex items-center justify-center">
                    <span className="text-linen text-xl">⏰</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">Hours</h4>
                    <p className="text-ink/70">Mon-Fri: 9AM-6PM MST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-clay/20">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h4 className="text-2xl font-bold text-ink mb-6">Start Your Project</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-clay/30 rounded-xl focus:ring-2 focus:ring-clay focus:border-clay transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-clay/30 rounded-xl focus:ring-2 focus:ring-clay focus:border-clay transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-clay/30 rounded-xl focus:ring-2 focus:ring-clay focus:border-clay transition-colors"
                          placeholder="(406) 555-0123"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Project Type</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-clay/30 rounded-xl focus:ring-2 focus:ring-clay focus:border-clay transition-colors"
                        >
                          <option value="">Select a project type</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-clay/30 rounded-xl focus:ring-2 focus:ring-clay focus:border-clay transition-colors"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-50">Under $50</option>
                        <option value="50-200">$50 - $200</option>
                        <option value="200-500">$200 - $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-plus">$1,000+</option>
                        <option value="discuss">Let&apos;s discuss</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Project Details *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-clay/30 rounded-xl focus:ring-2 focus:ring-clay focus:border-clay transition-colors resize-none"
                        placeholder="Tell us about your project. What do you want to create? Any specific requirements, dimensions, or materials? The more details, the better we can help!"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-ink to-clay text-linen py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-linen border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                    <h4 className="text-2xl font-bold text-ink mb-4">Message Sent!</h4>
                    <p className="text-ink/80 mb-4">
                      Thanks for reaching out! We&apos;ll get back to you within 24 hours to discuss your project.
                    </p>
                    <p className="text-sm text-ink/60">
                      This form will reset automatically...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & MAP SECTION */}
      <section ref={mapSectionRef} className="relative bg-gradient-to-b from-mist to-clay py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-ink mb-6">
              Located in the Heart of Montana
            </h3>
            <p className="text-lg text-ink/80 max-w-3xl mx-auto leading-relaxed">
              Based in Great Falls, we serve clients across Montana and beyond. 
              Our location in Big Sky Country inspires everything we create, 
              from the rugged mountain peaks to the flowing prairie grasslands.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <div className="bg-white/90 rounded-3xl p-8 shadow-2xl border border-clay/20">
              <div className="aspect-square bg-gradient-to-br from-skylight to-mist rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-clay/20" />
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-clay rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-linen text-2xl">📍</span>
                  </div>
                  <h4 className="text-xl font-bold text-ink mb-2">Great Falls, Montana</h4>
                  <p className="text-ink/70">Interactive map coming soon</p>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-clay/20">
                <h4 className="text-2xl font-bold text-ink mb-6">Why Montana?</h4>
                <div className="space-y-4 text-ink/80">
                  <p>
                    Montana&apos;s diverse landscapes provide endless inspiration for our designs. 
                    From the jagged peaks of Glacier National Park to the rolling plains of the east, 
                    every creation reflects the natural beauty of Big Sky Country.
                  </p>
                  <p>
                    Our commitment to quality and craftsmanship mirrors the enduring spirit of Montana — 
                    built to last, designed with purpose, and created with care.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-clay/20">
                <h4 className="text-2xl font-bold text-ink mb-6">Remote & Local Service</h4>
                <div className="space-y-4 text-ink/80">
                  <p>
                    <strong>Local clients:</strong> Personal consultations, pickup/delivery available in the Great Falls area.
                  </p>
                  <p>
                    <strong>Remote clients:</strong> Digital consultations and secure shipping nationwide. 
                    We work with clients from coast to coast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}