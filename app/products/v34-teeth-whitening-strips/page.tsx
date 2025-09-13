import { getProductByHandle, Variant } from '@/lib/shopify/products';
import ProductPageClient from '../../product/[handle]/ProductPageClient';
import Navbar from '@/components/Navbar';
import PageLoader from '@/components/ui/PageLoader';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic'; // ensure fresh data during development

export async function generateMetadata() {
  const product = await getProductByHandle('v34-teeth-whitening-strips');
  if (product) {
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.featuredImage?.url ?? product.images.nodes[0]?.url].filter(Boolean),
      },
    };
  }
  return {
    title: 'PearlPerfect V34 Teeth Whitening Strips',
    description: 'Professional-grade teeth whitening strips that deliver visible results in just 14 minutes.',
  };
}

export default async function ProductPage() {
  const product = await getProductByHandle('v34-teeth-whitening-strips');
  
  if (!product) {
    // Render a polite fallback + instructions to publish product to the headless channel/market.
    return (
      <PageLoader isLoading={false}>
        <div className="min-h-screen">
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <strong>⚠️ Product not available via Storefront API.</strong> 
                Ensure it&apos;s published to your Headless channel and target market.
              </p>
            </div>
          </main>
        </div>
      </PageLoader>
    );
  }

  // Adapt to the client component's expected shape
  const firstImage = product.featuredImage ?? product.images.nodes[0] ?? null;
  const firstVariant = product.variants.nodes[0];

  const adapted = {
    id: product.id,
    title: product.title,
    handle: product.handle,
    vendor: 'PearlPerfect', // Default vendor
    description: product.description,
    seo: {
      title: product.title,
      description: product.description,
    },
    availableForSale: firstVariant?.availableForSale ?? false,
    priceRange: product.priceRange,
    compareAtPriceRange: product.compareAtPriceRange ?? undefined,
    featuredImage: firstImage ? {
      url: firstImage.url,
      altText: firstImage.altText || product.title,
    } : {
      url: '',
      altText: product.title,
    },
    media: {
      edges: product.images.nodes.map((image: { url: string; altText: string | null }) => ({
        node: {
          __typename: 'MediaImage',
          image: {
            url: image.url,
            altText: image.altText || product.title,
          },
        },
      })),
    },
    images: product.images.nodes,
    variants: product.variants.nodes.map((v: Variant) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      price: v.price,
      compareAtPrice: v.compareAtPrice ?? undefined,
      image: v.image ?? undefined,
      selectedOptions: v.selectedOptions ?? [],
    })),
    // Add options array for BuyBox component
    options: product.variants.nodes.length > 0 ? 
      product.variants.nodes[0].selectedOptions.map((option: { name: string; value: string }) => ({
        name: option.name,
        values: [...new Set(product.variants.nodes.map((v: Variant) =>
          v.selectedOptions.find(so => so.name === option.name)?.value
        ).filter(Boolean))]
      })) : []
  };

  return (
    <PageLoader isLoading={false}>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-2xl" />}>
            <ProductPageClient
              product={adapted}
              variants={adapted.variants}
              images={adapted.images}
            />
          </Suspense>
        </main>
      </div>
    </PageLoader>
  );
}