import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../features/auth/services/authService';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <button className="burger-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
        
        <Link to="/dashboard" className="title-link" onClick={closeMenu}>
          <h1 className="header-title">Task Manager</h1>
        </Link>
        
        <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/tasks" className="nav-link" onClick={closeMenu}>
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
