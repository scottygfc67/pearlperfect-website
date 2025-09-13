export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "PearlPerfect V34 Teeth Whitening Strips",
    "description": "Enamel-safe whitening strips with zero sensitivity. Clinically backed results you can see from the first use.",
    "brand": {
      "@type": "Brand",
      "name": "PearlPerfect"
    },
    "image": [
      "https://pearlperfect.com/og-image.jpg",
      "https://pearlperfect.com/product-hero.jpg",
      "https://pearlperfect.com/product-pack.jpg"
    ],
    "offers": {
      "@type": "Offer",
      "url": "https://pearlperfect.com",
      "priceCurrency": "GBP",
      "price": "49.99",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "PearlPerfect"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12842",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewBody": "Incredible results! I've tried so many whitening products and this is by far the best. No sensitivity at all and I could see results after the first use."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Mike R."
        },
        "reviewBody": "Finally found something that works. The strips are easy to apply and stay in place. My wife even noticed the difference after a few days."
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Treatment Time",
        "value": "14 minutes"
      },
      {
        "@type": "PropertyValue",
        "name": "Strips per Box",
        "value": "14"
      },
      {
        "@type": "PropertyValue",
        "name": "Sensitivity Risk",
        "value": "Very Low"
      },
      {
        "@type": "PropertyValue",
        "name": "Enamel Safe",
        "value": "Yes"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
