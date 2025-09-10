'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Peel',
      description: 'Open the sachet and remove the strips',
      icon: '📦',
      color: 'from-purple-600 to-purple-700',
    },
    {
      number: 2,
      title: 'Stick',
      description: 'Apply upper & lower strips for 14 minutes',
      icon: '😬',
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: 3,
      title: 'Shine',
      description: 'Remove & smile; avoid food/drink for 30 min',
      icon: '✨',
      color: 'from-purple-400 to-purple-500',
    },
  ];

  const features = [
    {
      icon: Clock,
      title: '14 Minutes',
      description: 'Quick treatment time',
    },
    {
      icon: CheckCircle,
      title: 'Easy to Use',
      description: 'No mess, no hassle',
    },
    {
      icon: Sparkles,
      title: 'Visible Results',
      description: 'See the difference',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-black mb-6">
            How It Works
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Get whiter teeth in just 3 simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-purple-400 to-purple-200" />
                )}
                
                <div className="flex items-start space-x-8">
                  {/* Step Number */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg`}>
                      {step.number}
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl blur-lg opacity-30 -z-10`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-black mb-3">
                          {step.title}
                        </h3>
                        <p className="text-lg text-black leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <div className="text-5xl ml-4">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              Why Choose PearlPerfect?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-white/80">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl">
            See Full Guide
          </button>
        </motion.div>
      </div>
    </section>
  );
}
