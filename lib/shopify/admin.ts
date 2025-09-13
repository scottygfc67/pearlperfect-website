// lib/shopify/admin.ts
import 'server-only';

const SHOP = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const VERSION = process.env.SHOPIFY_ADMIN_API_VERSION ?? '2025-07';
const ENDPOINT = `https://${SHOP}/admin/api/${VERSION}/graphql.json`;

export async function admin<T>(query: string, variables?: Record<string, any>) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Admin HTTP ${res.status}: ${text}`);
  const data = JSON.parse(text);
  if (data.errors) throw new Error(`Admin GraphQL: ${JSON.stringify(data.errors)}`);
  return data.data as T;
}

// Example: search by handle
export const ADMIN_SEARCH = /* GraphQL */ `
  query AdminSearch($q: String!) {
    products(first: 1, query: $q) {
      nodes {
        id
        handle
        title
        variants(first: 1) { nodes { id title } }
        images(first: 1) { nodes { url altText } }
      }
    }
  }
`;
// usage: admin(ADMIN_SEARCH, { q: 'handle:v34-teeth-whitening-strips' });
