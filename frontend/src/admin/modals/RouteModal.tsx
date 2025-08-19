import { useState, useEffect } from 'react';
import { routeAPI } from '../../api/routeAPI';
import type { Route } from '../../data/dummyData';
import './RouteModal.css';

interface RouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (route: Route) => void;
  route?: Route | null;
}

const RouteModal: React.FC<RouteModalProps> = ({ isOpen, onClose, onSave, route }) => {
  const [formData, setFormData] = useState({
    routeCode: '',
    origin: '',
    destination: '',
    distance: 0,
    estimatedDuration: '',
    status: 'active' as 'active' | 'inactive'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (route) {
      setFormData({
        routeCode: route.routeCode,
        origin: route.origin,
        destination: route.destination,
        distance: route.distance,
        estimatedDuration: route.estimatedDuration,
        status: route.status
      });
    } else {
      setFormData({
        routeCode: '',
        origin: '',
        destination: '',
        distance: 0,
        estimatedDuration: '',
        status: 'active'
      });
    }
    setError('');
  }, [route, isOpen]);

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
      let savedRoute: Route;
      
      if (route) {
        // Update existing route
        const updated = await routeAPI.updateRoute(route.id, formData);
        if (!updated) {
          throw new Error('Failed to update route');
        }
        savedRoute = updated;
      } else {
        // Create new route
        savedRoute = await routeAPI.createRoute(formData);
      }

      onSave(savedRoute);
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
          <h2>{route ? 'Edit Route' : 'Add New Route'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="routeCode">Route Code</label>
              <input
                type="text"
                id="routeCode"
                name="routeCode"
                value={formData.routeCode}
                onChange={handleInputChange}
                required
                placeholder="e.g., NYC-LON"
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
              <label htmlFor="distance">Distance (km)</label>
              <input
                type="number"
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="e.g., 5585"
              />
            </div>
            <div className="form-group">
              <label htmlFor="estimatedDuration">Estimated Duration</label>
              <input
                type="text"
                id="estimatedDuration"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 8h 00m"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : (route ? 'Update Route' : 'Add Route')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteModal;
