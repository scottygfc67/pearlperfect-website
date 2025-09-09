'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section id="results" className="py-24 bg-gradient-to-br from-white via-pp-purple-50 to-pp-purple-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-pp-ink mb-6">
            See the Results
          </h2>
          <p className="text-xl text-pp-ink-soft max-w-2xl mx-auto">
            Real results from real customers. Individual results may vary.
          </p>
        </motion.div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-pp-ink text-center mb-8">
              Before & After Comparison
            </h3>
            
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
              <div className="relative h-96">
                {/* Before Image */}
                <div className="absolute inset-0">
                  <Image
                    src="/before.png"
                    alt="Before PearlPerfect treatment - stained teeth"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-xl drop-shadow-lg">Before</p>
                      <p className="text-white/90 text-sm mt-1 drop-shadow-lg">Stained teeth</p>
                    </div>
                  </div>
                </div>

                {/* After Image */}
                <div className="absolute inset-0">
                  <Image
                    src="/after.png"
                    alt="After PearlPerfect treatment - bright white teeth"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-xl drop-shadow-lg">After</p>
                      <p className="text-white/90 text-sm mt-1 drop-shadow-lg">PearlPerfect results</p>
                    </div>
                  </div>
                </div>

                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-pp-purple-600 z-10 shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                />

                {/* Slider Handle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-xl hover:scale-110 transition-transform"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={() => {
                    const handleMouseMove = (e: MouseEvent) => {
                      const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                      if (rect) {
                        const x = e.clientX - rect.left;
                        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        setSliderPosition(percentage);
                      }
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                  <ChevronRight className="w-4 h-4 text-white -ml-1" />
                </div>

                {/* Clipping Mask */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                />
              </div>

              {/* Instructions */}
              <div className="mt-6 text-center">
                <p className="text-pp-ink-soft text-lg">
                  Drag the slider to compare before and after results
                </p>
                <div className="mt-4 flex justify-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-pp-ink-soft">Before treatment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white border-2 border-pp-purple-300 rounded-full"></div>
                    <span className="text-pp-ink-soft">After PearlPerfect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legal Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-pp-ink-soft max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> Individual results may vary. Results shown are from actual customers 
            but are not typical. Consult with your dentist if you have concerns about teeth whitening.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
