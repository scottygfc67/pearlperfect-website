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
import Link from 'next/link';

export default function Home() {
  return (
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
      
      {/* Test Product Links */}
      <div className="fixed bottom-4 left-4 z-50 space-y-2">
        <Link 
          href="/products/v34-teeth-whitening-strips"
          className="block bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          V34 Product (Legacy API)
        </Link>
        <Link 
          href="/product/legacy"
          className="block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Legacy Product Test
        </Link>
      </div>
    </div>
  );
}
