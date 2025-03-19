import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Ensure the CSS file is imported

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Section: Logo and App Name */}
      <div className="navbar-left">
        <img src="/SafeWebLOGO.png" alt="Safe Web Logo" className="navbar-logo" /> {/* Logo */}
        <span className="app-name">Safe Web</span> {/* App Name */}
      </div>

      {/* Middle Section: Navigation Links */}
      <ul className="navbar-links">
        <li>
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            Features
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Reports
          </NavLink>
        </li>
      </ul>

      {/* Right Section: Sign In / Sign Up Buttons */}
      <div className="navbar-right">
        <button className="signin-button">Sign In</button> {/* Sign In Button */}
        <button className="signup-button">Sign Up</button> {/* Sign Up Button */}
      </div>
    </nav>
  );
}

export default Navbar;