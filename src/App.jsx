import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Tracking = lazy(() => import('./pages/Tracking'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
