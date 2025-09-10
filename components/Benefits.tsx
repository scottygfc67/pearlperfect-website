'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles, CheckCircle } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: 'Fast results',
      description: 'Visible after first application',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Zero sensitivity',
      description: 'Enamel‑safe formula',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Sparkles,
      title: 'Mess‑free',
      description: 'No trays, no goo',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: CheckCircle,
      title: 'Clinically backed',
      description: 'Peroxide concentration within dentist‑recommended range',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-purple-100 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-black mb-6">
            Why V34?
          </h2>
          <p className="text-xl text-black-soft max-w-2xl mx-auto">
            Experience the difference with our clinically-proven whitening strips
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Gooey Effect Container */}
              <div className="relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                {/* Background Blob */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl blur-xl`} />
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-purple-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-black-soft leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Clinically Tested & Dentist Approved
            </h3>
            <p className="text-black-soft text-lg leading-relaxed">
              Our V34 formula has been tested by dental professionals and proven to be safe for daily use. 
              The peroxide concentration is carefully calibrated to provide maximum whitening power while 
              protecting your enamel and preventing sensitivity.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">FDA Approved</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Dentist Recommended</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Enamel Safe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
