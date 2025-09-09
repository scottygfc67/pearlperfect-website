'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Truck, CreditCard, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const [quantity, setQuantity] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { quantity, isSubscribed });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pp-purple-50 via-white to-pp-purple-100">
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 bg-clip-text text-transparent font-bold text-lg tracking-wide"
            >
              ✨ Dentist‑grade. At‑home. ✨
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold font-heading text-pp-ink leading-tight"
            >
              Whiter teeth in{' '}
              <span className="bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 bg-clip-text text-transparent">14 minutes</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-pp-ink-soft leading-relaxed"
            >
              PearlPerfect V34 strips lift stains fast—{' '}
              <span className="font-bold text-pp-purple-600">enamel‑safe</span> with zero sensitivity. 
              <span className="text-pp-purple-600 font-semibold"> It's giving main character energy! 💜✨</span>
            </motion.p>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-pp-warning text-pp-warning" />
                ))}
              </div>
              <span className="text-pp-ink-soft font-medium">
                4.9/5 from <span className="font-semibold text-pp-ink">12,842</span>+ smiles
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                🚀 Get My Glow-Up
              </motion.button>
              <motion.button
                className="border-2 border-pp-purple-600 text-pp-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pp-purple-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ See the Magic
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 text-sm text-pp-ink-soft"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>30‑day money‑back</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Free shipping over $35</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Secure checkout</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Product Image */}
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="/hero.png"
                alt="PearlPerfect V34 Teeth Whitening Strips - Product showcase"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              
              {/* Overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Floating Strip Animation */}
            <motion.div
              className="absolute top-10 right-10 w-16 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-12 h-4 bg-pp-purple-400 rounded-full"></div>
            </motion.div>

            {/* Background Blobs for Visual Interest */}
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 bg-pp-purple-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-pp-purple-600/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
