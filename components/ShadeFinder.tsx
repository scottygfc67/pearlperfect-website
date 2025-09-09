'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ShadeFinder() {
  const [currentShade, setCurrentShade] = useState(3);

  const shadeScale = [
    { value: 1, label: 'A1', color: '#F7F7F7', description: 'Whitest' },
    { value: 2, label: 'A2', color: '#F0F0F0', description: 'Very Light' },
    { value: 3, label: 'A3', color: '#E8E8E8', description: 'Light' },
    { value: 4, label: 'A3.5', color: '#E0E0E0', description: 'Light-Medium' },
    { value: 5, label: 'A4', color: '#D8D8D8', description: 'Medium' },
    { value: 6, label: 'B1', color: '#D0D0D0', description: 'Medium-Dark' },
    { value: 7, label: 'B2', color: '#C8C8C8', description: 'Dark' },
    { value: 8, label: 'B3', color: '#C0C0C0', description: 'Very Dark' },
    { value: 9, label: 'B4', color: '#B8B8B8', description: 'Darkest' },
  ];

  const projectedShade = Math.max(1, currentShade - 7); // Project 7 shades lighter

  return (
    <section className="py-24 bg-gradient-to-br from-pp-purple-600 via-pp-purple-700 to-pp-purple-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Interactive Tool</span>
          </div>
           <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
             Find Your Future Shade
           </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Select your current tooth shade to see your projected results after using PearlPerfect V34 strips
          </p>
        </motion.div>

        {/* Main Shade Finder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
        >
          {/* Horizontal Shade Scale */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-pp-ink text-center mb-8">
              Choose Your Current Shade
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {shadeScale.map((shade) => (
                <motion.button
                  key={shade.value}
                  onClick={() => setCurrentShade(shade.value)}
                  className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    currentShade === shade.value
                      ? 'border-pp-purple-600 bg-pp-purple-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-pp-purple-300 hover:scale-102'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shade Circle */}
                  <div
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg mx-auto mb-3"
                    style={{ backgroundColor: shade.color }}
                  />
                  
                  {/* Label */}
                  <div className="text-center">
                    <div className="font-bold text-pp-ink text-lg">
                      {shade.label}
                    </div>
                    <div className="text-sm text-pp-ink-soft">
                      {shade.description}
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {currentShade === shade.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-pp-purple-600 rounded-full flex items-center justify-center"
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Results Comparison */}
          <div className="bg-gradient-to-r from-pp-purple-50 to-pp-purple-100 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-pp-ink text-center mb-8">
              Your Projected Results
            </h4>
            
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Current Shade */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <div
                    className="w-24 h-24 rounded-full border-4 border-white shadow-xl mx-auto"
                    style={{ backgroundColor: shadeScale[currentShade - 1]?.color }}
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pp-ink text-white px-3 py-1 rounded-full text-sm font-bold">
                    Current
                  </div>
                </div>
                <div className="text-xl font-bold text-pp-ink">
                  {shadeScale[currentShade - 1]?.label}
                </div>
                <div className="text-pp-ink-soft">
                  {shadeScale[currentShade - 1]?.description}
                </div>
              </motion.div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
              </motion.div>

               {/* Projected Shade */}
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="text-center relative"
               >
                 {/* Glow Effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-pp-purple-400/20 to-pp-purple-600/20 rounded-full blur-xl scale-150" />
                 
                 <div className="relative mb-4">
                   <div
                     className="w-32 h-32 rounded-full border-4 border-white shadow-2xl mx-auto relative z-10"
                     style={{ backgroundColor: shadeScale[projectedShade - 1]?.color }}
                   >
                     {/* Sparkle Effect */}
                     <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                     <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                     <div className="absolute bottom-3 left-3 w-2 h-2 bg-white rounded-full animate-pulse" />
                   </div>
                   
                   {/* Enhanced Pill */}
                   <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pp-success to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white">
                     ✨ After 7 days ✨
                   </div>
                 </div>
                 
                 <div className="text-2xl font-bold text-pp-ink relative z-10">
                   {shadeScale[projectedShade - 1]?.label}
                 </div>
                 <div className="text-pp-ink-soft text-lg relative z-10">
                   {shadeScale[projectedShade - 1]?.description}
                 </div>
                 
                 {/* Success Badge */}
                 <div className="mt-2 inline-flex items-center space-x-1 bg-pp-success/10 text-pp-success px-3 py-1 rounded-full text-sm font-semibold">
                   <span>🎉</span>
                   <span>Amazing Results!</span>
                 </div>
               </motion.div>
            </div>

          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-pp-ink-soft">
              <strong>Disclaimer:</strong> Individual results may vary. The shade finder is for reference only and does not guarantee specific results.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
