import 'server-only';

const SHOP = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!; // This should be an Admin token (shpat_...)
const VERSION = '2025-07';

const ADMIN_ENDPOINT = `https://${SHOP}/admin/api/${VERSION}/graphql.json`;

export async function adminFallback<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(ADMIN_ENDPOINT, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Admin HTTP ${res.status}: ${text}`);

  const data = JSON.parse(text);
  if (data.errors) throw new Error(`Admin GraphQL: ${JSON.stringify(data.errors)}`);
  return data.data as T;
}

// Admin API query to search products by handle
export const ADMIN_PRODUCT_SEARCH = /* GraphQL */ `
  query AdminProductSearch($query: String!) {
    products(first: 1, query: $query) {
      nodes {
        id
        handle
        title
        description
        status
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          nodes {
            url
            altText
          }
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price
            compareAtPrice
            image {
              url
              altText
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export async function getProductByHandleFallback(handle: string) {
  try {
    const data = await adminFallback<{ products: { nodes: any[] } }>(
      ADMIN_PRODUCT_SEARCH,
      { query: `handle:${handle}` }
    );
    
    if (!data.products.nodes.length) {
      return null;
    }

    const product = data.products.nodes[0];
    const firstVariant = product.variants.nodes[0];
    const featuredImage = product.featuredImage || product.images.nodes[0] || null;

    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      featuredImage,
      images: { nodes: product.images.nodes },
      priceRange: product.priceRangeV2,
      compareAtPriceRange: product.compareAtPriceRange,
      variants: { nodes: product.variants.nodes },
    };
  } catch (error) {
    console.error('Admin fallback error:', error);
    return null;
  }
}
