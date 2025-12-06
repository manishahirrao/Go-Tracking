import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-container">
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin" 
            className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/shipments" 
            className={`nav-item ${isActive('/admin/shipments') ? 'active' : ''}`}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Shipments</span>
          </Link>
          
          <Link 
            to="/admin/quotes" 
            className={`nav-item ${isActive('/admin/quotes') ? 'active' : ''}`}
          >
            <span className="nav-icon">💰</span>
            <span className="nav-text">Quotes</span>
          </Link>
          
          <Link 
            to="/admin/contacts" 
            className={`nav-item ${isActive('/admin/contacts') ? 'active' : ''}`}
          >
            <span className="nav-icon">📧</span>
            <span className="nav-text">Contacts</span>
          </Link>
          
          <Link 
            to="/admin/reports" 
            className={`nav-item ${isActive('/admin/reports') ? 'active' : ''}`}
          >
            <span className="nav-icon">📈</span>
            <span className="nav-text">Reports</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="back-to-site">
            ← Back to Site
          </Link>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
