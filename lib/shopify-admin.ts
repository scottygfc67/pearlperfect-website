// Simple Shopify Admin API client
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = `https://${SHOPIFY_DOMAIN}/admin/api/2025-07/graphql.json`;

export interface SimpleProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  image: {
    url: string;
    altText: string;
  };
  availableForSale: boolean;
}

async function shopifyRequest(query: string, variables: any = {}) {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    throw new Error('Missing Shopify credentials');
  }

  console.log('🔍 Shopify Admin API Debug:', {
    domain: SHOPIFY_DOMAIN,
    tokenLength: SHOPIFY_TOKEN?.length,
    endpoint
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Shopify API Error:', response.status, errorText);
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data;
}

export async function getProductByHandle(handle: string): Promise<SimpleProduct | null> {
  // First, search for products by handle
  const searchQuery = `
    query searchProducts($query: String!) {
      products(first: 1, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            status
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price
                  compareAtPrice
                  image {
                    url
                    altText
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(searchQuery, { query: `handle:${handle}` });
    
    if (!data.products.edges.length) {
      return null;
    }

    const product = data.products.edges[0].node;
    const variant = product.variants.edges[0]?.node;
    const image = product.images.edges[0]?.node || { url: '', altText: '' };
    
    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      price: {
        amount: variant?.price || '0.00',
        currencyCode: 'USD'
      },
      compareAtPrice: variant?.compareAtPrice ? {
        amount: variant.compareAtPrice,
        currencyCode: 'USD'
      } : undefined,
      image: image,
      availableForSale: variant?.availableForSale || false,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export function createCheckoutUrl(variantId: string, quantity: number = 1): string {
  const baseUrl = `https://${SHOPIFY_DOMAIN}`;
  return `${baseUrl}/cart/${variantId}:${quantity}`;
}
