// lib/shopify/products.ts
import { sf } from './storefront';
import { PRODUCT_BY_HANDLE } from './queries';
import { getProductByHandleFallback } from './fallback';

export type Money = { amount: string; currencyCode: string };
export type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money | null;
  image?: { url: string; altText: string | null } | null;
  selectedOptions: { name: string; value: string }[];
};
export type StorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage?: { url: string; altText: string | null } | null;
  images: { nodes: { url: string; altText: string | null }[] };
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPriceRange?: { minVariantPrice: Money; maxVariantPrice: Money } | null;
  variants: { nodes: Variant[] };
};

export async function getProductByHandle(handle: string, buyerIp?: string) {
  try {
    // Try Storefront API first
    const data = await sf<{ product: StorefrontProduct | null }>(
      PRODUCT_BY_HANDLE,
      { handle, country: 'GB' },
      buyerIp,
    );
    
    if (data.product) {
      return data.product;
    }
  } catch (error) {
    console.warn('Storefront API failed, trying Admin API fallback:', error);
  }

  // Fallback to Admin API
  try {
    return await getProductByHandleFallback(handle);
  } catch (error) {
    console.error('Both Storefront and Admin API failed:', error);
    return null;
  }
}
