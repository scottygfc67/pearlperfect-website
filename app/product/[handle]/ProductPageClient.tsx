'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product, ProductVariant } from '@/lib/shopify';
import BuyBox from '@/components/BuyBox';
import StickyAtcBar from '@/components/StickyAtcBar';
import { Star, Shield, Truck, CreditCard, Clock, CheckCircle, Sparkles, Zap, Heart, Award } from 'lucide-react';

interface ProductPageClientProps {
  product: Product;
  variants: ProductVariant[];
  images: Array<{
    url: string;
    altText: string;
  }>;
}

export default function ProductPageClient({ product, variants, images }: ProductPageClientProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0]?.id || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const price = selectedVariant?.price;
  const compareAtPrice = selectedVariant?.compareAtPrice;

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const benefits = [
    {
      icon: Clock,
      title: '14 Minutes',
      description: 'Quick treatment time with visible results',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Enamel Safe',
      description: 'Gentle formula designed for sensitive teeth',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Sparkles,
      title: 'No Sensitivity',
      description: 'Sensitivity buffers protect your teeth',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Peel',
      description: 'Open the sachet and remove the strips',
      icon: '📦',
      color: 'from-purple-600 to-purple-700'
    },
    {
      number: 2,
      title: 'Stick',
      description: 'Apply upper & lower strips for 14 minutes',
      icon: '😬',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: 3,
      title: 'Shine',
      description: 'Remove & smile; avoid food/drink for 30 min',
      icon: '✨',
      color: 'from-purple-400 to-purple-500'
    }
  ];

  const ingredients = [
    {
      icon: '🧪',
      title: 'Active Whitening Agents',
      description: 'Clinically tested hydrogen peroxide derivative that safely lifts surface stains and penetrates deep into enamel for lasting results.'
    },
    {
      icon: '🛡️',
      title: 'Sensitivity Buffers',
      description: 'Gentle ingredients that protect your teeth and gums from irritation, making it safe for daily use even with sensitive teeth.'
    },
    {
      icon: '💧',
      title: 'Hydrogel Technology',
      description: 'Advanced no-slip hydrogel layer keeps strips firmly in place while allowing active ingredients to work effectively.'
    },
    {
      icon: '🌿',
      title: 'Fresh Mint Flavor',
      description: 'Leaves your mouth feeling clean and refreshed after each use, with no unpleasant aftertaste.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={images[selectedImageIndex]?.url || product.featuredImage.url}
                alt={images[selectedImageIndex]?.altText || product.featuredImage.altText || product.title || 'Product image'}
                width={600}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-purple-500 shadow-md' 
                        : 'hover:shadow-md hover:scale-105'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || product.title || 'Product image'}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-8 lg:self-start"
          >
            <BuyBox 
              product={product} 
              variants={variants}
              selectedVariantId={selectedVariantId}
              onVariantChange={setSelectedVariantId}
            />
          </motion.div>
        </div>
      </div>

      {/* Product Benefits */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PearlPerfect V34?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade whitening strips that deliver visible results safely and effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple 3-step process for professional results at home
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden lg:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative text-center"
                >
                  {/* Step Number */}
                  <div className="relative inline-block mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mx-auto`}>
                      {step.number}
                    </div>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${step.color} rounded-full blur-lg opacity-30 -z-10`} />
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Ingredients */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Key Ingredients
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Scientifically formulated with premium ingredients for safe, effective whitening
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">{ingredient.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {ingredient.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {ingredient.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trust Indicators */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gradient-to-r from-purple-600 to-purple-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust PearlPerfect for their smile
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">30-Day</div>
              <div className="text-lg text-white/90">Money-Back Guarantee</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">Dentist</div>
              <div className="text-lg text-white/90">Approved & Recommended</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">GMP</div>
              <div className="text-lg text-white/90">Certified Manufacturing</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trust Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            <div className="flex items-center space-x-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm sm:text-base font-medium">30-day Money Back</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Truck className="w-5 h-5 text-green-400" />
              <span className="text-sm sm:text-base font-medium">Free Shipping over £35</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <CreditCard className="w-5 h-5 text-green-400" />
              <span className="text-sm sm:text-base font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sticky Add to Cart Bar */}
      <StickyAtcBar 
        product={product} 
        variants={variants} 
        selectedVariantId={selectedVariantId} 
        onVariantChange={setSelectedVariantId} 
      />
    </div>
  );
}
