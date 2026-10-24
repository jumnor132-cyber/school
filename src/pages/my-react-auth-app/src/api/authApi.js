import axios from 'axios';

const API_URL = 'http://localhost/api/auth'; // Adjust the URL as needed

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Registration failed' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Login failed' };
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Logout failed' };
  }
};