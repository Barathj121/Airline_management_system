import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../../data/dummyData';
import './StaffDashboard.css';

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="staff-dashboard">
      <header className="dashboard-header">
        <h1>Flight Staff Portal</h1>
        <div className="user-info">
          <span>Welcome, {user.username}!</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <h2>Staff Operations</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Passenger Check-In</h3>
            <p>Manage passenger check-in process and seat allocation</p>
            <Link to="/staff/checkin" className="service-link">
              Go to Check-In
            </Link>
          </div>

          <div className="service-card">
            <h3>In-Flight Services</h3>
            <p>Manage passenger meals, ancillaries, and shopping requests</p>
            <Link to="/staff/inflight-services" className="service-link">
              Go to Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
