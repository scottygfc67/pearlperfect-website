'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

export default function StickyATC() {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 35);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { quantity, isSubscribed });
  };

  const price = isSubscribed ? 44.99 : 49.99;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden"
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Product Info */}
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-12 h-12 bg-pp-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V34</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-pp-ink text-sm truncate">
                    PearlPerfect V34 Strips
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-pp-ink">
                      ${price}
                    </span>
                    {isSubscribed && (
                      <span className="text-xs text-pp-success bg-pp-success/10 px-2 py-1 rounded">
                        Save 10%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center space-x-3">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subscribe Toggle */}
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    isSubscribed ? 'bg-pp-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      isSubscribed ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  className="bg-pp-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center space-x-2 hover:bg-pp-purple-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </div>

            {/* Subscribe Info */}
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-gray-100"
              >
                <p className="text-xs text-pp-success text-center">
                  ✓ Subscribe and save 10% on every order
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
