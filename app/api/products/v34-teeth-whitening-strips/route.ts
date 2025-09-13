import { NextResponse } from 'next/server';
import { getProductByHandle } from '@/lib/shopify/products';

export async function GET() {
  try {
    const product = await getProductByHandle('v34-teeth-whitening-strips');
    
    if (!product) {
      return NextResponse.json({
        price: '49.99',
        compareAtPrice: '69.99',
        title: 'PearlPerfect V34 Teeth Whitening Strips',
        description: 'Professional-grade teeth whitening strips',
        currency: 'GBP'
      });
    }

    return NextResponse.json({
      price: product.priceRange.minVariantPrice.amount,
      compareAtPrice: product.compareAtPriceRange?.minVariantPrice.amount || '69.99',
      title: product.title,
      description: product.description,
      currency: product.priceRange.minVariantPrice.currencyCode
    });
  } catch (error) {
    console.error('Error fetching product data:', error);
    return NextResponse.json({
      price: '49.99',
      compareAtPrice: '69.99',
      title: 'PearlPerfect V34 Teeth Whitening Strips',
      description: 'Professional-grade teeth whitening strips',
      currency: 'GBP'
    });
  }
}
