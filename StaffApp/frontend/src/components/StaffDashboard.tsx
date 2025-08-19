import React from 'react';
import { authAPI } from '../api/authAPI';
import type { User } from '../data/dummyData';
import './StaffDashboard.css';

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, onLogout }) => {
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

  const staffTasks = [
    {
      id: 1,
      title: 'Check-in Management',
      description: 'Manage passenger check-ins and boarding',
      icon: '✅',
      color: '#3498db',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Flight Status Updates',
      description: 'Update flight delays and announcements',
      icon: '📢',
      color: '#f39c12',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Passenger Assistance',
      description: 'Help passengers with queries and issues',
      icon: '🤝',
      color: '#2ecc71',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Baggage Handling',
      description: 'Monitor and track baggage operations',
      icon: '🧳',
      color: '#e74c3c',
      status: 'Active'
    }
  ];

  const upcomingFlights = [
    { flightNumber: 'AI101', destination: 'London', time: '14:30', gate: 'A12' },
    { flightNumber: 'AI102', destination: 'Paris', time: '16:00', gate: 'B8' },
    { flightNumber: 'AI103', destination: 'Dubai', time: '09:15', gate: 'C5' }
  ];

  return (
    <div className="staff-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="airline-logo">
            <span className="logo-icon">✈</span>
            <h1>SkyLine Airways</h1>
          </div>
          <div className="user-info">
            <span className="welcome-text">Welcome, {user.username}</span>
            <span className="role-badge staff">Staff Member</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-title">
          <h2>Staff Dashboard</h2>
          <p>Your daily operations center</p>
        </div>

        <div className="dashboard-sections">
          <section className="tasks-section">
            <h3>Today's Tasks</h3>
            <div className="tasks-grid">
              {staffTasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <div className="task-icon" style={{ color: task.color }}>
                      {task.icon}
                    </div>
                    <span className={`task-status ${task.status.toLowerCase()}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="task-content">
                    <h4 className="task-title">{task.title}</h4>
                    <p className="task-description">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flights-section">
            <h3>Upcoming Flights</h3>
            <div className="flights-table">
              <div className="table-header">
                <div>Flight</div>
                <div>Destination</div>
                <div>Time</div>
                <div>Gate</div>
              </div>
              {upcomingFlights.map((flight, index) => (
                <div key={index} className="table-row">
                  <div className="flight-number">{flight.flightNumber}</div>
                  <div>{flight.destination}</div>
                  <div>{flight.time}</div>
                  <div className="gate">{flight.gate}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-number">24</div>
            <div className="stat-label">Flights Today</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">156</div>
            <div className="stat-label">Checked In</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12</div>
            <div className="stat-label">Assistance Requests</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Delayed Flights</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
