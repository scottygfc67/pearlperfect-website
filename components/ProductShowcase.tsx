'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Plus, Minus, Zap, Shield, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function ProductShowcase() {
  const [quantity, setQuantity] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    console.log('Added to cart:', { quantity, isSubscribed });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const features = [
    { icon: Zap, text: '14 min treatment' },
    { icon: Shield, text: 'Zero sensitivity' },
    { icon: Sparkles, text: 'Visible results' },
  ];

  return (
    <section id="shop" className="py-20 bg-gradient-to-br from-pp-purple-50 via-white to-pp-purple-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/productphoto.png"
                alt="PearlPerfect V34 Teeth Whitening Strips - Premium product packaging"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              
              {/* Product Badge */}
              <div className="absolute top-6 left-6 bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 text-white px-4 py-2 rounded-full font-bold text-sm">
                ✨ Best Seller
              </div>
              
              {/* Wishlist Button */}
              <motion.button
                onClick={handleWishlist}
                className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                />
              </motion.button>
            </div>

            {/* Floating Features */}
            <motion.div
              className="absolute -bottom-6 left-6 right-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex justify-around">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-pp-purple-600 to-pp-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-pp-ink">{feature.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Product Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-pp-ink mb-4">
                PearlPerfect V34
                <span className="block bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 bg-clip-text text-transparent">
                  Whitening Strips
                </span>
              </h1>
              <p className="text-xl text-pp-ink-soft leading-relaxed">
                Professional-grade teeth whitening strips that deliver visible results in just 14 minutes. 
                Safe, effective, and dentist-approved. 💜
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-pp-warning text-pp-warning" />
                ))}
              </div>
              <span className="text-pp-ink-soft font-medium">
                4.9/5 from <span className="font-bold text-pp-ink">12,842+</span> verified reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-pp-ink">
                ${isSubscribed ? '44.99' : '49.99'}
              </div>
              <div className="text-lg text-pp-ink-soft line-through">
                $69.99
              </div>
              <div className="bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                Save 29% 🔥
              </div>
            </div>

            {/* Quantity & Subscription */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-pp-ink mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-pp-ink-soft">
                    {quantity} box{quantity > 1 ? 'es' : ''} • {quantity * 14} strips
                  </div>
                </div>
              </div>

              {/* Subscription Toggle */}
              <div className="bg-gradient-to-r from-pp-purple-50 to-pp-purple-100 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-pp-ink">Subscribe & Save 10%</h3>
                    <p className="text-sm text-pp-ink-soft">Get fresh strips every month</p>
                  </div>
                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`relative w-16 h-8 rounded-full transition-colors ${
                      isSubscribed ? 'bg-pp-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        isSubscribed ? 'translate-x-9' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-3 bg-white rounded-lg"
                  >
                    <p className="text-sm text-pp-success font-semibold">
                      ✓ You'll save $5.00 on every order!
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <motion.button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart - ${(isSubscribed ? 44.99 : 49.99) * quantity}</span>
              </motion.button>
              
              <motion.button
                className="w-full border-2 border-pp-purple-600 text-pp-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pp-purple-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now with 1-Click
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-pp-ink-soft pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-pp-success" />
                <span>30-day money-back</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-pp-purple-600" />
                <span>Free shipping over $35</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-pp-purple-600" />
                <span>Secure checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
