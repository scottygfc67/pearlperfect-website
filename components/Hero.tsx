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
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      style={{
        backgroundImage: 'url(/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-purple-700/50 to-purple-800/60" />
      
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

    </section>
  );
}
