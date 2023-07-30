import { api } from '../../services/ApiService';

const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
  const response = await api.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const loginAdmin = async (userData) => {
  const adminToken = localStorage.getItem('admin');

  const config = {
    headers: {
      adminToken: adminToken,
    },
  };

  const response = await api.post(API_URL + 'loginAdmin', userData, config);

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data));
  }

  return response.data;
};

// Authenticate admin, when user go to route '/admin'
const authAdmin = async ({ adminToken, adminSecret, token }) => {
  const config = {
    headers: {
      adminToken,
      adminSecret,
      token,
    },
  };

  const response = await api.get(API_URL + 'admin', config);

  return response.data;
};

// Logout admin
const logoutAdmin = () => {
  localStorage.removeItem('admin');
};

const authService = {
  register,
  login,
  logout,
  loginAdmin,
  logoutAdmin,
  authAdmin,
};

export default authService;
