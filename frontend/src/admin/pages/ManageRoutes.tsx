import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routeAPI } from '../../api/routeAPI';
import RouteModal from '../modals/RouteModal';
import type { Route } from '../../data/dummyData';
import './ManageRoutes.css';

const ManageRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Route>('routeCode');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  const handleAddRoute = () => {
    setEditingRoute(null);
    setIsModalOpen(true);
  };

  const handleEditRoute = (route: Route) => {
    setEditingRoute(route);
    setIsModalOpen(true);
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

  const handleSaveRoute = (savedRoute: Route) => {
    if (editingRoute) {
      // Update existing route
      setRoutes(routes.map(route => 
        route.id === savedRoute.id ? savedRoute : route
      ));
    } else {
      // Add new route
      setRoutes([...routes, savedRoute]);
    }
  };

  const getSortIcon = (field: keyof Route) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  const handleSort = (field: keyof Route) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  const filteredRoutes = routes.filter(route =>
    route.routeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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
          <button className="add-btn" onClick={handleAddRoute}>+ Add New Route</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search routes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="routes-container">
        <div className="routes-table">
          <div className="table-header">
            <div onClick={() => handleSort('routeCode')}>Route Code{getSortIcon('routeCode')}</div>
            <div onClick={() => handleSort('origin')}>Origin{getSortIcon('origin')}</div>
            <div onClick={() => handleSort('destination')}>Destination{getSortIcon('destination')}</div>
            <div onClick={() => handleSort('distance')}>Distance{getSortIcon('distance')}</div>
            <div onClick={() => handleSort('estimatedDuration')}>Duration{getSortIcon('estimatedDuration')}</div>
            <div onClick={() => handleSort('status')}>Status{getSortIcon('status')}</div>
            <div>Actions</div>
          </div>

          {sortedRoutes.map((route) => (
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
                <button 
                  className="edit-btn"
                  onClick={() => handleEditRoute(route)}
                >
                  Edit
                </button>
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

        {filteredRoutes.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">🗺️</div>
            <h3>No routes found</h3>
            <p>Try adjusting your search query</p>
          </div>
        )}
      </div>

      <RouteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRoute}
        route={editingRoute}
      />
    </div>
  );
};

export default ManageRoutes;
