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


  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Press Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-white text-sm font-medium mb-8 drop-shadow-lg">
            Featured in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {pressLogos.map((logo) => (
              <div
                key={logo}
                className="text-2xl font-bold text-white grayscale hover:grayscale-0 transition-all duration-300 drop-shadow-lg"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
