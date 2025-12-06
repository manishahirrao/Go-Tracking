import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';
import './AdminQuotes.css';

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showError('Failed to load quotes');
      setLoading(false);
      return;
    }

    setQuotes(data || []);
    setLoading(false);
  };

  const updateQuoteStatus = async (quoteId, status, quotedPrice = null) => {
    const updateData = {
      status,
      ...(quotedPrice && { quoted_price: quotedPrice, quoted_at: new Date().toISOString() })
    };

    const { error } = await supabase
      .from('quote_requests')
      .update(updateData)
      .eq('id', quoteId);

    if (error) {
      showError('Failed to update quote');
      return;
    }

    showSuccess('Quote updated successfully');
    loadQuotes();
  };

  const filteredQuotes = quotes.filter(quote => {
    if (filter === 'all') return true;
    return quote.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading quotes...</p>
      </div>
    );
  }

  return (
    <div className="admin-quotes">
      <div className="quotes-header">
        <h1>Quote Requests</h1>
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({quotes.length})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({quotes.filter(q => q.status === 'pending').length})
          </button>
          <button 
            className={filter === 'quoted' ? 'active' : ''}
            onClick={() => setFilter('quoted')}
          >
            Quoted ({quotes.filter(q => q.status === 'quoted').length})
          </button>
        </div>
      </div>

      <div className="quotes-grid">
        {filteredQuotes.map(quote => (
          <QuoteCard 
            key={quote.id} 
            quote={quote} 
            onUpdateStatus={updateQuoteStatus}
            formatDate={formatDate}
          />
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="empty-state">
          <p>📋 No quote requests found</p>
        </div>
      )}
    </div>
  );
};

const QuoteCard = ({ quote, onUpdateStatus, formatDate }) => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quotedPrice, setQuotedPrice] = useState('');

  const handleProvideQuote = () => {
    if (!quotedPrice || parseFloat(quotedPrice) <= 0) {
      alert('Please enter a valid price');
      return;
    }
    onUpdateStatus(quote.id, 'quoted', parseFloat(quotedPrice));
    setShowQuoteForm(false);
    setQuotedPrice('');
  };

  return (
    <div className="quote-card">
      <div className="quote-header">
        <span className={`status-badge ${quote.status}`}>{quote.status}</span>
        <span className="quote-date">{formatDate(quote.created_at)}</span>
      </div>

      <div className="quote-details">
        <div className="detail-row">
          <strong>Customer:</strong>
          <span>{quote.customer_name}</span>
        </div>
        <div className="detail-row">
          <strong>Email:</strong>
          <span>{quote.customer_email}</span>
        </div>
        {quote.customer_phone && (
          <div className="detail-row">
            <strong>Phone:</strong>
            <span>{quote.customer_phone}</span>
          </div>
        )}
        <div className="detail-row">
          <strong>From:</strong>
          <span>{quote.origin_address}</span>
        </div>
        <div className="detail-row">
          <strong>To:</strong>
          <span>{quote.destination_address}</span>
        </div>
        {quote.weight && (
          <div className="detail-row">
            <strong>Weight:</strong>
            <span>{quote.weight} kg</span>
          </div>
        )}
        {quote.service_level && (
          <div className="detail-row">
            <strong>Service:</strong>
            <span className="service-badge">{quote.service_level}</span>
          </div>
        )}
        {quote.description && (
          <div className="detail-row">
            <strong>Description:</strong>
            <span>{quote.description}</span>
          </div>
        )}
        {quote.quoted_price && (
          <div className="detail-row">
            <strong>Quoted Price:</strong>
            <span className="price">${parseFloat(quote.quoted_price).toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="quote-actions">
        {quote.status === 'pending' && !showQuoteForm && (
          <button onClick={() => setShowQuoteForm(true)} className="quote-btn">
            Provide Quote
          </button>
        )}
        
        {showQuoteForm && (
          <div className="quote-form">
            <input
              type="number"
              step="0.01"
              placeholder="Enter price"
              value={quotedPrice}
              onChange={(e) => setQuotedPrice(e.target.value)}
            />
            <button onClick={handleProvideQuote} className="submit-btn">Submit</button>
            <button onClick={() => setShowQuoteForm(false)} className="cancel-btn">Cancel</button>
          </div>
        )}

        {quote.status === 'quoted' && (
          <button 
            onClick={() => onUpdateStatus(quote.id, 'accepted')}
            className="accept-btn"
          >
            Mark as Accepted
          </button>
        )}
        
        {quote.status === 'pending' && (
          <button 
            onClick={() => onUpdateStatus(quote.id, 'rejected')}
            className="reject-btn"
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminQuotes;
