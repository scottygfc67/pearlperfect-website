'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
// import { Check, X } from 'lucide-react';

export default function Comparison() {
  const comparisonData = [
    {
      feature: 'Time per use',
      pearlPerfect: '14 minutes',
      whiteningPens: '30+ minutes',
      ledKits: '20-30 minutes',
      proOffice: '60-90 minutes',
    },
    {
      feature: 'Cost per treatment',
      pearlPerfect: '$3.57',
      whiteningPens: '$8-15',
      ledKits: '$5-10',
      proOffice: '$300-800',
    },
    {
      feature: 'Sensitivity risk',
      pearlPerfect: 'Very Low',
      whiteningPens: 'Low',
      ledKits: 'Medium',
      proOffice: 'High',
    },
    {
      feature: 'Mess factor',
      pearlPerfect: 'None',
      whiteningPens: 'Low',
      ledKits: 'Medium',
      proOffice: 'None',
    },
    {
      feature: 'Clinically backed',
      pearlPerfect: 'Yes',
      whiteningPens: 'Some',
      ledKits: 'Limited',
      proOffice: 'Yes',
    },
    {
      feature: 'Travel-friendly',
      pearlPerfect: 'Yes',
      whiteningPens: 'Yes',
      ledKits: 'No',
      proOffice: 'No',
    },
  ];

  const products = [
    {
      name: 'PearlPerfect Strips',
      highlight: true,
      color: 'pp-purple-600',
    },
    {
      name: 'Whitening Pens',
      highlight: false,
      color: 'gray-500',
    },
    {
      name: 'LED Kits',
      highlight: false,
      color: 'gray-500',
    },
    {
      name: 'Pro In-Office',
      highlight: false,
      color: 'gray-500',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-pp-purple-50 via-white to-pp-purple-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-pp-ink mb-6">
            How We Compare
          </h2>
          <p className="text-xl text-pp-ink-soft max-w-2xl mx-auto">
            See why PearlPerfect V34 strips are the smart choice for at-home whitening
          </p>
        </motion.div>

        {/* Before/After Images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/before.png"
                  alt="Before PearlPerfect treatment - stained teeth"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-bold text-2xl drop-shadow-lg">Before</p>
                    <p className="text-white/90 text-lg mt-2 drop-shadow-lg">Stained teeth</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* After Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/after.png"
                  alt="After PearlPerfect treatment - bright white teeth"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-bold text-2xl drop-shadow-lg">After</p>
                    <p className="text-white/90 text-lg mt-2 drop-shadow-lg">PearlPerfect results</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-pp-bg-alt">
              <div className="grid grid-cols-5 gap-4 p-6">
                <div className="text-left">
                  <h3 className="font-semibold text-pp-ink">Features</h3>
                </div>
                {products.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`text-center p-4 rounded-xl ${
                      product.highlight
                        ? 'bg-pp-purple-600 text-white'
                        : 'bg-white text-pp-ink'
                    }`}
                  >
                    <h4 className="font-bold text-lg">{product.name}</h4>
                    {product.highlight && (
                      <p className="text-sm opacity-90 mt-1">Our Choice</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-200">
              {comparisonData.map((row) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-5 gap-4 p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <h4 className="font-semibold text-pp-ink">{row.feature}</h4>
                  </div>
                  <div className="text-center">
                    <div className="bg-pp-purple-50 text-pp-purple-700 px-4 py-2 rounded-lg font-semibold">
                      {row.pearlPerfect}
                    </div>
                  </div>
                  <div className="text-center text-pp-ink-soft">
                    {row.whiteningPens}
                  </div>
                  <div className="text-center text-pp-ink-soft">
                    {row.ledKits}
                  </div>
                  <div className="text-center text-pp-ink-soft">
                    {row.proOffice}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {products.map((product, productIndex) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: productIndex * 0.1 }}
              className={`rounded-2xl p-6 border-2 ${
                product.highlight
                  ? 'border-pp-purple-600 bg-pp-purple-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold ${
                  product.highlight ? 'text-pp-purple-600' : 'text-pp-ink'
                }`}>
                  {product.name}
                </h3>
                {product.highlight && (
                  <p className="text-pp-purple-600 font-semibold mt-1">Our Choice</p>
                )}
              </div>

              <div className="space-y-4">
                {comparisonData.map((row) => (
                  <div key={row.feature} className="flex justify-between items-center">
                    <span className="text-pp-ink-soft font-medium">{row.feature}</span>
                    <span className={`font-semibold ${
                      product.highlight ? 'text-pp-purple-600' : 'text-pp-ink'
                    }`}>
                      {productIndex === 0 && row.pearlPerfect}
                      {productIndex === 1 && row.whiteningPens}
                      {productIndex === 2 && row.ledKits}
                      {productIndex === 3 && row.proOffice}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Join thousands of satisfied customers who chose PearlPerfect V34
            </p>
            <button className="bg-white text-pp-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Get My Strips Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
