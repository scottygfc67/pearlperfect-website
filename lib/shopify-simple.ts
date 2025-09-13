// Simple Shopify Storefront API client
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Debug logging
console.log('🔍 Shopify Config:', {
  domain: SHOPIFY_DOMAIN,
  hasToken: !!SHOPIFY_TOKEN,
  tokenLength: SHOPIFY_TOKEN?.length,
  tokenType: SHOPIFY_TOKEN?.startsWith('shpat_') ? 'Private App (Admin API)' : 
             SHOPIFY_TOKEN?.startsWith('shpca_') ? 'Storefront API' : 'Unknown',
  apiType: 'Admin API'
});

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

export interface SimpleVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  image?: {
    url: string;
    altText: string;
  };
}

async function shopifyRequest(query: string, variables: any = {}) {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    throw new Error('Missing Shopify credentials');
  }

  console.log('🔍 Shopify Debug:', {
    domain: SHOPIFY_DOMAIN,
    tokenLength: SHOPIFY_TOKEN?.length,
    tokenStart: SHOPIFY_TOKEN?.substring(0, 10),
    endpoint
  });

  // Use Admin API with your existing token
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
    
    if (response.status === 401) {
      console.error('❌ 401 Unauthorized - Your Admin API token is not valid');
      console.error('💡 Check your token permissions in:');
      console.error('   Shopify Admin → Settings → Apps → Develop apps → API credentials');
    }
    
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
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
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
  `;

  try {
    const data = await shopifyRequest(query, { handle });
    
    if (!data.product) {
      return null;
    }

    const variant = data.product.variants.edges[0]?.node;
    const image = data.product.images.edges[0]?.node || { url: '', altText: '' };
    
    return {
      id: data.product.id,
      title: data.product.title,
      handle: data.product.handle,
      description: data.product.description,
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

export async function getProductById(id: string): Promise<SimpleProduct | null> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        description
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(query, { id });
    
    if (!data.product) {
      return null;
    }

    const variant = data.product.variants.edges[0]?.node;
    
    return {
      id: data.product.id,
      title: data.product.title,
      handle: data.product.handle,
      description: data.product.description,
      price: data.product.priceRange.minVariantPrice,
      compareAtPrice: data.product.compareAtPriceRange.maxVariantPrice.amount !== data.product.priceRange.minVariantPrice.amount 
        ? data.product.compareAtPriceRange.maxVariantPrice 
        : undefined,
      image: data.product.featuredImage || { url: '', altText: '' },
      availableForSale: data.product.availableForSale,
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
