'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product, ProductVariant } from '@/lib/shopify';
import BuyBox from '@/components/BuyBox';
import StickyAtcBar from '@/components/StickyAtcBar';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title || 'Product image'}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={image.url}
                      alt={image.altText || product.title || 'Product image'}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <BuyBox 
              product={product} 
              variants={variants}
              selectedVariantId={selectedVariantId}
              onVariantChange={setSelectedVariantId}
            />
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Product Details</h2>
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose PearlPerfect V34?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">14 Minutes</h3>
                <p className="text-gray-600">Quick and effective whitening in just 14 minutes per session</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enamel Safe</h3>
                <p className="text-gray-600">Gentle formula designed for sensitive teeth with no harsh chemicals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Sensitivity</h3>
                <p className="text-gray-600">Sensitivity buffers protect your teeth and gums from irritation</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Apply</h3>
                <p className="text-gray-600">Peel and apply strips to upper and lower teeth</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Wait</h3>
                <p className="text-gray-600">Leave on for 14 minutes while you go about your day</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Remove</h3>
                <p className="text-gray-600">Peel off and rinse - see results immediately</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Active Whitening Agents</h3>
                <p className="text-gray-600">Clinically tested hydrogen peroxide derivative that safely lifts surface stains and penetrates deep into enamel for lasting results.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sensitivity Buffers</h3>
                <p className="text-gray-600">Gentle ingredients that protect your teeth and gums from irritation, making it safe for daily use even with sensitive teeth.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hydrogel Technology</h3>
                <p className="text-gray-600">Advanced no-slip hydrogel layer keeps strips firmly in place while allowing active ingredients to work effectively.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fresh Mint Flavor</h3>
                <p className="text-gray-600">Leaves your mouth feeling clean and refreshed after each use, with no unpleasant aftertaste.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Trusted by Thousands</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">30-Day</div>
                <div className="text-lg opacity-90">Money-Back Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Dentist</div>
                <div className="text-lg opacity-90">Approved & Recommended</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">GMP</div>
                <div className="text-lg opacity-90">Certified Manufacturing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
