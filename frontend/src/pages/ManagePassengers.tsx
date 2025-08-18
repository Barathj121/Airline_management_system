import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { passengerAPI } from '../api/passengerAPI';
import type { Passenger } from '../data/dummyData';
import './ManagePassengers.css';

const ManagePassengers: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPassengers();
  }, []);

  const loadPassengers = async () => {
    try {
      setLoading(true);
      const passengerData = await passengerAPI.getAllPassengers();
      setPassengers(passengerData);
    } catch (err) {
      setError('Failed to load passengers');
      console.error('Error loading passengers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      loadPassengers();
      return;
    }

    try {
      const searchResults = await passengerAPI.searchPassengers(term);
      setPassengers(searchResults);
    } catch (err) {
      setError('Failed to search passengers');
      console.error('Error searching passengers:', err);
    }
  };

  const handleDeletePassenger = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this passenger?')) {
      try {
        const success = await passengerAPI.deletePassenger(id);
        if (success) {
          setPassengers(passengers.filter(passenger => passenger.id !== id));
        } else {
          setError('Failed to delete passenger');
        }
      } catch (err) {
        setError('Failed to delete passenger');
        console.error('Error deleting passenger:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="manage-passengers">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading passengers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-passengers">
      <header className="page-header">
        <div className="header-content">
          <Link to="/admin" className="back-link">← Back to Dashboard</Link>
          <h1>Manage Passengers</h1>
          <button className="add-btn">+ Add New Passenger</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="passengers-container">
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search passengers by name or email..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="passengers-grid">
          {passengers.map((passenger) => (
            <div key={passenger.id} className="passenger-card">
              <div className="passenger-header">
                <div className="passenger-name">
                  {passenger.firstName} {passenger.lastName}
                </div>
                <div className="passenger-id">ID: {passenger.id}</div>
              </div>

              <div className="passenger-details">
                <div className="detail-row">
                  <span className="label">Email:</span>
                  <span className="value">{passenger.email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span className="value">{passenger.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Passport:</span>
                  <span className="value">{passenger.passportNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Nationality:</span>
                  <span className="value">{passenger.nationality}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date of Birth:</span>
                  <span className="value">{passenger.dateOfBirth}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Bookings:</span>
                  <span className="value">
                    {passenger.bookings.length} booking{passenger.bookings.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="passenger-actions">
                <button className="view-btn">View Details</button>
                <button className="edit-btn">Edit</button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeletePassenger(passenger.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {passengers.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>{searchTerm ? 'No passengers found' : 'No passengers registered'}</h3>
            <p>{searchTerm ? 'Try adjusting your search terms' : 'Add your first passenger to get started'}</p>
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => handleSearch('')}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePassengers;
