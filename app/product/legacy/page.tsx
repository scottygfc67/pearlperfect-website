import { getProductById, toGid } from "@/lib/shopify-legacy";
import LegacyProductView from "@/components/LegacyProductView";

export default async function LegacyProductPage() {
  // Check for required environment variables
  const missingEnvs = [];
  if (!process.env.SHOPIFY_DOMAIN) missingEnvs.push('SHOPIFY_DOMAIN');
  if (!process.env.SHOPIFY_ACCESS_TOKEN) missingEnvs.push('SHOPIFY_ACCESS_TOKEN');
  if (!process.env.SHOPIFY_PRODUCT_ID) missingEnvs.push('SHOPIFY_PRODUCT_ID');

  if (missingEnvs.length > 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-xl font-semibold text-red-800 mb-2">Missing Environment Variables</h1>
          <p className="text-red-600 mb-4">
            The following environment variables are required but not set:
          </p>
          <ul className="list-disc list-inside text-red-600 space-y-1">
            {missingEnvs.map(env => (
              <li key={env}><code className="bg-red-100 px-2 py-1 rounded">{env}</code></li>
            ))}
          </ul>
          <p className="text-red-600 mt-4">
            Please add these to your <code className="bg-red-100 px-2 py-1 rounded">.env.local</code> file.
          </p>
        </div>
      </main>
    );
  }

  try {
    const raw = process.env.SHOPIFY_PRODUCT_ID!;
    const gid = toGid(raw);
    const product = await getProductById(gid);
    
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <LegacyProductView product={product} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h1 className="text-xl font-semibold text-yellow-800 mb-2">Product Not Found</h1>
          <p className="text-yellow-600 mb-4">
            Unable to fetch the product. This could be due to:
          </p>
          <ul className="list-disc list-inside text-yellow-600 space-y-1">
            <li>Invalid <code className="bg-yellow-100 px-2 py-1 rounded">SHOPIFY_PRODUCT_ID</code></li>
            <li>Invalid <code className="bg-yellow-100 px-2 py-1 rounded">SHOPIFY_ACCESS_TOKEN</code></li>
            <li>Product not found in your Shopify store</li>
            <li>Network connectivity issues</li>
          </ul>
          <div className="mt-4 p-4 bg-yellow-100 rounded">
            <p className="text-yellow-800 font-medium">Debug Info:</p>
            <p className="text-yellow-700 text-sm mt-1">
              Product ID: <code>{process.env.SHOPIFY_PRODUCT_ID}</code><br/>
              Store Domain: <code>{process.env.SHOPIFY_DOMAIN}</code><br/>
              Error: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
        </div>
      </main>
    );
  }
}
