'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
  const pressLogos = [
    'Forbes',
    'Vogue',
    'Allure',
    'Health',
    'Cosmopolitan',
    'Elle',
  ];

  const ugcQuotes = [
    "My teeth have never looked better! ✨",
    "Zero sensitivity, amazing results!",
    "Finally found something that works!",
    "My dentist asked what I was using!",
    "Worth every penny! 💜",
    "Can't believe the difference!",
    "My confidence is through the roof!",
    "Best whitening strips ever!",
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-pp-purple-600 to-pp-purple-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Press Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-white/80 text-sm font-medium mb-8">
            Featured in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            {pressLogos.map((logo, index) => (
              <div
                key={logo}
                className="text-2xl font-bold text-white grayscale hover:grayscale-0 transition-all duration-300"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

        {/* UGC Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />
                ))}
              </div>
              <span className="text-white font-semibold text-lg">
                12,842+ verified reviews
              </span>
            </div>
          </div>

          {/* Marquee Container */}
          <div className="relative">
            <div className="flex space-x-8 animate-marquee">
              {[...ugcQuotes, ...ugcQuotes].map((quote, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-pp-ink font-medium whitespace-nowrap">
                    {quote}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
