import { api } from '../../../../services/ApiService';

const API_URL = '/api/clients/';

const setShiftSettings = async (shiftSettingsData) => {
  const response = await api.post(
    API_URL + 'set-shift-settings',
    shiftSettingsData
  );

  return response.data;
};

const getShiftSettings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(API_URL + 'get-shift-settings', config);

  return response.data;
};

const shiftSettingsService = {
  setShiftSettings,
  getShiftSettings,
};

export default shiftSettingsService;
