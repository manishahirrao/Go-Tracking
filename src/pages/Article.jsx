import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleBySlug, getArticlesByCategory } from '../data/articles';
import { Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { updateMetaTags, createArticleStructuredData, addStructuredData, generateArticleMeta } from '../utils/seo';

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = () => {
      const foundArticle = getArticleBySlug(slug);
      
      if (foundArticle) {
        setArticle(foundArticle);
        
        // Get related articles from the same category (excluding current article)
        const categoryArticles = getArticlesByCategory(foundArticle.category)
          .filter(a => a.id !== foundArticle.id)
          .slice(0, 3);
        setRelatedArticles(categoryArticles);

        // Update SEO meta tags
        const metaData = generateArticleMeta(foundArticle);
        updateMetaTags(metaData);

        // Add structured data for article
        const articleStructuredData = createArticleStructuredData(foundArticle);
        addStructuredData(articleStructuredData);
      }
      
      setLoading(false);
    };

    loadArticle();

    // Cleanup function to remove structured data when component unmounts
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Blog Button */}
          <div className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>

          {/* Title and Meta */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">{article.category}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{article.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-black leading-relaxed font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/blog/${relatedArticle.slug}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Tag className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-600">{relatedArticle.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
