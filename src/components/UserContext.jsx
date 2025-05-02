import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setUser(data.user);
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setUser(data.user);
      navigate('/'); // Redirect to home page after registration
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login'); // Redirect to login page
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
