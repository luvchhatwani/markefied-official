import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  generateJsonLdGraph,
  PAGE_CONFIGS,
  SITE_URL,
  BRAND_NAME,
  LOGO_URL,
} from '../utils/schemaGenerator';

function setMetaTag(selector, attrName, attrValue, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url) {
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath =
      pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

    const config = PAGE_CONFIGS[normalizedPath] || {
      title: `${BRAND_NAME} | Premier Digital Marketing Agency`,
      description:
        'Markefied helps businesses grow online with digital marketing, Google Ads, Meta Ads, and social media marketing that drive leads and sales.',
    };

    const currentUrl = normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`;

    // Update document title
    document.title = config.title;

    // Update standard meta tags
    setMetaTag('meta[name="description"]', 'name', 'description', config.description);

    // Update canonical link
    setCanonical(currentUrl);

    // Update Open Graph tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', config.title);
    setMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      config.description
    );
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', BRAND_NAME);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', LOGO_URL);

    // Update Twitter card tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
    setMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      config.description
    );
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', LOGO_URL);

    // Generate and inject JSON-LD structured data
    const schemaData = generateJsonLdGraph(normalizedPath);
    let scriptTag = document.getElementById('markefied-schema-jsonld');

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'markefied-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(schemaData, null, 2);
  }, [pathname]);

  return null;
}
