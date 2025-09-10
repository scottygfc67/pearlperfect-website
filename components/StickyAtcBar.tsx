'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, ProductVariant, CartLineInput } from '@/lib/shopify';
import { getCartIdClient, setCartIdClient } from '@/lib/cart-cookie';
import MiniCart from './MiniCart';

interface StickyAtcBarProps {
  product: Product;
  variants: ProductVariant[];
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
}

export default function StickyAtcBar({ 
  product, 
  variants, 
  selectedVariantId, 
  onVariantChange 
}: StickyAtcBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const isAvailable = selectedVariant?.availableForSale ?? false;
  const price = selectedVariant?.price;

  // Show sticky bar after 35% scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercent > 0.35);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async () => {
    if (!selectedVariant || !isAvailable) return;

    setIsAddingToCart(true);
    
    try {
      // Get or create cart ID
      let cartId = getCartIdClient();
      
      if (!cartId) {
        const createResponse = await fetch('/api/cart/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lines: [] })
        });
        
        const createResult = await createResponse.json();
        if (!createResult.success) throw new Error(createResult.error);
        
        cartId = createResult.cartId;
        setCartIdClient(cartId);
      }

      // Add line to cart
      const lines: CartLineInput[] = [{
        merchandiseId: selectedVariant.id,
        quantity
      }];

      const addResponse = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, lines })
      });

      const addResult = await addResponse.json();
      if (!addResult.success) throw new Error(addResult.error);

      // Open mini cart
      setIsMiniCartOpen(true);

      // Analytics
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'add_to_cart',
          currency: price?.currencyCode,
          value: parseFloat(price?.amount || '0') * quantity,
          items: [{
            item_id: selectedVariant.id,
            item_name: product.title,
            item_variant: selectedVariant.title,
            quantity: quantity,
            price: parseFloat(price?.amount || '0')
          }]
        });
      }

    } catch (error) {
      console.error('Add to cart error:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Product Info */}
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {selectedVariant?.image && (
                  <img
                    src={selectedVariant.image.url}
                    alt={selectedVariant.image.altText}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 truncate text-sm">
                  {product.title}
                </h3>
                <p className="text-sm font-bold text-purple-600">
                  {price ? formatPrice(price.amount, price.currencyCode) : 'Loading...'}
                </p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center space-x-3">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!isAvailable || isAddingToCart}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  isAvailable && !isAddingToCart
                    ? 'bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:from-purple-700 hover:to-purple-500 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isAddingToCart ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mini Cart */}
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
    </AnimatePresence>
  );
}
