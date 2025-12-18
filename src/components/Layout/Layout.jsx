import { Outlet, useLocation } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ScrollToTop from '../common/ScrollToTop/ScrollToTop';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen ">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header sticky={true} />
      <main id="main-content" className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
