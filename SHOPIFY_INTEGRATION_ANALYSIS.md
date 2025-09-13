PearlPerfect × Shopify Integration — Fix & Hardening Guide

Last updated: 11 September 2025 (Europe/London)

This document is a drop‑in, end‑to‑end plan to get PearlPerfect’s headless Next.js site reliably pulling product data from Shopify and sending buyers to a working checkout. It replaces brittle Admin‑API calls with the Storefront API for all buyer‑facing reads and leverages the Cart API for checkout.

TL;DR (what to change right now)

Use the Storefront API for product data & checkout.

Query products with product(handle: "...") (note: productByHandle is deprecated). 
Shopify

Create carts and redirect using cartCreate / checkoutUrl. 
Shopify

Fix environment variables & rotate tokens.

Rename typos, stop using an Admin token where a Storefront token is required.

Do not expose tokens with NEXT_PUBLIC_.

Remove the /cart/${variantId}:${qty} hack from BuyBox. Use a server action that calls cartCreate and redirects to checkoutUrl. 
Shopify

If you still use the Admin API on the server, search products by handle via products(query: "handle:...") (Admin GraphQL) — never from the client. 
Shopify

1) Architecture & Responsibilities
Concern	API	Runs	Notes
Product/catalog reads for the storefront	Storefront GraphQL	Server (RSC/Route Handlers)	product(handle: ...), products, localized prices via @inContext. 
Shopify

Cart + Checkout redirect	Storefront Cart API	Server Actions	cartCreate → checkoutUrl. 
Shopify

Back‑office admin tasks (write/update)	Admin GraphQL	Server‑only	If needed, query via products(query: "handle:..."). 
Shopify

Heads‑up: Storefront results only include items published to the relevant catalogs/markets. If a product isn’t published to your Headless channel / market, product(handle: ...) returns null. 
Shopify

2) Environment Variables (correct & secure)

.env.local

# Public data only
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=b0h6m2-2c.myshopify.com

# Server‑only tokens (NEVER prefix with NEXT_PUBLIC_)
SHOPIFY_STOREFRONT_API_TOKEN=*** # Private access token from Headless channel
SHOPIFY_ADMIN_API_TOKEN=***       # Admin access token (if you still need Admin)

# Optional: pin API versions explicitly
SHOPIFY_STOREFRONT_API_VERSION=2025-07
SHOPIFY_ADMIN_API_VERSION=2025-07


Fixes vs current setup

SHOPFIY_API_KEY → SHOPIFY_API_KEY (if still used elsewhere).

SHOPIFY_VARIENT_ID → SHOPIFY_VARIANT_ID (if you keep it).

Replace any Storefront calls using an Admin token with a Storefront token (X‑Shopify‑Storefront‑Access‑Token). 
Shopify

If any token has been checked into logs or pasted in issues, rotate it now. You generate Storefront tokens by installing the Headless channel and creating a storefront there. 
Shopify

3) Minimal, robust Storefront client

Create lib/shopify/storefront.ts (server‑only module).

// lib/shopify/storefront.ts
import 'server-only';

const SHOP = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
const VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? '2025-07';

if (!SHOP || !TOKEN) {
  throw new Error('Missing Shopify Storefront env vars');
}

const ENDPOINT = `https://${SHOP}/api/${VERSION}/graphql.json`;

// Optional: include buyer IP for server-side requests to preserve logged-in experience
// (especially relevant before redirecting to checkout).
// https://shopify.dev/.../cart/manage#step-7-retrieve-a-checkout-url
export async function sf<T>(query: string, variables?: Record<string, any>, buyerIp?: string): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    // Cache product queries effectively; mark cart/checkout as no-store.
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
      ...(buyerIp ? { 'Shopify-Storefront-Buyer-IP': buyerIp } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Storefront HTTP ${res.status}: ${text}`);

  const data = JSON.parse(text);
  if (data.errors) throw new Error(`Storefront GraphQL: ${JSON.stringify(data.errors)}`);
  return data.data as T;
}


Why: Uses the correct header for the Storefront API; keeps tokens server‑only; allows passing Shopify-Storefront-Buyer-IP when helpful. 
Shopify

4) Product query by handle (Storefront)

Create lib/shopify/queries.ts:

// lib/shopify/queries.ts
export const PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!, $country: CountryCode = GB) @inContext(country: $country) {
    product(handle: $handle) {  # productByHandle is deprecated; use product(handle: ...) instead
      id
      handle
      title
      description
      featuredImage { url altText }
      images(first: 10) { nodes { url altText } }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      compareAtPriceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price { amount currencyCode }          # MoneyV2 in Storefront
          compareAtPrice { amount currencyCode } # MoneyV2 in Storefront
          image { url altText }
          selectedOptions { name value }
        }
      }
    }
  }
`;


The modern Storefront query is product(handle: ...); productByHandle is deprecated. 
Shopify

Create lib/shopify/products.ts:

// lib/shopify/products.ts
import { sf } from './storefront';
import { PRODUCT_BY_HANDLE } from './queries';

export type Money = { amount: string; currencyCode: string };
export type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money | null;
  image?: { url: string; altText: string | null } | null;
  selectedOptions: { name: string; value: string }[];
};
export type StorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage?: { url: string; altText: string | null } | null;
  images: { nodes: { url: string; altText: string | null }[] };
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPriceRange?: { minVariantPrice: Money; maxVariantPrice: Money } | null;
  variants: { nodes: Variant[] };
};

export async function getProductByHandle(handle: string, buyerIp?: string) {
  const data = await sf<{ product: StorefrontProduct | null }>(
    PRODUCT_BY_HANDLE,
    { handle, country: 'GB' },
    buyerIp,
  );
  return data.product;
}

5) Checkout the right way (Cart API + redirect)

Do not build /cart/${variantId}:${qty} URLs from your component state.

Those links expect numeric variant IDs tied to Shopify’s Online Store channel and easily mismatch with GraphQL GIDs (or base64 IDs), causing broken carts.

The Storefront Cart API returns a definitive checkoutUrl. Use that. 
Shopify

Create lib/shopify/cart.ts:

// lib/shopify/cart.ts
import { sf } from './storefront';

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!], $buyerIp: String) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

type CartCreateRes = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
};

export async function startCheckout(variantId: string, quantity = 1, buyerIp?: string) {
  const data = await sf<CartCreateRes>(
    CART_CREATE,
    { lines: [{ quantity, merchandiseId: variantId }] },
    buyerIp,
  );

  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) throw new Error(`Cart errors: ${JSON.stringify(userErrors)}`);
  if (!cart?.checkoutUrl) throw new Error('No checkoutUrl returned');

  return cart.checkoutUrl;
}

6) Wire it into your Next.js 15 app
6.1 Page (server component)

app/products/v34-teeth-whitening-strips/page.tsx

import { getProductByHandle } from '@/lib/shopify/products';
import ProductPageClient from '../../product/[handle]/ProductPageClient';

export const dynamic = 'force-dynamic'; // ensure fresh data during development

export async function generateMetadata() {
  const product = await getProductByHandle('v34-teeth-whitening-strips');
  if (product) {
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.featuredImage?.url ?? product.images.nodes[0]?.url].filter(Boolean),
      },
    };
  }
  return {
    title: 'PearlPerfect V34 Teeth Whitening Strips',
    description: 'Professional-grade teeth whitening strips that deliver visible results in just 14 minutes.',
  };
}

export default async function ProductPage() {
  const product = await getProductByHandle('v34-teeth-whitening-strips');
  if (!product) {
    // Render a polite fallback + instructions to publish product to the headless channel/market.
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            <strong>⚠️ Product not available via Storefront API.</strong> 
            Ensure it’s published to your Headless channel and target market.
          </p>
        </div>
      </main>
    );
  }

  // Adapt to the client component’s expected shape
  const firstImage = product.featuredImage ?? product.images.nodes[0] ?? null;
  const firstVariant = product.variants.nodes[0];

  const adapted = {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    availableForSale: firstVariant?.availableForSale ?? false,
    priceRange: product.priceRange,
    compareAtPriceRange: product.compareAtPriceRange ?? undefined,
    featuredImage: firstImage,
    images: product.images.nodes,
    variants: product.variants.nodes.map((v) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      price: v.price,
      compareAtPrice: v.compareAtPrice ?? undefined,
      image: v.image ?? undefined,
      selectedOptions: v.selectedOptions ?? [],
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <ProductPageClient
        product={adapted}
        selectedVariantId={firstVariant?.id}
      />
    </main>
  );
}

6.2 Server action for “Buy Now”

Create app/actions/checkout.ts:

'use server';

import { headers } from 'next/headers';
import { startCheckout } from '@/lib/shopify/cart';
import { redirect } from 'next/navigation';

export async function buyNowAction(variantId: string, quantity = 1) {
  // Best-effort buyer IP forwarding for Shopify to preserve logged-in experience.
  const buyerIp =
    headers().get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers().get('x-real-ip') ??
    undefined;

  const url = await startCheckout(variantId, quantity, buyerIp);
  redirect(url);
}

6.3 Component changes (components/BuyBox.tsx)

Replace the old createCheckoutUrl usage with the server action:

'use client';

import { useTransition } from 'react';
import { buyNowAction } from '@/app/actions/checkout';

export function BuyBox({ product, selectedVariant }: { product: any; selectedVariant: any }) {
  const [pending, startTransition] = useTransition();

  const onBuyNow = () => {
    if (!selectedVariant?.id) return;
    startTransition(async () => {
      try {
        await buyNowAction(selectedVariant.id, 1);
      } catch (e) {
        console.error(e);
        alert('Failed to start checkout. Please try again.');
      }
    });
  };

  // ...render button using `pending` for loading state
}


This removes the brittle /cart/${variant}:${qty} URL builder entirely and uses Shopify’s official checkoutUrl. 
Shopify

7) (Optional) Keep Admin API reads server‑side only

If you truly need Admin reads (e.g., dashboard tooling), keep your Admin client separate and server‑only:

// lib/shopify/admin.ts
import 'server-only';

const SHOP = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;
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


Admin search supports query: "handle:the-handle" and many other filters. Keep this on the server. 
Shopify

8) Publication, markets & permissions checklist

Headless/Storefront setup

Install Headless channel → create a storefront → copy private Storefront token. 
Shopify

Grant permissions (Products, Collections, Cart, etc.). 
Shopify

Publish product

Ensure the product is published to the Headless channel and the target market (e.g., GB). Otherwise product(handle: ...) returns null. 
Shopify

API version pinning

Pin to a stable version (2025-07 is current latest stable at time of writing). Don’t use release candidates in prod. 
Shopify

9) Error → Cause → Fix
Error	Likely Cause	Fix
401 UNAUTHORIZED (Storefront)	Using Admin token with Storefront endpoint or wrong header	Use X‑Shopify‑Storefront‑Access‑Token with a Storefront token. 
Shopify

403 ACCESS_DENIED (Admin)	Token scopes or wrong endpoint	Ensure Admin token scopes & endpoint /admin/api/{ver}/graphql.json. 
Shopify

GraphQL: Field 'product' is missing required arguments or doesn't accept 'handle'	Hitting Admin schema with a Storefront query	For Admin, use products(query: "handle:..."); for Storefront, use product(handle: ...). 
Shopify
+1

Cart URL opens empty or 404	Passing GraphQL IDs into /cart/{id}:{qty}	Use Cart API cartCreate → checkoutUrl instead. 
Shopify

Product not found on Storefront	Not published to Headless channel/market	Publish & re-test; Storefront only returns published items. 
Shopify
10) Testing recipes
Quick cURL (Storefront)
curl -X POST "https://$NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN/api/2025-07/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: $SHOPIFY_STOREFRONT_API_TOKEN" \
  -d '{"query":"query($h:String!){ product(handle:$h){ id title handle }}","variables":{"h":"v34-teeth-whitening-strips"}}'

# One-shot checkout
curl -X POST "https://$NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN/api/2025-07/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: $SHOPIFY_STOREFRONT_API_TOKEN" \
  -d '{"query":"mutation($id:ID!){ cartCreate(input:{lines:[{merchandiseId:$id,quantity:1}]}){ cart{ checkoutUrl } userErrors{ message } }}","variables":{"id":"gid://shopify/ProductVariant/XXXXXXXX"}}'

11) Production hygiene

Never log tokens or full responses; scrub sensitive fields.

Rotate the token that was exposed in issue threads. 
Shopify

Add basic retry/backoff on sf() for transient 5xx.

Cache product reads with revalidateTag('product:HANDLE') if you add ISR; keep cart calls no-store.

Add Sentry (or similar) and redact headers.

12) Remove/Refactor legacy code

Delete/retire lib/shopify-admin.ts as the data source for product pages. Keep a separate Admin client (lib/shopify/admin.ts) only if you need it server‑side.

Replace createCheckoutUrl (string concat) with the server action buyNowAction.

Ensure no Storefront/Admin tokens appear in client bundles.

13) Appendix — Full GraphQL snippets (copy/paste)

Storefront: product by handle (stable)

query ProductByHandle($handle: String!, $country: CountryCode = GB) @inContext(country: $country) {
  product(handle: $handle) {
    id
    handle
    title
    description
    featuredImage { url altText }
    images(first: 10) { nodes { url altText } }
    priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
    variants(first: 20) {
      nodes {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { url altText }
        selectedOptions { name value }
      }
    }
  }
}


Reference: Storefront product query & examples. 
Shopify

Storefront: cart create → checkout url

mutation CartCreate($lines: [CartLineInput!]) {
  cartCreate(input: { lines: $lines }) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}


Reference: Cart API flow & checkoutUrl. 
Shopify

Admin: search by handle (server‑only)

query AdminSearch($q: String!) {
  products(first: 1, query: $q) {
    nodes { id handle title variants(first: 1) { nodes { id title } } }
  }
}


Reference: Admin products(query: "...") filter supports handle:. 
Shopify

14) Migration plan (step‑by‑step)

Rotate tokens and create a Storefront token via Headless channel. Update .env.local. 
Shopify

Add lib/shopify/storefront.ts, lib/shopify/queries.ts, lib/shopify/products.ts, lib/shopify/cart.ts.

Update app/products/v34-teeth-whitening-strips/page.tsx to use Storefront getProductByHandle.

Create app/actions/checkout.ts and wire BuyBox to call buyNowAction.

Delete the legacy createCheckoutUrl and stop using Admin API on the product page.

Publish the product to the Headless channel & GB market. Re-test product query. 
Shopify

Verify checkout by buying a single unit; verify redirect to Shopify web checkout.

15) Why this works (and will keep working)

Product fetching uses the supported Storefront product(handle: ...) query (the productByHandle alias is deprecated). 
Shopify

Checkout uses the Cart API and redirects via Shopify’s own checkoutUrl (no brittle ID formats or store‑channel coupling). 
Shopify

Admin API remains server‑only and only for back‑office tasks; searching by handle uses the documented products(query: "handle:..."). 
Shopify

API versions are pinned to a stable release, per Shopify’s versioning guidance. 
Shopify

If you follow the steps above, PearlPerfect’s product pages will fetch correctly from Shopify and “Buy Now” will route buyers into a valid, Shopify‑hosted checkout — reliably and safely.