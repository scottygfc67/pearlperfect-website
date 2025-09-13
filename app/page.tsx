'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import SocialProof from '@/components/SocialProof';
import HowItWorks from '@/components/HowItWorks';
import FindYourFutureShade from '@/components/FindYourFutureShade';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyATC from '@/components/StickyATC';
import PageLoader from '@/components/ui/PageLoader';
import GlobalLoader from '@/components/ui/GlobalLoader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GlobalLoader>
      <PageLoader isLoading={isLoading}>
        <div className="min-h-screen">
          <Navbar />
          <Hero />
          <ProductShowcase />
          <SocialProof />
          <HowItWorks />
          <FindYourFutureShade />
          <FAQ />
          <FinalCTA />
          <Footer />
          <StickyATC />
        </div>
      </PageLoader>
    </GlobalLoader>
  );
}
