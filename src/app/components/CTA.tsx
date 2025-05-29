'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-skylight text-ink px-6 text-center py-24 flex flex-col items-center">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Imagine it. We’ll print it.
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Got a wild idea? A personal project? A dream prototype? Tell us what you’re thinking — we’ll help bring it to life.
        </p>
        <Link href="/custom-request" passHref>
          <button className="bg-ink text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-ink/90 transition-all">
            Start Your Custom Build
          </button>
        </Link>
      </div>
    </section>
  );
}
