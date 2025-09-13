'use client';

import { motion } from 'framer-motion';

export default function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline Skeleton */}
          <div className="space-y-4">
            <div className="w-96 h-16 bg-gray-200 rounded-lg mx-auto animate-pulse" />
            <div className="w-80 h-6 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          
          {/* CTA Button Skeleton */}
          <div className="flex justify-center space-x-4">
            <div className="w-32 h-12 bg-purple-200 rounded-full animate-pulse" />
            <div className="w-24 h-12 bg-gray-200 rounded-full animate-pulse" />
          </div>
          
          {/* Trust Badges Skeleton */}
          <div className="flex justify-center space-x-8 pt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
