import 'server-only';

const SHOP = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? '2025-07';

if (!SHOP) {
  throw new Error('Missing Shopify store domain');
}

const ENDPOINT = `https://${SHOP}/api/${VERSION}/graphql.json`;

// Optional: include buyer IP for server-side requests to preserve logged-in experience
// (especially relevant before redirecting to checkout).
// https://shopify.dev/.../cart/manage#step-7-retrieve-a-checkout-url
export async function sf<T>(query: string, variables?: Record<string, any>, buyerIp?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(buyerIp ? { 'Shopify-Storefront-Buyer-IP': buyerIp } : {}),
  };

  // Only add token if it's a valid Storefront token (starts with shpca_)
  if (TOKEN && TOKEN.startsWith('shpca_')) {
    headers['X-Shopify-Storefront-Access-Token'] = TOKEN;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    // Cache product queries effectively; mark cart/checkout as no-store.
    cache: 'no-store',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Storefront HTTP ${res.status}: ${text}`);

  const data = JSON.parse(text);
  if (data.errors) throw new Error(`Storefront GraphQL: ${JSON.stringify(data.errors)}`);
  return data.data as T;
}
