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
  localStorage.removeItem('admin');
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
const changeUserPassword = async (data) => {
  const response = await api.post(API_URL + 'change-user-password', data);

  return response.data;
};

const changeAdminPassword = async (data) => {
  const response = await api.post(API_URL + 'change-admin-password', data);

  return response.data;
};

const forgotPassword = async (data) => {
  const response = await api.post(API_URL + 'forgot-password', data);

  return response.data;
};

const resetPassword = async (token, data) => {
  const response = await api.post(API_URL + `${token}/reset-password`, data);

  return response.data;
};

const forgotAdminPassword = async (data) => {
  const response = await api.post(API_URL + 'forgot-admin-password', data);

  return response.data;
};

const resetAdminPassword = async (token, data) => {
  const response = await api.post(
    API_URL + `${token}/reset-admin-password`,
    data
  );

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  loginAdmin,
  logoutAdmin,
  authAdmin,
  changeUserPassword,
  changeAdminPassword,
  forgotPassword,
  resetPassword,
  forgotAdminPassword,
  resetAdminPassword,
};

export default authService;
