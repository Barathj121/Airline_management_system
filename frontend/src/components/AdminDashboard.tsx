import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/authAPI';
import type { User } from '../data/dummyData';
import './AdminDashboard.css';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
      // Still logout in case of error
      onLogout();
    }
  };

  const dashboardItems = [
    {
      id: 1,
      title: 'Manage Flight',
      description: 'Add, edit, and manage flight schedules',
      icon: '✈️',
      color: '#3498db',
      onClick: () => navigate('/admin/flights')
    },
    {
      id: 2,
      title: 'Manage Route',
      description: 'Configure flight routes and destinations',
      icon: '🗺️',
      color: '#2ecc71',
      onClick: () => navigate('/admin/routes')
    },
    {
      id: 3,
      title: 'Manage Passenger',
      description: 'View and manage passenger information',
      icon: '👥',
      color: '#e74c3c',
      onClick: () => navigate('/admin/passengers')
    },
    {
      id: 4,
      title: 'Logout',
      description: 'Sign out of your account',
      icon: '🚪',
      color: '#95a5a6',
      onClick: handleLogout
    }
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="airline-logo">
            <span className="logo-icon">✈</span>
            <h1>SkyLine Airways</h1>
          </div>
          <div className="user-info">
            <span className="welcome-text">Welcome, {user.username}</span>
            <span className="role-badge admin">Administrator</span>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-title">
          <h2>Admin Dashboard</h2>
          <p>Manage your airline operations from here</p>
        </div>

        <div className="dashboard-grid">
          {dashboardItems.map((item) => (
            <div
              key={item.id}
              className="dashboard-card"
              onClick={item.onClick}
              style={{ borderTop: `4px solid ${item.color}` }}
            >
              <div className="card-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
              <div className="card-arrow">→</div>
            </div>
          ))}
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">156</div>
            <div className="stat-label">Active Flights</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24</div>
            <div className="stat-label">Routes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1,234</div>
            <div className="stat-label">Passengers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">On-Time Rate</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
