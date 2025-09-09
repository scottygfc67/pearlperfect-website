'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, CreditCard, Award, Heart, Leaf } from 'lucide-react';

export default function FinalCTA() {
  const trustBadges = [
    { icon: Shield, text: '30-day money-back guarantee' },
    { icon: Truck, text: 'Free shipping over $35' },
    { icon: CreditCard, text: 'Secure checkout' },
    { icon: Award, text: 'Dentist recommended' },
    { icon: Heart, text: 'Cruelty-free' },
    { icon: Leaf, text: 'Vegan formula' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-pp-purple-600 to-pp-purple-400 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
            Ready for your PearlPerfect smile?
          </h2>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join over 12,000 satisfied customers who have transformed their smiles 
            with our clinically-proven whitening strips
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Product Info */}
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-4">PearlPerfect V34 Strips</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>14 strips • 7 complete treatments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>14 minutes per treatment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Enamel-safe formula</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Zero sensitivity</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl font-bold">$49.99</div>
                  <div className="text-lg opacity-75 line-through">$69.99</div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    Save 29%
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <motion.button
                  className="w-full bg-white text-pp-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get My Strips Now
                </motion.button>
                
                <motion.button
                  className="w-full border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-pp-purple-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe & Save 10%
                </motion.button>
                
                <p className="text-sm opacity-75 text-center">
                  Free shipping • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <badge.icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium opacity-90">
                {badge.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Risk Reversal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Risk-Free Guarantee</h3>
            <p className="text-lg opacity-90 mb-6">
              Try PearlPerfect V34 risk-free for 30 days. If you're not completely satisfied 
              with your results, we'll refund your money, no questions asked.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Free returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
