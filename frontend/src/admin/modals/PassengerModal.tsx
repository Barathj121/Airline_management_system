import { useState, useEffect } from 'react';
import { passengerAPI } from '../../api/passengerAPI';
import type { Passenger } from '../../data/dummyData';
import './PassengerModal.css';

interface PassengerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (passenger: Passenger) => void;
  passenger?: Passenger | null;
}

const PassengerModal: React.FC<PassengerModalProps> = ({ isOpen, onClose, onSave, passenger }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    nationality: '',
    dateOfBirth: '',
    bookings: [] as number[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (passenger) {
      setFormData({
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        email: passenger.email,
        phone: passenger.phone,
        passportNumber: passenger.passportNumber,
        nationality: passenger.nationality,
        dateOfBirth: passenger.dateOfBirth,
        bookings: passenger.bookings
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passportNumber: '',
        nationality: '',
        dateOfBirth: '',
        bookings: []
      });
    }
    setError('');
  }, [passenger, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let savedPassenger: Passenger;
      
      if (passenger) {
        // Update existing passenger
        const updated = await passengerAPI.updatePassenger(passenger.id, formData);
        if (!updated) {
          throw new Error('Failed to update passenger');
        }
        savedPassenger = updated;
      } else {
        // Create new passenger
        savedPassenger = await passengerAPI.createPassenger(formData);
      }

      onSave(savedPassenger);
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
          <h2>{passenger ? 'Edit Passenger' : 'Add New Passenger'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="e.g., John"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Doe"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="e.g., john.doe@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="e.g., +1-555-0123"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="passportNumber">Passport Number</label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
                required
                placeholder="e.g., A12345678"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
                placeholder="e.g., American"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : (passenger ? 'Update Passenger' : 'Add Passenger')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassengerModal;
