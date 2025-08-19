import { useState, useEffect } from 'react';
import { flightAPI } from '../../api/flightAPI';
import type { Flight } from '../../data/dummyData';
import './FlightModal.css';

interface FlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (flight: Flight) => void;
  flight?: Flight | null;
}

const FlightModal: React.FC<FlightModalProps> = ({ isOpen, onClose, onSave, flight }) => {
  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    capacity: 0,
    bookedSeats: 0,
    price: 0,
    status: 'scheduled' as 'scheduled' | 'delayed' | 'cancelled' | 'completed'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (flight) {
      setFormData({
        flightNumber: flight.flightNumber,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        capacity: flight.capacity,
        bookedSeats: flight.bookedSeats,
        price: flight.price,
        status: flight.status
      });
    } else {
      setFormData({
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        capacity: 0,
        bookedSeats: 0,
        price: 0,
        status: 'scheduled'
      });
    }
    setError('');
  }, [flight, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let savedFlight: Flight;
      
      if (flight) {
        // Update existing flight
        const updated = await flightAPI.updateFlight(flight.id, formData);
        if (!updated) {
          throw new Error('Failed to update flight');
        }
        savedFlight = updated;
      } else {
        // Create new flight
        savedFlight = await flightAPI.createFlight(formData);
      }

      onSave(savedFlight);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{flight ? 'Edit Flight' : 'Add New Flight'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="flightNumber">Flight Number</label>
              <input
                type="text"
                id="flightNumber"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleInputChange}
                required
                placeholder="e.g., AI101"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="scheduled">Scheduled</option>
                <option value="delayed">Delayed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="origin">Origin</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                required
                placeholder="e.g., New York"
              />
            </div>
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
                placeholder="e.g., London"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departureTime">Departure Time</label>
              <input
                type="datetime-local"
                id="departureTime"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="arrivalTime">Arrival Time</label>
              <input
                type="datetime-local"
                id="arrivalTime"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="e.g., 180"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookedSeats">Booked Seats</label>
              <input
                type="number"
                id="bookedSeats"
                name="bookedSeats"
                value={formData.bookedSeats}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="e.g., 145"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                placeholder="e.g., 850.00"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : (flight ? 'Update Flight' : 'Add Flight')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightModal;
