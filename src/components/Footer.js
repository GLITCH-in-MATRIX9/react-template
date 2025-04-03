import "./Footer.css";
import { FaTwitter, FaDiscord } from "react-icons/fa"; // Icons for Web3 style

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Web3 Branding */}
        <div className="footer-brand">
          <img className="SWlogo" src="./SafeWebLOGO.png" alt="safeweb logo"></img>
          <p>&copy; 2025 SafeWeb. All rights reserved.</p>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <FaDiscord className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;