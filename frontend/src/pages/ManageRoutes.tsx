import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routeAPI } from '../api/routeAPI';
import type { Route } from '../data/dummyData';
import './ManageRoutes.css';

const ManageRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const routeData = await routeAPI.getAllRoutes();
      setRoutes(routeData);
    } catch (err) {
      setError('Failed to load routes');
      console.error('Error loading routes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoute = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        const success = await routeAPI.deleteRoute(id);
        if (success) {
          setRoutes(routes.filter(route => route.id !== id));
        } else {
          setError('Failed to delete route');
        }
      } catch (err) {
        setError('Failed to delete route');
        console.error('Error deleting route:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="manage-routes">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading routes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-routes">
      <header className="page-header">
        <div className="header-content">
          <Link to="/admin" className="back-link">← Back to Dashboard</Link>
          <h1>Manage Routes</h1>
          <button className="add-btn">+ Add New Route</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="routes-container">
        <div className="routes-table">
          <div className="table-header">
            <div>Route Code</div>
            <div>Origin</div>
            <div>Destination</div>
            <div>Distance</div>
            <div>Duration</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          
          {routes.map((route) => (
            <div key={route.id} className="table-row">
              <div className="route-code">{route.routeCode}</div>
              <div className="origin">{route.origin}</div>
              <div className="destination">{route.destination}</div>
              <div className="distance">{route.distance} km</div>
              <div className="duration">{route.estimatedDuration}</div>
              <div className="status">
                <span className={`status-badge ${route.status}`}>
                  {route.status.toUpperCase()}
                </span>
              </div>
              <div className="actions">
                <button className="edit-btn">Edit</button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteRoute(route.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {routes.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">🗺️</div>
            <h3>No routes found</h3>
            <p>Add your first route to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRoutes;
