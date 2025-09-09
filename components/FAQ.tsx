'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Will it cause sensitivity?',
      answer: 'No, PearlPerfect V34 strips are specifically formulated to be gentle on your teeth and gums. Our enamel-safe formula contains a carefully balanced concentration of hydrogen peroxide that whitens effectively without causing sensitivity. However, if you have extremely sensitive teeth, we recommend consulting with your dentist before use.',
    },
    {
      question: 'How many uses per box?',
      answer: 'Each box contains 14 strips, which provides 7 complete treatments (upper and lower teeth). This is enough for a full week of daily use or can be spread out over 2-3 weeks for maintenance.',
    },
    {
      question: 'Is it safe for caps, veneers, or crowns?',
      answer: 'PearlPerfect V34 strips are safe to use with dental work, but they will only whiten natural tooth enamel. Caps, veneers, and crowns are made from materials that won\'t respond to whitening treatments. The strips won\'t damage your dental work, but you may notice uneven whitening if you have visible dental work.',
    },
    {
      question: 'Is it safe during pregnancy?',
      answer: 'We recommend consulting with your healthcare provider before using any whitening products during pregnancy or while breastfeeding. While our formula is gentle and enamel-safe, it\'s always best to get professional medical advice during this special time.',
    },
    {
      question: 'How long do results last?',
      answer: 'Results typically last 3-6 months with proper oral hygiene and avoiding stain-causing foods and drinks (coffee, tea, red wine, etc.). For best results, we recommend using the strips once every 3-4 months for maintenance whitening.',
    },
    {
      question: 'Can I eat or drink while wearing the strips?',
      answer: 'No, you should avoid eating or drinking while wearing the strips. This ensures the whitening gel stays in contact with your teeth for maximum effectiveness. We also recommend avoiding food and drinks for 30 minutes after removing the strips to allow the whitening process to complete.',
    },
    {
      question: 'What if I accidentally swallow some gel?',
      answer: 'The whitening gel is safe if accidentally ingested in small amounts. However, if you experience any discomfort or have concerns, please contact your healthcare provider. To minimize this risk, make sure the strips are properly positioned and avoid talking while wearing them.',
    },
    {
      question: 'How quickly will I see results?',
      answer: 'Most customers notice a difference after the first use, with more significant results visible after 3-5 treatments. Full results are typically achieved after completing the full 7-day treatment cycle. Individual results may vary based on the current shade of your teeth and lifestyle factors.',
    },
    {
      question: 'Can I use it if I have braces or aligners?',
      answer: 'We don\'t recommend using whitening strips while wearing braces, as the strips won\'t be able to make proper contact with your teeth. If you\'re using clear aligners, you can use the strips, but make sure to remove your aligners during the 14-minute treatment time.',
    },
    {
      question: 'What\'s your return policy?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with your results, simply contact our customer service team within 30 days of purchase for a full refund. No questions asked.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-white via-pp-purple-50 to-pp-purple-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-pp-ink mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-pp-ink-soft max-w-2xl mx-auto">
            Everything you need to know about PearlPerfect V34 whitening strips
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-pp-ink pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <Minus className="w-5 h-5 text-pp-purple-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-pp-ink-soft" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-pp-ink-soft leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-pp-bg-alt rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-pp-ink mb-4">
              Still have questions?
            </h3>
            <p className="text-pp-ink-soft mb-6">
              Our customer support team is here to help you get the best results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pp-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pp-purple-700 transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-pp-purple-600 text-pp-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-pp-purple-600 hover:text-white transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
