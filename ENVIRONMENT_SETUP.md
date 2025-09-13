# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Shopify Store Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token

# Product Configuration
SHOPIFY_PRODUCT_ID=your_product_id
SHOPIFY_VARIANT_ID=your_variant_id
```

## How to Get These Values

### 1. Shopify Store Domain
- Format: `your-store-name.myshopify.com`
- Found in your Shopify admin URL

### 2. Storefront Access Token
1. Go to your Shopify admin
2. Navigate to **Settings > Apps and sales channels**
3. Click **Develop apps**
4. Create a new app or use existing
5. Go to **Configuration > Storefront API access**
6. Enable all scopes
7. Click **Save**
8. Go to **API credentials** tab
9. Copy the **Storefront access token**

### 3. Product ID and Variant ID
1. Go to your Shopify admin
2. Navigate to **Products**
3. Click on your product
4. In the URL, you'll see the product ID
5. For variant ID, click on a specific variant and check the URL

## Important Notes

- **DO NOT** commit `.env.local` to version control
- Make sure there are **NO SPACES** around the `=` sign
- The `NEXT_PUBLIC_` prefix makes the variable available in the browser
- Restart your development server after adding environment variables

## Testing

After setting up your environment variables:

1. Run `npm run dev`
2. Visit `http://localhost:3000/products/v34-teeth-whitening-strips`
3. The product should load from your Shopify store
4. Test the "Add to Cart" and "Buy Now" functionality
