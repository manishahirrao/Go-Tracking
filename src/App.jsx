import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Quote = lazy(() => import('./pages/Quote'));
const Tracking = lazy(() => import('./pages/Tracking'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const Admin = lazy(() => import('./pages/Admin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminShipments = lazy(() => import('./pages/AdminShipments'));
const AdminQuotes = lazy(() => import('./pages/AdminQuotes'));
const AdminContacts = lazy(() => import('./pages/AdminContacts'));
const AdminReports = lazy(() => import('./pages/AdminReports'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="quote" element={<Quote />} />
                <Route path="tracking" element={<Tracking />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-conditions" element={<TermsConditions />} />
                <Route path="cookie-policy" element={<CookiePolicy />} />
                <Route path="refund-policy" element={<RefundPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin" element={<Admin />}>
                <Route index element={<AdminDashboard />} />
                <Route path="shipments" element={<AdminShipments />} />
                <Route path="quotes" element={<AdminQuotes />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="reports" element={<AdminReports />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
