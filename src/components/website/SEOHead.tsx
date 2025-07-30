import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  article?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
  product?: {
    price?: string;
    currency?: string;
    availability?: 'in_stock' | 'out_of_stock' | 'preorder';
    brand?: string;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'TIM - This is Mine | Personal Server Solutions',
  description = 'Own your digital infrastructure with TIM personal servers. No cloud, no subscriptions, no compromise. Made in Ireland.',
  keywords = 'personal server, self hosting, privacy, data ownership, home server, ireland, TIM',
  image = '/tim-social-share.jpg',
  url,
  type = 'website',
  article,
  product
}) => {
  const siteTitle = 'TIM - This is Mine';
  const fullTitle = title.includes('TIM') ? title : `${title} | ${siteTitle}`;
  const currentUrl = url || window.location.href;
  const imageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TIM - This is Mine",
    "url": "https://thisismine.io",
    "logo": `${window.location.origin}/tim-logo.png`,
    "description": description,
    "foundingDate": "2024",
    "foundingLocation": {
      "@type": "Place",
      "name": "Dublin, Ireland"
    },
    "sameAs": [
      "https://twitter.com/thisismine_io",
      "https://github.com/thisismine"
    ]
  };

  // Product schema for store pages
  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "TIM"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency || "EUR",
      "availability": `https://schema.org/${product.availability || 'PreOrder'}`,
      "url": currentUrl
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "TIM - This is Mine"
    }
  } : null;

  // Article schema for blog posts
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": article.author || "TIM Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TIM - This is Mine",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/tim-logo.png`
      }
    },
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "image": imageUrl,
    "keywords": article.tags?.join(', ') || keywords
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="TIM - This is Mine" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_IE" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@thisismine_io" />

      {/* Additional Meta Tags for products */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price} />
          <meta property="product:price:currency" content={product.currency || 'EUR'} />
          <meta property="product:availability" content={product.availability || 'preorder'} />
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}

      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="color-scheme" content="dark light" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Performance and Core Web Vitals */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEOHead;