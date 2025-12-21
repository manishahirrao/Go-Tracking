import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ article }) => {
  const location = useLocation();
  
  const breadcrumbItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Blog', path: '/blog' },
  ];

  if (article) {
    breadcrumbItems.push({ 
      name: article.category, 
      path: `/blog?category=${encodeURIComponent(article.category)}` 
    });
    breadcrumbItems.push({ 
      name: article.title, 
      path: location.pathname,
      current: true 
    });
  } else if (location.pathname.startsWith('/blog')) {
    breadcrumbItems.push({ 
      name: 'Blog', 
      path: '/blog',
      current: true 
    });
  }

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="breadcrumb-list">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              {item.current ? (
                <span className="breadcrumb-current">{item.name}</span>
              ) : (
                <Link to={item.path} className="breadcrumb-link">
                  {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
