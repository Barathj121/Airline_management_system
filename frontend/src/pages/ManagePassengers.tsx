import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { passengerAPI } from '../api/passengerAPI';
import type { Passenger } from '../data/dummyData';
import './ManagePassengers.css';

type SortField = 'firstName' | 'lastName' | 'email' | 'nationality' | 'bookings';
type SortDirection = 'asc' | 'desc';

const ManagePassengers: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [filteredPassengers, setFilteredPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('firstName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    loadPassengers();
  }, []);

  useEffect(() => {
    filterAndSortPassengers();
  }, [passengers, searchTerm, sortField, sortDirection]);

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

  const filterAndSortPassengers = () => {
    let filtered = passengers;

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const lowercaseQuery = searchTerm.toLowerCase();
      filtered = passengers.filter(passenger => 
        passenger.firstName.toLowerCase().includes(lowercaseQuery) ||
        passenger.lastName.toLowerCase().includes(lowercaseQuery) ||
        passenger.email.toLowerCase().includes(lowercaseQuery) ||
        passenger.nationality.toLowerCase().includes(lowercaseQuery) ||
        passenger.passportNumber.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Sort passengers
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'firstName':
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
          break;
        case 'lastName':
          aValue = a.lastName.toLowerCase();
          bValue = b.lastName.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'nationality':
          aValue = a.nationality.toLowerCase();
          bValue = b.nationality.toLowerCase();
          break;
        case 'bookings':
          aValue = a.bookings.length;
          bValue = b.bookings.length;
          break;
        default:
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredPassengers(filtered);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const handleSort = (field: SortField) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedPassengers = [...filteredPassengers].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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
          <input
            type="text"
            className="search-input"
            placeholder="Search passengers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="passengers-table">
          <div className="table-header">
            <div onClick={() => handleSort('firstName')}>First Name{getSortIcon('firstName')}</div>
            <div onClick={() => handleSort('lastName')}>Last Name{getSortIcon('lastName')}</div>
            <div onClick={() => handleSort('email')}>Email{getSortIcon('email')}</div>
            <div onClick={() => handleSort('nationality')}>Nationality{getSortIcon('nationality')}</div>
            <div onClick={() => handleSort('bookings')}>Bookings{getSortIcon('bookings')}</div>
          </div>
          
          {sortedPassengers.map((passenger) => (
            <div key={passenger.id} className="table-row">
              <div>{passenger.firstName}</div>
              <div>{passenger.lastName}</div>
              <div>{passenger.email}</div>
              <div>{passenger.nationality}</div>
              <div>{passenger.bookings}</div>
            </div>
          ))}
        </div>

        {filteredPassengers.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>{searchTerm ? 'No passengers found' : 'No passengers registered'}</h3>
            <p>{searchTerm ? 'Try adjusting your search terms' : 'Add your first passenger to get started'}</p>
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
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
