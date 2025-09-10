'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp, Shield, Clock, Zap, Star, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Product & Usage",
      questions: [
        {
          question: "How do PearlPerfect V34 strips work?",
          answer: "PearlPerfect V34 strips use a dual-action system: 1) The hydrogel layer adheres to your teeth without slipping, and 2) Active whitening ingredients dissolve surface stains and penetrate deep into the enamel. This happens in just 14 minutes with no sensitivity."
        },
        {
          question: "How often should I use the strips?",
          answer: "For best results, use once daily for 7-14 days. Most users see noticeable improvement after 3-5 uses, with full results visible after 7-14 days of daily use."
        },
        {
          question: "How long do I leave the strips on?",
          answer: "Exactly 14 minutes. The strips are designed to work optimally in this timeframe. Leaving them on longer won't improve results and may cause sensitivity."
        },
        {
          question: "Can I talk while wearing the strips?",
          answer: "Yes! The hydrogel technology keeps the strips firmly in place, so you can talk, scroll on your phone, or even work while wearing them. We call this the 'Invisible Strip Effect.'"
        },
        {
          question: "Do I need to brush my teeth before using the strips?",
          answer: "No brushing required! Simply apply the strips to clean, dry teeth. This makes PearlPerfect perfect for busy lifestyles and travel."
        },
        {
          question: "Can I eat or drink while wearing the strips?",
          answer: "We recommend avoiding eating or drinking while wearing the strips to maintain optimal contact with your teeth. Water is fine if needed."
        }
      ]
    },
    {
      category: "Safety & Sensitivity",
      questions: [
        {
          question: "Are PearlPerfect strips safe for my teeth?",
          answer: "Absolutely! PearlPerfect V34 is enamel-safe, formulated for sensitive teeth, and certified by dentists. It's made in GMP-certified labs with sensitivity buffers to protect your teeth and gums."
        },
        {
          question: "Will the strips cause sensitivity?",
          answer: "PearlPerfect V34 is specifically formulated to prevent sensitivity. Our strips include sensitivity buffers and use a gentle, enamel-safe formula. Most users experience zero sensitivity."
        },
        {
          question: "Can I use these if I have sensitive teeth?",
          answer: "Yes! PearlPerfect V34 is specifically designed for people with sensitive teeth. The formula includes sensitivity buffers and gentle whitening agents that won't irritate your teeth or gums."
        },
        {
          question: "Are the strips safe for dental work like fillings or crowns?",
          answer: "PearlPerfect V34 is safe to use with most dental work. However, we recommend consulting with your dentist if you have extensive dental work or concerns about specific materials."
        },
        {
          question: "Can I use these during pregnancy or breastfeeding?",
          answer: "While our strips are generally safe, we recommend consulting with your healthcare provider before using any whitening products during pregnancy or while breastfeeding."
        }
      ]
    },
    {
      category: "Results & Expectations",
      questions: [
        {
          question: "How quickly will I see results?",
          answer: "Most users see slight brightness improvement after the first use. Noticeable differences appear after 3-5 uses, with full results visible after 7-14 days of daily use. Clinical testing shows up to 4 shades lighter in 10-14 days."
        },
        {
          question: "How many shades lighter will my teeth get?",
          answer: "Results vary by individual, but most users see 2-4 shades of improvement. Use our Shade Finder tool to see your projected results based on your current tooth shade."
        },
        {
          question: "Will the results last?",
          answer: "Yes! Results can last 6-12 months with proper maintenance. Avoid staining foods and drinks, and consider touch-up treatments every few months to maintain your bright smile."
        },
        {
          question: "What if I don't see results?",
          answer: "PearlPerfect V34 works for 95%+ of users. If you don't see results after 14 days of daily use, contact our customer service for a full refund. We stand behind our product with a 30-day money-back guarantee."
        },
        {
          question: "Can I use these on just my front teeth?",
          answer: "While you can apply strips to just your front teeth, we recommend using them on both upper and lower teeth for the most natural, balanced look."
        }
      ]
    },
    {
      category: "Shipping & Returns",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "We offer free shipping on orders over $35. Standard shipping takes 3-5 business days, with express options available. You'll receive tracking information once your order ships."
        },
        {
          question: "What's your return policy?",
          answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your results, return the unused strips for a full refund. No questions asked."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we ship within the United States. We're working on international shipping and will announce it soon. Sign up for our newsletter to be the first to know!"
        },
        {
          question: "Can I track my order?",
          answer: "Yes! You'll receive a tracking number via email once your order ships. You can track your package directly through our website or the carrier's tracking system."
        },
        {
          question: "What if my package is damaged or lost?",
          answer: "We'll replace any damaged or lost packages at no cost to you. Contact our customer service team with your order number and we'll send a replacement immediately."
        }
      ]
    },
    {
      category: "Technical & Storage",
      questions: [
        {
          question: "How should I store the strips?",
          answer: "Store in a cool, dry place at room temperature. Keep the strips in their original packaging until ready to use. Avoid extreme temperatures or direct sunlight."
        },
        {
          question: "What's the shelf life of the strips?",
          answer: "PearlPerfect V34 strips have a 2-year shelf life when stored properly. Check the expiration date on the packaging before use."
        },
        {
          question: "Can I cut the strips to fit my teeth?",
          answer: "The strips are designed to work as-is. Cutting them may affect the hydrogel technology and reduce effectiveness. We recommend using them as intended for best results."
        },
        {
          question: "What if I accidentally swallow part of a strip?",
          answer: "The ingredients are safe if accidentally ingested in small amounts. However, if you experience any discomfort, contact your healthcare provider immediately."
        },
        {
          question: "Can I use these with other whitening products?",
          answer: "We don't recommend using PearlPerfect V34 with other whitening products simultaneously, as this may cause sensitivity or irritation. Use one whitening method at a time."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
            ❓ Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about PearlPerfect V34 Whitening Strips. Can&apos;t find your answer? Contact us anytime!
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Safe</h3>
              <p className="text-sm text-gray-600">Enamel-safe formula</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">14 Minutes</h3>
              <p className="text-sm text-gray-600">Per session</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">7 Days</h3>
              <p className="text-sm text-gray-600">To see results</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">30 Days</h3>
              <p className="text-sm text-gray-600">Money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={questionIndex} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-purple-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-heading text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our customer service team is here to help! Get in touch and we&apos;ll get back to you within 24 hours.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-sm text-gray-600 mb-3">Get detailed answers</p>
              <a href="mailto:hello@pearlperfect.com" className="text-purple-600 font-medium hover:underline">
                hello@pearlperfect.com
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-3">Instant support</p>
              <button className="text-purple-600 font-medium hover:underline">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Social Media</h3>
              <p className="text-sm text-gray-600 mb-3">Follow us for tips</p>
              <a href="https://instagram.com/pearlperfectsmile" className="text-purple-600 font-medium hover:underline">
                @PearlPerfectSmile
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💡 Pro Tip: Try Our Shade Finder
            </h3>
            <p className="text-gray-700 mb-6">
              Not sure what to expect? Use our interactive Shade Finder to see your projected results before you buy!
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300 shadow-lg">
              Try Shade Finder
            </button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8">
            Why Trust PearlPerfect?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Dentist Approved</h3>
                  <p className="text-gray-700 text-sm">Certified by dental professionals and made in GMP-certified labs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Enamel Safe</h3>
                  <p className="text-gray-700 text-sm">Gentle formula designed for sensitive teeth with no harsh chemicals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Money-Back Guarantee</h3>
                  <p className="text-gray-700 text-sm">30-day satisfaction guarantee - if you&apos;re not happy, we&apos;ll refund you</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
                  <p className="text-gray-700 text-sm">Clinical testing shows up to 4 shades lighter in 10-14 days</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">No Sensitivity</h3>
                  <p className="text-gray-700 text-sm">Sensitivity buffers protect your teeth and gums from irritation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
                  <p className="text-gray-700 text-sm">Just 14 minutes, no brushing required, works with your lifestyle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold font-heading mb-6">
            Ready to Get Your Brightest Smile?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who&apos;ve transformed their smiles with PearlPerfect V34
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Get My Strips Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              Try Shade Finder
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
