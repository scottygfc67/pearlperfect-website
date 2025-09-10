import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import ProductPageClient from '../../product/[handle]/ProductPageClient';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const product = await getProductByHandle(params.handle);
    
    return {
      title: product.seo?.title || `${product.title} | PearlPerfect`,
      description: product.seo?.description || product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.featuredImage.url,
            width: 800,
            height: 800,
            alt: product.featuredImage.altText,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'PearlPerfect V34 Teeth Whitening Strips',
      description: 'Professional teeth whitening strips that work in just 14 minutes. Enamel-safe, sensitivity-free, and clinically tested.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProductByHandle(params.handle);
    
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
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
