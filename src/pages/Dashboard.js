import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleDashboard = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div className="simple-dashboard">
      <header className="dashboard-header">
        <img 
          src={userData?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPx5Ngn3BqU_b1o4MO5-90QnJXVEdVLYmaA&s'} 
          alt="User"
          className="user-avatar"
        />
        <h2>Welcome, {userData?.name || 'User'}!</h2>
      </header>

      <div className="dashboard-content">
        <div className="user-card">
          <h3>Your Information</h3>
          <p><strong>Email:</strong> {userData?.email || 'Not provided'}</p>
          <p><strong>Member since:</strong> {userData?.joinDate || 'Unknown date'}</p>
        </div>

        <div className="action-buttons">
          <button 
            className="btn-primary"
            onClick={() => navigate('/profile')}
          >
            Edit Profile
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/features')}
          >
            Explore Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;