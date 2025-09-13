'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function PageLoader({ isLoading, children, className = '' }: PageLoaderProps) {
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isLoading]);

  return (
    <div className={`relative ${className}`}>
      {/* Loading Overlay */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? 'auto' : 'none'
        }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      >
        <div className="text-center">
          {/* Logo Animation */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-white">P</span>
          </motion.div>
          
          {/* Loading Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            PearlPerfect
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            Loading your perfect smile...
          </motion.p>
          
          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-purple-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
        className={isLoading ? 'pointer-events-none' : ''}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Skeleton loader for specific page sections
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="h-20 bg-gray-100 animate-pulse" />
      
      {/* Hero Skeleton */}
      <div className="h-96 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
