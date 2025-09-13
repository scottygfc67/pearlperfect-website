'use client';

import { motion } from 'framer-motion';

export default function NavbarSkeleton() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
          
          {/* Navigation Links Skeleton */}
          <div className="hidden md:flex items-center space-x-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          
          {/* CTA Button Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-24 h-10 bg-purple-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
