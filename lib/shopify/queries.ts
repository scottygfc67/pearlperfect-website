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
