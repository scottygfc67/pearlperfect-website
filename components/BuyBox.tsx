'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Shield, Truck, CreditCard } from 'lucide-react';
import { Product, ProductVariant, CartLineInput } from '@/lib/shopify';
import { getCartIdClient, setCartIdClient } from '@/lib/cart-cookie';
import { directCheckoutAction } from '@/app/actions/checkout';
import MiniCart from './MiniCart';

interface BuyBoxProps {
  product: Product;
  variants: ProductVariant[];
  selectedVariantId?: string;
  onVariantChange?: (variantId: string) => void;
}

export default function BuyBox({ product, variants, selectedVariantId: propSelectedVariantId, onVariantChange }: BuyBoxProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(propSelectedVariantId || variants[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [sellingPlanId, setSellingPlanId] = useState<string | undefined>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const isAvailable = selectedVariant?.availableForSale ?? false;
  const price = selectedVariant?.price;
  const compareAtPrice = selectedVariant?.compareAtPrice;

  // Initialize selected options
  useEffect(() => {
    if (variants.length > 0) {
      const initialOptions: Record<string, string> = {};
      product.options.forEach(option => {
        const variant = variants.find(v => v.selectedOptions.some(so => so.name === option.name));
        if (variant) {
          const selectedOption = variant.selectedOptions.find(so => so.name === option.name);
          if (selectedOption) {
            initialOptions[option.name] = selectedOption.value;
          }
        }
      });
      setSelectedOptions(initialOptions);
    }
  }, [variants, product.options]);

  // Update selected variant when options change
  useEffect(() => {
    const matchingVariant = variants.find(variant => 
      product.options.every(option => {
        const selectedValue = selectedOptions[option.name];
        return variant.selectedOptions.some(so => 
          so.name === option.name && so.value === selectedValue
        );
      })
    );
    
    if (matchingVariant) {
      setSelectedVariantId(matchingVariant.id);
      onVariantChange?.(matchingVariant.id);
    }
  }, [selectedOptions, variants, product.options, onVariantChange]);

  // Update local state when prop changes
  useEffect(() => {
    if (propSelectedVariantId) {
      setSelectedVariantId(propSelectedVariantId);
    }
  }, [propSelectedVariantId]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !isAvailable || isAddingToCart) return;

    setIsAddingToCart(true);
    
    try {
      // Get or create cart ID
      let cartId = getCartIdClient();
      
      if (!cartId) {
        // Create new cart
        const createResponse = await fetch('/api/cart/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lines: [] })
        });
        
        const createResult = await createResponse.json();
        if (!createResult.success) throw new Error(createResult.error);
        
        cartId = createResult.cartId;
        if (cartId) {
          setCartIdClient(cartId);
        }
      }

      // Add line to cart
      const lines: CartLineInput[] = [{
        merchandiseId: selectedVariant.id,
        quantity,
        sellingPlanId
      }];

      console.log('Adding to cart:', { cartId, lines, quantity });

      const addResponse = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, lines })
      });

      const addResult = await addResponse.json();
      if (!addResult.success) throw new Error(addResult.error);

      // Show success toast and open mini cart
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setIsMiniCartOpen(true);

      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
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
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant || !isAvailable) return;

    setIsBuyingNow(true);
    
    try {
      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'begin_checkout',
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

      // Use direct checkout action
      await directCheckoutAction(selectedVariant.id, quantity);

    } catch (error) {
      console.error('Buy now error:', error);
      alert('Failed to proceed to checkout. Please try again.');
    } finally {
      setIsBuyingNow(false);
    }
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      {/* Product Title & Rating */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-600">(4.8) • 2,847 reviews</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-gray-900">
            {price ? formatPrice(price.amount, price.currencyCode) : 'Loading...'}
          </span>
          {compareAtPrice && (
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
        {compareAtPrice && (
          <p className="text-sm text-green-600 font-medium mt-1">
            Save {formatPrice(
              (parseFloat(compareAtPrice.amount) - parseFloat(price?.amount || '0')).toString(),
              compareAtPrice.currencyCode
            )}
          </p>
        )}
      </div>

      {/* Variant Selectors */}
      {product.options.map((option) => (
        <div key={option.name} className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedOptions[option.name] === value
                    ? 'border-purple-600 bg-purple-50 text-purple-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Selling Plans (if available) */}
      {selectedVariant?.sellingPlanAllocations?.edges && selectedVariant.sellingPlanAllocations.edges.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Purchase Options</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="sellingPlan"
                checked={!sellingPlanId}
                onChange={() => setSellingPlanId(undefined)}
                className="mr-3"
              />
              <span className="text-sm">One-time purchase</span>
            </label>
            {selectedVariant.sellingPlanAllocations.edges.map(({ node }) => (
              <label key={node.sellingPlan.id} className="flex items-center">
                <input
                  type="radio"
                  name="sellingPlan"
                  value={node.sellingPlan.id}
                  checked={sellingPlanId === node.sellingPlan.id}
                  onChange={(e) => setSellingPlanId(e.target.value)}
                  className="mr-3"
                />
                <span className="text-sm">{node.sellingPlan.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4 mb-6">
        <motion.button
          onClick={handleAddToCart}
          disabled={!isAvailable || isAddingToCart}
          className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-300 ${
            isAvailable && !isAddingToCart
              ? 'bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:from-purple-700 hover:to-purple-500 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adding...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </div>
          )}
        </motion.button>

        <motion.button
          onClick={handleBuyNow}
          disabled={!isAvailable || isBuyingNow}
          className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-300 ${
            isAvailable && !isBuyingNow
              ? 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
              : 'border-2 border-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          {isBuyingNow ? 'Processing...' : 'Buy Now'}
        </motion.button>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-green-600" />
          <span>Free shipping over $35</span>
        </div>
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-green-600" />
          <span>Secure checkout</span>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            Added to cart successfully! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Cart */}
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
    </div>
  );
}
