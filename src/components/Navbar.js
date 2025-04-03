import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Section: Logo and App Name */}
      <div className="navbar-left">
        <img src="/SafeWebLOGO.png" alt="Safe Web Logo" className="navbar-logo" />
        <span className="app-name">Safe Web</span>
      </div>

      {/* Middle Section: Navigation Links */}
      <ul className="navbar-links">
        <li>
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/features" activeClassName="active">
            Features
          </NavLink>
        </li>
        <li>
          <NavLink to="/report" activeClassName="active">Report</NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right Section: Sign In / Sign Up Buttons */}
      <div className="navbar-right">
        <NavLink to="/signin" className="signin-button">
          Sign In
        </NavLink>
        <NavLink to="/signup" className="signup-button">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;