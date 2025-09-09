'use client';

import { motion } from 'framer-motion';
import { Star, Shield, Truck, CreditCard } from 'lucide-react';

export default function Hero() {

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart');
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pp-purple-50 via-white to-pp-purple-100"
      style={{
        backgroundImage: 'url(/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pp-purple-600/80 via-pp-purple-700/70 to-pp-purple-800/80" />
      
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-pp-purple-400/20 rounded-full blur-3xl gooey-filter"
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
          className="absolute bottom-20 left-20 w-80 h-80 bg-pp-purple-600/15 rounded-full blur-3xl gooey-filter"
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold font-heading text-white leading-tight max-w-4xl mx-auto"
            >
              Main character smile in{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">14 minutes</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mt-6"
            >
              PearlPerfect V34 strips lift stains fast — no trays, no sensitivity, just results. 
              <span className="font-bold text-white"> 12,000+ smiles and counting.</span>
            </motion.p>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-white/90 font-medium"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-white" />
                <span>Enamel-safe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-white" />
                <span>14 mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-white" />
                <span>30-day money-back</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-white" />
                <span>Ships fast</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <motion.button
                className="bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                Get My Strips Now
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-pp-ink transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Results
              </motion.button>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
