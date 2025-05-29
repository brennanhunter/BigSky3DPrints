import RainCanvas from './components/RainCanvas';
import Hero3D from './components/Hero3D';
import WhatYouCanGet from './components/WhatYouCanGet';
import TestimonialCarousel from './components/TestimonialCarousel';
import PremadeShop from './components/PremadeShop';
import CTA from './components/CTA';
import SoilLayer from './components/SoilLayer';

export default function HomePage() {
  return (
    <>
      <main className="overflow-x-hidden pt-[220px] bg-gradient-to-b from-skylight to-white text-ink font-sans">
        <RainCanvas />
        <Hero3D />
        <WhatYouCanGet />
        <TestimonialCarousel />
        <PremadeShop />
        <CTA />
        <SoilLayer />
      </main>
    </>
  );
}
