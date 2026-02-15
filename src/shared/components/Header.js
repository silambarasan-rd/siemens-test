import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../features/auth/services/authService';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/dashboard" className="nav-link">
          <h1 className="header-title">Task Manager</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/dashboard" className="nav-link">
            Home
          </Link>
          <Link to="/tasks" className="nav-link">
            Tasks
          </Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
