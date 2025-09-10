'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Cart } from '@/lib/shopify';
import { getCartIdClient } from '@/lib/cart-cookie';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Load cart data when opened
  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const loadCart = async () => {
    const cartId = getCartIdClient();
    if (!cartId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/cart/get?id=${cartId}`);
      const result = await response.json();
      
      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    const cartId = getCartIdClient();
    if (!cartId) return;

    setIsUpdating(lineId);
    try {
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          lines: [{ id: lineId, quantity }]
        })
      });

      const result = await response.json();
      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const removeLine = async (lineId: string) => {
    const cartId = getCartIdClient();
    if (!cartId) return;

    setIsUpdating(lineId);
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          lineIds: [lineId]
        })
      });

      const result = await response.json();
      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      console.error('Error removing line:', error);
    } finally {
      setIsUpdating(null);
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
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !cart || cart.lines.edges.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm">Add some items to get started</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cart.lines.edges.map(({ node: line }) => (
                    <motion.div
                      key={line.id}
                      layout
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={line.merchandise.image.url}
                          alt={line.merchandise.image.altText}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {line.merchandise.product.title}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {line.merchandise.title}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          disabled={isUpdating === line.id || line.quantity <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {isUpdating === line.id ? '...' : line.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          disabled={isUpdating === line.id}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeLine(line.id)}
                        disabled={isUpdating === line.id}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.edges.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Subtotal</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={() => {
                      window.location.href = cart.checkoutUrl;
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-4 px-6 rounded-full font-bold text-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>Checkout</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.button>

                  <button
                    onClick={onClose}
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="text-center text-xs text-gray-500 space-y-1">
                  <p>🔒 Secure checkout • 30-day returns</p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
