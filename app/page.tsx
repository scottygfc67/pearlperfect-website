import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import SocialProof from '@/components/SocialProof';
import HowItWorks from '@/components/HowItWorks';
import ShadeFinder from '@/components/ShadeFinder';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import Comparison from '@/components/Comparison';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyATC from '@/components/StickyATC';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <SocialProof />
      <HowItWorks />
      <ShadeFinder />
      <BeforeAfterSlider />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyATC />
    </div>
  );
}
