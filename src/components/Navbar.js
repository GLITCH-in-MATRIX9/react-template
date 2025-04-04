import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo and App Name */}
      <div className="navbar-left">
        <img src="/SafeWebLOGO.png" alt="Safe Web Logo" className="navbar-logo" />
        <span className="app-name">Safe Web</span>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Middle Section: Navigation Links */}
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end onClick={toggleMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/features" className={({ isActive }) => isActive ? 'active' : ''} onClick={toggleMenu}>
            Features
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" className={({ isActive }) => isActive ? 'active' : ''} onClick={toggleMenu}>
            Report
          </NavLink>
        </li>

        {/* Mobile Auth Buttons */}
        {!user && (
          <div className="mobile-auth-buttons">
            <NavLink to="/signin" className="signin-button" onClick={toggleMenu}>
              Sign In
            </NavLink>
            <NavLink to="/signup" className="signup-button" onClick={toggleMenu}>
              Sign Up
            </NavLink>
          </div>
        )}
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        {user ? (
          <div className="profile-container">
            <div className="profile-trigger" onClick={toggleProfile}>
              <img 
                src={user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPx5Ngn3BqU_b1o4MO5-90QnJXVEdVLYmaA&s'} 
                alt="Profile" 
                className="profile-icon"
              />
              <span className="profile-name">{user.name}</span>
            </div>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <NavLink 
                  to="/dashboard" 
                  className="dropdown-item"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <i className="icon-dashboard"></i> Dashboard
                </NavLink>
                <NavLink 
                  to="/profile" 
                  className="dropdown-item"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <i className="icon-profile"></i> My Profile
                </NavLink>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  <i className="icon-logout"></i> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/signin" className="signin-button">
              Sign In
            </NavLink>
            <NavLink to="/signup" className="signup-button">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;