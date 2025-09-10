const SHOPIFY_ENDPOINT = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

interface UserError {
  field: string[];
  message: string;
}


// GraphQL client
async function sfy<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  
  if (!accessToken) {
    throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set');
  }
  
  if (!storeDomain) {
    throw new Error('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set');
  }

  console.log('Shopify API Debug:', {
    endpoint: SHOPIFY_ENDPOINT,
    hasToken: !!accessToken,
    tokenLength: accessToken?.length,
    storeDomain
  });

  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const result: ShopifyResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
  }

  return result.data;
}

// Product query
const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle:String!, $country:CountryCode=US, $lang:LanguageCode=EN) @inContext(country:$country, language:$lang) {
    product(handle:$handle) {
      id title handle vendor description
      seo { title description }
      featuredImage { url altText }
      media(first:12) {
        edges { node {
          __typename
          ... on MediaImage { image { url(precision:FULL,width:1600) altText } }
          ... on Video { sources { url mimeType } }
        } }
      }
      options { name values }
      variants(first:50) { edges { node {
        id title availableForSale sku
        selectedOptions { name value }
        price: priceV2 { amount currencyCode }
        compareAtPrice: compareAtPriceV2 { amount currencyCode }
        image { url(width:1200) altText }
        sellingPlanAllocations(first:10) { edges { node { sellingPlan { id name } } } }
      } } }
    }
  }
`;

// Cart mutations
const CART_CREATE_MUTATION = `
  mutation CartCreate($lines:[CartLineInput!]) {
    cartCreate(input:{lines:$lines}) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId:ID!, $lines:[CartLineInput!]!) {
    cartLinesAdd(cartId:$cartId, lines:$lines) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId:ID!, $lines:[CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId:$cartId, lines:$lines) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId:ID!, $lineIds:[ID!]!) {
    cartLinesRemove(cartId:$cartId, lineIds:$lineIds) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`;

const CART_QUERY = `
  query CartQuery($cartId:ID!) {
    cart(id:$cartId) {
      id checkoutUrl totalQuantity
      cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
      lines(first:100) { edges { node {
        id quantity
        merchandise { ... on ProductVariant {
          id title
          image { url altText }
          product { title handle }
          price: priceV2 { amount currencyCode }
        } }
      } } }
    }
  }
`;

// Types
export interface Product {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  description: string;
  seo: {
    title: string;
    description: string;
  };
  featuredImage: {
    url: string;
    altText: string;
  };
  media: {
    edges: Array<{
      node: {
        __typename: string;
        image?: {
          url: string;
          altText: string;
        };
        sources?: Array<{
          url: string;
          mimeType: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  sku: string;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
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
  sellingPlanAllocations: {
    edges: Array<{
      node: {
        sellingPlan: {
          id: string;
          name: string;
        };
      };
    }>;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image: {
      url: string;
      altText: string;
    };
    product: {
      title: string;
      handle: string;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
  sellingPlanId?: string;
}

// Helper functions
export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const result = await sfy<{ product: Product | null }>(PRODUCT_BY_HANDLE_QUERY, { handle });
    return result.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createCart(lines?: CartLineInput[]): Promise<{ cartId: string; checkoutUrl: string; totalQuantity: number }> {
  const result = await sfy<{
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
        totalQuantity: number;
      };
      userErrors: UserError[];
    };
  }>(CART_CREATE_MUTATION, { lines: lines || [] });

  if (result.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${result.cartCreate.userErrors.map(e => e.message).join(', ')}`);
  }

  return {
    cartId: result.cartCreate.cart.id,
    checkoutUrl: result.cartCreate.cart.checkoutUrl,
    totalQuantity: result.cartCreate.cart.totalQuantity
  };
}

export async function addLines(cartId: string, lines: CartLineInput[]): Promise<{ cartId: string; checkoutUrl: string; totalQuantity: number }> {
  const result = await sfy<{
    cartLinesAdd: {
      cart: {
        id: string;
        checkoutUrl: string;
        totalQuantity: number;
      };
      userErrors: UserError[];
    };
  }>(CART_LINES_ADD_MUTATION, { cartId, lines });

  if (result.cartLinesAdd.userErrors.length > 0) {
    throw new Error(`Add lines failed: ${result.cartLinesAdd.userErrors.map(e => e.message).join(', ')}`);
  }

  return {
    cartId: result.cartLinesAdd.cart.id,
    checkoutUrl: result.cartLinesAdd.cart.checkoutUrl,
    totalQuantity: result.cartLinesAdd.cart.totalQuantity
  };
}

export async function updateLines(cartId: string, lines: CartLineUpdateInput[]): Promise<{ cartId: string; checkoutUrl: string; totalQuantity: number }> {
  const result = await sfy<{
    cartLinesUpdate: {
      cart: {
        id: string;
        checkoutUrl: string;
        totalQuantity: number;
      };
      userErrors: UserError[];
    };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines });

  if (result.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(`Update lines failed: ${result.cartLinesUpdate.userErrors.map(e => e.message).join(', ')}`);
  }

  return {
    cartId: result.cartLinesUpdate.cart.id,
    checkoutUrl: result.cartLinesUpdate.cart.checkoutUrl,
    totalQuantity: result.cartLinesUpdate.cart.totalQuantity
  };
}

export async function removeLines(cartId: string, lineIds: string[]): Promise<{ cartId: string; checkoutUrl: string; totalQuantity: number }> {
  const result = await sfy<{
    cartLinesRemove: {
      cart: {
        id: string;
        checkoutUrl: string;
        totalQuantity: number;
      };
      userErrors: UserError[];
    };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds });

  if (result.cartLinesRemove.userErrors.length > 0) {
    throw new Error(`Remove lines failed: ${result.cartLinesRemove.userErrors.map(e => e.message).join(', ')}`);
  }

  return {
    cartId: result.cartLinesRemove.cart.id,
    checkoutUrl: result.cartLinesRemove.cart.checkoutUrl,
    totalQuantity: result.cartLinesRemove.cart.totalQuantity
  };
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const result = await sfy<{ cart: Cart | null }>(CART_QUERY, { cartId });
    return result.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

// Fallback cart permalink
export const cartPermalink = (domain: string, items: { variantId: string; qty: number }[]) =>
  `https://${domain}/cart/` + items.map(i => `${i.variantId}:${i.qty}`).join(',');
