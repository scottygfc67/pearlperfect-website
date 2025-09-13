'use client';

import { motion } from 'framer-motion';
import { Star, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import HeroSkeleton from '@/components/ui/HeroSkeleton';

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate image loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HeroSkeleton />;
  }


  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      style={{
        backgroundImage: 'url(/heroperson.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/85 to-purple-800/95" />
      
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl gooey-filter"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl gooey-filter"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Whiter teeth in{' '}
            <span className="text-yellow-400">14 days</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Professional-grade whitening strips that deliver results in just 14 minutes per session. 
            Enamel-safe, sensitivity-free, and clinically tested.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center mb-8"
          >
            <Link href="/products/v34-teeth-whitening-strips">
              <motion.button
                className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border-2 border-white/20 hover:border-white/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Start Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-white/80 text-sm sm:text-base"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Enamel Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span>Free Shipping</span>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
