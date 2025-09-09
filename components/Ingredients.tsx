'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X, Shield, AlertTriangle } from 'lucide-react';

export default function Ingredients() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const ingredients = [
    {
      name: 'Hydrogen Peroxide',
      percentage: '6%',
      description: 'The active whitening agent that safely removes surface stains',
      safety: 'Safe for enamel when used as directed',
      inci: 'Hydrogen Peroxide',
    },
    {
      name: 'Glycerin',
      percentage: '15%',
      description: 'Keeps strips moist and comfortable during wear',
      safety: 'Non-toxic, commonly used in oral care',
      inci: 'Glycerin',
    },
    {
      name: 'Carbomer',
      percentage: '2%',
      description: 'Creates the gel-like consistency for easy application',
      safety: 'FDA approved for oral use',
      inci: 'Carbomer',
    },
    {
      name: 'Sodium Hydroxide',
      percentage: '0.5%',
      description: 'pH balancer to ensure gentle, effective whitening',
      safety: 'Minimal amount, safe for oral use',
      inci: 'Sodium Hydroxide',
    },
    {
      name: 'Peppermint Oil',
      percentage: '0.1%',
      description: 'Natural flavoring for a fresh, clean feeling',
      safety: 'Natural ingredient, no known side effects',
      inci: 'Mentha Piperita Oil',
    },
  ];

  const avoidedIngredients = [
    { name: 'SLS (Sodium Lauryl Sulfate)', reason: 'Can cause irritation and sensitivity' },
    { name: 'Parabens', reason: 'Potential hormone disruptors' },
    { name: 'Artificial Dyes', reason: 'Unnecessary chemicals in oral care' },
    { name: 'Alcohol', reason: 'Can cause dryness and irritation' },
    { name: 'Chlorine Dioxide', reason: 'Too harsh for daily use' },
    { name: 'Carbamide Peroxide', reason: 'Can cause more sensitivity than hydrogen peroxide' },
  ];

  const safetyFacts = [
    {
      icon: Shield,
      title: 'Enamel Safe',
      description: 'Our formula is designed to whiten without damaging your tooth enamel',
    },
    {
      icon: Check,
      title: 'Sensitivity Free',
      description: 'Gentle formula that won&apos;t cause tooth sensitivity when used as directed',
    },
    {
      icon: Shield,
      title: 'FDA Approved',
      description: 'All ingredients are FDA approved for oral use and cosmetic applications',
    },
    {
      icon: Check,
      title: 'Dentist Recommended',
      description: 'Recommended by dental professionals for safe at-home whitening',
    },
  ];

  return (
    <section id="ingredients" className="py-24 bg-pp-bg-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-pp-ink mb-6">
            Ingredients & Safety
          </h2>
          <p className="text-xl text-pp-ink-soft max-w-2xl mx-auto">
            Transparent about what goes into our whitening strips
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Ingredients List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-pp-ink mb-8">
              What&apos;s Inside
            </h3>
            
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-pp-ink">
                      {ingredient.name}
                    </h4>
                    <p className="text-sm text-pp-purple-600 font-medium">
                      {ingredient.percentage} concentration
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-pp-ink-soft transition-transform duration-200 ${
                      openAccordion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-3">
                        <p className="text-pp-ink-soft">
                          {ingredient.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-pp-success" />
                          <span className="text-sm text-pp-success font-medium">
                            {ingredient.safety}
                          </span>
                        </div>
                        <div className="text-xs text-pp-ink-soft">
                          <strong>INCI Name:</strong> {ingredient.inci}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Safety & What We Avoid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Safety Facts */}
            <div>
              <h3 className="text-2xl font-bold text-pp-ink mb-6">
                Safety First
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {safetyFacts.map((fact, index) => (
                  <motion.div
                    key={fact.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-pp-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <fact.icon className="w-4 h-4 text-pp-success" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-pp-ink text-sm">
                          {fact.title}
                        </h4>
                        <p className="text-xs text-pp-ink-soft mt-1">
                          {fact.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What We Avoid */}
            <div>
              <h3 className="text-2xl font-bold text-pp-ink mb-6">
                What We Avoid
              </h3>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <p className="text-pp-ink-soft mb-4">
                  We carefully avoid these common ingredients that can cause irritation or harm:
                </p>
                <div className="space-y-3">
                  {avoidedIngredients.map((ingredient, index) => (
                    <motion.div
                      key={ingredient.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-pp-ink text-sm">
                          {ingredient.name}
                        </div>
                        <div className="text-xs text-pp-ink-soft">
                          {ingredient.reason}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sensitivity Warning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-pp-warning/10 border border-pp-warning/20 rounded-xl p-6"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-pp-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-pp-ink mb-2">
                    Important Safety Information
                  </h4>
                  <p className="text-sm text-pp-ink-soft leading-relaxed">
                    If you experience any sensitivity or irritation, discontinue use and consult your dentist. 
                    Not recommended for children under 12 or pregnant/nursing women. 
                    Keep out of reach of children.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
