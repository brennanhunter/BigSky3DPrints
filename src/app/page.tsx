import Header from './components/header';
import RainCanvas from './components/RainCanvas';
import Hero3D from './components/Hero3D';
import WhatYouCanGet from './components/WhatYouCanGet';
import Footer from './components/Footer';
import TestimonialCarousel from './components/TestimonialCarousel';
import PremadeShop from './components/PremadeShop';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden pt-[220px] bg-gradient-to-b from-skylight to-white text-ink font-sans">
      <RainCanvas />
      <Header />

      {/* Hero Section */}
     <Hero3D />
      {/* What You Can Get Section */}
      <WhatYouCanGet />
      {/* Testimonials Section */}
      <TestimonialCarousel />
      {/*Shop Section */}
      <PremadeShop />
      
      {/* About Section */}
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-linen">
        <div className="max-w-xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-ink">Let’s Print Something Beautiful</h2>
          <p className="mb-8 text-ink">Send us a message and let us know what you’re dreaming up.</p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-clay"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-clay"
            />
            <textarea
              placeholder="Tell us about your idea..."
              rows={5}
              className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-clay"
            ></textarea>
            <button
              type="submit"
              className="bg-clay hover:bg-clay/90 text-white py-3 rounded-md text-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
