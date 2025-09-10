const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION || '2024-04'}/graphql.json`;

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export type LegacyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;
  images: { url: string; altText: string | null; width: number; height: number }[];
  featuredImage?: { url: string; altText: string | null; width: number; height: number };
  priceMin: { amount: number; currencyCode: string };
  priceMax: { amount: number; currencyCode: string };
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: { amount: number; currencyCode: string };
    compareAtPrice?: { amount: number; currencyCode: string } | null;
    image?: { url: string; altText: string | null; width: number; height: number } | null;
    selectedOptions: { name: string; value: string }[];
  }[];
};

// Convert numeric ID to GID format
export function toGid(idOrGid: string): string {
  if (idOrGid.startsWith('gid://')) {
    return idOrGid;
  }
  return `gid://shopify/Product/${idOrGid}`;
}

// Convert variant ID to GID format
export function toVariantGid(idOrGid: string): string {
  if (idOrGid.startsWith('gid://')) {
    return idOrGid;
  }
  return `gid://shopify/ProductVariant/${idOrGid}`;
}

// GraphQL client
async function sfy<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  const domain = process.env.SHOPIFY_DOMAIN;
  
  if (!accessToken) {
    throw new Error('SHOPIFY_ACCESS_TOKEN is not set');
  }
  
  if (!domain) {
    throw new Error('SHOPIFY_DOMAIN is not set');
  }

  console.log('Legacy Shopify API Debug:', {
    endpoint: SHOPIFY_ENDPOINT,
    hasToken: !!accessToken,
    tokenLength: accessToken?.length,
    domain
  });

  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Shopify API Error Response:', errorText);
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const result: ShopifyResponse<T> = await response.json();

  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
  }

  return result.data;
}

// Product query
const PRODUCT_BY_ID_QUERY = `
  query ProductById($id: ID!, $country: CountryCode = US, $lang: LanguageCode = EN) 
  @inContext(country: $country, language: $lang) {
    product(id: $id) {
      id
      title
      handle
      description
      vendor
      availableForSale
      seo { title description }
      featuredImage { url(width:1600) altText width height }
      images(first: 20) {
        edges { node { url(width:1600) altText width height } }
      }
      media(first: 10) {
        edges { node {
          __typename
          ... on MediaImage { image { url(width:1600) altText width height } }
          ... on Video { sources { url mimeType } }
          ... on Model3d { sources { url mimeType } }
        } }
      }
      variants(first: 50) {
        edges { node {
          id
          title
          availableForSale
          sku
          selectedOptions { name value }
          image { url(width:1200) altText width height }
          price: priceV2 { amount currencyCode }
          compareAtPrice: compareAtPriceV2 { amount currencyCode }
        } }
      }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      compareAtPriceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
    }
  }
`;

export async function getProductById(idOrGid: string): Promise<LegacyProduct> {
  const gid = toGid(idOrGid);
  
  const data = await sfy<{ product: any }>(PRODUCT_BY_ID_QUERY, { id: gid });
  
  if (!data.product) {
    throw new Error('Product not found');
  }

  const product = data.product;

  // Build images array - prefer images.edges, fallback to media images
  let images: { url: string; altText: string | null; width: number; height: number }[] = [];
  
  if (product.images?.edges?.length > 0) {
    images = product.images.edges.map((edge: any) => ({
      url: edge.node.url,
      altText: edge.node.altText,
      width: edge.node.width || 1600,
      height: edge.node.height || 1600
    }));
  } else if (product.media?.edges?.length > 0) {
    images = product.media.edges
      .filter((edge: any) => edge.node.__typename === 'MediaImage' && edge.node.image)
      .map((edge: any) => ({
        url: edge.node.image.url,
        altText: edge.node.image.altText,
        width: edge.node.image.width || 1600,
        height: edge.node.image.height || 1600
      }));
  }

  // Build variants
  const variants = product.variants?.edges?.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    availableForSale: edge.node.availableForSale,
    price: {
      amount: parseFloat(edge.node.price.amount),
      currencyCode: edge.node.price.currencyCode
    },
    compareAtPrice: edge.node.compareAtPrice ? {
      amount: parseFloat(edge.node.compareAtPrice.amount),
      currencyCode: edge.node.compareAtPrice.currencyCode
    } : null,
    image: edge.node.image ? {
      url: edge.node.image.url,
      altText: edge.node.image.altText,
      width: edge.node.image.width || 1200,
      height: edge.node.image.height || 1200
    } : null,
    selectedOptions: edge.node.selectedOptions || []
  })) || [];

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description || '',
    availableForSale: product.availableForSale,
    images,
    featuredImage: product.featuredImage ? {
      url: product.featuredImage.url,
      altText: product.featuredImage.altText,
      width: product.featuredImage.width || 1600,
      height: product.featuredImage.height || 1600
    } : undefined,
    priceMin: {
      amount: parseFloat(product.priceRange?.minVariantPrice?.amount || '0'),
      currencyCode: product.priceRange?.minVariantPrice?.currencyCode || 'USD'
    },
    priceMax: {
      amount: parseFloat(product.priceRange?.maxVariantPrice?.amount || '0'),
      currencyCode: product.priceRange?.maxVariantPrice?.currencyCode || 'USD'
    },
    variants
  };
}
