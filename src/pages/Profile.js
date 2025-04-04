import React, { useState } from 'react';
import './Styles/Profile.css';
import background from "./Styles/background2.png"; // Import Image

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: 'Janvi Behal',
    email: 'user@web3mail.com',
    contact: '+1 234 567 8900',
    twitter: '@web3user',
    discord: 'web3user#1234',
    reddit: 'u/web3enthusiast',
    telegram: '@web3telegram'
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    
    // Show notification
    setShowNotification(true);
    
    // Hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (

    



    <div className="web3-profile-container">
      {/* Background elements */}
      <div className="bg-grid"></div>
      
      {/* Notification Popup */}
      {showNotification && (
        <div className="notification-popup">
          <span>✓</span> Changes Saved
        </div>
      )}

      {/* Profile Header */}
      <div className="profile-header">
        <div className="avatar-container">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgIhi9RzJ5LVHDLOYapKqGkyErXvDBJDzsZQ&s" 
            alt="Profile" 
            className="profile-avatar"
          />
          <div className="online-indicator"></div>
        </div>
        <h1>{formData.username}</h1>
        <p className="wallet-address">0x1a2...3b4c</p>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button 
          className={`tab ${activeTab === 'socials' ? 'active' : ''}`}
          onClick={() => setActiveTab('socials')}
        >
          🔗 Socials
        </button>
        <button 
          className={`tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🔒 Security
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {activeTab === 'profile' && (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <span>👤 Username</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>✉️ Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>📱 Contact</span>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="uniform-input"
                />
              </label>
            </div>

            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </form>
        )}

        {activeTab === 'socials' && (
          <form className="socials-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <span>𝕏 Twitter</span>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>⌗ Discord</span>
                <input
                  type="text"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>🎮 Reddit</span>
                <input
                  type="text"
                  name="reddit"
                  value={formData.reddit}
                  onChange={handleChange}
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>✉️ Telegram</span>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="social-connect-buttons">
              <button type="button" className="social-button twitter">
                Connect Twitter
              </button>
              <button type="button" className="social-button discord">
                Connect Discord
              </button>
              <button type="button" className="social-button reddit">
                Connect Reddit
              </button>
              <button type="button" className="social-button telegram">
                Connect Telegram
              </button>
            </div>

            <button type="submit" className="submit-button">
              Save Socials
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <form className="security-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <span>🔑 Current Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>🆕 New Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>✅ Confirm Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="uniform-input"
                />
              </label>
            </div>

            <div className="security-options">
              <div className="security-option">
                <span>🔐 2FA Authentication</span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="security-option">
                <span>📧 Email Alerts</span>
                <label className="switch">
                  <input type="checkbox" checked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Update Security
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;