import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import ManageFlights from './pages/ManageFlights';
import ManageRoutes from './pages/ManageRoutes';
import ManagePassengers from './pages/ManagePassengers';
import { authAPI } from './api/authAPI';
import type { User } from './data/dummyData';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authAPI.getCurrentUser();
    if (currentUser && authAPI.isAuthenticated()) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Routes>
            {/* Admin Routes */}
            {user.role === 'admin' && (
              <>
                <Route 
                  path="/admin" 
                  element={<AdminDashboard user={user} onLogout={handleLogout} />} 
                />
                <Route path="/admin/flights" element={<ManageFlights />} />
                <Route path="/admin/routes" element={<ManageRoutes />} />
                <Route path="/admin/passengers" element={<ManagePassengers />} />
                <Route path="/" element={<Navigate to="/admin" replace />} />
              </>
            )}

            {/* Staff Routes */}
            {user.role === 'staff' && (
              <>
                <Route 
                  path="/staff" 
                  element={<StaffDashboard user={user} onLogout={handleLogout} />} 
                />
                <Route path="/" element={<Navigate to="/staff" replace />} />
              </>
            )}

            {/* Catch-all redirect */}
            <Route 
              path="*" 
              element={
                <Navigate 
                  to={user.role === 'admin' ? '/admin' : '/staff'} 
                  replace 
                />
              } 
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
