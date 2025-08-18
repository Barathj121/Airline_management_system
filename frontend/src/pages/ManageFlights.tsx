import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { flightAPI } from '../api/flightAPI';
import type { Flight } from '../data/dummyData';
import './ManageFlights.css';

const ManageFlights: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      setLoading(true);
      const flightData = await flightAPI.getAllFlights();
      setFlights(flightData);
    } catch (err) {
      setError('Failed to load flights');
      console.error('Error loading flights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFlight = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        const success = await flightAPI.deleteFlight(id);
        if (success) {
          setFlights(flights.filter(flight => flight.id !== id));
        } else {
          setError('Failed to delete flight');
        }
      } catch (err) {
        setError('Failed to delete flight');
        console.error('Error deleting flight:', err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#2ecc71';
      case 'delayed': return '#f39c12';
      case 'cancelled': return '#e74c3c';
      case 'completed': return '#95a5a6';
      default: return '#34495e';
    }
  };

  if (loading) {
    return (
      <div className="manage-flights">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading flights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-flights">
      <header className="page-header">
        <div className="header-content">
          <Link to="/admin" className="back-link">← Back to Dashboard</Link>
          <h1>Manage Flights</h1>
          <button className="add-btn">+ Add New Flight</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="flights-container">
        <div className="flights-grid">
          {flights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-header">
                <div className="flight-number">{flight.flightNumber}</div>
                <div 
                  className="flight-status" 
                  style={{ backgroundColor: getStatusColor(flight.status) }}
                >
                  {flight.status.toUpperCase()}
                </div>
              </div>
              
              <div className="flight-route">
                <div className="route-info">
                  <div className="airport">{flight.origin}</div>
                  <div className="route-arrow">✈️</div>
                  <div className="airport">{flight.destination}</div>
                </div>
              </div>

              <div className="flight-details">
                <div className="detail-row">
                  <span className="label">Departure:</span>
                  <span className="value">{flight.departureTime}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Arrival:</span>
                  <span className="value">{flight.arrivalTime}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Capacity:</span>
                  <span className="value">{flight.capacity} seats</span>
                </div>
                <div className="detail-row">
                  <span className="label">Booked:</span>
                  <span className="value">{flight.bookedSeats}/{flight.capacity}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Price:</span>
                  <span className="value">${flight.price}</span>
                </div>
              </div>

              <div className="flight-actions">
                <button className="edit-btn">Edit</button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteFlight(flight.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {flights.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">✈️</div>
            <h3>No flights found</h3>
            <p>Add your first flight to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFlights;
