import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';
import './AdminContacts.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showError('Failed to load contacts');
      setLoading(false);
      return;
    }

    setContacts(data || []);
    setLoading(false);
  };

  const updateContactStatus = async (contactId, status) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', contactId);

    if (error) {
      showError('Failed to update contact');
      return;
    }

    showSuccess('Contact status updated');
    loadContacts();
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' || contact.status === filter;
    const matchesSearch = !searchTerm || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.subject && contact.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
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
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="admin-contacts">
      <div className="contacts-header">
        <h1>Contact Submissions</h1>
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({contacts.length})
          </button>
          <button 
            className={filter === 'new' ? 'active' : ''}
            onClick={() => setFilter('new')}
          >
            New ({contacts.filter(c => c.status === 'new').length})
          </button>
          <button 
            className={filter === 'in_progress' ? 'active' : ''}
            onClick={() => setFilter('in_progress')}
          >
            In Progress ({contacts.filter(c => c.status === 'in_progress').length})
          </button>
          <button 
            className={filter === 'resolved' ? 'active' : ''}
            onClick={() => setFilter('resolved')}
          >
            Resolved ({contacts.filter(c => c.status === 'resolved').length})
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="contacts-list">
        {filteredContacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <div className="contact-header">
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <span className="contact-email">{contact.email}</span>
                {contact.phone && <span className="contact-phone">📞 {contact.phone}</span>}
              </div>
              <div className="contact-meta">
                <span className={`status-badge ${contact.status}`}>
                  {contact.status.replace('_', ' ')}
                </span>
                <span className="contact-date">{formatDate(contact.created_at)}</span>
              </div>
            </div>

            {contact.subject && (
              <div className="contact-subject">
                <strong>Subject:</strong> {contact.subject}
              </div>
            )}

            <div className="contact-message">
              {contact.message}
            </div>

            <div className="contact-actions">
              {contact.status === 'new' && (
                <button 
                  onClick={() => updateContactStatus(contact.id, 'in_progress')}
                  className="progress-btn"
                >
                  Mark In Progress
                </button>
              )}
              {contact.status !== 'resolved' && (
                <button 
                  onClick={() => updateContactStatus(contact.id, 'resolved')}
                  className="resolve-btn"
                >
                  Mark Resolved
                </button>
              )}
              <a href={`mailto:${contact.email}`} className="reply-btn">
                Reply via Email
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="empty-state">
          <p>📧 No contact submissions found</p>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
