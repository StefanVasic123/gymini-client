import { api } from '../../services/ApiService';

const API_URL = '/api/clients/';

// Create new client
const createClient = async (clientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(API_URL, clientData, config);

  return response.data;
};

// Get user clients
const getClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(API_URL, config);

  return response.data;
};

// Login client
const loginClient = async (clientData) => {
  const response = await api.post(API_URL + 'client-login', clientData);

  if (response.data) {
    localStorage.setItem('client', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout client
const logoutClient = () => {
  localStorage.removeItem('client');
};

// Delete user client
const deleteClient = async (clientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(API_URL + clientId, config);

  return response.data;
};

const updateClient = async (clientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(API_URL + clientData.id, clientData, config);

  return response.data;
};

// Get today entered clients
const getTodayCreatedClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(API_URL + 'today-created-clients', config);

  return response.data;
};

// Get clients by date
const getClientsByDate = async (shiftData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(
    API_URL + 'get-clients-by-date',
    shiftData,
    config
  );

  return response.data;
};

// Get clients by month
const getClientsByMonth = async (shiftData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(
    API_URL + 'get-clients-by-month',
    shiftData,
    config
  );

  return response.data;
};

// Get clients by month
const getClientsByYear = async (shiftData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(
    API_URL + 'get-clients-by-year',
    shiftData,
    config
  );

  return response.data;
};

const clientService = {
  createClient,
  getClients,
  loginClient,
  logoutClient,
  deleteClient,
  updateClient,
  getTodayCreatedClients,
  getClientsByDate,
  getClientsByMonth,
  getClientsByYear,
};

export default clientService;
