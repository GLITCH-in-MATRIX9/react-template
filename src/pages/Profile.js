import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        name: res.data.name,
        avatar: res.data.avatar || ''
      });
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put('/api/auth/profile', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    navigate('/dashboard');
  };

  return (
    <div className="profile-form">
      <h2>Personalize Your Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Display Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </label>
        
        <label>
          Avatar URL:
          <input
            type="text"
            value={formData.avatar}
            onChange={(e) => setFormData({...formData, avatar: e.target.value})}
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;