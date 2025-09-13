'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { addToCart, getDefaultVariantId } from '@/lib/cart-utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function StickyATC() {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 35);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (addingToCart) return;
    
    setAddingToCart(true);
    try {
      const variantId = getDefaultVariantId();
      const success = await addToCart({
        variantId,
        quantity
      });
      
      if (success) {
        console.log('Successfully added to cart!');
        // You could add a toast notification here
      } else {
        console.error('Failed to add to cart');
        // You could add an error notification here
      }
    } finally {
      setAddingToCart(false);
    }
  }, [addingToCart, quantity]);

  const [productData, setProductData] = useState<{ price: number; compareAtPrice: number } | null>(null);

  useEffect(() => {
    // Fetch product data from Shopify
    const fetchProductData = async () => {
      try {
        const response = await fetch('/api/products/v34-teeth-whitening-strips');
        if (response.ok) {
          const data = await response.json();
          setProductData({
            price: parseFloat(data.price || '49.99'),
            compareAtPrice: parseFloat(data.compareAtPrice || '69.99')
          });
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setProductData({ price: 49.99, compareAtPrice: 69.99 });
      }
    };

    fetchProductData();
  }, []);

  const price = productData ? productData.price : 49.99;

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
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Product Info - Minimal */}
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">V34</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-black text-sm truncate">
                    V34 Strips
                  </h3>
                  <span className="text-base font-bold text-black">
                    £{price}
                  </span>
                </div>
              </div>

              {/* Actions - Streamlined */}
              <div className="flex items-center space-x-2">
                {/* Quantity - Compact */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-medium text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Add to Cart Button - Luxurious */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                    addingToCart
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-black text-white hover:bg-gray-800 shadow-lg'
                  }`}
                  whileHover={!addingToCart ? { scale: 1.02 } : {}}
                  whileTap={!addingToCart ? { scale: 0.98 } : {}}
                >
                  {addingToCart ? (
                    <LoadingSpinner size="sm" color="white" />
                  ) : (
                    'Add to Cart'
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
