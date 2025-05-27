import Image from 'next/image';
import Logo from './images/logo.png';
import Header from './components/header';
import RainCanvas from './components/RainCanvas';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden pt-[220px] bg-gradient-to-b from-skylight to-white text-ink font-sans">
      <RainCanvas />
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <Image
          src={Logo}
          alt="Big Sky 3D Prints Logo"
          className="w-52 md:w-64 mb-6 rounded-xl shadow-lg border border-white/50"
        />

        <h1 className="text-ink text-4xl md:text-6xl font-bold mb-4">Bring Your Imagination to Life</h1>
        <p className="text-lg md:text-xl max-w-xl mb-8">
          Custom 3D prints infused with natural elegance and crafted with precision.
        </p>
        <a
          href="#services"
          className="px-6 py-3 bg-clay hover:bg-clay/90 text-white rounded-full text-lg transition"
        >
          Explore Services
        </a>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-linen text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-ink">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="p-6 border border-clay rounded-lg shadow-sm hover:shadow-md transition bg-skylight">
            <h3 className="text-xl font-bold mb-2 text-ink">Home Decor Prints</h3>
            <p>Elegant vases, wall art, and intricate nature-inspired designs for your space.</p>
          </div>
          <div className="p-6 border border-clay rounded-lg shadow-sm hover:shadow-md transition bg-skylight">
            <h3 className="text-xl font-bold mb-2 text-ink">Custom Event Pieces</h3>
            <p>Table numbers, signage, and one-of-a-kind decor for weddings and events.</p>
          </div>
          <div className="p-6 border border-clay rounded-lg shadow-sm hover:shadow-md transition bg-skylight">
            <h3 className="text-xl font-bold mb-2 text-ink">Prototyping Support</h3>
            <p>Need something technical? We’ll help turn your idea into a tangible prototype.</p>
          </div>
        </div>
      </section>

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
      <footer className="text-center py-6 text-sm text-ink">
        &copy; {new Date().getFullYear()} Big Sky 3D Prints. All rights reserved.
      </footer>
    </main>
  );
}
