// Shopify cart management using Storefront API
import { sf } from './shopify/storefront';

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            id: string;
            title: string;
            featuredImage?: {
              url: string;
              altText: string;
            };
          };
          image?: {
            url: string;
            altText: string;
          };
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }>;
  };
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

// Create a new cart
export async function createCart(lines: CartLineInput[] = []): Promise<{ cartId: string; checkoutUrl: string }> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lines.map(line => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
        sellingPlanId: line.sellingPlanId
      }))
    }
  };

  const response = await sf<{
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
      };
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(mutation, variables);

  if (response.cartCreate.userErrors.length > 0) {
    throw new Error(response.cartCreate.userErrors[0].message);
  }

  return {
    cartId: response.cartCreate.cart.id,
    checkoutUrl: response.cartCreate.cart.checkoutUrl
  };
}

// Add lines to cart
export async function addLines(cartId: string, lines: CartLineInput[]): Promise<{ cartId: string; checkoutUrl: string }> {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: lines.map(line => ({
      merchandiseId: line.merchandiseId,
      quantity: line.quantity,
      sellingPlanId: line.sellingPlanId
    }))
  };

  console.log('Adding lines to cart:', { cartId, variables });

  const response = await sf<{
    cartLinesAdd: {
      cart: {
        id: string;
        checkoutUrl: string;
      };
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(mutation, variables);

  if (response.cartLinesAdd.userErrors.length > 0) {
    throw new Error(response.cartLinesAdd.userErrors[0].message);
  }

  return {
    cartId: response.cartLinesAdd.cart.id,
    checkoutUrl: response.cartLinesAdd.cart.checkoutUrl
  };
}

// Get cart details
export async function getCart(cartId: string): Promise<Cart> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    featuredImage {
                      url
                      altText
                    }
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
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const response = await sf<{
    cart: Cart;
  }>(query, { cartId });

  return response.cart;
}

// Update cart line
export async function updateLines(cartId: string, lines: Array<{ id: string; quantity: number }>): Promise<{ cartId: string; checkoutUrl: string }> {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: lines.map(line => ({
      id: line.id,
      quantity: line.quantity
    }))
  };

  const response = await sf<{
    cartLinesUpdate: {
      cart: {
        id: string;
        checkoutUrl: string;
      };
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(mutation, variables);

  if (response.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(response.cartLinesUpdate.userErrors[0].message);
  }

  return {
    cartId: response.cartLinesUpdate.cart.id,
    checkoutUrl: response.cartLinesUpdate.cart.checkoutUrl
  };
}

// Remove lines from cart
export async function removeLines(cartId: string, lineIds: string[]): Promise<{ cartId: string; checkoutUrl: string }> {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lineIds
  };

  const response = await sf<{
    cartLinesRemove: {
      cart: {
        id: string;
        checkoutUrl: string;
      };
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(mutation, variables);

  if (response.cartLinesRemove.userErrors.length > 0) {
    throw new Error(response.cartLinesRemove.userErrors[0].message);
  }

  return {
    cartId: response.cartLinesRemove.cart.id,
    checkoutUrl: response.cartLinesRemove.cart.checkoutUrl
  };
}
