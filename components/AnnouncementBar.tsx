'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, Shield } from 'lucide-react';

export default function AnnouncementBar() {
  const badges = [
    {
      icon: Leaf,
      text: 'Vegan'
    },
    {
      icon: Heart,
      text: 'Cruelty Free'
    },
    {
      icon: Shield,
      text: 'No Harmful Chemicals'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-black py-4 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 text-white"
            >
              <badge.icon className="w-5 h-5 text-white" />
              <span className="text-sm font-medium">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
