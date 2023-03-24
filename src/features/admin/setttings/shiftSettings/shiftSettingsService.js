import axios from 'axios';

const API_URL = '/api/clients/';

const setShiftSettings = async (shiftSettingsData) => {
  const response = await axios.post(
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
  const response = await axios.get(API_URL + 'get-shift-settings', config);

  return response.data;
};

const shiftSettingsService = {
  setShiftSettings,
  getShiftSettings,
};

export default shiftSettingsService;
