
import React, { useEffect } from 'react';
import { db } from '../lib/db';

interface SEOProps {
  pageId: string;
}

const SEO: React.FC<SEOProps> = ({ pageId }) => {
  useEffect(() => {
    const page = db.getPage(pageId);
    if (page) {
      document.title = page.seo.title;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', page.seo.description);
    }
  }, [pageId]);

  return null;
};

export default SEO;
