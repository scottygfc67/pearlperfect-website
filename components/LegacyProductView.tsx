'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LegacyProduct } from '@/lib/shopify-legacy';

interface LegacyProductViewProps {
  product: LegacyProduct;
}

export default function LegacyProductView({ product }: LegacyProductViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variants[0]?.id || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const currentImage = product.images[selectedImageIndex] || product.featuredImage;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
          {currentImage && (
            <Image
              src={currentImage.url}
              alt={currentImage.altText || product.title}
              width={currentImage.width}
              height={currentImage.height}
              className="w-full h-full object-cover"
              priority
            />
          )}
        </div>

        {/* Thumbnail Images */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-200 ${
                  selectedImageIndex === index 
                    ? 'ring-2 ring-purple-500 scale-105' 
                    : 'hover:scale-105'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Title & Availability */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
              product.availableForSale 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.availableForSale ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ${product.priceMin.amount.toFixed(2)}
            </span>
            {product.priceMin.amount !== product.priceMax.amount && (
              <span className="text-lg text-gray-500">
                - ${product.priceMax.amount.toFixed(2)}
              </span>
            )}
            <span className="text-sm text-gray-500">{product.priceMin.currencyCode}</span>
          </div>
          
          {selectedVariant?.compareAtPrice && (
            <div className="flex items-center gap-2">
              <span className="text-lg text-gray-400 line-through">
                ${selectedVariant.compareAtPrice.amount.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                Save ${(selectedVariant.compareAtPrice.amount - selectedVariant.price.amount).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Variant Selection */}
        {product.variants.length > 1 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Options</h3>
            <div className="grid grid-cols-1 gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedVariantId === variant.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{variant.title}</div>
                      <div className="text-sm text-gray-500">
                        ${variant.price.amount.toFixed(2)} {variant.price.currencyCode}
                        {variant.compareAtPrice && (
                          <span className="ml-2 text-gray-400 line-through">
                            ${variant.compareAtPrice.amount.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    {variant.image && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={variant.image.url}
                          alt={variant.image.altText || variant.title}
                          width={variant.image.width}
                          height={variant.image.height}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <div 
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          disabled={!product.availableForSale}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
            product.availableForSale
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.availableForSale ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
