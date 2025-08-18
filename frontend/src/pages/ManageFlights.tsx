import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { flightAPI } from '../api/flightAPI';
import FlightModal from '../components/modals/FlightModal';
import type { Flight } from '../data/dummyData';
import './ManageFlights.css';

const ManageFlights: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Flight>('flightNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  const handleAddFlight = () => {
    setEditingFlight(null);
    setIsModalOpen(true);
  };

  const handleEditFlight = (flight: Flight) => {
    setEditingFlight(flight);
    setIsModalOpen(true);
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

  const handleSaveFlight = (savedFlight: Flight) => {
    if (editingFlight) {
      // Update existing flight
      setFlights(flights.map(flight => 
        flight.id === savedFlight.id ? savedFlight : flight
      ));
    } else {
      // Add new flight
      setFlights([...flights, savedFlight]);
    }
  };

  const getSortIcon = (field: keyof Flight) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const handleSort = (field: keyof Flight) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
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

  const filteredFlights = flights.filter(flight =>
    flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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
          <button className="add-btn" onClick={handleAddFlight}>+ Add New Flight</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search flights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flights-container">
        <div className="flights-table">
          <div className="table-header">
            <div onClick={() => handleSort('flightNumber')}>Flight Number{getSortIcon('flightNumber')}</div>
            <div onClick={() => handleSort('origin')}>Origin{getSortIcon('origin')}</div>
            <div onClick={() => handleSort('destination')}>Destination{getSortIcon('destination')}</div>
            <div onClick={() => handleSort('departureTime')}>Departure{getSortIcon('departureTime')}</div>
            <div onClick={() => handleSort('arrivalTime')}>Arrival{getSortIcon('arrivalTime')}</div>
            <div onClick={() => handleSort('capacity')}>Capacity{getSortIcon('capacity')}</div>
            <div onClick={() => handleSort('price')}>Price{getSortIcon('price')}</div>
            <div onClick={() => handleSort('status')}>Status{getSortIcon('status')}</div>
            <div>Actions</div>
          </div>
          
          {sortedFlights.map((flight) => (
            <div key={flight.id} className="table-row">
              <div className="flight-number">{flight.flightNumber}</div>
              <div className="route">
                <span className="route-text">{flight.origin} → {flight.destination}</span>
              </div>
              <div className="departure">{flight.departureTime}</div>
              <div className="arrival">{flight.arrivalTime}</div>
              <div className="capacity">{flight.bookedSeats}/{flight.capacity}</div>
              <div className="price">${flight.price}</div>
              <div className="status">
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(flight.status) }}
                >
                  {flight.status.toUpperCase()}
                </span>
              </div>
              <div className="actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEditFlight(flight)}
                >
                  Edit
                </button>
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

        {filteredFlights.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">✈️</div>
            <h3>No flights found</h3>
            <p>Try adjusting your search query</p>
          </div>
        )}
      </div>

      <FlightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFlight}
        flight={editingFlight}
      />
    </div>
  );
};

export default ManageFlights;
