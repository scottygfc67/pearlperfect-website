import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductByHandle } from '@/lib/shopify';
import BuyBox from '@/components/BuyBox';
import StickyAtcBar from '@/components/StickyAtcBar';
import { Product, ProductVariant } from '@/lib/shopify';
import ProductPageClient from './ProductPageClient';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const variants = product.variants.edges.map(edge => edge.node);
  const images = product.media.edges
    .filter(edge => edge.node.__typename === 'MediaImage' && edge.node.image)
    .map(edge => edge.node.image!);

  return (
    <ProductPageClient 
      product={product} 
      variants={variants} 
      images={images}
    />
  );
}
