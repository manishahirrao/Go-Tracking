import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getArticlesByCategory, searchArticles } from '../data/articles';
import { Search, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';
import '../styles/global.css';
import './Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const categories = getCategories();

  // Update SEO meta tags for Blog page
  useEffect(() => {
    const blogMetaData = {
      title: 'Blog - Australia Post Tracking Helper',
      description: 'Find answers to your postal questions and learn about Australia Post services. Expert tips, guides, and tracking help.',
      keywords: 'Australia Post blog, postal services, shipping tips, tracking help, package delivery',
      author: 'Australia Post Tracking Helper',
      url: 'https://australiaposttracking.online/blog',
      image: '/logo-black.png',
      ogType: 'website',
      twitterCard: 'summary_large_image'
    };
    updateMetaTags(blogMetaData);
  }, []);

  const filteredArticles = useMemo(() => {
    let articles = getArticlesByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      articles = searchArticles(searchQuery);
    }
    
    return articles;
  }, [selectedCategory, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Reset page when filters change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blog-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1>Blog</h1>
          <p>Find answers to your postal questions and learn about Australia Post services</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="blog-filters">
        <div className="container">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search articles..."
                className="search-input"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            <div className="tabs-container">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <>
              <div className="articles-grid">
                {currentArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.slug}`}
                    className="article-card"
                  >
                    <div className="article-content">
                      {/* Category Tag */}
                      <div className="article-category">
                        <Tag className="category-icon" />
                        <span>{article.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="article-title">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="article-excerpt">
                        {article.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="article-meta">
                        <div className="meta-item">
                          <Clock className="meta-icon" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <nav className="pagination">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
                    >
                      <ChevronLeft className="btn-icon" />
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current page
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`page-number ${currentPage === page ? 'active' : ''}`}
                          >
                            {page}
                          </button>
                        );
                      }
                      
                      // Show ellipsis for skipped pages
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <span key={page} className="page-ellipsis">
                            ...
                          </span>
                        );
                      }
                      
                      return null;
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                    >
                      Next
                      <ChevronRight className="btn-icon" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="no-articles">
              <div className="no-articles-icon">
                <Search />
              </div>
              <h3>No articles found</h3>
              <p>
                Try adjusting your search terms or browse a different category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;