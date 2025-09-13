// Test function to verify checkout URLs are generated correctly
export function testCheckoutUrl(variantId: string, quantity = 1): string {
  // Extract numeric variant ID from GraphQL ID
  const numericId = variantId.split('/').pop();
  if (!numericId) {
    throw new Error('Invalid variant ID');
  }

  // Get shop domain from environment
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!shopDomain) {
    throw new Error('Shop domain not configured');
  }

  // Create direct Shopify checkout URL
  return `https://${shopDomain}/cart/${numericId}:${quantity}`;
}

// Example usage:
// const testUrl = testCheckoutUrl('gid://shopify/ProductVariant/51494960857426', 2);
// console.log('Checkout URL:', testUrl);
// Expected: https://your-shop.myshopify.com/cart/51494960857426:2
