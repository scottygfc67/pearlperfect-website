# Shopify Storefront Integration

This project includes a complete Shopify Storefront API integration for e-commerce functionality.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION=2024-01
```

## Features Implemented

### 1. GraphQL Client (`/lib/shopify.ts`)
- Complete Storefront API client
- Type-safe GraphQL queries and mutations
- Error handling for userErrors
- Helper functions for products and cart operations

### 2. Cart Management (`/lib/cart-cookie.ts`)
- Client and server-side cart ID persistence
- Cookie-based cart storage
- LocalStorage fallback for client-side

### 3. API Routes
- `/api/cart/create` - Create new cart
- `/api/cart/add` - Add items to cart
- `/api/cart/update` - Update cart line quantities
- `/api/cart/remove` - Remove items from cart
- `/api/cart/get` - Retrieve cart data

### 4. Product Page (`/app/product/[handle]/page.tsx`)
- Dynamic product pages by handle
- Server-side rendering with Next.js
- Image optimization with Next/Image
- Product details, benefits, and ingredients sections

### 5. BuyBox Component (`/components/BuyBox.tsx`)
- Variant selection
- Quantity controls
- Add to cart functionality
- Buy now (direct checkout)
- Price display with compare-at pricing
- Selling plans support
- Analytics integration

### 6. MiniCart Component (`/components/MiniCart.tsx`)
- Slide-over cart drawer
- Real-time cart updates
- Quantity modification
- Item removal
- Checkout redirection
- Trust indicators

### 7. StickyATC Component (`/components/StickyAtcBar.tsx`)
- Mobile-optimized sticky add-to-cart
- Appears after 35% scroll
- Quick add to cart functionality
- Intersection Observer API

## Usage

### Test Product Page
Visit `/product/v34-teeth-whitening-strips` to test the product page functionality.

### Cart Operations
- Add items to cart via BuyBox or StickyATC
- View cart by clicking cart icon in navbar
- Update quantities or remove items in MiniCart
- Proceed to checkout via "Buy Now" or cart checkout

### Analytics
The integration includes Google Analytics 4 events:
- `view_item` - Product page views
- `select_item` - Variant selection
- `add_to_cart` - Add to cart actions
- `begin_checkout` - Checkout initiation

## Error Handling

All API operations include comprehensive error handling:
- GraphQL errors are caught and displayed
- UserErrors from Shopify are properly handled
- Network errors are gracefully managed
- Fallback cart permalink for emergency use

## Security

- Storefront Access Token is server-side only
- Cart operations are validated
- CSRF protection via Next.js API routes
- Secure cookie configuration

## Performance

- Server-side rendering for product pages
- Image optimization with Next/Image
- Efficient cart state management
- Minimal re-renders with React optimization
- Lazy loading for cart drawer

## Testing

1. Set up your Shopify store with Storefront API access
2. Add environment variables
3. Create a test product with handle `v34-teeth-whitening-strips`
4. Test cart functionality and checkout flow
