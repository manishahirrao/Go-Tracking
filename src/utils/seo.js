// SEO utility functions for dynamic meta tags and structured data

export const updateMetaTags = (metaData) => {
  // Update page title
  if (metaData.title) {
    document.title = metaData.title;
  }

  // Update or create meta tags
  const updateMetaTag = (name, content, property = null) => {
    const tagName = property ? 'property' : 'name';
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    
    let meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(tagName, name);
      document.head.appendChild(meta);
    }
    
    if (content) {
      meta.setAttribute('content', content);
    }
  };

  // Update basic meta tags
  updateMetaTag('description', metaData.description);
  updateMetaTag('keywords', metaData.keywords);
  updateMetaTag('author', metaData.author);

  // Update Open Graph tags
  updateMetaTag('og:type', metaData.ogType || 'article', 'property');
  updateMetaTag('og:title', metaData.title, 'property');
  updateMetaTag('og:description', metaData.description, 'property');
  updateMetaTag('og:url', metaData.url, 'property');
  updateMetaTag('og:image', metaData.image, 'property');
  updateMetaTag('og:site_name', 'Australia Post Tracking Helper', 'property');

  // Update Twitter Card tags
  updateMetaTag('twitter:card', metaData.twitterCard || 'summary_large_image', 'property');
  updateMetaTag('twitter:title', metaData.title, 'property');
  updateMetaTag('twitter:description', metaData.description, 'property');
  updateMetaTag('twitter:image', metaData.image, 'property');

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  if (metaData.url) {
    canonical.setAttribute('href', metaData.url);
  }
};

export const createArticleStructuredData = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image || "/logo-black.png",
    "author": {
      "@type": "Organization",
      "name": "Australia Post Tracking Helper"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Australia Post Tracking Helper",
      "logo": {
        "@type": "ImageObject",
        "url": "https://australiaposttracking.online/logo-black.png"
      }
    },
    "datePublished": article.date || "2025-12-21",
    "dateModified": article.date || "2025-12-21",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://australiaposttracking.online/blog/${article.slug}`
    },
    "articleSection": article.category,
    "keywords": article.keywords || `${article.category}, Australia Post, postal service`
  };
};

export const createBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  };
};

export const addStructuredData = (structuredData) => {
  // Remove existing structured data of the same type
  const existingScript = document.querySelector(`script[type="application/ld+json"][data-structured-data="${structuredData['@type']}"]`);
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-structured-data', structuredData['@type']);
  script.textContent = JSON.stringify(structuredData, null, 2);
  document.head.appendChild(script);
};

export const generateArticleMeta = (article) => {
  const baseUrl = 'https://australiaposttracking.online';
  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  
  return {
    title: `${article.title} | Australia Post Tracking Helper`,
    description: article.excerpt,
    keywords: `${article.category}, Australia Post, ${article.title}, postal service, tracking`,
    author: 'Australia Post Tracking Helper',
    url: articleUrl,
    image: article.image || '/logo-black.png',
    ogType: 'article',
    twitterCard: 'summary_large_image'
  };
};
