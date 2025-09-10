import { getProductById, toGid, toVariantGid } from '@/lib/shopify-legacy';
import ProductPageClient from '../../product/[handle]/ProductPageClient';


export async function generateMetadata() {
  try {
    const productId = process.env.SHOPIFY_PRODUCT_ID;
    if (!productId) {
      throw new Error('SHOPIFY_PRODUCT_ID not set');
    }
    
    const gid = toGid(productId);
    const product = await getProductById(gid);
    
    return {
      title: `${product.title} | PearlPerfect`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.featuredImage ? [
          {
            url: product.featuredImage.url,
            width: product.featuredImage.width,
            height: product.featuredImage.height,
            alt: product.featuredImage.altText || product.title,
          },
        ] : [],
      },
    };
  } catch {
    return {
      title: 'PearlPerfect V34 Teeth Whitening Strips',
      description: 'Professional teeth whitening strips that work in just 14 minutes. Enamel-safe, sensitivity-free, and clinically tested.',
    };
  }
}

// Fallback product data for when Shopify fails
const fallbackProduct = {
  id: 'gid://shopify/Product/fallback',
  title: 'PearlPerfect V34 Teeth Whitening Strips',
  handle: 'v34-teeth-whitening-strips',
  vendor: 'PearlPerfect',
  description: '<p>Professional-grade teeth whitening strips that deliver results in just 14 minutes. Our V34 formula is clinically tested, enamel-safe, and designed for sensitive teeth.</p><p>Each box contains 14 strips (7 treatments) with our advanced hydrogel technology that keeps strips firmly in place while you go about your day.</p>',
  seo: {
    title: 'PearlPerfect V34 Teeth Whitening Strips - 14 Minutes to a Brighter Smile',
    description: 'Professional teeth whitening strips that work in just 14 minutes. Enamel-safe, sensitivity-free, and clinically tested. Get your brightest smile yet!'
  },
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee1?w=800&h=800&fit=crop&crop=center',
    altText: 'PearlPerfect V34 Teeth Whitening Strips'
  },
  priceRange: {
    minVariantPrice: {
      amount: '29.99',
      currencyCode: 'USD'
    },
    maxVariantPrice: {
      amount: '29.99',
      currencyCode: 'USD'
    }
  },
  media: {
    edges: [
      {
        node: {
          __typename: 'MediaImage',
          image: {
            url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee1?w=800&h=800&fit=crop&crop=center',
            altText: 'PearlPerfect V34 Teeth Whitening Strips'
          }
        }
      },
      {
        node: {
          __typename: 'MediaImage',
          image: {
            url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=800&fit=crop&crop=center',
            altText: 'Teeth whitening results'
          }
        }
      }
    ]
  },
  options: [
    {
      name: 'Size',
      values: ['14 Strips (7 Treatments)', '28 Strips (14 Treatments)', '42 Strips (21 Treatments)']
    }
  ],
  variants: {
    edges: [
      {
        node: {
          id: 'gid://shopify/ProductVariant/1',
          title: '14 Strips (7 Treatments)',
          availableForSale: true,
          sku: 'PP-V34-14',
          selectedOptions: [
            { name: 'Size', value: '14 Strips (7 Treatments)' }
          ],
          price: {
            amount: '29.99',
            currencyCode: 'USD'
          },
          compareAtPrice: {
            amount: '39.99',
            currencyCode: 'USD'
          },
          image: {
            url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee1?w=800&h=800&fit=crop&crop=center',
            altText: 'PearlPerfect V34 - 14 Strips'
          },
          sellingPlanAllocations: {
            edges: []
          }
        }
      },
      {
        node: {
          id: 'gid://shopify/ProductVariant/2',
          title: '28 Strips (14 Treatments)',
          availableForSale: true,
          sku: 'PP-V34-28',
          selectedOptions: [
            { name: 'Size', value: '28 Strips (14 Treatments)' }
          ],
          price: {
            amount: '49.99',
            currencyCode: 'USD'
          },
          compareAtPrice: {
            amount: '69.99',
            currencyCode: 'USD'
          },
          image: {
            url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee1?w=800&h=800&fit=crop&crop=center',
            altText: 'PearlPerfect V34 - 28 Strips'
          },
          sellingPlanAllocations: {
            edges: []
          }
        }
      }
    ]
  }
};

export default async function ProductPage() {
  try {
    console.log('Attempting to fetch product from Shopify using legacy API...');
    
    const productId = process.env.SHOPIFY_PRODUCT_ID;
    if (!productId) {
      throw new Error('SHOPIFY_PRODUCT_ID not set');
    }
    
    const gid = toGid(productId);
    const legacyProduct = await getProductById(gid);
    
    // Get the specific variant ID from environment
    const variantId = process.env.SHOPIFY_VARIANT_ID;
    const selectedVariant = variantId ? 
      legacyProduct.variants.find(v => v.id === toVariantGid(variantId)) || legacyProduct.variants[0] :
      legacyProduct.variants[0];
    
    // Convert legacy product to the format expected by ProductPageClient
    const product = {
      id: legacyProduct.id,
      title: legacyProduct.title,
      handle: legacyProduct.handle,
      vendor: 'PearlPerfect',
      description: legacyProduct.description,
      seo: {
        title: legacyProduct.title,
        description: legacyProduct.description
      },
      featuredImage: legacyProduct.featuredImage ? {
        url: legacyProduct.featuredImage.url,
        altText: legacyProduct.featuredImage.altText || legacyProduct.title
      } : {
        url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee1?w=800&h=800&fit=crop&crop=center',
        altText: legacyProduct.title
      },
      media: {
        edges: legacyProduct.images.map(image => ({
          node: {
            __typename: 'MediaImage',
            image: {
              url: image.url,
              altText: image.altText || ''
            }
          }
        }))
      },
      options: [
        {
          name: 'Size',
          values: legacyProduct.variants.map(v => v.title)
        }
      ],
      variants: {
        edges: legacyProduct.variants.map(variant => ({
          node: {
            id: variant.id,
            title: variant.title,
            availableForSale: variant.availableForSale,
            sku: variant.id.split('/').pop() || '',
            selectedOptions: variant.selectedOptions,
            price: {
              amount: variant.price.amount.toString(),
              currencyCode: variant.price.currencyCode
            },
            compareAtPrice: variant.compareAtPrice ? {
              amount: variant.compareAtPrice.amount.toString(),
              currencyCode: variant.compareAtPrice.currencyCode
            } : undefined,
            image: {
              url: variant.image?.url || '',
              altText: variant.image?.altText || ''
            },
            sellingPlanAllocations: {
              edges: []
            }
          }
        }))
      },
      priceRange: {
        minVariantPrice: {
          amount: selectedVariant.price.amount.toString(),
          currencyCode: selectedVariant.price.currencyCode
        },
        maxVariantPrice: {
          amount: selectedVariant.price.amount.toString(),
          currencyCode: selectedVariant.price.currencyCode
        }
      }
    };
    
    const variants = product.variants.edges.map(edge => edge.node);
    const images = product.media.edges
      .filter(edge => edge.node.__typename === 'MediaImage' && edge.node.image)
      .map(edge => edge.node.image!);

    console.log('Successfully fetched product from Shopify legacy API');
    return (
      <ProductPageClient 
        product={product} 
        variants={variants} 
        images={images}
      />
    );
  } catch (error) {
    console.error('Error fetching product from Shopify, using fallback:', error);
    
    // Use fallback data
    const variants = fallbackProduct.variants.edges.map(edge => edge.node);
    const images = fallbackProduct.media.edges
      .filter(edge => edge.node.__typename === 'MediaImage' && edge.node.image)
      .map(edge => edge.node.image!);

    return (
      <ProductPageClient 
        product={fallbackProduct} 
        variants={variants} 
        images={images}
      />
    );
  }
}