'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  height?: string;
}

export default function SkeletonLoader({ 
  className = '', 
  lines = 1, 
  height = 'h-4' 
}: SkeletonLoaderProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={`${height} bg-gray-200 rounded animate-pulse`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="space-y-4">
        <SkeletonLoader className="h-48 w-full rounded-xl" lines={1} height="h-48" />
        <SkeletonLoader className="h-6 w-3/4" lines={1} height="h-6" />
        <SkeletonLoader className="h-4 w-1/2" lines={1} height="h-4" />
        <div className="flex space-x-2">
          <SkeletonLoader className="h-8 w-20" lines={1} height="h-8" />
          <SkeletonLoader className="h-8 w-20" lines={1} height="h-8" />
        </div>
        <SkeletonLoader className="h-12 w-full" lines={1} height="h-12" />
      </div>
    </div>
  );
}

export function PriceSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <SkeletonLoader className="h-8 w-20" lines={1} height="h-8" />
      <SkeletonLoader className="h-6 w-16" lines={1} height="h-6" />
    </div>
  );
}
